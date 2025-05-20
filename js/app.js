import { renderProjectList } from './views/projectList.js';
import { renderProjectForm } from './views/forms.js';
import { renderDashboard } from './views/dashboard.js';
import { renderProjectDetail } from './views/projectDetail.js';
import { getProjects, saveProjects } from './models/projectModel.js';
import { getTasks } from './models/taskModel.js';

document.addEventListener("DOMContentLoaded", () => {
  renderProjectList();

  const dashboardBtn = document.getElementById("dashboard-btn");
  const createBtn = document.getElementById("create-btn");

  if (dashboardBtn)
    dashboardBtn.addEventListener("click", () => {
      renderDashboard(getProjects(), getTasks());
    });

  if (createBtn)
    createBtn.addEventListener("click", () => {
      renderProjectForm((newProject) => {
        const projects = getProjects();
        projects.push(newProject);
        saveProjects(projects);
        renderProjectDetail(newProject);
      });
    });
});
