"use client";

import { useState, useEffect } from 'react';
import { Eye, EyeOff, Calendar, User, Mail, Phone, FileText, Clock, Filter, LogOut, Trash2, Edit3, ArrowLeft, Download } from 'lucide-react';
import { API_BASE } from '../lib/apiConfig';
import Head from 'next/head';

const AdminDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [stats, setStats] = useState({});
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [writerForm, setWriterForm] = useState({ name: '', email: '' });
  const [isFullView, setIsFullView] = useState(false);
  const [showWriterForm, setShowWriterForm] = useState(false);

  // Recalculate stats from assignments
  const recalcStats = (assignmentsArray) => {
    return {
      totalAssignments: assignmentsArray.length,
      newAssignments: assignmentsArray.filter(a => a.status === 'New').length,
      inProgressAssignments: assignmentsArray.filter(a => a.status === 'In Progress').length,
      completedAssignments: assignmentsArray.filter(a => a.status === 'Completed').length
    };
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
      fetchAssignments();
    }
  }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`${API_BASE}/api/assignments`);
      if (response.ok) {
        const data = await response.json();
        const assignmentsArray = data.success ? data.assignments : [];
        const assignmentsWithStatus = assignmentsArray.map(assignment => ({
          ...assignment,
          status: assignment.status || 'New'
        }));
        setAssignments(assignmentsWithStatus);
        setStats(recalcStats(assignmentsWithStatus));
      } else {
        const errorText = await response.text();
        setError(`Server error: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      setError('Network error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginForm.username === 'admin254' && loginForm.password === 'password') {
      localStorage.setItem('adminToken', 'dummy-token-for-admin254');
      setIsLoggedIn(true);
      setError('');
      fetchAssignments();
      return;
    }
    setError('Invalid credentials');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setAssignments([]);
    setStats({});
    setSelectedAssignment(null);
  };

  const updateAssignmentStatus = async (id, status) => {
    try {
      const updatedAssignments = assignments.map(assignment => 
        assignment.id === id ? { ...assignment, status } : assignment
      );
      setAssignments(updatedAssignments);
      setStats(recalcStats(updatedAssignments));
      if (selectedAssignment && selectedAssignment.id === id) {
        setSelectedAssignment({ ...selectedAssignment, status });
      }
    } catch (error) {
      setError('Failed to update status: ' + error.message);
    }
  };

  const deleteAssignment = async (id) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      try {
        const response = await fetch(`${API_BASE}/api/assignments/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          const updatedAssignments = assignments.filter(assignment => assignment.id !== id);
          setAssignments(updatedAssignments);
          setStats(recalcStats(updatedAssignments));
          if (selectedAssignment && selectedAssignment.id === id) {
            setSelectedAssignment(null);
          }
        } else {
          setError('Failed to delete assignment');
        }
      } catch (error) {
        setError('Failed to delete assignment: ' + error.message);
      }
    }
  };

  const assignWriter = async () => {
    if (!writerForm.name || !writerForm.email) {
      setError('Please fill all writer details');
      return;
    }
    try {
      const updatedAssignment = {
        ...selectedAssignment,
        writer: {
          name: writerForm.name,
          email: writerForm.email,
          assignedAt: new Date().toISOString()
        }
      };
      const updatedAssignments = assignments.map(a => 
        a.id === selectedAssignment.id ? updatedAssignment : a
      );
      setAssignments(updatedAssignments);
      setSelectedAssignment(updatedAssignment);
      setShowWriterForm(false);
      setWriterForm({ name: '', email: '' });
      await fetch(`${API_BASE}/api/assignments/${selectedAssignment.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAssignment)
      });
    } catch (error) {
      setError('Failed to assign writer: ' + error.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'bg-indigo-100 text-indigo-800';
      case 'In Progress': return 'bg-yellow-100 text-black text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setIsFullView(true);
  };

  const handleBackToList = () => {
    setIsFullView(false);
    setSelectedAssignment(null);
  };

  // Modern Login Card
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-indigo-300 to-indigo-200 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-indigo-800 mb-2 text-center">Admin Login</h2>
          <p className="text-center text-gray-600 mb-6">Sign in to access your dashboard</p>
          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label htmlFor="username" className="block text-indigo-700 mb-1 font-medium">Username</label>
              <input
                type="text"
                id="username"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black placeholder:text-gray-500 bg-indigo-50"
                required
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-indigo-700 mb-1 font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black placeholder:text-gray-500 bg-indigo-50"
                  required
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-indigo-600 hover:text-indigo-800"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 shadow"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <meta name="keywords" content="order essay, capstone project writing service, case study writing service, plagiarism checker, assignment management, admin dashboard" />
      </Head>
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FileText className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Assignments</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.totalAssignments || 0}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-indigo-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">New Assignments</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.newAssignments || 0}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Edit3 className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">In Progress</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.inProgressAssignments || 0}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Calendar className="h-6 w-6 text-green-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Completed</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.completedAssignments || 0}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full view for assignment details */}
        {isFullView && selectedAssignment ? (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <button 
                onClick={handleBackToList}
                className="flex items-center mb-4 text-indigo-600 hover:text-indigo-800"
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to list
              </button>
              
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Assignment Details
                </h2>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedAssignment.status)}`}>
                  {selectedAssignment.status}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Student Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-gray-700">{selectedAssignment.student_name || 'N/A'}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-gray-700">{selectedAssignment.email || 'N/A'}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-gray-700">{selectedAssignment.phone || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Assignment Details</h3>
                    <div className="space-y-2 text-gray-700">
                      <p><span className="font-medium">Type:</span> {selectedAssignment.assignment_type || 'N/A'}</p>
                      <p><span className="font-medium">Subject:</span> {selectedAssignment.subject || 'N/A'}</p>
                      <p><span className="font-medium">Pages:</span> {selectedAssignment.pages || 'N/A'}</p>
                      <p><span className="font-medium">Deadline:</span> {formatDate(selectedAssignment.deadline)}</p>
                      <p><span className="font-medium">Budget:</span> ${selectedAssignment.budget || '0.00'}</p>
                      <p><span className="font-medium">Urgency:</span> 
                        <span className={`ml-2 px-2 py-1 rounded text-xs ${getUrgencyColor(selectedAssignment.urgency)}`}>
                          {selectedAssignment.urgency || 'N/A'}
                        </span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-700">{selectedAssignment.description || 'No description provided'}</p>
                  </div>
                  
                  {selectedAssignment.files && selectedAssignment.files.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Attached Files</h3>
                      <ul className="space-y-2">
                        {selectedAssignment.files.map((file, index) => (
                          <li key={file.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-md border border-gray-200">
                            <div className="flex items-center truncate">
                              <FileText className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                              <span className="text-sm truncate max-w-xs">{file.filename}</span>
                            </div>
                            <a 
                              href={`${API_BASE}/api/assignments/${selectedAssignment.id}/files/${file.id}`}
                              download={file.filename}
                              className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm whitespace-nowrap"
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Assignment Status</h3>
                    <div className="flex flex-wrap gap-2">
                      <select
                        value={selectedAssignment.status}
                        onChange={(e) => updateAssignmentStatus(selectedAssignment.id, e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm text-sm py-2 text-black"
                      >
                        <option value="New">New</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                      
                      <div className="flex w-full gap-2 mt-2">
                        <button
                          onClick={() => updateAssignmentStatus(selectedAssignment.id, 'In Progress')}
                          className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded-md text-sm hover:bg-indigo-700"
                        >
                          Start Work
                        </button>
                        <button
                          onClick={() => updateAssignmentStatus(selectedAssignment.id, 'Completed')}
                          className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md text-sm hover:bg-green-700"
                        >
                          Complete
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {selectedAssignment.writer ? (
                    <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Assigned Writer</h3>
                      <div className="space-y-2">
                        <p className="text-gray-700">
                          <span className="font-medium">Name:</span> {selectedAssignment.writer.name}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">Email:</span> {selectedAssignment.writer.email}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">Assigned:</span> {formatDate(selectedAssignment.writer.assignedAt)}
                        </p>
                      </div>
                      <button
                        onClick={() => setShowWriterForm(true)}
                        className="mt-3 text-indigo-600 hover:text-indigo-800 text-sm"
                      >
                        Reassign to different writer
                      </button>
                    </div>
                  ) : (
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Assign to Writer</h3>
                      <button
                        onClick={() => setShowWriterForm(true)}
                        className="w-full bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-200 text-sm"
                      >
                        + Assign Writer
                      </button>
                    </div>
                  )}
                  
                  {showWriterForm && (
                    <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {selectedAssignment.writer ? 'Reassign Writer' : 'Assign Writer'}
                      </h3>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Writer Name</label>
                          <input
                            type="text"
                            value={writerForm.name}
                            onChange={(e) => setWriterForm({...writerForm, name: e.target.value})}
                            className="w-full border-gray-300 rounded-md shadow-sm text-sm py-2 px-3"
                            placeholder="Enter writer's name"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Writer Email</label>
                          <input
                            type="email"
                            value={writerForm.email}
                            onChange={(e) => setWriterForm({...writerForm, email: e.target.value})}
                            className="w-full border-gray-300 rounded-md shadow-sm text-sm py-2 px-3"
                            placeholder="Enter writer's email"
                          />
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={assignWriter}
                            className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded-md text-sm hover:bg-indigo-700"
                          >
                            Assign
                          </button>
                          <button
                            onClick={() => setShowWriterForm(false)}
                            className="flex-1 bg-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm hover:bg-gray-400"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <button
                      onClick={() => deleteAssignment(selectedAssignment.id)}
                      className="w-full bg-red-100 text-red-700 px-4 py-2 rounded-md hover:bg-red-200 text-sm flex items-center justify-center"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete Assignment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Assignment List */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Assignments</h3>
                    <div className="flex items-center space-x-2">
                      <Filter className="h-4 w-4 text-gray-400" />
                      <select
                        value={filter}
                        onChange={(e) => {
                          setFilter(e.target.value);
                          fetchAssignments();
                        }}
                        className="border-gray-300 rounded-md text-sm text-black"
                      >
                        <option value="">All Status</option>
                        <option value="New">New</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {loading && (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    </div>
                  )}

                  {error && (
                    <div className="text-red-600 text-center py-4">{error}</div>
                  )}

                  {assignments.length === 0 && !loading && (
                    <div className="text-center py-8 text-gray-500">
                      No assignments found. {error ? '' : 'Submit an assignment through the form first.'}
                    </div>
                  )}

                  <div className="space-y-3">
                    {assignments.map((assignment) => (
                      <div
                        key={assignment.id}
                        className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleViewAssignment(assignment)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="text-sm font-medium text-gray-900">{assignment.student_name}</h4>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                                {assignment.status}
                              </span>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getUrgencyColor(assignment.urgency)}`}>
                                {assignment.urgency}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{assignment.subject} - {assignment.assignment_type}</p>
                            <p className="text-xs text-gray-500">{formatDate(assignment.created_at)}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewAssignment(assignment);
                              }}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteAssignment(assignment.id);
                              }}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Assignment Details (Sidebar) */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Assignment Details</h3>
                  
                  {selectedAssignment ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                          value={selectedAssignment.status}
                          onChange={(e) => updateAssignmentStatus(selectedAssignment.id, e.target.value)}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-sm text-black"
                        >
                          <option value="New">New</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Student Information</label>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center text-sm">
                            <User className="h-4 w-4 text-gray-400 mr-2" />
                            {selectedAssignment.student_name}
                          </div>
                          <div className="flex items-center text-sm">
                            <Mail className="h-4 w-4 text-gray-400 mr-2" />
                            {selectedAssignment.email}
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-4 w-4 text-gray-400 mr-2" />
                            {selectedAssignment.phone}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Assignment Details</label>
                        <div className="mt-2 space-y-2 text-sm">
                          <p><span className="font-medium">Type:</span> {selectedAssignment.assignment_type}</p>
                          <p><span className="font-medium">Subject:</span> {selectedAssignment.subject}</p>
                          <p><span className="font-medium">Pages:</span> {selectedAssignment.pages}</p>
                          <p><span className="font-medium">Deadline:</span> {formatDate(selectedAssignment.deadline)}</p>
                          <p><span className="font-medium">Budget:</span> ${selectedAssignment.budget}</p>
                        </div>
                      </div>

                      {selectedAssignment.files && selectedAssignment.files.length > 0 && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Files</label>
                          <div className="mt-2 space-y-2">
                            {selectedAssignment.files.map(file => (
                              <div key={file.id} className="flex items-center justify-between text-sm">
                                <span className="truncate max-w-xs">{file.filename}</span>
                                <a 
                                  href={`${API_BASE}/api/assignments/${selectedAssignment.id}/files/${file.id}`}
                                  download={file.filename}
                                  className="text-indigo-600 hover:text-indigo-800 flex items-center"
                                >
                                  <Download className="h-4 w-4 mr-1" />
                                  Download
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewAssignment(selectedAssignment)}
                          className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded-md text-sm hover:bg-indigo-700"
                        >
                          View Full Details
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">Select an assignment to view details</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;