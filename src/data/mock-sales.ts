import type { SalesPeriodData, SalesProductData } from '@/types';

export const mockSalesPeriod: SalesPeriodData[] = [
  { date: '2026-03-01', count: 3, amount: 450000 },
  { date: '2026-03-02', count: 1, amount: 200000 },
  { date: '2026-03-03', count: 2, amount: 350000 },
  { date: '2026-03-04', count: 0, amount: 0 },
  { date: '2026-03-05', count: 4, amount: 620000 },
  { date: '2026-03-06', count: 2, amount: 300000 },
  { date: '2026-03-07', count: 1, amount: 150000 },
  { date: '2026-03-08', count: 3, amount: 480000 },
  { date: '2026-03-09', count: 5, amount: 750000 },
  { date: '2026-03-10', count: 2, amount: 330000 },
  { date: '2026-03-11', count: 1, amount: 200000 },
  { date: '2026-03-12', count: 3, amount: 500000 },
  { date: '2026-03-13', count: 2, amount: 360000 },
  { date: '2026-03-14', count: 4, amount: 600000 },
  { date: '2026-03-15', count: 1, amount: 200000 },
];

export const mockSalesProduct: SalesProductData[] = [
  { productName: '고3 미적분', salesCount: 12, salesAmount: 2400000, refundAmount: 200000, netSalesAmount: 2200000 },
  { productName: '고3 기하', salesCount: 8, salesAmount: 1600000, refundAmount: 0, netSalesAmount: 1600000 },
  { productName: '고3 확률과통계', salesCount: 6, salesAmount: 1200000, refundAmount: 100000, netSalesAmount: 1100000 },
  { productName: '고2 수학', salesCount: 10, salesAmount: 1800000, refundAmount: 180000, netSalesAmount: 1620000 },
  { productName: '고1 수학', salesCount: 15, salesAmount: 2250000, refundAmount: 0, netSalesAmount: 2250000 },
  { productName: '중3 수학', salesCount: 9, salesAmount: 1080000, refundAmount: 120000, netSalesAmount: 960000 },
  { productName: '중2 수학', salesCount: 7, salesAmount: 700000, refundAmount: 50000, netSalesAmount: 650000 },
  { productName: '수능 실전모의고사', salesCount: 4, salesAmount: 1000000, refundAmount: 0, netSalesAmount: 1000000 },
];
