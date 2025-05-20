import { generateId } from '../utils/helpers.js';

export function renderProjectForm(onSubmit) {
  const app = document.getElementById("app");
  app.innerHTML = `
    <h2>Créer un projet de développement</h2>
    <form id="project-form">
      <input type="text" id="project-title" placeholder="Titre du projet" required />
      <textarea id="description" placeholder="Description fonctionnelle"></textarea>
      <input type="text" id="client" placeholder="Client (facultatif)" />
      <input type="date" id="deadline" placeholder="Date de livraison prévue" />
      <input type="text" id="technos" placeholder="Technologies utilisées (ex: Vue, Node.js)" />
      <button type="submit">Créer</button>
    </form>
  `;

  document.getElementById("project-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("project-title").value.trim();
    const description = document.getElementById("description").value.trim();
    const client = document.getElementById("client").value.trim();
    const deadline = document.getElementById("deadline").value;
    const technos = document.getElementById("technos").value.trim();

    onSubmit({
      id: generateId(),
      title,
      description,
      client,
      deadline,
      technos: technos.split(',').map(t => t.trim()),
      createdAt: new Date().toISOString(),
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
      <input type="text" id="task-title" placeholder="Titre de la tâche" required />
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
      title: document.getElementById("task-title").value.trim(),
      status: document.getElementById("status").value,
      description: "",
      priority: "moyenne",
      assignedTo: "non assignée",
      createdAt: new Date().toISOString(),
      dueDate: ""
    });
  });
}
