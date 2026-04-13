// ==========================================
// Learnsy Admin Types
// ==========================================

// --- 공통 ---
export interface Teacher {
  id: string;
  name: string;
  email: string;
}

export interface Student {
  id: string;
  studentNumber: string;
  name: string;
  email: string;
  phone: string;
  parentName?: string;
  parentPhone?: string;
  birthday: string;
  age: number;
  gender: '남자' | '여자';
  mathGrade: string;
  selectedSubjects: string[];
  registeredAt: string;
  courses: CourseEnrollment[];
}

export interface CourseEnrollment {
  courseCode: string;
  courseName: string;
  startDate: string;
  endDate: string;
  status: '진행중' | '완료' | '일시정지' | '퇴출';
  assignmentProgress: number;
  lastSubmitDate?: string;
  lastCheckDate?: string;
  memo?: string;
}

// --- 결제 ---
export interface Payment {
  id: string;
  studentName: string;
  status: '성공' | '실패';
  paymentDate: string;
  amount: number;
  refundAmount: number;
  netAmount: number;
  teacherName: string;
  courseName: string;
}

// --- 매출 ---
export interface SalesPeriodData {
  date: string;
  count: number;
  amount: number;
}

export interface SalesProductData {
  productName: string;
  salesCount: number;
  salesAmount: number;
  refundAmount: number;
  netSalesAmount: number;
}

// --- 강의 ---
export interface Course {
  id: string;
  code: string;
  name: string;
  teacherId: string;
  teacherName: string;
  price: number;
  status: '활성' | '비활성';
  createdAt: string;
}

// --- 쿠폰 ---
export interface Coupon {
  id: string;
  issuedDate: string;
  name: string;
  code: string;
  isDuplicate: boolean;
  type: string;
  discountValue: string;
  teacherName: string;
  appliedCourses: string;
  usedStudentCount: number;
  usedPaymentCount: number;
}

// --- AI 피드백 ---
export interface AIFeedback {
  id: string;
  submitDate: string;
  checkDate: string;
  status: '통과' | '미통과' | '대기';
  courseCode: string;
  studentName: string;
  assignmentLink: string;
  feedbackGood: string[];
  feedbackBad: string[];
}

// --- 배송 ---
export interface Shipping {
  id: string;
  registeredDate: string;
  deliveryPartner: string;
  deliveryName: string;
  ordererName: string;
  email: string;
  phone: string;
  address: string;
  detailAddress: string;
  zipCode: string;
  trackingNumber: string;
  deliveryCompany: string;
}

// --- 공지사항 ---
export interface Notice {
  id: string;
  createdAt: string;
  title: string;
  content: string;
  file?: string;
}

// --- 질문 ---
export interface Question {
  id: string;
  courseCode: string;
  courseName: string;
  chapter: string;
  category: string;
  studentName: string;
  content: string;
  createdAt: string;
  status: '대기' | '완료';
  answer?: string;
}

// --- 채팅 ---
export interface ChatRoom {
  id: string;
  teacherName: string;
  studentName: string;
  studentPhone: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isRead: boolean;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  sender: 'teacher' | 'student';
  content: string;
  type: 'text' | 'youtube' | 'image' | 'deleted';
  timestamp: string;
}

// --- 사이드바 메뉴 ---
export interface MenuItem {
  label: string;
  href: string;
  icon?: string;
}

export interface MenuGroup {
  title: string;
  items: MenuItem[];
}
