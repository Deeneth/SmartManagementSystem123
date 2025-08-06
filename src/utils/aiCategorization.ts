import { ComplaintCategory, Priority, Department } from '../types/complaint';

// AI-powered complaint categorization (simulated with keyword matching)
export function categorizeComplaint(title: string, description: string): {
  category: ComplaintCategory;
  department: Department;
  priority: Priority;
} {
  const text = (title + ' ' + description).toLowerCase();
  
  // Category and department mapping
  const categories = {
    water_sanitation: {
      keywords: ['water', 'toilet', 'bathroom', 'washroom', 'drainage', 'plumbing', 'leak', 'flush', 'tap', 'pipe', 'sewage', 'hygiene', 'cleaning'],
      department: 'Water & Sanitation' as Department
    },
    food_canteen: {
      keywords: ['food', 'canteen', 'mess', 'cafeteria', 'meal', 'lunch', 'dinner', 'breakfast', 'quality', 'taste', 'hygiene', 'cooking'],
      department: 'Food & Canteen Services' as Department
    },
    infrastructure: {
      keywords: ['building', 'classroom', 'ceiling', 'wall', 'door', 'window', 'furniture', 'chair', 'table', 'fan', 'light', 'electricity', 'ac', 'projector'],
      department: 'Infrastructure & Maintenance' as Department
    },
    academic: {
      keywords: ['teacher', 'professor', 'class', 'exam', 'grade', 'syllabus', 'timetable', 'assignment', 'lecture', 'course', 'subject', 'marks'],
      department: 'Academic Affairs' as Department
    },
    hostel: {
      keywords: ['hostel', 'room', 'bed', 'roommate', 'warden', 'mess', 'laundry', 'wifi', 'internet', 'accommodation', 'dormitory'],
      department: 'Hostel Administration' as Department
    }
  };

  // Find best matching category
  let bestMatch: ComplaintCategory = 'infrastructure';
  let maxScore = 0;

  for (const [category, data] of Object.entries(categories)) {
    const score = data.keywords.reduce((acc, keyword) => {
      return acc + (text.includes(keyword) ? 1 : 0);
    }, 0);
    
    if (score > maxScore) {
      maxScore = score;
      bestMatch = category as ComplaintCategory;
    }
  }

  // Determine priority based on urgency keywords
  const urgentKeywords = ['urgent', 'emergency', 'broken', 'not working', 'immediate', 'asap'];
  const highKeywords = ['important', 'serious', 'problem', 'issue', 'complaint'];
  const mediumKeywords = ['request', 'improvement', 'suggestion'];

  let priority: Priority = 'low';
  
  if (urgentKeywords.some(keyword => text.includes(keyword))) {
    priority = 'urgent';
  } else if (highKeywords.some(keyword => text.includes(keyword))) {
    priority = 'high';
  } else if (mediumKeywords.some(keyword => text.includes(keyword))) {
    priority = 'medium';
  }

  return {
    category: bestMatch,
    department: categories[bestMatch].department,
    priority
  };
}

export function generateComplaintId(): string {
  return 'CMP' + Date.now().toString(36).toUpperCase();
}