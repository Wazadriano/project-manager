import { renderProjectList } from "../views/projectList.js";
import { renderDashboard } from "../views/dashboard.js";
import { renderProjectForm } from "../views/forms.js";
import { getProjects } from "../models/projectModel.js";
import { getTasks } from "../models/taskModel.js";

export const router = {
  goTo(view, data = null) {
    const app = document.getElementById("app");
    app.className = ""; // Reset view-specific class
    switch(view) {
      case "home":
        app.classList.add("app-home");
        renderProjectList();
        break;
      case "dashboard":
        app.classList.add("app-dashboard");
        renderDashboard(getProjects(), getTasks());
        break;
      case "form":
        app.classList.add("app-form");
        renderProjectForm(() => router.goTo("home"), data);
        break;
      default:
        app.innerHTML = "<p>Page inconnue</p>";
    }
  }
};
