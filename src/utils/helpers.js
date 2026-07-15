/**
 * Định dạng số giây thành chuỗi MM:SS (ví dụ: 1500 -> "25:00")
 * @param {number} seconds 
 * @returns {string}
 */
export function formatTime(seconds) {
  if (typeof seconds !== 'number' || seconds < 0 || isNaN(seconds)) {
    return '00:00';
  }
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const minsStr = mins < 10 ? `0${mins}` : `${mins}`;
  const secsStr = secs < 10 ? `0${secs}` : `${secs}`;
  return `${minsStr}:${secsStr}`;
}

/**
 * Tính toán tỷ lệ hoàn thành công việc theo phần trăm (0 - 100)
 * @param {Array} tasks Danh sách các công việc
 * @returns {number} Phần trăm hoàn thành
 */
export function calculateCompletionRate(tasks) {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return 0;
  }
  const completedCount = tasks.filter(task => task.completed).length;
  return Math.round((completedCount / tasks.length) * 100);
}

/**
 * Lọc danh sách công việc theo trạng thái
 * @param {Array} tasks Danh sách công việc
 * @param {string} filter 'all' | 'active' | 'completed' | 'high-priority'
 * @returns {Array} Danh sách đã lọc
 */
export function filterTasks(tasks, filter = 'all') {
  if (!Array.isArray(tasks)) return [];
  switch (filter) {
    case 'active':
      return tasks.filter(task => !task.completed);
    case 'completed':
      return tasks.filter(task => task.completed);
    case 'high-priority':
      return tasks.filter(task => task.priority === 'high');
    case 'all':
    default:
      return tasks;
  }
}

/**
 * Sắp xếp công việc theo mức độ ưu tiên (high -> medium -> low)
 * @param {Array} tasks 
 * @returns {Array} Danh sách đã sắp xếp
 */
export function sortTasksByPriority(tasks) {
  if (!Array.isArray(tasks)) return [];
  const priorityMap = { high: 3, medium: 2, low: 1 };
  return [...tasks].sort((a, b) => {
    const pA = priorityMap[a.priority] || 0;
    const pB = priorityMap[b.priority] || 0;
    return pB - pA;
  });
}
