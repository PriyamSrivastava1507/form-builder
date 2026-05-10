import type { FieldSchema } from '@/types/field'
import {
  Contact,
  CalendarDays,
  MessageSquare,
  Briefcase,
  Bug,
  CalendarClock,
  GraduationCap,
  BookOpenCheck,
  CalendarPlus,
  FileHeart,
  PackageMinus,
  Headset,
  type LucideIcon
} from 'lucide-react'

export type Template = {
  id: string
  name: string
  category: string
  icon: LucideIcon
  fields: FieldSchema[]
}

export const PREDEFINED_TEMPLATES: Template[] = [

  // ─── PERSONAL ────────────────────────────────────────────────

  {
    id: 'contact-info',
    name: 'Contact Information',
    category: 'Personal',
    icon: Contact,
    fields: [
      {
        id: 'ci-01', name: 'firstName', type: 'text', subtype: 'text',
        label: 'First Name', placeholder: 'Enter your first name',
        required: true, disabled: false, defaultValue: '',
        validations: { minLength: { value: 2, errorMessage: 'Must be at least 2 characters' }, maxLength: { value: 50, errorMessage: 'Must be at most 50 characters' }, pattern: { value: '', errorMessage: 'Pattern not matched' } }
      },
      {
        id: 'ci-02', name: 'lastName', type: 'text', subtype: 'text',
        label: 'Last Name', placeholder: 'Enter your last name',
        required: true, disabled: false, defaultValue: '',
        validations: { minLength: { value: 2, errorMessage: 'Must be at least 2 characters' }, maxLength: { value: 50, errorMessage: 'Must be at most 50 characters' }, pattern: { value: '', errorMessage: 'Pattern not matched' } }
      },
      {
        id: 'ci-03', name: 'email', type: 'text', subtype: 'email',
        label: 'Email Address', placeholder: 'you@example.com',
        required: true, disabled: false, defaultValue: '',
        validations: {}
      },
      {
        id: 'ci-04', name: 'phone', type: 'text', subtype: 'tel',
        label: 'Phone Number', placeholder: '+1 (555) 000-0000',
        required: false, disabled: false, defaultValue: '',
        validations: { minLength: { value: 7, errorMessage: 'Invalid phone number' }, maxLength: { value: 15, errorMessage: 'Invalid phone number' }, pattern: { value: '^[+]?[0-9\\s\\-()]+$', errorMessage: 'Invalid phone number format' } }
      },
      {
        id: 'ci-05', name: 'website', type: 'text', subtype: 'url',
        label: 'Website', placeholder: 'https://yourwebsite.com',
        required: false, disabled: false, defaultValue: '',
        validations: {}
      },
      {
        id: 'ci-06', name: 'address', type: 'textarea',
        label: 'Address', placeholder: 'Enter your full address',
        required: false, disabled: false, defaultValue: '',
        validations: { minLength: { value: null, errorMessage: 'Minimum length not met' }, maxLength: { value: 200, errorMessage: 'Must be at most 200 characters' } }
      },
    ]
  },

  {
    id: 'event-rsvp',
    name: 'Event RSVP',
    category: 'Personal',
    icon: CalendarDays,
    fields: [
      {
        id: 'rsvp-01', name: 'fullName', type: 'text', subtype: 'text',
        label: 'Full Name', placeholder: 'Your full name',
        required: true, disabled: false, defaultValue: '',
        validations: { minLength: { value: 2, errorMessage: 'Must be at least 2 characters' }, maxLength: { value: 100, errorMessage: 'Must be at most 100 characters' }, pattern: { value: '', errorMessage: 'Pattern not matched' } }
      },
      {
        id: 'rsvp-02', name: 'email', type: 'text', subtype: 'email',
        label: 'Email Address', placeholder: 'you@example.com',
        required: true, disabled: false, defaultValue: '',
        validations: {}
      },
      {
        id: 'rsvp-03', name: 'attendance', type: 'radioGroup',
        label: 'Will you attend?',
        required: true, disabled: false, defaultValue: '',
        options: [
          { id: 'rsvp-03-a', label: 'Yes, I will attend', value: 'yes', disabled: false },
          { id: 'rsvp-03-b', label: 'No, I cannot attend', value: 'no', disabled: false },
          { id: 'rsvp-03-c', label: 'Maybe', value: 'maybe', disabled: false },
        ],
        validations: {}
      },
      {
        id: 'rsvp-04', name: 'guestCount', type: 'text', subtype: 'number',
        label: 'Number of Guests', placeholder: '0',
        required: false, disabled: false, defaultValue: null,
        validations: { min: { value: 0, errorMessage: 'Cannot be negative' }, max: { value: 10, errorMessage: 'Maximum 10 guests' }, integer: { value: true, errorMessage: 'Must be a whole number' }, positive: { value: false, errorMessage: 'Must be positive' } }
      },
      {
        id: 'rsvp-05', name: 'dietaryRequirements', type: 'checkboxGroup',
        label: 'Dietary Requirements',
        required: false, disabled: false, defaultValue: [],
        options: [
          { id: 'rsvp-05-a', label: 'Vegetarian', value: 'vegetarian', disabled: false },
          { id: 'rsvp-05-b', label: 'Vegan', value: 'vegan', disabled: false },
          { id: 'rsvp-05-c', label: 'Gluten Free', value: 'gluten-free', disabled: false },
          { id: 'rsvp-05-d', label: 'Halal', value: 'halal', disabled: false },
          { id: 'rsvp-05-e', label: 'Kosher', value: 'kosher', disabled: false },
        ],
        validations: { minSelected: { value: null, errorMessage: 'Minimum selections not met' }, maxSelected: { value: null, errorMessage: 'Maximum selections not met' } }
      },
      {
        id: 'rsvp-06', name: 'message', type: 'textarea',
        label: 'Message for the Host', placeholder: 'Any message or special requests...',
        required: false, disabled: false, defaultValue: '',
        validations: { minLength: { value: null, errorMessage: 'Minimum length not met' }, maxLength: { value: 300, errorMessage: 'Must be at most 300 characters' } }
      },
    ]
  },

  {
    id: 'feedback-form',
    name: 'Feedback Form',
    category: 'Personal',
    icon: MessageSquare,
    fields: [
      {
        id: 'fb-01', name: 'name', type: 'text', subtype: 'text',
        label: 'Your Name', placeholder: 'Optional',
        required: false, disabled: false, defaultValue: '',
        validations: { minLength: { value: null, errorMessage: 'Minimum length not met' }, maxLength: { value: 100, errorMessage: 'Must be at most 100 characters' }, pattern: { value: '', errorMessage: 'Pattern not matched' } }
      },
      {
        id: 'fb-02', name: 'email', type: 'text', subtype: 'email',
        label: 'Email Address', placeholder: 'Optional — for follow-up',
        required: false, disabled: false, defaultValue: '',
        validations: {}
      },
      {
        id: 'fb-03', name: 'category', type: 'select',
        label: 'Feedback Category',
        required: true, disabled: false, defaultValue: [], multiselect: false, size: 4,
        options: [
          { id: 'fb-03-a', label: 'General', value: 'general', disabled: false },
          { id: 'fb-03-b', label: 'Product', value: 'product', disabled: false },
          { id: 'fb-03-c', label: 'Service', value: 'service', disabled: false },
          { id: 'fb-03-d', label: 'Support', value: 'support', disabled: false },
          { id: 'fb-03-e', label: 'Other', value: 'other', disabled: false },
        ],
        validations: {}
      },
      {
        id: 'fb-04', name: 'rating', type: 'range',
        label: 'Overall Rating',
        required: true, disabled: false, defaultValue: null,
        validations: { min: { value: 1, errorMessage: 'Minimum value not met' }, max: { value: 10, errorMessage: 'Maximum value exceeded' }, step: { value: 1, errorMessage: 'Step value not met' } }
      },
      {
        id: 'fb-05', name: 'feedback', type: 'textarea',
        label: 'Your Feedback', placeholder: 'Tell us what you think...',
        required: true, disabled: false, defaultValue: '',
        validations: { minLength: { value: 20, errorMessage: 'Please provide at least 20 characters' }, maxLength: { value: 1000, errorMessage: 'Must be at most 1000 characters' } }
      },
      {
        id: 'fb-06', name: 'recommend', type: 'radioGroup',
        label: 'Would you recommend us?',
        required: true, disabled: false, defaultValue: '',
        options: [
          { id: 'fb-06-a', label: 'Definitely', value: 'definitely', disabled: false },
          { id: 'fb-06-b', label: 'Probably', value: 'probably', disabled: false },
          { id: 'fb-06-c', label: 'Not sure', value: 'not-sure', disabled: false },
          { id: 'fb-06-d', label: 'Probably not', value: 'probably-not', disabled: false },
          { id: 'fb-06-e', label: 'Definitely not', value: 'definitely-not', disabled: false },
        ],
        validations: {}
      },
    ]
  },

  // ─── WORK ────────────────────────────────────────────────────

  {
    id: 'job-application',
    name: 'Job Application',
    category: 'Work',
    icon: Briefcase,
    fields: [
      {
        id: 'ja-01', name: 'fullName', type: 'text', subtype: 'text',
        label: 'Full Name', placeholder: 'Your full legal name',
        required: true, disabled: false, defaultValue: '',
        validations: { minLength: { value: 2, errorMessage: 'Must be at least 2 characters' }, maxLength: { value: 100, errorMessage: 'Must be at most 100 characters' }, pattern: { value: '', errorMessage: 'Pattern not matched' } }
      },
      {
        id: 'ja-02', name: 'email', type: 'text', subtype: 'email',
        label: 'Email Address', placeholder: 'your@email.com',
        required: true, disabled: false, defaultValue: '',
        validations: {}
      },
      {
        id: 'ja-03', name: 'phone', type: 'text', subtype: 'tel',
        label: 'Phone Number', placeholder: '+1 (555) 000-0000',
        required: true, disabled: false, defaultValue: '',
        validations: { minLength: { value: 7, errorMessage: 'Invalid phone number' }, maxLength: { value: 15, errorMessage: 'Invalid phone number' }, pattern: { value: '', errorMessage: 'Pattern not matched' } }
      },
      {
        id: 'ja-04', name: 'portfolio', type: 'text', subtype: 'url',
        label: 'Portfolio / LinkedIn', placeholder: 'https://',
        required: false, disabled: false, defaultValue: '',
        validations: {}
      },
      {
        id: 'ja-05', name: 'position', type: 'select',
        label: 'Position Applied For',
        required: true, disabled: false, defaultValue: [], multiselect: false, size: 4,
        options: [
          { id: 'ja-05-a', label: 'Frontend Developer', value: 'frontend', disabled: false },
          { id: 'ja-05-b', label: 'Backend Developer', value: 'backend', disabled: false },
          { id: 'ja-05-c', label: 'Full Stack Developer', value: 'fullstack', disabled: false },
          { id: 'ja-05-d', label: 'UI/UX Designer', value: 'design', disabled: false },
          { id: 'ja-05-e', label: 'Product Manager', value: 'pm', disabled: false },
          { id: 'ja-05-f', label: 'DevOps Engineer', value: 'devops', disabled: false },
        ],
        validations: {}
      },
      {
        id: 'ja-06', name: 'experience', type: 'radioGroup',
        label: 'Years of Experience',
        required: true, disabled: false, defaultValue: '',
        options: [
          { id: 'ja-06-a', label: 'Less than 1 year', value: '<1', disabled: false },
          { id: 'ja-06-b', label: '1 - 3 years', value: '1-3', disabled: false },
          { id: 'ja-06-c', label: '3 - 5 years', value: '3-5', disabled: false },
          { id: 'ja-06-d', label: '5 - 10 years', value: '5-10', disabled: false },
          { id: 'ja-06-e', label: '10+ years', value: '10+', disabled: false },
        ],
        validations: {}
      },
      {
        id: 'ja-07', name: 'skills', type: 'checkboxGroup',
        label: 'Key Skills',
        required: false, disabled: false, defaultValue: [],
        options: [
          { id: 'ja-07-a', label: 'React', value: 'react', disabled: false },
          { id: 'ja-07-b', label: 'TypeScript', value: 'typescript', disabled: false },
          { id: 'ja-07-c', label: 'Node.js', value: 'nodejs', disabled: false },
          { id: 'ja-07-d', label: 'Python', value: 'python', disabled: false },
          { id: 'ja-07-e', label: 'AWS', value: 'aws', disabled: false },
          { id: 'ja-07-f', label: 'Docker', value: 'docker', disabled: false },
        ],
        validations: { minSelected: { value: null, errorMessage: 'Minimum selections not met' }, maxSelected: { value: null, errorMessage: 'Maximum selections not met' } }
      },
      {
        id: 'ja-08', name: 'coverLetter', type: 'textarea',
        label: 'Cover Letter', placeholder: 'Tell us why you are a great fit...',
        required: true, disabled: false, defaultValue: '',
        validations: { minLength: { value: 100, errorMessage: 'Please write at least 100 characters' }, maxLength: { value: 2000, errorMessage: 'Must be at most 2000 characters' } }
      },
      {
        id: 'ja-09', name: 'resume', type: 'file',
        label: 'Resume / CV',
        required: true, disabled: false,
        validations: {
          minSize: { value: null, errorMessage: 'Minimum size not met' },
          maxSize: { value: 5242880, errorMessage: 'File must be under 5MB' },
          acceptMimeTypes: { value: ['application/pdf'], errorMessage: 'Only PDF files accepted' },
          acceptExtensions: { value: ['.pdf'], errorMessage: 'Only PDF files accepted' }
        }
      },
      {
        id: 'ja-10', name: 'agreeToTerms', type: 'checkbox',
        label: 'I confirm that the information provided is accurate',
        required: true, disabled: false, defaultValue: false,
        validations: {}
      },
    ]
  },

  {
    id: 'bug-report',
    name: 'Bug Report',
    category: 'Work',
    icon: Bug,
    fields: [
      {
        id: 'br-01', name: 'title', type: 'text', subtype: 'text',
        label: 'Bug Title', placeholder: 'Short descriptive title',
        required: true, disabled: false, defaultValue: '',
        validations: { minLength: { value: 5, errorMessage: 'Must be at least 5 characters' }, maxLength: { value: 100, errorMessage: 'Must be at most 100 characters' }, pattern: { value: '', errorMessage: 'Pattern not matched' } }
      },
      {
        id: 'br-02', name: 'severity', type: 'radioGroup',
        label: 'Severity',
        required: true, disabled: false, defaultValue: '',
        options: [
          { id: 'br-02-a', label: 'Critical', value: 'critical', disabled: false },
          { id: 'br-02-b', label: 'High', value: 'high', disabled: false },
          { id: 'br-02-c', label: 'Medium', value: 'medium', disabled: false },
          { id: 'br-02-d', label: 'Low', value: 'low', disabled: false },
        ],
        validations: {}
      },
      {
        id: 'br-03', name: 'environment', type: 'checkboxGroup',
        label: 'Environment',
        required: true, disabled: false, defaultValue: [],
        options: [
          { id: 'br-03-a', label: 'Production', value: 'production', disabled: false },
          { id: 'br-03-b', label: 'Staging', value: 'staging', disabled: false },
          { id: 'br-03-c', label: 'Development', value: 'development', disabled: false },
        ],
        validations: { minSelected: { value: 1, errorMessage: 'Select at least one environment' }, maxSelected: { value: null, errorMessage: 'Maximum selections not met' } }
      },
      {
        id: 'br-04', name: 'browser', type: 'select',
        label: 'Browser',
        required: false, disabled: false, defaultValue: [], multiselect: false, size: 4,
        options: [
          { id: 'br-04-a', label: 'Chrome', value: 'chrome', disabled: false },
          { id: 'br-04-b', label: 'Firefox', value: 'firefox', disabled: false },
          { id: 'br-04-c', label: 'Safari', value: 'safari', disabled: false },
          { id: 'br-04-d', label: 'Edge', value: 'edge', disabled: false },
          { id: 'br-04-e', label: 'Other', value: 'other', disabled: false },
        ],
        validations: {}
      },
      {
        id: 'br-05', name: 'steps', type: 'textarea',
        label: 'Steps to Reproduce', placeholder: '1. Go to...\n2. Click on...\n3. See error',
        required: true, disabled: false, defaultValue: '',
        validations: { minLength: { value: 20, errorMessage: 'Please provide detailed steps' }, maxLength: { value: 2000, errorMessage: 'Must be at most 2000 characters' } }
      },
      {
        id: 'br-06', name: 'expected', type: 'textarea',
        label: 'Expected Behaviour', placeholder: 'What should have happened?',
        required: true, disabled: false, defaultValue: '',
        validations: { minLength: { value: 10, errorMessage: 'Must be at least 10 characters' }, maxLength: { value: 500, errorMessage: 'Must be at most 500 characters' } }
      },
      {
        id: 'br-07', name: 'actual', type: 'textarea',
        label: 'Actual Behaviour', placeholder: 'What actually happened?',
        required: true, disabled: false, defaultValue: '',
        validations: { minLength: { value: 10, errorMessage: 'Must be at least 10 characters' }, maxLength: { value: 500, errorMessage: 'Must be at most 500 characters' } }
      },
      {
        id: 'br-08', name: 'screenshot', type: 'file',
        label: 'Screenshot (optional)',
        required: false, disabled: false,
        validations: {
          minSize: { value: null, errorMessage: 'Minimum size not met' },
          maxSize: { value: 10485760, errorMessage: 'File must be under 10MB' },
          acceptMimeTypes: { value: ['image/png', 'image/jpeg', 'image/webp'], errorMessage: 'Only image files accepted' },
          acceptExtensions: { value: ['.png', '.jpg', '.jpeg', '.webp'], errorMessage: 'Only image files accepted' }
        }
      },
    ]
  },

  {
    id: 'meeting-request',
    name: 'Meeting Request',
    category: 'Work',
    icon: CalendarClock,
    fields: [
      {
        id: 'mr-01', name: 'name', type: 'text', subtype: 'text',
        label: 'Your Name', placeholder: 'Full name',
        required: true, disabled: false, defaultValue: '',
        validations: { minLength: { value: 2, errorMessage: 'Must be at least 2 characters' }, maxLength: { value: 100, errorMessage: 'Must be at most 100 characters' }, pattern: { value: '', errorMessage: 'Pattern not matched' } }
      },
      {
        id: 'mr-02', name: 'email', type: 'text', subtype: 'email',
        label: 'Email Address', placeholder: 'your@email.com',
        required: true, disabled: false, defaultValue: '',
        validations: {}
      },
      {
        id: 'mr-03', name: 'meetingType', type: 'radioGroup',
        label: 'Meeting Type',
        required: true, disabled: false, defaultValue: '',
        options: [
          { id: 'mr-03-a', label: 'In Person', value: 'in-person', disabled: false },
          { id: 'mr-03-b', label: 'Video Call', value: 'video-call', disabled: false },
          { id: 'mr-03-c', label: 'Phone Call', value: 'phone-call', disabled: false },
        ],
        validations: {}
      },
      {
        id: 'mr-04', name: 'preferredDate', type: 'date',
        label: 'Preferred Date',
        required: true, disabled: false, defaultValue: '',
        validations: { minDate: { value: '', errorMessage: 'Date cannot be in the past' }, maxDate: { value: '', errorMessage: 'Date too far in future' } }
      },
      {
        id: 'mr-05', name: 'duration', type: 'select',
        label: 'Meeting Duration',
        required: true, disabled: false, defaultValue: [], multiselect: false, size: 4,
        options: [
          { id: 'mr-05-a', label: '15 minutes', value: '15', disabled: false },
          { id: 'mr-05-b', label: '30 minutes', value: '30', disabled: false },
          { id: 'mr-05-c', label: '45 minutes', value: '45', disabled: false },
          { id: 'mr-05-d', label: '1 hour', value: '60', disabled: false },
          { id: 'mr-05-e', label: '1.5 hours', value: '90', disabled: false },
          { id: 'mr-05-f', label: '2 hours', value: '120', disabled: false },
        ],
        validations: {}
      },
      {
        id: 'mr-06', name: 'agenda', type: 'textarea',
        label: 'Meeting Agenda', placeholder: 'What would you like to discuss?',
        required: true, disabled: false, defaultValue: '',
        validations: { minLength: { value: 20, errorMessage: 'Please provide at least 20 characters' }, maxLength: { value: 1000, errorMessage: 'Must be at most 1000 characters' } }
      },
    ]
  },

  // ─── EDUCATION ───────────────────────────────────────────────

  {
    id: 'course-registration',
    name: 'Course Registration',
    category: 'Education',
    icon: GraduationCap,
    fields: [
      {
        id: 'cr-01', name: 'studentName', type: 'text', subtype: 'text',
        label: 'Student Name', placeholder: 'Full name',
        required: true, disabled: false, defaultValue: '',
        validations: { minLength: { value: 2, errorMessage: 'Must be at least 2 characters' }, maxLength: { value: 100, errorMessage: 'Must be at most 100 characters' }, pattern: { value: '', errorMessage: 'Pattern not matched' } }
      },
      {
        id: 'cr-02', name: 'email', type: 'text', subtype: 'email',
        label: 'Student Email', placeholder: 'student@university.edu',
        required: true, disabled: false, defaultValue: '',
        validations: {}
      },
      {
        id: 'cr-03', name: 'studentId', type: 'text', subtype: 'text',
        label: 'Student ID', placeholder: 'e.g. STU-2024-001',
        required: true, disabled: false, defaultValue: '',
        validations: { minLength: { value: 3, errorMessage: 'Must be at least 3 characters' }, maxLength: { value: 20, errorMessage: 'Must be at most 20 characters' }, pattern: { value: '', errorMessage: 'Pattern not matched' } }
      },
      {
        id: 'cr-04', name: 'department', type: 'select',
        label: 'Department',
        required: true, disabled: false, defaultValue: [], multiselect: false, size: 4,
        options: [
          { id: 'cr-04-a', label: 'Computer Science', value: 'cs', disabled: false },
          { id: 'cr-04-b', label: 'Mathematics', value: 'math', disabled: false },
          { id: 'cr-04-c', label: 'Physics', value: 'physics', disabled: false },
          { id: 'cr-04-d', label: 'Engineering', value: 'engineering', disabled: false },
          { id: 'cr-04-e', label: 'Business', value: 'business', disabled: false },
          { id: 'cr-04-f', label: 'Arts & Humanities', value: 'arts', disabled: false },
        ],
        validations: {}
      },
      {
        id: 'cr-05', name: 'semester', type: 'radioGroup',
        label: 'Semester',
        required: true, disabled: false, defaultValue: '',
        options: [
          { id: 'cr-05-a', label: 'Spring 2025', value: 'spring-2025', disabled: false },
          { id: 'cr-05-b', label: 'Summer 2025', value: 'summer-2025', disabled: false },
          { id: 'cr-05-c', label: 'Fall 2025', value: 'fall-2025', disabled: false },
        ],
        validations: {}
      },
      {
        id: 'cr-06', name: 'courses', type: 'checkboxGroup',
        label: 'Courses to Enroll',
        required: true, disabled: false, defaultValue: [],
        options: [
          { id: 'cr-06-a', label: 'Data Structures', value: 'data-structures', disabled: false },
          { id: 'cr-06-b', label: 'Algorithms', value: 'algorithms', disabled: false },
          { id: 'cr-06-c', label: 'Database Systems', value: 'databases', disabled: false },
          { id: 'cr-06-d', label: 'Operating Systems', value: 'os', disabled: false },
          { id: 'cr-06-e', label: 'Computer Networks', value: 'networks', disabled: false },
          { id: 'cr-06-f', label: 'Machine Learning', value: 'ml', disabled: false },
        ],
        validations: { minSelected: { value: 1, errorMessage: 'Select at least one course' }, maxSelected: { value: 5, errorMessage: 'Cannot enroll in more than 5 courses' } }
      },
      {
        id: 'cr-07', name: 'specialNeeds', type: 'textarea',
        label: 'Special Requirements', placeholder: 'Any accessibility or special requirements?',
        required: false, disabled: false, defaultValue: '',
        validations: { minLength: { value: null, errorMessage: 'Minimum length not met' }, maxLength: { value: 500, errorMessage: 'Must be at most 500 characters' } }
      },
    ]
  },

  {
    id: 'student-feedback',
    name: 'Student Feedback',
    category: 'Education',
    icon: BookOpenCheck,
    fields: [
      {
        id: 'sf-01', name: 'courseName', type: 'text', subtype: 'text',
        label: 'Course Name', placeholder: 'e.g. Introduction to Computer Science',
        required: true, disabled: false, defaultValue: '',
        validations: { minLength: { value: 3, errorMessage: 'Must be at least 3 characters' }, maxLength: { value: 100, errorMessage: 'Must be at most 100 characters' }, pattern: { value: '', errorMessage: 'Pattern not matched' } }
      },
      {
        id: 'sf-02', name: 'instructorRating', type: 'range',
        label: 'Instructor Rating',
        required: true, disabled: false, defaultValue: null,
        validations: { min: { value: 1, errorMessage: 'Minimum value not met' }, max: { value: 5, errorMessage: 'Maximum value exceeded' }, step: { value: 1, errorMessage: 'Step value not met' } }
      },
      {
        id: 'sf-03', name: 'contentRating', type: 'range',
        label: 'Course Content Rating',
        required: true, disabled: false, defaultValue: null,
        validations: { min: { value: 1, errorMessage: 'Minimum value not met' }, max: { value: 5, errorMessage: 'Maximum value exceeded' }, step: { value: 1, errorMessage: 'Step value not met' } }
      },
      {
        id: 'sf-04', name: 'difficulty', type: 'radioGroup',
        label: 'Course Difficulty',
        required: true, disabled: false, defaultValue: '',
        options: [
          { id: 'sf-04-a', label: 'Too Easy', value: 'too-easy', disabled: false },
          { id: 'sf-04-b', label: 'Just Right', value: 'just-right', disabled: false },
          { id: 'sf-04-c', label: 'Challenging', value: 'challenging', disabled: false },
          { id: 'sf-04-d', label: 'Too Difficult', value: 'too-difficult', disabled: false },
        ],
        validations: {}
      },
      {
        id: 'sf-05', name: 'wouldRecommend', type: 'checkbox',
        label: 'I would recommend this course to others',
        required: false, disabled: false, defaultValue: false,
        validations: {}
      },
      {
        id: 'sf-06', name: 'comments', type: 'textarea',
        label: 'Additional Comments', placeholder: 'Share your thoughts...',
        required: false, disabled: false, defaultValue: '',
        validations: { minLength: { value: null, errorMessage: 'Minimum length not met' }, maxLength: { value: 1000, errorMessage: 'Must be at most 1000 characters' } }
      },
    ]
  },

  // ─── HEALTH ──────────────────────────────────────────────────

  {
    id: 'appointment-booking',
    name: 'Appointment Booking',
    category: 'Health',
    icon: CalendarPlus,
    fields: [
      {
        id: 'ab-01', name: 'patientName', type: 'text', subtype: 'text',
        label: 'Patient Name', placeholder: 'Full name',
        required: true, disabled: false, defaultValue: '',
        validations: { minLength: { value: 2, errorMessage: 'Must be at least 2 characters' }, maxLength: { value: 100, errorMessage: 'Must be at most 100 characters' }, pattern: { value: '', errorMessage: 'Pattern not matched' } }
      },
      {
        id: 'ab-02', name: 'email', type: 'text', subtype: 'email',
        label: 'Email Address', placeholder: 'your@email.com',
        required: true, disabled: false, defaultValue: '',
        validations: {}
      },
      {
        id: 'ab-03', name: 'phone', type: 'text', subtype: 'tel',
        label: 'Phone Number', placeholder: '+1 (555) 000-0000',
        required: true, disabled: false, defaultValue: '',
        validations: { minLength: { value: 7, errorMessage: 'Invalid phone number' }, maxLength: { value: 15, errorMessage: 'Invalid phone number' }, pattern: { value: '', errorMessage: 'Pattern not matched' } }
      },
      {
        id: 'ab-04', name: 'dateOfBirth', type: 'date',
        label: 'Date of Birth',
        required: true, disabled: false, defaultValue: '',
        validations: { minDate: { value: '', errorMessage: 'Invalid date' }, maxDate: { value: '', errorMessage: 'Invalid date' } }
      },
      {
        id: 'ab-05', name: 'appointmentType', type: 'select',
        label: 'Appointment Type',
        required: true, disabled: false, defaultValue: [], multiselect: false, size: 4,
        options: [
          { id: 'ab-05-a', label: 'General Checkup', value: 'checkup', disabled: false },
          { id: 'ab-05-b', label: 'Consultation', value: 'consultation', disabled: false },
          { id: 'ab-05-c', label: 'Follow-up', value: 'followup', disabled: false },
          { id: 'ab-05-d', label: 'Vaccination', value: 'vaccination', disabled: false },
          { id: 'ab-05-e', label: 'Lab Test', value: 'lab', disabled: false },
        ],
        validations: {}
      },
      {
        id: 'ab-06', name: 'preferredDate', type: 'date',
        label: 'Preferred Appointment Date',
        required: true, disabled: false, defaultValue: '',
        validations: { minDate: { value: '', errorMessage: 'Date cannot be in the past' }, maxDate: { value: '', errorMessage: 'Invalid date' } }
      },
      {
        id: 'ab-07', name: 'symptoms', type: 'textarea',
        label: 'Symptoms / Reason for Visit', placeholder: 'Briefly describe your symptoms...',
        required: false, disabled: false, defaultValue: '',
        validations: { minLength: { value: null, errorMessage: 'Minimum length not met' }, maxLength: { value: 500, errorMessage: 'Must be at most 500 characters' } }
      },
      {
        id: 'ab-08', name: 'insurance', type: 'text', subtype: 'text',
        label: 'Insurance Provider', placeholder: 'e.g. Blue Cross Blue Shield',
        required: false, disabled: false, defaultValue: '',
        validations: { minLength: { value: null, errorMessage: 'Minimum length not met' }, maxLength: { value: 100, errorMessage: 'Must be at most 100 characters' }, pattern: { value: '', errorMessage: 'Pattern not matched' } }
      },
    ]
  },

  {
    id: 'medical-history',
    name: 'Medical History',
    category: 'Health',
    icon: FileHeart,
    fields: [
      {
        id: 'mh-01', name: 'fullName', type: 'text', subtype: 'text',
        label: 'Full Name', placeholder: 'Your full name',
        required: true, disabled: false, defaultValue: '',
        validations: { minLength: { value: 2, errorMessage: 'Must be at least 2 characters' }, maxLength: { value: 100, errorMessage: 'Must be at most 100 characters' }, pattern: { value: '', errorMessage: 'Pattern not matched' } }
      },
      {
        id: 'mh-02', name: 'dateOfBirth', type: 'date',
        label: 'Date of Birth',
        required: true, disabled: false, defaultValue: '',
        validations: { minDate: { value: '', errorMessage: 'Invalid date' }, maxDate: { value: '', errorMessage: 'Invalid date' } }
      },
      {
        id: 'mh-03', name: 'bloodType', type: 'select',
        label: 'Blood Type',
        required: false, disabled: false, defaultValue: [], multiselect: false, size: 4,
        options: [
          { id: 'mh-03-a', label: 'A+', value: 'A+', disabled: false },
          { id: 'mh-03-b', label: 'A-', value: 'A-', disabled: false },
          { id: 'mh-03-c', label: 'B+', value: 'B+', disabled: false },
          { id: 'mh-03-d', label: 'B-', value: 'B-', disabled: false },
          { id: 'mh-03-e', label: 'AB+', value: 'AB+', disabled: false },
          { id: 'mh-03-f', label: 'AB-', value: 'AB-', disabled: false },
          { id: 'mh-03-g', label: 'O+', value: 'O+', disabled: false },
          { id: 'mh-03-h', label: 'O-', value: 'O-', disabled: false },
        ],
        validations: {}
      },
      {
        id: 'mh-04', name: 'conditions', type: 'checkboxGroup',
        label: 'Existing Medical Conditions',
        required: false, disabled: false, defaultValue: [],
        options: [
          { id: 'mh-04-a', label: 'Diabetes', value: 'diabetes', disabled: false },
          { id: 'mh-04-b', label: 'Hypertension', value: 'hypertension', disabled: false },
          { id: 'mh-04-c', label: 'Heart Disease', value: 'heart-disease', disabled: false },
          { id: 'mh-04-d', label: 'Asthma', value: 'asthma', disabled: false },
          { id: 'mh-04-e', label: 'Arthritis', value: 'arthritis', disabled: false },
          { id: 'mh-04-f', label: 'None', value: 'none', disabled: false },
        ],
        validations: { minSelected: { value: null, errorMessage: 'Minimum selections not met' }, maxSelected: { value: null, errorMessage: 'Maximum selections not met' } }
      },
      {
        id: 'mh-05', name: 'allergies', type: 'textarea',
        label: 'Known Allergies', placeholder: 'List any known allergies...',
        required: false, disabled: false, defaultValue: '',
        validations: { minLength: { value: null, errorMessage: 'Minimum length not met' }, maxLength: { value: 500, errorMessage: 'Must be at most 500 characters' } }
      },
      {
        id: 'mh-06', name: 'currentMedications', type: 'textarea',
        label: 'Current Medications', placeholder: 'List any medications you are currently taking...',
        required: false, disabled: false, defaultValue: '',
        validations: { minLength: { value: null, errorMessage: 'Minimum length not met' }, maxLength: { value: 500, errorMessage: 'Must be at most 500 characters' } }
      },
      {
        id: 'mh-07', name: 'smoker', type: 'radioGroup',
        label: 'Smoking Status',
        required: true, disabled: false, defaultValue: '',
        options: [
          { id: 'mh-07-a', label: 'Non-smoker', value: 'non-smoker', disabled: false },
          { id: 'mh-07-b', label: 'Former smoker', value: 'former-smoker', disabled: false },
          { id: 'mh-07-c', label: 'Current smoker', value: 'current-smoker', disabled: false },
        ],
        validations: {}
      },
      {
        id: 'mh-08', name: 'consentToTreatment', type: 'checkbox',
        label: 'I consent to treatment and confirm information is accurate',
        required: true, disabled: false, defaultValue: false,
        validations: {}
      },
    ]
  },

  // ─── E-COMMERCE ──────────────────────────────────────────────

  {
    id: 'product-return',
    name: 'Product Return Request',
    category: 'E-commerce',
    icon: PackageMinus,
    fields: [
      {
        id: 'pr-01', name: 'orderNumber', type: 'text', subtype: 'text',
        label: 'Order Number', placeholder: 'e.g. ORD-2024-00123',
        required: true, disabled: false, defaultValue: '',
        validations: { minLength: { value: 3, errorMessage: 'Must be at least 3 characters' }, maxLength: { value: 50, errorMessage: 'Must be at most 50 characters' }, pattern: { value: '', errorMessage: 'Pattern not matched' } }
      },
      {
        id: 'pr-02', name: 'email', type: 'text', subtype: 'email',
        label: 'Email Used for Order', placeholder: 'your@email.com',
        required: true, disabled: false, defaultValue: '',
        validations: {}
      },
      {
        id: 'pr-03', name: 'returnReason', type: 'select',
        label: 'Reason for Return',
        required: true, disabled: false, defaultValue: [], multiselect: false, size: 4,
        options: [
          { id: 'pr-03-a', label: 'Defective / Damaged', value: 'defective', disabled: false },
          { id: 'pr-03-b', label: 'Wrong Item Received', value: 'wrong-item', disabled: false },
          { id: 'pr-03-c', label: 'Does Not Match Description', value: 'mismatch', disabled: false },
          { id: 'pr-03-d', label: 'Changed My Mind', value: 'changed-mind', disabled: false },
          { id: 'pr-03-e', label: 'Better Price Available', value: 'better-price', disabled: false },
          { id: 'pr-03-f', label: 'Other', value: 'other', disabled: false },
        ],
        validations: {}
      },
      {
        id: 'pr-04', name: 'returnType', type: 'radioGroup',
        label: 'Return Type',
        required: true, disabled: false, defaultValue: '',
        options: [
          { id: 'pr-04-a', label: 'Full Refund', value: 'refund', disabled: false },
          { id: 'pr-04-b', label: 'Exchange', value: 'exchange', disabled: false },
          { id: 'pr-04-c', label: 'Store Credit', value: 'store-credit', disabled: false },
        ],
        validations: {}
      },
      {
        id: 'pr-05', name: 'description', type: 'textarea',
        label: 'Describe the Issue', placeholder: 'Please provide details about the issue...',
        required: true, disabled: false, defaultValue: '',
        validations: { minLength: { value: 20, errorMessage: 'Please provide at least 20 characters' }, maxLength: { value: 1000, errorMessage: 'Must be at most 1000 characters' } }
      },
      {
        id: 'pr-06', name: 'photo', type: 'file',
        label: 'Photo of Item (if damaged)',
        required: false, disabled: false,
        validations: {
          minSize: { value: null, errorMessage: 'Minimum size not met' },
          maxSize: { value: 10485760, errorMessage: 'File must be under 10MB' },
          acceptMimeTypes: { value: ['image/png', 'image/jpeg', 'image/webp'], errorMessage: 'Only image files accepted' },
          acceptExtensions: { value: ['.png', '.jpg', '.jpeg', '.webp'], errorMessage: 'Only image files accepted' }
        }
      },
    ]
  },

  {
    id: 'customer-support',
    name: 'Customer Support',
    category: 'E-commerce',
    icon: Headset,
    fields: [
      {
        id: 'cs-01', name: 'name', type: 'text', subtype: 'text',
        label: 'Your Name', placeholder: 'Full name',
        required: true, disabled: false, defaultValue: '',
        validations: { minLength: { value: 2, errorMessage: 'Must be at least 2 characters' }, maxLength: { value: 100, errorMessage: 'Must be at most 100 characters' }, pattern: { value: '', errorMessage: 'Pattern not matched' } }
      },
      {
        id: 'cs-02', name: 'email', type: 'text', subtype: 'email',
        label: 'Email Address', placeholder: 'your@email.com',
        required: true, disabled: false, defaultValue: '',
        validations: {}
      },
      {
        id: 'cs-03', name: 'orderNumber', type: 'text', subtype: 'text',
        label: 'Order Number (if applicable)', placeholder: 'e.g. ORD-2024-00123',
        required: false, disabled: false, defaultValue: '',
        validations: { minLength: { value: null, errorMessage: 'Minimum length not met' }, maxLength: { value: 50, errorMessage: 'Must be at most 50 characters' }, pattern: { value: '', errorMessage: 'Pattern not matched' } }
      },
      {
        id: 'cs-04', name: 'issueType', type: 'select',
        label: 'Issue Type',
        required: true, disabled: false, defaultValue: [], multiselect: false, size: 4,
        options: [
          { id: 'cs-04-a', label: 'Order Issue', value: 'order', disabled: false },
          { id: 'cs-04-b', label: 'Payment Issue', value: 'payment', disabled: false },
          { id: 'cs-04-c', label: 'Delivery Issue', value: 'delivery', disabled: false },
          { id: 'cs-04-d', label: 'Product Issue', value: 'product', disabled: false },
          { id: 'cs-04-e', label: 'Account Issue', value: 'account', disabled: false },
          { id: 'cs-04-f', label: 'Other', value: 'other', disabled: false },
        ],
        validations: {}
      },
      {
        id: 'cs-05', name: 'priority', type: 'radioGroup',
        label: 'Priority',
        required: true, disabled: false, defaultValue: '',
        options: [
          { id: 'cs-05-a', label: 'Low', value: 'low', disabled: false },
          { id: 'cs-05-b', label: 'Medium', value: 'medium', disabled: false },
          { id: 'cs-05-c', label: 'High', value: 'high', disabled: false },
          { id: 'cs-05-d', label: 'Urgent', value: 'urgent', disabled: false },
        ],
        validations: {}
      },
      {
        id: 'cs-06', name: 'description', type: 'textarea',
        label: 'Describe Your Issue', placeholder: 'Please describe the issue in detail...',
        required: true, disabled: false, defaultValue: '',
        validations: { minLength: { value: 20, errorMessage: 'Please provide at least 20 characters' }, maxLength: { value: 2000, errorMessage: 'Must be at most 2000 characters' } }
      },
      {
        id: 'cs-07', name: 'contactMethod', type: 'radioGroup',
        label: 'Preferred Contact Method',
        required: true, disabled: false, defaultValue: '',
        options: [
          { id: 'cs-07-a', label: 'Email', value: 'email', disabled: false },
          { id: 'cs-07-b', label: 'Phone', value: 'phone', disabled: false },
          { id: 'cs-07-c', label: 'Live Chat', value: 'chat', disabled: false },
        ],
        validations: {}
      },
    ]
  },

] as const

export const TEMPLATE_CATEGORIES = [...new Set(PREDEFINED_TEMPLATES.map(t => t.category))]

export const getTemplatesByCategory = (category: string) =>
  PREDEFINED_TEMPLATES.filter(t => t.category === category)
