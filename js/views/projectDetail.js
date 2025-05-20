import { getTasks, saveTasks } from "../models/taskModel.js";import { renderTaskForm } from "./forms.js";
import { getProjects, saveProjects } from "../models/projectModel.js";
import { renderProjectList } from "./projectList.js";

export function renderProjectDetail(project) {
  const app = document.getElementById("app");
  const tasks = getTasks().filter((t) => t.projectId === project.id);

  app.innerHTML = `
  <h2>Détail du projet</h2>

  <section class="project-info">
    <p><strong>Titre :</strong> ${project.title}</p>
    <p><strong>Description :</strong> ${
      project.description || "Aucune description"
    }</p>
    <p><strong>Client :</strong> ${project.client || "Non renseigné"}</p>
    <p><strong>Livraison prévue :</strong> ${
      project.deadline || "Non définie"
    }</p>
    <p><strong>Technologies :</strong> ${
      Array.isArray(project.technos) && project.technos.length > 0
        ? project.technos.join(", ")
        : "Aucune"
    }</p>
  </section>

  <button id="btn-add-task">➕ Ajouter une tâche</button>

  <h3>Liste des tâches</h3>
  <ul class="task-list">
    ${
      tasks.length > 0
        ? tasks
            .map((t) => `<li>${t.title} – <em>${t.status}</em></li>`)
            .join("")
        : "<li>Aucune tâche pour ce projet.</li>"
    }
  </ul>
<button id="btn-delete-project" class="danger">🗑 Supprimer ce projet</button>

  <button id="btn-back">← Retour</button>
`;

  document.getElementById("btn-add-task").addEventListener("click", () => {
    renderTaskForm(project.id, (newTask) => {
      const allTasks = getTasks();
      allTasks.push(newTask);
      saveTasks(allTasks);
      renderProjectDetail(project);
    });
  });

  document.getElementById("btn-back").addEventListener("click", () => {
    import("./projectList.js").then((module) => module.renderProjectList());
  });

document.getElementById("btn-delete-project").addEventListener("click", () => {
  const confirmDelete = confirm(`Supprimer définitivement le projet "${project.title}" ?`);
  if (!confirmDelete) return;

  const allProjects = getProjects().filter(p => p.id !== project.id);
  saveProjects(allProjects);
  renderProjectList();
});

}