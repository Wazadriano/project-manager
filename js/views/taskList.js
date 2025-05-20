import { getTasks } from '../models/taskModel.js';

export function renderTaskList(projectId) {
  const tasks = getTasks().filter(t => t.projectId === projectId);
  const container = document.createElement("div");

  container.innerHTML = `
    <h3>Tâches</h3>
    <select id="filter">
      <option value="">-- Filtrer par statut --</option>
      <option value="à faire">À faire</option>
      <option value="en cours">En cours</option>
      <option value="terminée">Terminée</option>
      <option value="bloquée">Bloquée</option>
    </select>
    <ul id="task-list">
      ${tasks.map(t => `<li>${t.title} - ${t.status}</li>`).join('')}
    </ul>
  `;

  container.querySelector("#filter").addEventListener("change", (e) => {
    const filtered = e.target.value
      ? tasks.filter(t => t.status === e.target.value)
      : tasks;
    container.querySelector("#task-list").innerHTML = filtered.map(t =>
      `<li>${t.title} - ${t.status}</li>`
    ).join('');
  });

  return container;
}
