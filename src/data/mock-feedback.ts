import type { AIFeedback } from '@/types';

export const mockFeedback: AIFeedback[] = [
  {
    id: 'f1', submitDate: '2026-04-09 18:30', checkDate: '2026-04-10 02:15', status: '통과',
    courseCode: 'H3_미적', studentName: '홍길동', assignmentLink: 'https://youtu.be/example1',
    feedbackGood: ['미분 개념을 정확히 이해하고 풀이에 적용함', '풀이 과정이 체계적이고 논리적임', '그래프를 활용하여 시각적으로 설명한 점이 우수'],
    feedbackBad: ['극값 판별 시 이계도함수를 활용하지 않음', '풀이 시간이 다소 길어 실전에서는 시간 관리가 필요'],
  },
  {
    id: 'f2', submitDate: '2026-04-09 20:00', checkDate: '2026-04-10 03:00', status: '통과',
    courseCode: 'H3_미적', studentName: '김영희', assignmentLink: 'https://youtu.be/example2',
    feedbackGood: ['적분 공식 활용이 매우 능숙함', '다양한 풀이 방법을 시도하여 최적해를 찾음'],
    feedbackBad: ['부분적분 시 부호 처리에 실수가 있음'],
  },
  {
    id: 'f3', submitDate: '2026-04-08 15:45', checkDate: '2026-04-09 01:30', status: '통과',
    courseCode: 'I3', studentName: '최민준', assignmentLink: 'https://youtu.be/example3',
    feedbackGood: ['이차함수 그래프의 이동 변환을 정확히 이해함', '꼼꼼한 계산 과정'],
    feedbackBad: ['판별식 활용 문제에서 조건 해석이 미흡', '서술형 답안 작성 시 결론을 명확히 기술하지 않음'],
  },
  {
    id: 'f4', submitDate: '2026-04-07 21:10', checkDate: '', status: '대기',
    courseCode: 'H2', studentName: '박철수', assignmentLink: 'https://youtu.be/example4',
    feedbackGood: [], feedbackBad: [],
  },
];
