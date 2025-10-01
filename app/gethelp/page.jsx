"use client";

import { 
  User, Mail, Phone, BookOpen, Calendar, FileText, 
  DollarSign, AlertCircle, CheckCircle, Paperclip, X
} from 'lucide-react';
import { API_BASE } from '../lib/apiConfig';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';

const StudentAssignmentForm = () => {
  // Service pricing configuration
  const servicePricing = {
    'Writing': 8.50,
    'Proofreading': 2.00,
    'Editing': 4.50,
    'Rewriting': 6.60,
    // Map other assignment types to these services
    'Essay': 'Writing',
    'Research Paper': 'Writing',
    'Dissertation': 'Writing',
    'Thesis': 'Writing',
    'Case Study': 'Writing',
    'Lab Report': 'Writing',
    'Term Paper': 'Writing',
    'Book Review': 'Writing',
    'Literature Review': 'Writing',
    'Coursework': 'Writing',
    'Assignment': 'Writing',
    'Other': 'Writing'
  };

  // Complex subjects that add $2 per page
  const complexSubjects = [
    'Engineering', 'Computer Science', 'Mathematics', 'Physics', 
    'Chemistry', 'Biology', 'Medicine', 'Law', 'Finance'
  ];

  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    phone: '',
    assignmentType: '',
    subject: '',
    deadline: '',
    pages: '',
    description: '',
    urgency: 'Medium',
    budget: '0.00'
  });
  
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const fileInputRef = useRef(null);

  const assignmentTypes = [
    'Writing',
    'Proofreading',
    'Editing',
    'Rewriting',
    'Essay',
    'Research Paper',
    'Dissertation',
    'Thesis',
    'Case Study',
    'Lab Report',
    'Term Paper',
    'Book Review',
    'Literature Review',
    'Coursework',
    'Assignment',
    'Other'
  ];

  const subjects = [
    'English Literature',
    'Psychology',
    'Business Studies',
    'History',
    'Political Science',
    'Sociology',
    'Economics',
    'Law',
    'Medicine',
    'Nursing',
    'Engineering',
    'Computer Science',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Philosophy',
    'Education',
    'Marketing',
    'Finance',
    'Other'
  ];

  // Calculate budget whenever relevant fields change
  useEffect(() => {
    calculateBudget();
  }, [
    formData.assignmentType, 
    formData.subject, 
    formData.pages, 
    formData.urgency,
    discountApplied
  ]);

  const calculateBudget = () => {
    if (!formData.assignmentType || !formData.pages) {
      setFormData(prev => ({ ...prev, budget: '0.00' }));
      return;
    }

    // Get base price
    let basePrice = servicePricing[formData.assignmentType];
    
    // Handle mapped assignment types (e.g. Essay -> Writing)
    if (typeof basePrice === 'string') {
      basePrice = servicePricing[basePrice];
    }

    // Apply subject complexity surcharge
    const complexitySurcharge = complexSubjects.includes(formData.subject) ? 2 : 0;
    
    // Apply urgency pricing
    const urgencyPricing = {
      'Low': -1,
      'Medium': 0.5,
      'High': 1.5
    };

    // Calculate per-page price
    const perPagePrice = basePrice + complexitySurcharge + urgencyPricing[formData.urgency];
    
    // Calculate total before discount
    let total = perPagePrice * parseInt(formData.pages || 0);
    
    // Apply discount if applicable
    if (discountApplied) {
      total = total * 0.985; // 1.5% discount
    }

    // Update budget in form data
    setFormData(prev => ({
      ...prev,
      budget: total.toFixed(2)
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const validFiles = newFiles.filter(file => file.size <= 10 * 1024 * 1024); // 10MB limit
    
    if (validFiles.length !== newFiles.length) {
      setError('Some files exceeded 10MB limit and were not added');
    }
    
    // Combine existing files with new ones, limit to 5 files total
    setFiles(prev => [...prev, ...validFiles].slice(0, 5));
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      handleFileChange({ target: { files: e.dataTransfer.files } });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formPayload = new FormData();
      
      // Append form data
      Object.entries(formData).forEach(([key, value]) => {
        formPayload.append(key, value);
      });
      
      // Append files
      files.forEach(file => {
        formPayload.append('files', file);
      });

      const response = await fetch(`${API_BASE}/api/assignments`, {
        method: 'POST',
        body: formPayload
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess(true);
        // Reset form
        setFormData({
          studentName: '',
          email: '',
          phone: '',
          assignmentType: '',
          subject: '',
          deadline: '',
          pages: '',
          description: '',
          urgency: 'Medium',
          budget: '0.00'
        });
        setFiles([]);
        setDiscountApplied(false);
      } else {
        setError(result.error || result.message || 'Failed to submit assignment');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      alert("Failed to submit assignment. Please message us direct.")
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'High': return 'border-red-300 bg-red-50';
      case 'Medium': return 'border-yellow-300 bg-yellow-50';
      case 'Low': return 'border-green-300 bg-green-50';
      default: return 'border-gray-300 bg-white';
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Assignment Submitted Successfully!</h3>
          <p className="text-sm text-gray-600 mb-6">
            Thank you for your submission. We've sent a confirmation email to your email. 
            A writer will be assigned to your task within the next 1 minute.
          </p>
          
          <button
            onClick={() => {
              setSuccess(false);
            }}
            className="w-full mt-4 bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
          >
            Submit Another Assignment
          </button>
          
          <Link 
            href="/" 
            className="mt-4 inline-block w-full text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <meta name="keywords" content="do my assignment, coursework help, urgent homework, essay writers, assignment support, write essays for money" />
      </Head>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 relative">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Assignment Help</h1>
          <p className="text-lg text-gray-600">Get professional help with your academic assignments</p>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-8">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-indigo-600" />
                Personal Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black placeholder:text-gray-500"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black placeholder:text-gray-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black placeholder:text-gray-500"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Assignment Details */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
                Assignment Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Type *</label>
                  <select
                    name="assignmentType"
                    value={formData.assignmentType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black placeholder:text-gray-500"
                  >
                    <option value="">Select assignment type</option>
                    {assignmentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black placeholder:text-gray-500"
                  >
                    <option value="">Select subject</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Deadline *</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="datetime-local"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black placeholder:text-gray-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Pages *</label>
                  <input
                    type="number"
                    name="pages"
                    value={formData.pages}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black placeholder:text-gray-500"
                    placeholder="e.g., 5"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Low', 'Medium', 'High'].map(level => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, urgency: level }))}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          formData.urgency === level
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget (USD)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      readOnly
                      className="w-full pl-10 pr-24 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 text-black placeholder:text-gray-500"
                    />
                    <button
                      type="button"
                      onClick={() => setDiscountApplied(!discountApplied)}
                      className={`absolute right-2 top-2 px-3 py-1 text-xs rounded ${
                        discountApplied 
                          ? 'bg-green-100 text-green-800 border border-green-300'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                    >
                      {discountApplied ? 'Discount Applied' : 'Apply Discount'}
                    </button>
                  </div>
                  {discountApplied && (
                    <p className="text-xs text-green-600 mt-1">1.5% discount applied!</p>
                  )}
                </div>
              </div>
            </div>

            {/* Assignment Description */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-indigo-600" />
                Assignment Description
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Instructions *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black placeholder:text-gray-500"
                  placeholder="Please provide detailed instructions for your assignment including any specific requirements, formatting guidelines, sources to be used, etc."
                />
              </div>

              {/* File Upload Section */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attach Files (Optional)
                </label>
                
                <div 
                  className="flex items-center justify-center w-full"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <label 
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-gray-300 hover:border-indigo-400 bg-gray-50 transition-colors"
                    onClick={triggerFileInput}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Paperclip className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, DOC, DOCX, PPT, TXT, JPG, PNG (Max: 5 files, 10MB each)
                      </p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      ref={fileInputRef}
                      multiple
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.jpg,.jpeg,.png"
                    />
                  </label>
                </div>
                
                {files.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Selected files:</p>
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 rounded-md px-4 py-2">
                          <div className="flex items-center max-w-[85%]">
                            <Paperclip className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700 truncate">{file.name}</span>
                            <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Urgency Indicator */}
            <div className={`mt-6 p-4 rounded-lg border-2 ${getUrgencyColor(formData.urgency)}`}>
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                <span className="font-medium text-gray-700">Urgency Level: {formData.urgency}</span>
              </div>
              <p className="text-sm mt-1 text-gray-500">
                {formData.urgency === 'High' && 'Rush orders may incur additional charges.'}
                {formData.urgency === 'Medium' && 'Standard processing time applies.'}
                {formData.urgency === 'Low' && 'Extended deadline - may qualify for discounts.'}
              </p>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-full cursor-pointer font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  'Submit Assignment Request'
                )}
              </button>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                By submitting this form, you agree to our terms of service and privacy policy.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentAssignmentForm;