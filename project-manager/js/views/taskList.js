import { getTasks, saveTasks } from '../models/taskModel.js';
import { renderTaskForm } from './forms.js';

export function renderTaskList(projectId) {
  let tasks = getTasks().filter(t => t.projectId === projectId);
  const container = document.createElement("div");

  const render = (filteredTasks) => {
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
        ${filteredTasks.map(t => `
          <li>
            <strong>${t.title}</strong> - ${t.status}<br/>
            Priorité : ${t.priority} | Assigné à : ${t.assignedTo}<br/>
            <small>${t.description || ""}</small><br/>
            <button class="edit-task" data-id="${t.id}">Modifier</button>
            <button class="delete-task" data-id="${t.id}">Supprimer</button>
          </li>`).join('')}
      </ul>
    `;

    container.querySelector("#filter").addEventListener("change", (e) => {
      const value = e.target.value;
      const filtered = value ? tasks.filter(t => t.status === value) : tasks;
      render(filtered);
    });

    container.querySelectorAll(".edit-task").forEach(btn => {
      btn.addEventListener("click", () => {
        const task = tasks.find(t => t.id === btn.dataset.id);
        renderTaskForm(projectId, updated => {
          const index = tasks.findIndex(t => t.id === task.id);
          tasks[index] = { ...task, ...updated };
          saveTasks(tasks);
          render(tasks);
        }, task);
      });
    });

    container.querySelectorAll(".delete-task").forEach(btn => {
      btn.addEventListener("click", () => {
        const confirmed = confirm("Supprimer cette tâche ?");
        if (!confirmed) return;
        tasks = tasks.filter(t => t.id !== btn.dataset.id);
        saveTasks(tasks);
        render(tasks);
      });
    });
  };

  render(tasks);
  return container;
}
