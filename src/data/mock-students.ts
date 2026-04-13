import type { Student } from '@/types';

export const mockStudents: Student[] = [
  {
    id: 's1', studentNumber: '10001', name: '홍길동', email: 'hong@naver.com', phone: '010-1234-5678',
    parentName: '홍부모', parentPhone: '010-9876-5432', birthday: '2008-03-15', age: 18, gender: '남자',
    mathGrade: '2등급', selectedSubjects: ['미적분'], registeredAt: '2025-01-20',
    courses: [{ courseCode: 'H3_미적', courseName: '고3 미적분', startDate: '2025-02-01', endDate: '2025-12-31', status: '진행중', assignmentProgress: 72, lastSubmitDate: '2026-04-08', lastCheckDate: '2026-04-09' }],
  },
  {
    id: 's2', studentNumber: '10002', name: '김영희', email: 'kim@gmail.com', phone: '010-2345-6789',
    parentName: '김부모', parentPhone: '010-8765-4321', birthday: '2008-07-22', age: 18, gender: '여자',
    mathGrade: '1등급', selectedSubjects: ['미적분', '기하'], registeredAt: '2025-01-15',
    courses: [
      { courseCode: 'H3_미적', courseName: '고3 미적분', startDate: '2025-02-01', endDate: '2025-12-31', status: '진행중', assignmentProgress: 95, lastSubmitDate: '2026-04-09', lastCheckDate: '2026-04-10' },
      { courseCode: 'H3_기하', courseName: '고3 기하', startDate: '2025-03-01', endDate: '2025-12-31', status: '진행중', assignmentProgress: 60 },
    ],
  },
  {
    id: 's3', studentNumber: '10003', name: '박철수', email: 'park@hanmail.net', phone: '010-3456-7890',
    parentName: '박부모', parentPhone: '010-7654-3210', birthday: '2009-11-05', age: 17, gender: '남자',
    mathGrade: '3등급', selectedSubjects: ['확률과 통계'], registeredAt: '2025-02-10',
    courses: [{ courseCode: 'H2', courseName: '고2 수학', startDate: '2025-03-01', endDate: '2025-12-31', status: '진행중', assignmentProgress: 45, lastSubmitDate: '2026-04-05' }],
  },
  {
    id: 's4', studentNumber: '10004', name: '이수진', email: 'lee@kakao.com', phone: '010-4567-8901',
    parentName: '이부모', parentPhone: '010-6543-2109', birthday: '2010-04-18', age: 16, gender: '여자',
    mathGrade: '4등급', selectedSubjects: [], registeredAt: '2025-03-01',
    courses: [{ courseCode: 'H1', courseName: '고1 수학', startDate: '2025-03-10', endDate: '2025-12-31', status: '진행중', assignmentProgress: 30 }],
  },
  {
    id: 's5', studentNumber: '10005', name: '최민준', email: 'choi@naver.com', phone: '010-5678-9012',
    parentName: '최부모', parentPhone: '010-5432-1098', birthday: '2011-09-30', age: 15, gender: '남자',
    mathGrade: '2등급', selectedSubjects: [], registeredAt: '2025-01-05',
    courses: [{ courseCode: 'I3', courseName: '중3 수학', startDate: '2025-01-15', endDate: '2025-12-31', status: '진행중', assignmentProgress: 88, lastSubmitDate: '2026-04-10', lastCheckDate: '2026-04-10' }],
  },
  {
    id: 's6', studentNumber: '10006', name: '정하나', email: 'jung@gmail.com', phone: '010-6789-0123',
    birthday: '2012-01-14', age: 14, gender: '여자',
    mathGrade: '1등급', selectedSubjects: [], registeredAt: '2025-02-20',
    courses: [{ courseCode: 'I2', courseName: '중2 수학', startDate: '2025-03-01', endDate: '2025-12-31', status: '진행중', assignmentProgress: 100, lastSubmitDate: '2026-04-07', lastCheckDate: '2026-04-08' }],
  },
];
