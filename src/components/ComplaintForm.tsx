import React, { useState } from 'react';
import { User, Complaint } from '../types/complaint';
import { categorizeComplaint, generateComplaintId } from '../utils/aiCategorization';
import { getComplaints, saveComplaints } from '../utils/storage';
import { X, Send, Zap } from 'lucide-react';

interface ComplaintFormProps {
  user: User;
  onClose: () => void;
  onSubmit: () => void;
}

export default function ComplaintForm({ user, onClose, onSubmit }: ComplaintFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiPreview, setAiPreview] = useState<{
    category: string;
    department: string;
    priority: string;
  } | null>(null);

  const handlePreview = () => {
    if (formData.title && formData.description) {
      const result = categorizeComplaint(formData.title, formData.description);
      setAiPreview({
        category: result.category.replace('_', ' ').toUpperCase(),
        department: result.department,
        priority: result.priority.toUpperCase()
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const aiResult = categorizeComplaint(formData.title, formData.description);
      
      const newComplaint: Complaint = {
        id: generateComplaintId(),
        title: formData.title,
        description: formData.description,
        category: aiResult.category,
        priority: aiResult.priority,
        status: 'pending',
        studentName: user.name,
        studentEmail: user.email,
        studentId: user.studentId || '',
        department: aiResult.department,
        submittedAt: new Date()
      };

      const existingComplaints = getComplaints();
      const updatedComplaints = [...existingComplaints, newComplaint];
      saveComplaints(updatedComplaints);

      onSubmit();
    } catch (error) {
      console.error('Error submitting complaint:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-900">Submit New Complaint</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Complaint Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Brief title describing your complaint"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Detailed Description
            </label>
            <textarea
              required
              rows={6}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              placeholder="Provide detailed information about your complaint, including when it occurred, what happened, and any other relevant details..."
            />
          </div>

          {/* AI Preview Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handlePreview}
              disabled={!formData.title || !formData.description}
              className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap size={16} />
              Preview AI Categorization
            </button>
          </div>

          {/* AI Preview Results */}
          {aiPreview && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Zap className="text-purple-600" size={16} />
                AI Analysis Results
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Category</p>
                  <p className="text-sm font-medium text-gray-900">{aiPreview.category}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Department</p>
                  <p className="text-sm font-medium text-gray-900">{aiPreview.department}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Priority</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    aiPreview.priority === 'URGENT' ? 'bg-red-100 text-red-800' :
                    aiPreview.priority === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                    aiPreview.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {aiPreview.priority}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Submit Complaint
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}