import type { Payment } from '@/types';

export const mockPayments: Payment[] = [
  { id: 'p1', studentName: '홍길동', status: '성공', paymentDate: '26.03.15 14:30', amount: 200000, refundAmount: 0, netAmount: 200000, teacherName: '김수학', courseName: '고3 미적분' },
  { id: 'p2', studentName: '김영희', status: '성공', paymentDate: '26.03.14 10:20', amount: 200000, refundAmount: 0, netAmount: 200000, teacherName: '김수학', courseName: '고3 미적분' },
  { id: 'p3', studentName: '김영희', status: '성공', paymentDate: '26.03.14 10:25', amount: 200000, refundAmount: 0, netAmount: 200000, teacherName: '이정석', courseName: '고3 기하' },
  { id: 'p4', studentName: '박철수', status: '실패', paymentDate: '26.03.13 09:15', amount: 180000, refundAmount: 0, netAmount: 0, teacherName: '김수학', courseName: '고2 수학' },
  { id: 'p5', studentName: '박철수', status: '성공', paymentDate: '26.03.13 09:30', amount: 180000, refundAmount: 0, netAmount: 180000, teacherName: '김수학', courseName: '고2 수학' },
  { id: 'p6', studentName: '이수진', status: '성공', paymentDate: '26.03.10 16:00', amount: 150000, refundAmount: 0, netAmount: 150000, teacherName: '김수학', courseName: '고1 수학' },
  { id: 'p7', studentName: '최민준', status: '성공', paymentDate: '26.01.05 11:45', amount: 120000, refundAmount: 0, netAmount: 120000, teacherName: '박미래', courseName: '중3 수학' },
  { id: 'p8', studentName: '정하나', status: '성공', paymentDate: '26.02.20 13:10', amount: 100000, refundAmount: 50000, netAmount: 50000, teacherName: '박미래', courseName: '중2 수학' },
];
