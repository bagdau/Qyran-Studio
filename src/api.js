const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const API_PREFIX = `${API_URL}/api/v1`;

async function request(path, options = {}) {
  const response = await fetch(`${API_PREFIX}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (response.status === 204) return null;

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(payload?.detail || "API сұрауын орындау мүмкін болмады.");
  }
  return payload;
}

export const api = {
  listProjects: () => request("/projects"),
  createProject: (project) =>
    request("/projects", { method: "POST", body: JSON.stringify(project) }),
  createScene: (projectId, scene) =>
    request(`/projects/${projectId}/scenes`, {
      method: "POST",
      body: JSON.stringify(scene),
    }),
  listAssets: () => request("/assets"),
};
