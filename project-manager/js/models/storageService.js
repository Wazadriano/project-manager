export function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadData(key) {
  return JSON.parse(localStorage.getItem(key));
}
