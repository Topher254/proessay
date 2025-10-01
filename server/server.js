const express = require('express');
const multer = require('multer');
const cors = require('cors');
const nodemailer = require('nodemailer');
const db = require('./db');
const app = express();
const PORT = process.env.API_PORT || 5000;

// Add CORS middleware
app.use(cors({
  origin: ['http://localhost:3000',
    "http://192.168.100.2:3000"
  ], // frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Email transporter configuration using your professional settings
const transporter = nodemailer.createTransport({
  host: 'mail.proessayworks.com',      // Your outgoing server
  port: 465,                           // SMTP port
  secure: true,                        // SSL/TLS required for port 465
  auth: {
    user: 'admin@proessayworks.com',   // Your professional email
    pass: 'Raphael781077'   // REPLACE WITH YOUR ACTUAL PASSWORD
  },
  tls: {
    // Recommended to avoid certificate validation issues
    rejectUnauthorized: false
  },
  logger: true,  // Enable logging for debugging
  debug: true    // Show debug output
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'Backend is working!' });
});

// Test email endpoint
app.get('/api/test-email', async (req, res) => {
  try {
    await transporter.sendMail({
      from: '"ProEssayWorks Test" <admin@proessayworks.com>',
      to: 'admin@proessayworks.com',
      subject: 'SMTP Configuration Test',
      text: 'This is a test email to verify SMTP settings',
      html: '<p>This is a <b>test email</b> to verify SMTP settings</p>'
    });
    res.json({ success: true, message: 'Test email sent successfully' });
  } catch (error) {
    console.error('Email test failed:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Email test failed',
      details: error.message 
    });
  }
});

