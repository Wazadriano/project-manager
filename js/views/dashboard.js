import { renderProjectList } from './projectList.js';


export function renderDashboard(projects, tasks) {
  const app = document.getElementById("app");

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "terminée").length;
  const inProgress = tasks.filter(t => t.status === "en cours").length;
  const pending = tasks.filter(t => t.status === "à faire").length;
  const blocked = tasks.filter(t => t.status === "bloquée").length;

  const percentDone = total > 0 ? Math.round((completed / total) * 100) : 0;

  app.innerHTML = `
    <section class="dashboard">
      <h2>📊 Tableau de bord</h2>

      <ul class="stats">
        <li><strong>Total de tâches :</strong> ${total}</li>
        <li><strong>Terminées :</strong> ${completed}</li>
        <li><strong>En cours :</strong> ${inProgress}</li>
        <li><strong>À faire :</strong> ${pending}</li>
        <li><strong>Bloquées :</strong> ${blocked}</li>
        <li><strong>Progression globale :</strong> ${percentDone}%</li>
      </ul>

      <progress value="${percentDone}" max="100"></progress>

      <button id="btn-delete-project" class="danger">🗑 Supprimer ce projet</button>
      <button id="btn-back">← Retour</button>
    </section>
  `;

  document.getElementById("btn-back").addEventListener("click", () => {
    renderProjectList();
  });
}
