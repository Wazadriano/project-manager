import { getProjects, saveProjects } from '../models/projectModel.js';
import { renderProjectDetail } from './projectDetail.js';
import { renderProjectForm } from './forms.js';

export function renderProjectList() {
  const app = document.getElementById("app");
  const projects = getProjects();

  app.innerHTML = `
    <h1>Liste des projets</h1>
    <button id="btn-new-project">Nouveau projet</button>
    <ul>
      ${projects.map(p => `<li data-id="${p.id}">${p.title}</li>`).join('')}
    </ul>
  `;

  document.querySelectorAll("li[data-id]").forEach(li => {
    li.addEventListener("click", () => {
      const project = projects.find(p => p.id === li.dataset.id);
      renderProjectDetail(project);
    });
  });

  document.getElementById("btn-new-project").addEventListener("click", () => {
    renderProjectForm(newProject => {
      projects.push(newProject);
      saveProjects(projects);
      renderProjectList();
    });
  });
}
