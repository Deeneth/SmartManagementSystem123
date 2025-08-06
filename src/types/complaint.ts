export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  priority: Priority;
  status: Status;
  studentName: string;
  studentEmail: string;
  studentId: string;
  department: Department;
  submittedAt: Date;
  resolvedAt?: Date;
  adminNotes?: string;
  assignedTo?: string;
}

export type ComplaintCategory = 
  | 'water_sanitation'
  | 'food_canteen'
  | 'infrastructure'
  | 'academic'
  | 'hostel';

export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export type Status = 'pending' | 'in_progress' | 'resolved' | 'rejected';

export type Department = 
  | 'Water & Sanitation'
  | 'Food & Canteen Services'
  | 'Infrastructure & Maintenance'
  | 'Academic Affairs'
  | 'Hostel Administration';

export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  studentId?: string;
  department?: Department;
}