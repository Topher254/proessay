const express = require('express');
const multer = require('multer');
const db = require('../db');
const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// POST endpoint to create assignment
router.post('/', upload.array('files'), async (req, res) => {
  // Extract form data from request body
  const { 
    studentName, 
    email, 
    phone, 
    assignmentType, 
    subject, 
    deadline, 
    pages, 
    description, 
    urgency, 
    budget 
  } = req.body;
  
  // Validate required fields
  if (!studentName || !email || !phone || !assignmentType || !subject || !deadline || !pages || !description) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields'
    });
  }
  
  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();
    
    // Insert assignment
    const [assignmentResult] = await connection.query(
      `INSERT INTO assignments (
        student_name, email, phone, assignment_type, subject, 
        deadline, pages, description, urgency, budget
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        studentName,
        email,
        phone,
        assignmentType,
        subject,
        deadline,
        parseInt(pages),
        description,
        urgency,
        budget
      ]
    );
    
    const assignmentId = assignmentResult.insertId;
    
    // Insert files
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        await connection.query(
          `INSERT INTO assignment_files (
            assignment_id, filename, mimetype, size, data
          ) VALUES (?, ?, ?, ?, ?)`,
          [
            assignmentId,
            file.originalname,
            file.mimetype,
            file.size,
            file.buffer
          ]
        );
      }
    }
    
    await connection.commit();
    res.status(201).json({ 
      success: true, 
      message: 'Assignment created successfully',
      assignmentId
    });
  } catch (error) {
    await connection.rollback();
    console.error('Error creating assignment:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      details: error.message 
    });
  } finally {
    connection.release();
  }
});

// GET all assignments
router.get('/', async (req, res) => {
  try {
    const [assignments] = await db.query(
      'SELECT * FROM assignments ORDER BY created_at DESC'
    );
    
    // For each assignment, get files
    for (const assignment of assignments) {
      const [files] = await db.query(
        'SELECT id, filename, mimetype, size FROM assignment_files WHERE assignment_id = ?',
        [assignment.id]
      );
      assignment.files = files;
    }
    
    res.json({ 
      success: true, 
      assignments 
    });
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// GET a single assignment
router.get('/:id', async (req, res) => {
  try {
    const [assignment] = await db.query(
      'SELECT * FROM assignments WHERE id = ?',
      [req.params.id]
    );
    
    if (assignment.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Assignment not found' 
      });
    }
    
    const [files] = await db.query(
      'SELECT id, filename, mimetype, size FROM assignment_files WHERE assignment_id = ?',
      [req.params.id]
    );
    
    res.json({ 
      success: true, 
      assignment: {
        ...assignment[0],
        files
      }
    });
  } catch (error) {
    console.error('Error fetching assignment:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// GET file download
router.get('/:assignmentId/files/:fileId', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT filename, mimetype, data 
       FROM assignment_files 
       WHERE id = ? AND assignment_id = ?`,
      [req.params.fileId, req.params.assignmentId]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'File not found' 
      });
    }
    
    const file = rows[0];
    res.setHeader('Content-Type', file.mimetype);
    res.setHeader('Content-Disposition', `attachment; filename="${file.filename}"`);
    res.send(file.data);
  } catch (error) {
    console.error('Error retrieving file:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// DELETE assignment
router.delete('/:id', async (req, res) => {
  try {
    const connection = await db.getConnection();
    await connection.beginTransaction();
    
    try {
      // Delete files first
      await connection.query(
        'DELETE FROM assignment_files WHERE assignment_id = ?',
        [req.params.id]
      );
      
      // Delete assignment
      const [result] = await connection.query(
        'DELETE FROM assignments WHERE id = ?',
        [req.params.id]
      );
      
      if (result.affectedRows === 0) {
        await connection.rollback();
        return res.status(404).json({
          success: false,
          error: 'Assignment not found'
        });
      }
      
      await connection.commit();
      res.json({
        success: true,
        message: 'Assignment deleted successfully'
      });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error deleting assignment:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

module.exports = router;