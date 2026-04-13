// ===== 수학비서 내신인강 플랫폼 — 통합 목업 데이터 =====

// --- 학교 ---
export interface School {
  id: string;
  name: string;
  region: string;
}

export const mockSchools: School[] = [
  { id: "s1", name: "세화고등학교", region: "서울" },
  { id: "s2", name: "대원외국어고등학교", region: "서울" },
  { id: "s3", name: "숙명여자고등학교", region: "서울" },
  { id: "s4", name: "한영고등학교", region: "서울" },
  { id: "s5", name: "서울과학고등학교", region: "서울" },
];

// --- 플랫폼 선생님 (내신인강) ---
export interface PlatformTeacher {
  id: string;
  name: string;
  schools: string[];
  subscribers: number;
  rating: number;
  intro: string;
  isLecturer: boolean;
  subject: string;
  experience: string;
  university: string;
}

export const mockPlatformTeachers: PlatformTeacher[] = [
  { id: "t1", name: "김수학", schools: ["s1", "s2"], subscribers: 47, rating: 4.8, intro: "세화고·대원외고 내신 전문. 15년 경력.", isLecturer: true, subject: "수학 (이과)", experience: "15년", university: "서울대학교 수학교육과" },
  { id: "t2", name: "박미적", schools: ["s1", "s3"], subscribers: 32, rating: 4.6, intro: "세화고·숙명여고 수학 전문. 내신 1등급 달성률 87%.", isLecturer: true, subject: "수학 (이과)", experience: "12년", university: "연세대학교 수학과" },
  { id: "t3", name: "이정석", schools: ["s4", "s5"], subscribers: 28, rating: 4.5, intro: "한영고·과학고 수학 담당. 심화 수학과 경시 대회 준비.", isLecturer: false, subject: "수학 (심화)", experience: "10년", university: "카이스트 수리과학과" },
  { id: "t4", name: "최확통", schools: ["s2", "s4"], subscribers: 19, rating: 4.3, intro: "확률과 통계, 문과 수학 전문.", isLecturer: false, subject: "수학 (문과)", experience: "8년", university: "고려대학교 수학과" },
];

// --- 플랫폼 학생 ---
export interface PlatformStudent {
  id: string;
  name: string;
  school: string;
  grade: number;
  track: string;
  gender: string;
  phone: string;
  subscriptions: string[];
  progress: Record<string, number>;
}

export const mockPlatformStudents: PlatformStudent[] = [
  { id: "st1", name: "이하은", school: "s1", grade: 2, track: "이과", gender: "여", phone: "010-1234-5678", subscriptions: ["t1"], progress: { c1: 100, c2: 100, c3: 45, c4: 0 } },
  { id: "st2", name: "김민수", school: "s1", grade: 2, track: "이과", gender: "남", phone: "010-2345-6789", subscriptions: ["t1", "t2"], progress: { c1: 100, c2: 70, c3: 0, c4: 0 } },
  { id: "st3", name: "박서연", school: "s2", grade: 1, track: "문과", gender: "여", phone: "010-3456-7890", subscriptions: ["t1"], progress: { c1: 100, c2: 100, c3: 100, c4: 80 } },
  { id: "st4", name: "정현우", school: "s3", grade: 2, track: "이과", gender: "남", phone: "", subscriptions: ["t2"], progress: { c1: 100, c2: 30, c3: 0, c4: 0 } },
  { id: "st5", name: "한소희", school: "s4", grade: 3, track: "이과", gender: "여", phone: "010-5678-1234", subscriptions: [], progress: {} },
  { id: "st6", name: "오태양", school: "s2", grade: 1, track: "문과", gender: "남", phone: "010-6789-2345", subscriptions: ["t4"], progress: { c1: 50, c2: 0, c3: 0, c4: 0 } },
  { id: "st7", name: "류지민", school: "s5", grade: 2, track: "이과", gender: "여", phone: "010-7890-3456", subscriptions: [], progress: {} },
  { id: "st8", name: "강도윤", school: "s1", grade: 3, track: "이과", gender: "남", phone: "010-8901-4567", subscriptions: ["t1", "t2"], progress: { c1: 100, c2: 100, c3: 100, c4: 100 } },
  { id: "st9", name: "임채원", school: "s3", grade: 1, track: "문과", gender: "여", phone: "", subscriptions: ["t2"], progress: { c1: 60, c2: 0, c3: 0, c4: 0 } },
  { id: "st10", name: "윤준호", school: "s4", grade: 2, track: "이과", gender: "남", phone: "010-0123-5678", subscriptions: [], progress: {} },
];

