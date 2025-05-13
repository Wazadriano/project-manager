export function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadData(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function exportAllData() {
  return {
    projects: loadData("projects") || [],
    tasks: loadData("tasks") || []
  };
}

export function importAllData(data) {
  saveData("projects", data.projects || []);
  saveData("tasks", data.tasks || []);
}
