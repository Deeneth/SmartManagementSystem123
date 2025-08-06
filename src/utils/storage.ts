import { Complaint, User } from '../types/complaint';

const COMPLAINTS_KEY = 'college_complaints';
const USERS_KEY = 'college_users';
const CURRENT_USER_KEY = 'current_user';

export function saveComplaints(complaints: Complaint[]): void {
  localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(complaints));
}

export function getComplaints(): Complaint[] {
  const stored = localStorage.getItem(COMPLAINTS_KEY);
  if (!stored) return [];
  
  return JSON.parse(stored).map((complaint: any) => ({
    ...complaint,
    submittedAt: new Date(complaint.submittedAt),
    resolvedAt: complaint.resolvedAt ? new Date(complaint.resolvedAt) : undefined
  }));
}

export function saveUsers(users: User[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getUsers(): User[] {
  const stored = localStorage.getItem(USERS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveCurrentUser(user: User): void {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export function getCurrentUser(): User | null {
  const stored = localStorage.getItem(CURRENT_USER_KEY);
  return stored ? JSON.parse(stored) : null;
}

export function clearCurrentUser(): void {
  localStorage.removeItem(CURRENT_USER_KEY);
}

// Initialize default admin user
export function initializeDefaultUsers(): void {
  const users = getUsers();
  if (users.length === 0) {
    const superAdmin: User = {
      id: 'superadmin',
      name: 'Super Administrator',
      email: 'superadmin@college.edu',
      role: 'admin',
      department: 'Infrastructure & Maintenance'
    };
    
    saveUsers([superAdmin]);
  }
}