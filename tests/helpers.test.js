import { describe, it, expect } from 'vitest';
import { formatTime, calculateCompletionRate, filterTasks, sortTasksByPriority } from '../src/utils/helpers.js';

describe('Helpers Utility Tests', () => {
  describe('formatTime', () => {
    it('định dạng chính xác số giây thành MM:SS', () => {
      expect(formatTime(1500)).toBe('25:00');
      expect(formatTime(65)).toBe('01:05');
      expect(formatTime(9)).toBe('00:09');
      expect(formatTime(0)).toBe('00:00');
    });

    it('xử lý các giá trị không hợp lệ trả về 00:00', () => {
      expect(formatTime(-10)).toBe('00:00');
      expect(formatTime(null)).toBe('00:00');
      expect(formatTime('abc')).toBe('00:00');
    });
  });

  describe('calculateCompletionRate', () => {
    it('tính toán chính xác phần trăm hoàn thành', () => {
      const tasks = [
        { id: 1, completed: true },
        { id: 2, completed: false },
        { id: 3, completed: true },
        { id: 4, completed: false }
      ];
      expect(calculateCompletionRate(tasks)).toBe(50);
    });

    it('trả về 0 khi danh sách rỗng hoặc không hợp lệ', () => {
      expect(calculateCompletionRate([])).toBe(0);
      expect(calculateCompletionRate(null)).toBe(0);
    });
  });

  describe('filterTasks', () => {
    const mockTasks = [
      { id: 1, text: 'Task 1', completed: true, priority: 'high' },
      { id: 2, text: 'Task 2', completed: false, priority: 'medium' },
      { id: 3, text: 'Task 3', completed: false, priority: 'high' }
    ];

    it('lọc chính xác theo trạng thái active', () => {
      const active = filterTasks(mockTasks, 'active');
      expect(active).toHaveLength(2);
      expect(active[0].id).toBe(2);
    });

    it('lọc chính xác theo trạng thái completed', () => {
      const completed = filterTasks(mockTasks, 'completed');
      expect(completed).toHaveLength(1);
      expect(completed[0].id).toBe(1);
    });

    it('lọc chính xác theo độ ưu tiên cao (high-priority)', () => {
      const high = filterTasks(mockTasks, 'high-priority');
      expect(high).toHaveLength(2);
    });
  });

  describe('sortTasksByPriority', () => {
    it('sắp xếp công việc theo thứ tự high -> medium -> low', () => {
      const tasks = [
        { id: 1, priority: 'low' },
        { id: 2, priority: 'high' },
        { id: 3, priority: 'medium' }
      ];
      const sorted = sortTasksByPriority(tasks);
      expect(sorted[0].priority).toBe('high');
      expect(sorted[1].priority).toBe('medium');
      expect(sorted[2].priority).toBe('low');
    });
  });
});
