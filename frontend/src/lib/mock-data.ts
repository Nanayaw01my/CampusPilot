export const mockUser = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@university.edu',
  department: 'Computer Science',
  level: '300',
  avatar: null,
  role: 'student',
  joinedAt: '2023-09-01',
}

export const mockStats = {
  booksRead: 12,
  questionsDownloaded: 34,
  eventsAttended: 8,
  remindersSet: 15,
  readingStreak: 7,
  savedOpportunities: 6,
}

export const mockBooks = [
  { id: '1', title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', category: 'Computer Science', pages: 1312, cover: null, size: '45 MB', downloads: 234, rating: 4.8, uploadedAt: '2024-01-15', progress: 65 },
  { id: '2', title: 'Calculus: Early Transcendentals', author: 'James Stewart', category: 'Mathematics', pages: 1368, cover: null, size: '38 MB', downloads: 189, rating: 4.6, uploadedAt: '2024-02-10', progress: 30 },
  { id: '3', title: 'Principles of Economics', author: 'N. Gregory Mankiw', category: 'Economics', pages: 892, cover: null, size: '22 MB', downloads: 312, rating: 4.5, uploadedAt: '2024-01-28', progress: 0 },
  { id: '4', title: 'Organic Chemistry', author: 'Paula Bruice', category: 'Chemistry', pages: 1254, cover: null, size: '56 MB', downloads: 145, rating: 4.3, uploadedAt: '2024-03-05', progress: 80 },
  { id: '5', title: 'Digital Electronics', author: 'Morris Mano', category: 'Engineering', pages: 602, cover: null, size: '18 MB', downloads: 267, rating: 4.7, uploadedAt: '2024-02-20', progress: 15 },
  { id: '6', title: 'Human Anatomy', author: 'Frank Netter', category: 'Medicine', pages: 674, cover: null, size: '82 MB', downloads: 198, rating: 4.9, uploadedAt: '2024-03-12', progress: 45 },
]

export const mockAudio = [
  { id: '1', title: 'Data Structures Explained', author: 'Dr. Sarah Chen', category: 'Computer Science', duration: '2:34:00', plays: 1234, cover: null, uploadedAt: '2024-02-01' },
  { id: '2', title: 'Macroeconomics Overview', author: 'Prof. James Wilson', category: 'Economics', duration: '1:48:30', plays: 856, cover: null, uploadedAt: '2024-02-15' },
  { id: '3', title: 'African History Series', author: 'Dr. Kwame Asante', category: 'History', duration: '3:12:00', plays: 543, cover: null, uploadedAt: '2024-03-01' },
  { id: '4', title: 'Calculus Made Easy', author: 'Prof. Emily Rose', category: 'Mathematics', duration: '2:05:45', plays: 2341, cover: null, uploadedAt: '2024-01-20' },
  { id: '5', title: 'Introduction to Philosophy', author: 'Dr. Marcus Reid', category: 'Philosophy', duration: '1:30:00', plays: 678, cover: null, uploadedAt: '2024-03-10' },
  { id: '6', title: 'Organic Chemistry Audio Guide', author: 'Prof. Lisa Park', category: 'Chemistry', duration: '4:20:15', plays: 432, cover: null, uploadedAt: '2024-02-28' },
]

export const mockPastQuestions = [
  { id: '1', course: 'CS 301 - Data Structures', department: 'Computer Science', year: '2023', level: '300', semester: 'First', downloads: 456, uploadedAt: '2024-01-10' },
  { id: '2', course: 'MATH 201 - Calculus II', department: 'Mathematics', year: '2023', level: '200', semester: 'Second', downloads: 389, uploadedAt: '2024-01-15' },
  { id: '3', course: 'ECON 101 - Microeconomics', department: 'Economics', year: '2022', level: '100', semester: 'First', downloads: 512, uploadedAt: '2024-02-05' },
  { id: '4', course: 'CHEM 302 - Organic Chemistry', department: 'Chemistry', year: '2023', level: '300', semester: 'First', downloads: 234, uploadedAt: '2024-02-20' },
  { id: '5', course: 'ENG 401 - Digital Systems', department: 'Engineering', year: '2023', level: '400', semester: 'Second', downloads: 178, uploadedAt: '2024-03-01' },
  { id: '6', course: 'MED 201 - Physiology', department: 'Medicine', year: '2022', level: '200', semester: 'Second', downloads: 345, uploadedAt: '2024-02-10' },
]

export const mockEvents = [
  { id: '1', title: 'Tech Innovation Summit 2024', type: 'Conference', date: '2024-08-15', time: '09:00 AM', location: 'Main Auditorium', capacity: 500, registered: 342, organizer: 'CS Department', image: null, description: 'Annual technology conference featuring industry leaders and student showcases.' },
  { id: '2', title: 'Inter-Faculty Sports Competition', type: 'Sports', date: '2024-08-20', time: '08:00 AM', location: 'University Sports Complex', capacity: 1000, registered: 756, organizer: 'Sports Council', image: null, description: 'Annual inter-faculty sports event with multiple sports disciplines.' },
  { id: '3', title: 'Career Fair & Networking Night', type: 'Career', date: '2024-09-05', time: '02:00 PM', location: 'Student Union Building', capacity: 300, registered: 198, organizer: 'Career Center', image: null, description: 'Meet top employers and explore career opportunities.' },
  { id: '4', title: 'National Student Research Symposium', type: 'Academic', date: '2024-09-12', time: '10:00 AM', location: 'Science Complex', capacity: 200, registered: 124, organizer: 'Research Office', image: null, description: 'Present your research and get feedback from faculty and peers.' },
  { id: '5', title: 'Cultural Week Celebration', type: 'Cultural', date: '2024-09-18', time: '04:00 PM', location: 'Campus Square', capacity: 2000, registered: 1456, organizer: 'Student Association', image: null, description: 'A week-long celebration of diverse cultures and traditions.' },
  { id: '6', title: 'Python Programming Workshop', type: 'Workshop', date: '2024-08-28', time: '01:00 PM', location: 'Computer Lab A', capacity: 50, registered: 47, organizer: 'CS Club', image: null, description: 'Hands-on Python programming workshop for beginners.' },
]

export const mockOpportunities = [
  { id: '1', title: 'Google Summer of Code 2024', type: 'Internship', provider: 'Google', deadline: '2024-09-01', location: 'Remote', stipend: '$3,000/month', requirements: 'CS students, programming skills', description: 'Work on open source projects with Google mentors.', link: '#', saved: true },
  { id: '2', title: 'MasterCard Foundation Scholarship', type: 'Scholarship', provider: 'MasterCard Foundation', deadline: '2024-08-31', location: 'Various', stipend: 'Full Tuition + Living', requirements: 'African students, 3.5 GPA+', description: 'Full scholarship for outstanding African students.', link: '#', saved: false },
  { id: '3', title: 'UN Youth Climate Summit', type: 'Competition', provider: 'United Nations', deadline: '2024-08-15', location: 'New York, USA', stipend: 'Travel + Accommodation', requirements: 'Students aged 18-30', description: 'Represent your country at the global youth climate summit.', link: '#', saved: true },
  { id: '4', title: 'Microsoft AI for Good Grant', type: 'Grant', provider: 'Microsoft', deadline: '2024-09-30', location: 'Remote', stipend: 'Up to $50,000', requirements: 'Research proposals in AI for social good', description: 'Funding for AI projects that address social challenges.', link: '#', saved: false },
  { id: '5', title: 'Erasmus+ Exchange Program', type: 'Exchange', provider: 'European Union', deadline: '2024-10-15', location: 'Europe', stipend: '€600-1,000/month', requirements: 'All disciplines, B2 English', description: 'Study for a semester at a European university.', link: '#', saved: false },
  { id: '6', title: 'African Development Bank Internship', type: 'Internship', provider: 'AfDB', deadline: '2024-08-20', location: 'Abidjan, Ivory Coast', stipend: '$1,500/month', requirements: 'Final year students, Economics/Finance', description: 'Gain experience at one of Africa\'s leading development banks.', link: '#', saved: true },
]

export const mockReminders = [
  { id: '1', title: 'Submit Assignment - CS 301', type: 'assignment', dueDate: '2024-08-10T23:59:00', priority: 'high', completed: false, notifyEmail: true, notifyPush: true },
  { id: '2', title: 'CS 205 Mid-Semester Exam', type: 'exam', dueDate: '2024-08-15T08:00:00', priority: 'urgent', completed: false, notifyEmail: true, notifyPush: true },
  { id: '3', title: 'Google Internship Application Deadline', type: 'deadline', dueDate: '2024-09-01T23:59:00', priority: 'high', completed: false, notifyEmail: true, notifyPush: false },
  { id: '4', title: 'Read Chapter 5 - Algorithms', type: 'study', dueDate: '2024-08-08T20:00:00', priority: 'medium', completed: true, notifyEmail: false, notifyPush: true },
  { id: '5', title: 'Tech Summit Registration', type: 'event', dueDate: '2024-08-12T17:00:00', priority: 'low', completed: false, notifyEmail: true, notifyPush: false },
]

export const mockNotifications = [
  { id: '1', type: 'new_book', title: 'New Book Available', message: 'Advanced Database Systems has been added to the library', time: '2024-08-05T10:30:00', read: false, icon: 'book' },
  { id: '2', type: 'event_reminder', title: 'Event Tomorrow', message: 'Tech Innovation Summit starts tomorrow at 9:00 AM', time: '2024-08-05T08:00:00', read: false, icon: 'calendar' },
  { id: '3', type: 'opportunity', title: 'New Scholarship Available', message: 'Rhodes Scholarship 2025 applications are now open', time: '2024-08-04T14:00:00', read: true, icon: 'star' },
  { id: '4', type: 'reminder', title: 'Assignment Due Soon', message: 'CS 301 assignment is due in 2 days', time: '2024-08-03T09:00:00', read: true, icon: 'bell' },
  { id: '5', type: 'announcement', title: 'University Announcement', message: 'Second semester registration opens August 20th', time: '2024-08-02T11:00:00', read: true, icon: 'megaphone' },
]

export const mockUsers = [
  { id: '1', name: 'Alex Johnson', email: 'alex@university.edu', department: 'Computer Science', level: '300', joinedAt: '2023-09-01', status: 'active' },
  { id: '2', name: 'Ama Owusu', email: 'ama@university.edu', department: 'Medicine', level: '400', joinedAt: '2023-09-01', status: 'active' },
  { id: '3', name: 'Kofi Mensah', email: 'kofi@university.edu', department: 'Engineering', level: '200', joinedAt: '2023-09-01', status: 'active' },
  { id: '4', name: 'Fatima Diallo', email: 'fatima@university.edu', department: 'Economics', level: '300', joinedAt: '2024-01-15', status: 'inactive' },
]

export const mockAnalytics = {
  totalUsers: 12847,
  activeToday: 1234,
  booksUploaded: 456,
  totalDownloads: 89432,
  eventsThisMonth: 23,
  opportunitiesListed: 67,
  weeklyGrowth: [
    { day: 'Mon', users: 234, downloads: 456 },
    { day: 'Tue', users: 345, downloads: 567 },
    { day: 'Wed', users: 289, downloads: 489 },
    { day: 'Thu', users: 456, downloads: 678 },
    { day: 'Fri', users: 534, downloads: 789 },
    { day: 'Sat', users: 234, downloads: 345 },
    { day: 'Sun', users: 189, downloads: 267 },
  ],
  topBooks: [
    { title: 'Intro to Algorithms', downloads: 456 },
    { title: 'Calculus I', downloads: 389 },
    { title: 'Microeconomics', downloads: 512 },
    { title: 'Digital Electronics', downloads: 267 },
    { title: 'Human Anatomy', downloads: 198 },
  ],
  departmentStats: [
    { dept: 'CS', students: 2345 },
    { dept: 'Medicine', students: 1876 },
    { dept: 'Engineering', students: 2134 },
    { dept: 'Economics', students: 1654 },
    { dept: 'Law', students: 987 },
    { dept: 'Sciences', students: 1543 },
  ],
}
