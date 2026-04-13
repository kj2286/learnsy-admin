import type { Shipping } from '@/types';

export const mockShipping: Shipping[] = [
  { id: 'sh1', registeredDate: '2026-04-08', deliveryPartner: '학원 직배송', deliveryName: 'PREP 수학 개념편', ordererName: '홍길동', email: 'hong@naver.com', phone: '010-1234-5678', address: '서울시 강남구 테헤란로 123', detailAddress: '4층 401호', zipCode: '06234', trackingNumber: '1234567890', deliveryCompany: 'CJ대한통운' },
  { id: 'sh2', registeredDate: '2026-04-07', deliveryPartner: '학원 직배송', deliveryName: 'PREP 수학 유형편', ordererName: '김영희', email: 'kim@gmail.com', phone: '010-2345-6789', address: '서울시 서초구 반포대로 45', detailAddress: '아파트 302동 1501호', zipCode: '06500', trackingNumber: '9876543210', deliveryCompany: '한진' },
  { id: 'sh3', registeredDate: '2026-04-05', deliveryPartner: '출판사 직송', deliveryName: 'PREP 기출문제집', ordererName: '이수진', email: 'lee@kakao.com', phone: '010-4567-8901', address: '경기도 성남시 분당구 판교로 200', detailAddress: '상가 B동 103호', zipCode: '13494', trackingNumber: '', deliveryCompany: '롯데글로벌로지스' },
  { id: 'sh4', registeredDate: '2026-04-03', deliveryPartner: '학원 직배송', deliveryName: 'PREP 수학 개념편', ordererName: '최민준', email: 'choi@naver.com', phone: '010-5678-9012', address: '인천시 연수구 송도대로 100', detailAddress: '빌라 201호', zipCode: '21900', trackingNumber: '5555666677', deliveryCompany: '우정사업본부' },
];
