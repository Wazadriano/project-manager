import { renderProjectList } from './views/projectList.js';
import { eventBus } from './utils/events.js';

document.addEventListener("DOMContentLoaded", () => {
  renderProjectList();
});

import { getProjects } from './models/projectModel.js';
import { getTasks } from './models/taskModel.js';
import { renderDashboard } from './views/dashboard.js';
import { exportAllData, importAllData } from './models/storageService.js';

document.getElementById("dashboard-btn").addEventListener("click", () => {
  renderDashboard(getProjects(), getTasks());
});

document.getElementById("export-btn").addEventListener("click", () => {
  const data = exportAllData();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "backup.json";
  a.click();
});

document.getElementById("import-file").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (event) {
    const data = JSON.parse(event.target.result);
    importAllData(data);
    renderProjectList();
  };
  reader.readAsText(file);
});
