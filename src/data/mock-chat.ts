import type { ChatRoom, ChatMessage } from '@/types';

export const mockChatRooms: ChatRoom[] = [
  { id: 'r1', teacherName: '김수학', studentName: '홍길동', studentPhone: '010-1234-5678', lastMessage: '선생님 과제 제출했습니다!', lastMessageTime: '오후 2:30', unreadCount: 2, isRead: false },
  { id: 'r2', teacherName: '김수학', studentName: '김영희', studentPhone: '010-2345-6789', lastMessage: '잘했어요! 다음 단원도 화이팅', lastMessageTime: '오전 11:00', unreadCount: 0, isRead: true },
  { id: 'r3', teacherName: '이정석', studentName: '박철수', studentPhone: '010-3456-7890', lastMessage: '이 문제 풀이 영상 참고하세요', lastMessageTime: '어제', unreadCount: 1, isRead: false },
  { id: 'r4', teacherName: '박미래', studentName: '최민준', studentPhone: '010-5678-9012', lastMessage: '감사합니다 선생님!', lastMessageTime: '4월 8일', unreadCount: 0, isRead: true },
  { id: 'r5', teacherName: '박미래', studentName: '정하나', studentPhone: '010-6789-0123', lastMessage: '숙제 범위가 어디까지인가요?', lastMessageTime: '4월 7일', unreadCount: 3, isRead: false },
];

export const mockChatMessages: ChatMessage[] = [
  { id: 'm1', roomId: 'r1', sender: 'student', content: '선생님 안녕하세요! 미적분 3단원 과제 질문이 있어요', type: 'text', timestamp: '2026-04-10 14:00' },
  { id: 'm2', roomId: 'r1', sender: 'teacher', content: '네 홍길동 학생, 말씀하세요!', type: 'text', timestamp: '2026-04-10 14:05' },
  { id: 'm3', roomId: 'r1', sender: 'student', content: '이 문제에서 치환적분을 어떻게 적용하는지 모르겠어요', type: 'text', timestamp: '2026-04-10 14:10' },
  { id: 'm4', roomId: 'r1', sender: 'teacher', content: '이 영상을 참고해보세요', type: 'text', timestamp: '2026-04-10 14:15' },
  { id: 'm5', roomId: 'r1', sender: 'teacher', content: 'https://youtu.be/example-substitution', type: 'youtube', timestamp: '2026-04-10 14:15' },
  { id: 'm6', roomId: 'r1', sender: 'student', content: '감사합니다! 영상 보고 다시 풀어볼게요', type: 'text', timestamp: '2026-04-10 14:20' },
  { id: 'm7', roomId: 'r1', sender: 'student', content: '선생님 과제 제출했습니다!', type: 'text', timestamp: '2026-04-10 14:30' },
  { id: 'm8', roomId: 'r2', sender: 'teacher', content: '김영희 학생 이번 과제 잘했어요!', type: 'text', timestamp: '2026-04-10 10:50' },
  { id: 'm9', roomId: 'r2', sender: 'student', content: '감사합니다 선생님 ㅎㅎ', type: 'text', timestamp: '2026-04-10 10:55' },
  { id: 'm10', roomId: 'r2', sender: 'teacher', content: '잘했어요! 다음 단원도 화이팅', type: 'text', timestamp: '2026-04-10 11:00' },
  { id: 'm11', roomId: 'r3', sender: 'student', content: '선생님 확통 문제 이해가 안 돼요', type: 'text', timestamp: '2026-04-09 15:00' },
  { id: 'm12', roomId: 'r3', sender: 'teacher', content: '이 문제 풀이 영상 참고하세요', type: 'text', timestamp: '2026-04-09 15:30' },
  { id: 'm13', roomId: 'r3', sender: 'teacher', content: '', type: 'deleted', timestamp: '2026-04-09 15:31' },
];