// --- 학습매니저 ---
export interface Manager {
  id: string;
  name: string;
  assignedTeachers: string[];
}

export const mockManagers: Manager[] = [
  { id: "m1", name: "홍매니저", assignedTeachers: ["t1", "t2"] },
  { id: "m2", name: "장매니저", assignedTeachers: ["t3", "t4"] },
];

// --- 강의 ---
export interface Lecture {
  id: string;
  teacherId: string;
  title: string;
  description: string;
  schoolId: string;
  grade: number;
  totalChapters: number;
}

export const mockLectures: Lecture[] = [
  { id: "l1", teacherId: "t1", title: "세화고 2학년 1학기 중간고사 대비", description: "함수의 극한, 미분 기초, 도함수 활용까지 완벽 대비", schoolId: "s1", grade: 2, totalChapters: 4 },
  { id: "l2", teacherId: "t1", title: "대원외고 1학년 수학(상) 완성", description: "다항식, 방정식, 부등식 핵심 정리", schoolId: "s2", grade: 1, totalChapters: 4 },
  { id: "l3", teacherId: "t2", title: "세화고 2학년 미적분 심화", description: "적분의 기본 정리부터 응용까지", schoolId: "s1", grade: 2, totalChapters: 4 },
  { id: "l4", teacherId: "t2", title: "숙명여고 2학년 기하와 벡터", description: "이차곡선, 공간도형, 벡터 총정리", schoolId: "s3", grade: 2, totalChapters: 4 },
];

// --- 콘텐츠 ---
export interface Content {
  id: string;
  title: string;
  type: "video" | "pdf" | "problem_set";
  grade: number;
  schoolId: string;
  assignedTeachers: string[];
  version: string;
  createdAt: string;
}

export const mockContents: Content[] = [
  { id: "ct1", title: "세화고 2학년 1학기 중간 영상 세트", type: "video", grade: 2, schoolId: "s1", assignedTeachers: ["t1", "t2"], version: "v2.1", createdAt: "2026-03-01" },
  { id: "ct2", title: "대원외고 1학년 수학(상) 교재 PDF", type: "pdf", grade: 1, schoolId: "s2", assignedTeachers: ["t1"], version: "v1.3", createdAt: "2026-02-15" },
  { id: "ct3", title: "숙명여고 2학년 기하 문제 세트", type: "problem_set", grade: 2, schoolId: "s3", assignedTeachers: ["t2"], version: "v1.0", createdAt: "2026-03-10" },
  { id: "ct4", title: "한영고 3학년 심화수학 영상", type: "video", grade: 3, schoolId: "s4", assignedTeachers: [], version: "v1.0", createdAt: "2026-03-20" },
];

// --- 구독 ---
export interface Subscription {
  id: string;
  studentId: string;
  teacherId: string;
  startDate: string;
  status: "active" | "cancelled" | "expired";
  monthlyFee: number;
}

export const mockSubscriptions: Subscription[] = [
  { id: "sub1", studentId: "st1", teacherId: "t1", startDate: "2026-03-01", status: "active", monthlyFee: 500000 },
  { id: "sub2", studentId: "st2", teacherId: "t1", startDate: "2026-03-01", status: "active", monthlyFee: 500000 },
  { id: "sub3", studentId: "st2", teacherId: "t2", startDate: "2026-03-15", status: "active", monthlyFee: 500000 },
  { id: "sub4", studentId: "st3", teacherId: "t1", startDate: "2026-02-01", status: "active", monthlyFee: 500000 },
  { id: "sub5", studentId: "st4", teacherId: "t2", startDate: "2026-03-10", status: "active", monthlyFee: 500000 },
  { id: "sub6", studentId: "st6", teacherId: "t4", startDate: "2026-04-01", status: "active", monthlyFee: 500000 },
  { id: "sub7", studentId: "st8", teacherId: "t1", startDate: "2026-01-15", status: "active", monthlyFee: 500000 },
  { id: "sub8", studentId: "st8", teacherId: "t2", startDate: "2026-02-01", status: "active", monthlyFee: 500000 },
  { id: "sub9", studentId: "st9", teacherId: "t2", startDate: "2026-03-20", status: "active", monthlyFee: 500000 },
];

