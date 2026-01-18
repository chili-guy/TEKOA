(() => {
  const API = "/api";
  const STORAGE_KEY = "tekoa_selection";

  const defaultSelection = {
    psychologistId: "psy-1",
    scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    packageCode: "pkg-4",
  };

  const getSelection = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? { ...defaultSelection, ...JSON.parse(raw) } : { ...defaultSelection };
    } catch {
      return { ...defaultSelection };
    }
  };

  const setSelection = (patch) => {
    const next = { ...getSelection(), ...patch };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  };

  const showToast = (message, type = "info") => {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.position = "fixed";
    toast.style.bottom = "24px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.padding = "10px 16px";
    toast.style.borderRadius = "999px";
    toast.style.background = type === "error" ? "#ef4444" : "#111827";
    toast.style.color = "#fff";
    toast.style.fontSize = "14px";
    toast.style.zIndex = "9999";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2600);
  };

  const apiRequest = async (path, options = {}) => {
    const response = await fetch(`${API}${path}`, {
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      ...options,
    });
    if (response.status === 401) {
      showToast("Faça login para continuar.", "error");
      window.location.href = "entrada.html";
      return null;
    }
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      showToast(data.error || "Erro na solicitação.", "error");
      return null;
    }
    return data;
  };

  const handleClick = async (event) => {
    const target = event.target.closest("[data-action]");
    if (!target) return;
    const action = target.dataset.action;

    if (action === "select-psychologist") {
      const psychologistId = target.dataset.psychologistId;
      if (psychologistId) setSelection({ psychologistId });
      return;
    }

    if (action === "set-schedule") {
      event.preventDefault();
      const scheduledAt = target.dataset.scheduledAt;
      setSelection({ scheduledAt: scheduledAt || defaultSelection.scheduledAt });
      window.location.href = target.getAttribute("href") || "consulta-pacote.html";
      return;
    }

    if (action === "select-package") {
      event.preventDefault();
      const packageCode = target.dataset.packageCode || "pkg-4";
      setSelection({ packageCode });
      window.location.href = target.getAttribute("href") || "consulta-checkout.html";
      return;
    }

    if (action === "checkout") {
      event.preventDefault();
      const selection = getSelection();
      const result = await apiRequest("/checkout", {
        method: "POST",
        body: JSON.stringify(selection),
      });
      if (result?.ok) {
        window.location.href = "consulta-confirmacao.html";
      }
      return;
    }

    if (action === "test-result") {
      event.preventDefault();
      const testId = target.dataset.testId;
      const result = await apiRequest("/test-results", {
        method: "POST",
        body: JSON.stringify({
          testId,
          score: Math.floor(Math.random() * 20) + 1,
          result: "Concluído",
        }),
      });
      if (result?.ok) {
        showToast("Teste registrado com sucesso.");
        window.location.href = target.dataset.redirect || "tests-saude.html";
      }
      return;
    }

    if (action === "event-signup") {
      event.preventDefault();
      const eventId = target.dataset.eventId;
      if (!eventId) return;
      const result = await apiRequest(`/events/${eventId}/signup`, { method: "POST" });
      if (result?.ok) {
        showToast("Inscrição confirmada!");
        window.location.href = target.dataset.redirect || "eventos-proximos.html";
      }
    }
  };

  document.addEventListener("click", handleClick);
})();

