import React, { useState } from 'react';
import { Complaint, Status } from '../types/complaint';
import { 
  Calendar, 
  User, 
  Building, 
  AlertCircle, 
  Clock, 
  CheckCircle, 
  XCircle,
  MessageSquare,
  Edit3
} from 'lucide-react';

interface ComplaintCardProps {
  complaint: Complaint;
  isAdmin?: boolean;
  onStatusUpdate?: (id: string, status: Status, notes?: string) => void;
}

export default function ComplaintCard({ complaint, isAdmin = false, onStatusUpdate }: ComplaintCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showStatusUpdate, setShowStatusUpdate] = useState(false);
  const [adminNotes, setAdminNotes] = useState(complaint.adminNotes || '');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="text-orange-500" size={16} />;
      case 'in_progress': return <AlertCircle className="text-blue-500" size={16} />;
      case 'resolved': return <CheckCircle className="text-green-500" size={16} />;
      case 'rejected': return <XCircle className="text-red-500" size={16} />;
      default: return <Clock className="text-gray-500" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusUpdate = (newStatus: Status) => {
    if (onStatusUpdate) {
      onStatusUpdate(complaint.id, newStatus, adminNotes);
      setShowStatusUpdate(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{complaint.title}</h3>
              <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(complaint.priority)}`}>
                {complaint.priority.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-gray-600">ID: {complaint.id}</p>
          </div>
          
          <div className="flex items-center gap-2">
            {getStatusIcon(complaint.status)}
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(complaint.status)}`}>
              {complaint.status.replace('_', ' ').toUpperCase()}
            </span>
          </div>
        </div>

        {/* Meta Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <User size={16} />
            <span>{complaint.studentName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building size={16} />
            <span>{complaint.department}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{new Date(complaint.submittedAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Description Preview */}
        <div className="mb-4">
          <p className="text-gray-700 leading-relaxed">
            {isExpanded 
              ? complaint.description 
              : `${complaint.description.substring(0, 200)}${complaint.description.length > 200 ? '...' : ''}`
            }
          </p>
          {complaint.description.length > 200 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
            className="text-purple-600 hover:text-purple-800 text-sm font-medium mt-2"
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>

        {/* Admin Notes */}
        {complaint.adminNotes && (
          <div className="bg-purple-50 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare size={16} className="text-purple-600" />
              <span className="font-medium text-purple-900">Admin Notes</span>
            </div>
            <p className="text-purple-800 text-sm">{complaint.adminNotes}</p>
          </div>
        )}

        {/* Resolution Info */}
        {complaint.resolvedAt && (
          <div className="bg-green-50 rounded-lg p-4 mb-4">
            <p className="text-green-800 text-sm">
              <strong>Resolved on:</strong> {new Date(complaint.resolvedAt).toLocaleDateString()}
              {complaint.assignedTo && (
                <span className="ml-4">
                  <strong>By:</strong> {complaint.assignedTo}
                </span>
              )}
            </p>
          </div>
        )}

        {/* Admin Actions */}
        {isAdmin && (
          <div className="border-t pt-4">
            {!showStatusUpdate ? (
              <button
                onClick={() => setShowStatusUpdate(true)}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
              >
                <Edit3 size={16} />
                Update Status
              </button>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Notes
                  </label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    placeholder="Add notes about the complaint resolution..."
                  />
                </div>
                
                <div className="flex gap-2 flex-wrap">
                  {(['pending', 'in_progress', 'resolved', 'rejected'] as Status[]).map(status => (
                    <button
                      key={status}
                      onClick={() => handleStatusUpdate(status)}
                      className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                        complaint.status === status
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      disabled={complaint.status === status}
                    >
                      {status.replace('_', ' ').toUpperCase()}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setShowStatusUpdate(false)}
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}