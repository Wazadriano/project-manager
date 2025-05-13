import { router } from "./utils/router.js";
import { exportAllData, importAllData } from './models/storageService.js';

document.addEventListener("DOMContentLoaded", () => {
  router.goTo("home");

  // Gère les boutons fixes présents dans index.html
  document.getElementById("dashboard-btn").addEventListener("click", () => {
    router.goTo("dashboard");
  });

  document.getElementById("export-btn").addEventListener("click", () => {
    const data = exportAllData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "backup.json";
    a.click();
  });

  document.getElementById("import-file").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (event) {
      const data = JSON.parse(event.target.result);
      importAllData(data);
      router.goTo("home");
    };
    reader.readAsText(file);
  });
});
