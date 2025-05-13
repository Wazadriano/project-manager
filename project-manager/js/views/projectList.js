import { getProjects } from '../models/projectModel.js';

export function renderProjectList() {
  const app = document.getElementById("app");
  const projects = getProjects();
  app.innerHTML = `
    <h1>Liste des projets</h1>
    <ul>
      ${projects.map(p => `<li>${p.title}</li>`).join('')}
    </ul>
  `;
}
