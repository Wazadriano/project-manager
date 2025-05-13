import { generateId } from '../utils/helpers.js';

export function renderProjectForm(onSubmit) {
  const app = document.getElementById("app");
  app.innerHTML = `
    <h2>Créer un nouveau projet</h2>
    <form id="project-form">
      <input type="text" id="title" placeholder="Titre" required />
      <textarea id="description" placeholder="Description"></textarea>
      <button type="submit">Créer</button>
    </form>
  `;

  document.getElementById("project-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    onSubmit({
      id: generateId(),
      title,
      description,
      createdAt: new Date().toISOString(),
      deadline: "",
      client: "",
      status: "en cours",
      progress: 0
    });
  });
}

export function renderTaskForm(projectId, onSubmit) {
  const app = document.getElementById("app");
  app.innerHTML = `
    <h2>Nouvelle tâche</h2>
    <form id="task-form">
      <input type="text" id="title" placeholder="Titre de la tâche" required />
      <select id="status">
        <option value="à faire">À faire</option>
        <option value="en cours">En cours</option>
        <option value="terminée">Terminée</option>
        <option value="bloquée">Bloquée</option>
      </select>
      <button type="submit">Ajouter</button>
    </form>
  `;

  document.getElementById("task-form").addEventListener("submit", (e) => {
    e.preventDefault();
    onSubmit({
      id: generateId(),
      projectId,
      title: document.getElementById("title").value,
      status: document.getElementById("status").value,
      description: "",
      priority: "moyenne",
      assignedTo: "non assignée",
      createdAt: new Date().toISOString(),
      dueDate: ""
    });
  });
}