// POST endpoint to create assignment
app.post('/api/assignments', upload.array('files'), async (req, res) => {
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
  const requiredFields = ['studentName', 'email', 'phone', 'assignmentType', 
                         'subject', 'deadline', 'pages', 'description'];
  const missingFields = requiredFields.filter(field => !req.body[field]);
  
  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields',
      missingFields
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
        urgency || 'Medium',
        budget || '0.00'
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
    
    // Send confirmation email to student
    try {
      const studentMailOptions = {
        from: '"ProEssayWorks Team" <admin@proessayworks.com>',
        to: email,
        subject: 'Assignment Received Successfully',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <div style="background-color: #4f46e5; padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0;">ProEssayWorks</h1>
            </div>
            
            <div style="padding: 20px;">
              <h2 style="color: #4f46e5;">Assignment Received Successfully!</h2>
              <p>Hello ${studentName},</p>
              <p>Thank you for submitting your assignment with ProEssayWorks. We've received your submission and are processing it now.</p>
              
              <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; border-left: 4px solid #4f46e5; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #4f46e5;">Assignment Details</h3>
                <p><strong>Type:</strong> ${assignmentType}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Deadline:</strong> ${new Date(deadline).toLocaleString()}</p>
                <p><strong>Pages:</strong> ${pages}</p>
                <p><strong>Budget:</strong> $${budget}</p>
              </div>
              
              <p>A qualified writer will be assigned to your task within the next 1 minute. You'll receive another notification once your writer is assigned.</p>
              
              <p>Need immediate assistance? Contact us at 
              <a href="mailto:support@proessayworks.com" style="color: #4f46e5;">admin@proessayworks.com</a></p>
              
              <p>Best regards,<br>The ProEssayWorks Team</p>
            </div>
            
            <div style="background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
              <p>© ${new Date().getFullYear()} ProEssayWorks. All rights reserved.</p>
            </div>
          </div>
        `
      };

      await transporter.sendMail(studentMailOptions);
      console.log(`Confirmation email sent to student: ${email}`);
    } catch (emailError) {
      console.error('Error sending confirmation email to student:', emailError);
      // Log but don't fail the request
    }

    // Send notification email to admin (you)
    try {
      const adminMailOptions = {
        from: '"ProEssayWorks Assignment Alert" <admin@proessayworks.com>',
        to: 'raphaelsarota@gmail.com', // Your personal email
        subject: `New Assignment Request - ${assignmentType} - ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <div style="background-color: #dc2626; padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0;">NEW ASSIGNMENT REQUEST</h1>
            </div>
            
            <div style="padding: 20px;">
              <h2 style="color: #dc2626;">New Assignment Submission Received!</h2>
              <p><strong>Assignment ID:</strong> #${assignmentId}</p>
              <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
              
              <div style="background-color: #fef2f2; padding: 16px; border-radius: 8px; border-left: 4px solid #dc2626; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #dc2626;">Student Details</h3>
                <p><strong>Name:</strong> ${studentName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
              </div>
              
              <div style="background-color: #f0f9ff; padding: 16px; border-radius: 8px; border-left: 4px solid #0369a1; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #0369a1;">Assignment Details</h3>
                <p><strong>Type:</strong> ${assignmentType}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Deadline:</strong> ${new Date(deadline).toLocaleString()}</p>
                <p><strong>Pages:</strong> ${pages}</p>
                <p><strong>Urgency:</strong> ${urgency || 'Medium'}</p>
                <p><strong>Budget:</strong> $${budget}</p>
                <p><strong>Description:</strong> ${description}</p>
              </div>
              
              <div style="background-color: #f3f4f6; padding: 12px; border-radius: 6px; margin: 20px 0;">
                <p><strong>Files Uploaded:</strong> ${req.files ? req.files.length : 0} file(s)</p>
                ${req.files && req.files.length > 0 ? 
                  '<ul>' + req.files.map(file => `<li>${file.originalname} (${(file.size/1024/1024).toFixed(2)} MB)</li>`).join('') + '</ul>' : 
                  '<p>No files attached</p>'
                }
              </div>
              
              <div style="text-align: center; margin: 25px 0;">
                <a href="http://localhost:3000/admin/assignments/${assignmentId}" 
                   style="background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                  View Assignment in Admin Panel
                </a>
              </div>
              
              <p style="color: #6b7280; font-size: 14px; text-align: center;">
                This is an automated notification from your ProEssayWorks application.
              </p>
            </div>
            
            <div style="background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
              <p>© ${new Date().getFullYear()} ProEssayWorks. All rights reserved.</p>
            </div>
          </div>
        `
      };

      await transporter.sendMail(adminMailOptions);
      console.log(`Notification email sent to admin: raphaelsarota@gmail.com`);
    } catch (adminEmailError) {
      console.error('Error sending notification email to admin:', adminEmailError);
      // Log but don't fail the request
    }
    
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
app.get('/api/assignments', async (req, res) => {
  try {
    const [assignments] = await db.query('SELECT * FROM assignments ORDER BY created_at DESC');
    
    // For each assignment, get files
    for (const assignment of assignments) {
      const [files] = await db.query(
        'SELECT id, filename, mimetype, size FROM assignment_files WHERE assignment_id = ?',
        [assignment.id]
      );
      assignment.files = files;
    }
    
    res.json({ success: true, assignments });
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// GET a single assignment
app.get('/api/assignments/:id', async (req, res) => {
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
    
    assignment[0].files = files;
    res.json({ success: true, assignment: assignment[0] });
  } catch (error) {
    console.error('Error fetching assignment:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// GET file download
app.get('/api/assignments/:assignmentId/files/:fileId', async (req, res) => {
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

// PUT endpoint to update assignment status
app.put('/api/assignments/:id/status', async (req, res) => {
  const { status } = req.body;
  
  if (!status) {
    return res.status(400).json({
      success: false,
      error: 'Status is required'
    });
  }
  
  try {
    const [result] = await db.query(
      'UPDATE assignments SET status = ? WHERE id = ?',
      [status, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Assignment not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Assignment status updated successfully'
    });
  } catch (error) {
    console.error('Error updating assignment status:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// DELETE assignment
app.delete('/api/assignments/:id', async (req, res) => {
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

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`CORS enabled for: http://localhost:3000`);
  console.log(`Email notifications from: admin@proessayworks.com`);
  console.log(`Admin notifications to: raphaelsarota@gmail.com`);
  console.log(`Test email endpoint: http://localhost:${PORT}/api/test-email`);
});