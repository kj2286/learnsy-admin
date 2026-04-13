import type { Coupon } from '@/types';

export const mockCoupons: Coupon[] = [
  { id: 'cp1', issuedDate: '2026-03-01', name: '봄학기 할인', code: 'SPRG-2026-A1B2', isDuplicate: false, type: '할인액적용', discountValue: '30,000원', teacherName: '김수학', appliedCourses: '고3 미적분, 고2 수학', usedStudentCount: 5, usedPaymentCount: 5 },
  { id: 'cp2', issuedDate: '2026-02-14', name: '친구 추천 쿠폰', code: 'FRND-ABCD-0123', isDuplicate: true, type: '할인율적용', discountValue: '10%', teacherName: '전체', appliedCourses: '전체 강의', usedStudentCount: 12, usedPaymentCount: 15 },
  { id: 'cp3', issuedDate: '2026-01-10', name: '얼리버드 할인', code: 'ERLY-2026-XY99', isDuplicate: false, type: '할인액적용', discountValue: '50,000원', teacherName: '이정석', appliedCourses: '고3 기하, 고3 확률과통계', usedStudentCount: 8, usedPaymentCount: 8 },
  { id: 'cp4', issuedDate: '2026-03-20', name: '중등 특가', code: 'MIDL-SALE-7788', isDuplicate: false, type: '할인율적용', discountValue: '15%', teacherName: '박미래', appliedCourses: '중1 수학, 중2 수학, 중3 수학', usedStudentCount: 3, usedPaymentCount: 3 },
];