// --- 내신 분석 리포트 ---
export interface AnalysisReport {
  id: string;
  schoolId: string;
  title: string;
  assignedTeachers: string[];
  textbookReflection: number;
  ebsReflection: number;
  militaryAcademyReflection: number;
  supplementReflection: number;
  createdAt: string;
}

export const mockReports: AnalysisReport[] = [
  { id: "r1", schoolId: "s1", title: "세화고 5개년 내신 분석 리포트", assignedTeachers: ["t1", "t2"], textbookReflection: 72, ebsReflection: 45, militaryAcademyReflection: 18, supplementReflection: 35, createdAt: "2026-03-01" },
  { id: "r2", schoolId: "s2", title: "대원외고 5개년 내신 분석 리포트", assignedTeachers: ["t1"], textbookReflection: 68, ebsReflection: 52, militaryAcademyReflection: 12, supplementReflection: 28, createdAt: "2026-03-05" },
  { id: "r3", schoolId: "s3", title: "숙명여고 5개년 내신 분석 리포트", assignedTeachers: ["t2"], textbookReflection: 75, ebsReflection: 40, militaryAcademyReflection: 15, supplementReflection: 32, createdAt: "2026-03-10" },
];

// --- 메시지 (학습매니저/선생님 → 학생) ---
export interface PlatformMessage {
  id: string;
  fromId: string;
  fromRole: "teacher" | "manager";
  toStudentId: string;
  teacherId: string;
  type: "nudge" | "praise" | "warning" | "assignment" | "general";
  title: string;
  content: string;
  createdAt: string;
  isRead: boolean;
}

export const mockPlatformMessages: PlatformMessage[] = [
  { id: "msg1", fromId: "t1", fromRole: "teacher", toStudentId: "st1", teacherId: "t1", type: "nudge", title: "오늘 3강 들어볼까요?", content: "하은아, 2강까지 잘 들었네요! 3강도 오늘 중으로 들어보면 좋겠어요.", createdAt: "2026-04-10T08:00:00", isRead: false },
  { id: "msg2", fromId: "m1", fromRole: "manager", toStudentId: "st2", teacherId: "t1", type: "praise", title: "잘하고 있어요!", content: "민수야, 이번 주 꾸준히 강의 듣고 있구나! 계속 이 페이스로 가면 중간고사 잘 볼 수 있을 거야.", createdAt: "2026-04-09T18:00:00", isRead: true },
  { id: "msg3", fromId: "m1", fromRole: "manager", toStudentId: "st3", teacherId: "t1", type: "warning", title: "진도가 좀 느려요", content: "서연아, 지난주보다 학습량이 줄었어요. 혹시 어려운 부분이 있으면 질문해주세요!", createdAt: "2026-04-09T10:00:00", isRead: false },
  { id: "msg4", fromId: "t1", fromRole: "teacher", toStudentId: "st8", teacherId: "t1", type: "praise", title: "전 강의 완주 축하!", content: "도윤아, 모든 강의를 완주했네요! 대단합니다.", createdAt: "2026-04-08T15:00:00", isRead: true },
  { id: "msg5", fromId: "m2", fromRole: "manager", toStudentId: "st6", teacherId: "t4", type: "nudge", title: "1강 마저 들어요!", content: "태양아, 1강을 50%까지 들었네요. 오늘 마저 들어보는 건 어떨까요?", createdAt: "2026-04-10T07:30:00", isRead: false },
];

// --- 유틸 ---
export function getSchoolById(id: string) { return mockSchools.find((s) => s.id === id); }
export function getPlatformTeacherById(id: string) { return mockPlatformTeachers.find((t) => t.id === id); }
export function getPlatformStudentById(id: string) { return mockPlatformStudents.find((s) => s.id === id); }
