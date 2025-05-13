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
      ${projects.map(p => `
        <li data-id="${p.id}">
          <strong>${p.title}</strong><br/>
          <button class="btn-view" data-id="${p.id}">Voir</button>
          <button class="btn-edit" data-id="${p.id}">Modifier</button>
          <button class="btn-delete" data-id="${p.id}">Supprimer</button>
        </li>
      `).join('')}
    </ul>
  `;

  document.querySelectorAll(".btn-view").forEach(btn => {
    btn.addEventListener("click", () => {
      const project = projects.find(p => p.id === btn.dataset.id);
      renderProjectDetail(project);
    });
  });

  document.querySelectorAll(".btn-edit").forEach(btn => {
    btn.addEventListener("click", () => {
      const project = projects.find(p => p.id === btn.dataset.id);
      renderProjectForm(updated => {
        const index = projects.findIndex(p => p.id === project.id);
        projects[index] = { ...project, ...updated };
        saveProjects(projects);
        renderProjectList();
      }, project);
    });
  });

  document.querySelectorAll(".btn-delete").forEach(btn => {
    btn.addEventListener("click", () => {
      const confirmed = confirm("Supprimer ce projet ?");
      if (!confirmed) return;
      const index = projects.findIndex(p => p.id === btn.dataset.id);
      projects.splice(index, 1);
      saveProjects(projects);
      renderProjectList();
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
