import { getTasks } from '../models/taskModel.js';
import { renderTaskForm } from './forms.js';
import { saveTasks } from '../models/taskModel.js';
import { renderTaskList } from './taskList.js';

export function renderProjectDetail(project) {
  const app = document.getElementById("app");
  const tasks = getTasks().filter(t => t.projectId === project.id);

  app.innerHTML = `
    <h2>Détail du projet</h2>
    <p><strong>Titre :</strong> ${project.title}</p>
    <p><strong>Description :</strong> ${project.description}</p>
    <button id="btn-add-task">Ajouter une tâche</button>
    <div id="task-list-container"></div>
    <button id="btn-back">← Retour</button>
  `;

  document.getElementById("btn-add-task").addEventListener("click", () => {
    renderTaskForm(project.id, newTask => {
      const allTasks = getTasks();
      allTasks.push(newTask);
      saveTasks(allTasks);
      renderProjectDetail(project);
    });
  });

  document.getElementById("btn-back").addEventListener("click", () => {
    import('./projectList.js').then(module => module.renderProjectList());
  });

  document.getElementById("task-list-container").appendChild(renderTaskList(project.id));
}
