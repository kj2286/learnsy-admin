import type { Course } from '@/types';

export const mockCourses: Course[] = [
  { id: 'c1', code: 'H1', name: '고1 수학', teacherId: 't1', teacherName: '김수학', price: 150000, status: '활성', createdAt: '2025-01-15' },
  { id: 'c2', code: 'H2', name: '고2 수학', teacherId: 't1', teacherName: '김수학', price: 180000, status: '활성', createdAt: '2025-01-15' },
  { id: 'c3', code: 'H3_미적', name: '고3 미적분', teacherId: 't1', teacherName: '김수학', price: 200000, status: '활성', createdAt: '2025-02-01' },
  { id: 'c4', code: 'H3_확통', name: '고3 확률과통계', teacherId: 't2', teacherName: '이정석', price: 200000, status: '활성', createdAt: '2025-02-01' },
  { id: 'c5', code: 'H3_기하', name: '고3 기하', teacherId: 't2', teacherName: '이정석', price: 200000, status: '활성', createdAt: '2025-02-01' },
  { id: 'c6', code: 'H4', name: '수능 실전모의고사', teacherId: 't1', teacherName: '김수학', price: 250000, status: '활성', createdAt: '2025-03-01' },
  { id: 'c7', code: 'H5', name: '킬러문항 특강', teacherId: 't2', teacherName: '이정석', price: 120000, status: '활성', createdAt: '2025-03-15' },
  { id: 'c8', code: 'I1', name: '중1 수학', teacherId: 't3', teacherName: '박미래', price: 100000, status: '활성', createdAt: '2025-01-10' },
  { id: 'c9', code: 'I2', name: '중2 수학', teacherId: 't3', teacherName: '박미래', price: 100000, status: '활성', createdAt: '2025-01-10' },
  { id: 'c10', code: 'I3', name: '중3 수학', teacherId: 't3', teacherName: '박미래', price: 120000, status: '활성', createdAt: '2025-01-10' },
  { id: 'c11', code: '통계특강', name: '통계학 특강', teacherId: 't2', teacherName: '이정석', price: 80000, status: '비활성', createdAt: '2025-04-01' },
];

export const courseTabs = ['전체', 'H1', 'H2', 'H3_미적', 'H3_확통', 'H3_기하', 'H4', 'H5', '통계특강', 'I1', 'I2', 'I3'];
