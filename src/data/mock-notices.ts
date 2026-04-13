import type { Notice } from '@/types';

export const mockNotices: Notice[] = [
  { id: 'n1', createdAt: '2026-04-10', title: '4월 과제 제출 안내', content: '4월 과제 제출 마감일은 4월 30일입니다. 기한 내 제출 부탁드립니다.', file: '4월_과제안내.pdf' },
  { id: 'n2', createdAt: '2026-04-05', title: '봄학기 시간표 변경 공지', content: '4월 14일부터 수업 시간이 변경됩니다. 새 시간표를 확인해주세요.' },
  { id: 'n3', createdAt: '2026-03-28', title: '모의고사 일정 안내', content: '4월 모의고사가 4월 20일에 진행됩니다. 준비물을 확인하세요.' },
  { id: 'n4', createdAt: '2026-03-15', title: '수강료 결제 안내', content: '4월 수강료 결제 기간은 3월 20일~31일입니다.' },
  { id: 'n5', createdAt: '2026-03-01', title: '봄학기 개강 안내', content: '봄학기 수업이 3월 3일부터 시작됩니다. 교재를 준비해주세요.', file: '봄학기_교재목록.pdf' },
];
