export function renderDashboard(projects, tasks) {
  const app = document.getElementById("app");
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "terminée").length;
  const inProgress = tasks.filter(t => t.status === "en cours").length;
  const pending = tasks.filter(t => t.status === "à faire").length;
  const blocked = tasks.filter(t => t.status === "bloquée").length;

  app.innerHTML = `
    <h2>Tableau de bord</h2>
    <ul>
      <li>Total tâches : ${total}</li>
      <li>Terminées : ${completed}</li>
      <li>En cours : ${inProgress}</li>
      <li>À faire : ${pending}</li>
      <li>Bloquées : ${blocked}</li>
    </ul>
    <button id="btn-back">← Retour</button>
  `;

  document.getElementById("btn-back").addEventListener("click", () => {
    import('./projectList.js').then(module => module.renderProjectList());
  });
}
