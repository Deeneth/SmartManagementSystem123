import React from 'react';
import { GraduationCap, Users, Award, BookOpen, MapPin, Phone, Mail } from 'lucide-react';

interface HomepageProps {
  onLoginClick: () => void;
}

export default function Homepage({ onLoginClick }: HomepageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Hero Section with Background */}
      <div 
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1)), url('https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
        }}
      >
        {/* Navigation */}
        <nav className="relative z-10 bg-white/90 backdrop-blur-sm shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <img 
                  src="https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop"
                  alt="College Logo"
                  className="w-12 h-12 rounded-full object-cover border-2 border-purple-500"
                />
                <div>
                  <h1 className="text-xl font-bold text-gray-800 tracking-wide">
                    Smart College Management
                  </h1>
                  <p className="text-sm text-gray-600">Excellence in Education</p>
                </div>
              </div>
              
              <button
                onClick={onLoginClick}
                className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-2 rounded-full font-medium hover:from-purple-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Login
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-white/20">
              <div className="flex justify-center mb-8">
                <img 
                  src="https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop"
                  alt="College"
                  className="w-24 h-24 rounded-full object-cover border-4 border-purple-500 shadow-lg"
                />
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 tracking-wide">
                Smart College Management
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Empowering minds, shaping futures through innovative education and cutting-edge technology
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full">
                  <Award className="text-purple-600" size={20} />
                  <span className="text-purple-800 font-medium">Quality Education</span>
                </div>
                <div className="flex items-center gap-2 bg-pink-100 px-4 py-2 rounded-full">
                  <BookOpen className="text-pink-600" size={20} />
                  <span className="text-pink-800 font-medium">Modern Curriculum</span>
                </div>
                <div className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full">
                  <Users className="text-orange-600" size={20} />
                  <span className="text-orange-800 font-medium">Student Focused</span>
                </div>
              </div>
              
              <button
                onClick={onLoginClick}
                className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Access Smart Complaint System
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">About Our Institution</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our college stands as a beacon of excellence in technical education, 
              fostering innovation, research, and holistic development of students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center border border-purple-100 hover:shadow-lg transition-shadow">
              <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Academic Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                Committed to providing world-class education with industry-relevant curriculum 
                and experienced faculty members.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl p-8 text-center border border-pink-100 hover:shadow-lg transition-shadow">
              <div className="bg-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Research & Innovation</h3>
              <p className="text-gray-600 leading-relaxed">
                Encouraging cutting-edge research and innovation through state-of-the-art 
                laboratories and research centers.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-purple-50 rounded-2xl p-8 text-center border border-orange-100 hover:shadow-lg transition-shadow">
              <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Student Development</h3>
              <p className="text-gray-600 leading-relaxed">
                Nurturing well-rounded individuals through comprehensive personality 
                development and skill enhancement programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Get In Touch</h2>
            <p className="text-xl text-gray-600">Connect with us for any queries or information</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-purple-100">
              <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Address</h3>
              <p className="text-gray-600">
                College Campus<br />
                City, State - 123456<br />
                Country
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-pink-100">
              <div className="bg-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Phone</h3>
              <p className="text-gray-600">
                +1 234 567 8900<br />
                +1 234 567 8901
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-orange-100">
              <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Email</h3>
              <p className="text-gray-600">
                info@college.edu<br />
                admissions@college.edu
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <img 
              src="https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
              alt="College"
              className="w-12 h-12 rounded-full object-cover border-2 border-purple-500"
            />
            <h3 className="text-2xl font-bold tracking-wide">Smart College Management</h3>
          </div>
          <p className="text-gray-400 mb-4">
            Empowering minds, shaping futures through innovative education and cutting-edge technology
          </p>
          <p className="text-gray-500 text-sm">
            © 2025 Smart College Management. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}