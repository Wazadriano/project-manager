import { generateId } from '../utils/helpers.js';

export function renderProjectForm(onSubmit, existing = null) {
  const app = document.getElementById("app");
  app.innerHTML = `
    <h2>${existing ? "Modifier" : "Créer"} un projet</h2>
    <form id="project-form">
      <input type="text" id="title" placeholder="Titre" required />
      <textarea id="description" placeholder="Description"></textarea>
      <button type="submit">${existing ? "Mettre à jour" : "Créer"}</button>
    </form>
  `;

  const titleInput = document.getElementById("title");
  const descInput = document.getElementById("description");
  if (existing) {
    titleInput.value = existing.title;
    descInput.value = existing.description;
  }

  document.getElementById("project-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = titleInput.value;
    const description = descInput.value;
    onSubmit({
      ...(existing || { id: generateId(), createdAt: new Date().toISOString() }),
      title,
      description,
      deadline: existing?.deadline || "",
      client: existing?.client || "",
      status: existing?.status || "en cours",
      progress: existing?.progress || 0,
    });
  });
}

export function renderTaskForm(projectId, onSubmit, existing = null) {
  const app = document.getElementById("app");
  app.innerHTML = `
    <h2>${existing ? "Modifier" : "Nouvelle"} tâche</h2>
    <form id="task-form">
      <input type="text" id="title" placeholder="Titre" required />
      <textarea id="description" placeholder="Description"></textarea>
      <input type="text" id="assignedTo" placeholder="Assigné à" />
      <input type="date" id="dueDate" />
      <select id="priority">
        <option value="basse">Basse</option>
        <option value="moyenne">Moyenne</option>
        <option value="haute">Haute</option>
      </select>
      <select id="status">
        <option value="à faire">À faire</option>
        <option value="en cours">En cours</option>
        <option value="terminée">Terminée</option>
        <option value="bloquée">Bloquée</option>
      </select>
      <button type="submit">${existing ? "Mettre à jour" : "Ajouter"}</button>
    </form>
  `;


  if (existing) {
    document.getElementById("title").value = existing.title;
    document.getElementById("description").value = existing.description;
    document.getElementById("assignedTo").value = existing.assignedTo;
    document.getElementById("dueDate").value = existing.dueDate;
    document.getElementById("priority").value = existing.priority;
    document.getElementById("status").value = existing.status;
  }

  document.getElementById("task-form").addEventListener("submit", (e) => {
    e.preventDefault();
    onSubmit({
      ...(existing || { id: generateId(), projectId, createdAt: new Date().toISOString() }),
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      assignedTo: document.getElementById("assignedTo").value,
      dueDate: document.getElementById("dueDate").value,
      priority: document.getElementById("priority").value,
      status: document.getElementById("status").value,
    });
  });
}
