import './style.css';
import { formatTime, calculateCompletionRate, filterTasks, sortTasksByPriority } from './utils/helpers.js';

// --- State ---
let tasks = JSON.parse(localStorage.getItem('zen_tasks')) || [
  { id: 1, text: 'Thiết lập workflow GitHub Actions 5 bước CI/CD', completed: true, priority: 'high' },
  { id: 2, text: 'Viết Unit Test cho các tiện ích xử lý dữ liệu', completed: true, priority: 'medium' },
  { id: 3, text: 'Hoàn thiện giao diện đồ án Zen TaskFlow Pro', completed: false, priority: 'high' }
];

let currentFilter = 'all';

// Pomodoro Timer State
const POMODORO_MODES = {
  work: { time: 25 * 60, label: 'Thời gian làm việc tập trung' },
  shortBreak: { time: 5 * 60, label: 'Nghỉ giải lao ngắn' },
  longBreak: { time: 15 * 60, label: 'Nghỉ giải lao dài' }
};

let currentMode = 'work';
let timeLeft = POMODORO_MODES.work.time;
let timerId = null;
let isRunning = false;

// --- DOM Elements ---
const timerDisplay = document.getElementById('timer-display');
const timerLabel = document.getElementById('timer-label');
const timerCircle = document.getElementById('timer-circle');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const modeButtons = document.querySelectorAll('.mode-btn');

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const prioritySelect = document.getElementById('priority-select');
const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('.filter-btn');

const totalCountEl = document.getElementById('total-count');
const completionRateEl = document.getElementById('completion-rate');
const progressBarEl = document.getElementById('progress-bar');

// --- Functions ---

// 1. Pomodoro Functions
function updateTimerDisplay() {
  if (timerDisplay) {
    timerDisplay.textContent = formatTime(timeLeft);
  }
  if (timerLabel) {
    timerLabel.textContent = POMODORO_MODES[currentMode].label;
  }
}

function startTimer() {
  if (isRunning) {
    // Pause
    clearInterval(timerId);
    isRunning = false;
    startBtn.innerHTML = `<span>▶</span> Tiếp tục`;
    timerCircle.classList.remove('running');
  } else {
    // Start
    isRunning = true;
    startBtn.innerHTML = `<span>⏸</span> Tạm dừng`;
    timerCircle.classList.add('running');
    
    timerId = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimerDisplay();
      } else {
        clearInterval(timerId);
        isRunning = false;
        startBtn.innerHTML = `<span>▶</span> Bắt đầu`;
        timerCircle.classList.remove('running');
        alert(`🎉 Hoàn thành chặng: ${POMODORO_MODES[currentMode].label}! Hãy nghỉ ngơi chút nhé.`);
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(timerId);
  isRunning = false;
  timeLeft = POMODORO_MODES[currentMode].time;
  if (startBtn) startBtn.innerHTML = `<span>▶</span> Bắt đầu`;
  if (timerCircle) timerCircle.classList.remove('running');
  updateTimerDisplay();
}

function switchMode(mode) {
  currentMode = mode;
  modeButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
  resetTimer();
}

// 2. Task Management Functions
function saveTasks() {
  localStorage.setItem('zen_tasks', JSON.stringify(tasks));
  renderTasks();
  updateStats();
}

function addTask(text, priority) {
  const newTask = {
    id: Date.now(),
    text: text.trim(),
    completed: false,
    priority: priority || 'medium'
  };
  tasks.unshift(newTask);
  saveTasks();
}

function toggleTask(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  saveTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
}

function updateStats() {
  if (totalCountEl) {
    totalCountEl.textContent = tasks.length;
  }
  const rate = calculateCompletionRate(tasks);
  if (completionRateEl) {
    completionRateEl.textContent = `${rate}%`;
  }
  if (progressBarEl) {
    progressBarEl.style.width = `${rate}%`;
  }
}

function renderTasks() {
  if (!taskList) return;
  
  let filtered = filterTasks(tasks, currentFilter);
  filtered = sortTasksByPriority(filtered);
  
  if (filtered.length === 0) {
    taskList.innerHTML = `
      <div class="empty-state">
        <div style="font-size: 2.5rem;">📝</div>
        <p>Không có công việc nào trong danh sách này.</p>
      </div>
    `;
    return;
  }

  taskList.innerHTML = filtered.map(task => `
    <li class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
      <div class="task-checkbox-group" onclick="window.toggleTaskById(${task.id})">
        <div class="custom-checkbox"></div>
        <span class="task-text">${task.text}</span>
      </div>
      <div class="task-badges">
        <span class="priority-badge priority-${task.priority}">
          ${task.priority === 'high' ? '🔥 Cao' : task.priority === 'medium' ? '⚡ Trung bình' : '🌱 Thấp'}
        </span>
        <button class="delete-btn" onclick="window.deleteTaskById(${task.id})" title="Xóa công việc">
          ✕
        </button>
      </div>
    </li>
  `).join('');
}

// --- Event Listeners & Global Handlers ---
window.toggleTaskById = (id) => toggleTask(id);
window.deleteTaskById = (id) => deleteTask(id);

if (startBtn) startBtn.addEventListener('click', startTimer);
if (resetBtn) resetBtn.addEventListener('click', resetTimer);

modeButtons.forEach(btn => {
  btn.addEventListener('click', () => switchMode(btn.dataset.mode));
});

if (taskForm) {
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value;
    if (text.trim()) {
      addTask(text, prioritySelect.value);
      taskInput.value = '';
    }
  });
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

// --- Initial Render ---
updateTimerDisplay();
renderTasks();
updateStats();
