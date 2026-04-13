import type { Question } from '@/types';

export const mockQuestions: Question[] = [
  { id: 'q1', courseCode: 'I2', courseName: '2026년 I2', chapter: '자수, 로그 > 추가문제', category: '자수', studentName: '정하나', content: '로그 함수의 그래프에서 점근선이 왜 x축이 아니라 y축인지 이해가 안 됩니다.', createdAt: '2026-04-10 09:30', status: '대기' },
  { id: 'q2', courseCode: 'H3_미적', courseName: '2026년 H3 미적분', chapter: '미분법 > 도함수의 활용', category: '미분', studentName: '홍길동', content: '접선의 기울기를 구할 때 미분계수와 도함수의 차이점이 헷갈립니다.', createdAt: '2026-04-09 18:45', status: '대기' },
  { id: 'q3', courseCode: 'H3_미적', courseName: '2026년 H3 미적분', chapter: '적분법 > 정적분', category: '적분', studentName: '김영희', content: '정적분의 기하학적 의미에서 음수 넓이가 나올 때 어떻게 처리하나요?', createdAt: '2026-04-09 14:20', status: '완료', answer: '정적분에서 x축 아래 부분은 음수로 계산됩니다. 넓이를 구할 때는 절댓값을 씌워야 합니다.' },
  { id: 'q4', courseCode: 'H2', courseName: '2026년 H2', chapter: '함수 > 이차함수', category: '함수', studentName: '박철수', content: '이차함수의 최댓값과 최솟값을 정의역이 제한될 때 어떻게 구하나요?', createdAt: '2026-04-08 20:10', status: '완료', answer: '정의역이 제한되면 꼭짓점이 범위 안에 있는지 먼저 확인하세요. 범위 안이면 꼭짓점에서 최댓값/최솟값, 밖이면 양 끝점에서 비교합니다.' },
  { id: 'q5', courseCode: 'I3', courseName: '2026년 I3', chapter: '통계 > 상관관계', category: '통계', studentName: '최민준', content: '산점도에서 상관관계가 없는 경우와 약한 상관관계의 차이를 어떻게 구분하나요?', createdAt: '2026-04-07 16:00', status: '대기' },
];
