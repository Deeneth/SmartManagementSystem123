import React, { useState } from 'react';
import { User, UserRole } from '../types/complaint';
import { getUsers, saveUsers, saveCurrentUser } from '../utils/storage';
import { LogIn, UserPlus, GraduationCap, X } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
  onClose: () => void;
}

export default function Login({ onLogin, onClose }: LoginProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    studentId: '',
    role: 'student' as UserRole,
    adminCode: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const users = getUsers();

    if (isLogin) {
      // Login logic
      const user = users.find(u => u.email === formData.email);
      if (user) {
        saveCurrentUser(user);
        onLogin(user);
      } else {
        alert('User not found. Please register first.');
      }
    } else {
      // Registration logic - only for students
      if (formData.role === 'admin') {
        // Check admin code
        if (formData.adminCode !== 'SECE_ADMIN_2025') {
          alert('Invalid admin access code. Please contact system administrator.');
          return;
        }
      }
      
      const newUser: User = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        studentId: formData.role === 'student' ? formData.studentId : undefined
      };

      const updatedUsers = [...users, newUser];
      saveUsers(updatedUsers);
      saveCurrentUser(newUser);
      onLogin(newUser);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>
        
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Smart Complaint Box</h1>
          <p className="text-gray-600 mt-2">College Management System</p>
        </div>

        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
              isLogin
                ? 'bg-white text-emerald-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
              !isLogin
                ? 'bg-white text-emerald-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Student Registration
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="student">Student</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              {formData.role === 'admin' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Admin Access Code
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.adminCode}
                    onChange={(e) => setFormData({ ...formData, adminCode: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter admin access code"
                  />
                  <p className="text-xs text-gray-500 mt-1">Contact system administrator for access code</p>
                </div>
              )}

              {formData.role === 'student' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student ID
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter your student ID"
                  />
                </div>
              )}
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-4 rounded-lg font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
            {isLogin ? 'Login' : 'Register as Student'}
          </button>
        </form>

        {isLogin && (
          <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
            <p className="text-sm text-emerald-800 font-medium mb-2">Demo Accounts:</p>
            <p className="text-xs text-emerald-600">Admin: admin@college.edu</p>
            <p className="text-xs text-emerald-600">Password: admin123</p>
            <p className="text-xs text-emerald-600 mt-2">Admin Code: SECE_ADMIN_2025</p>
          </div>
        )}
      </div>
    </div>
  );
}