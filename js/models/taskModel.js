import { saveData, loadData } from './storageService.js';

const TASKS_KEY = "tasks";

export function getTasks() {
  return loadData(TASKS_KEY) || [];
}

export function saveTasks(tasks) {
  saveData(TASKS_KEY, tasks);
}
