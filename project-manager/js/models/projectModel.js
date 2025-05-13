import { saveData, loadData } from './storageService.js';

const PROJECTS_KEY = "projects";

export function getProjects() {
  return loadData(PROJECTS_KEY) || [];
}

export function saveProjects(projects) {
  saveData(PROJECTS_KEY, projects);
}
