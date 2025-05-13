import { renderProjectList } from './views/projectList.js';
import { eventBus } from './utils/events.js';

document.addEventListener("DOMContentLoaded", () => {
  renderProjectList();
});
