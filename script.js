const qs = (selector) => document.querySelector(selector);

document.querySelectorAll("[data-social]").forEach((button) => {
  button.addEventListener("click", () => {
    const provider = button.getAttribute("data-social");
    if (!provider) return;
    window.location.href = `/auth/${provider}`;
  });
});

const loginModal = qs("[data-login-modal]");
const openLoginButton = qs("[data-open-login]");
const closeLoginButton = qs("[data-login-close]");
const loginSubmitButton = qs("[data-login-submit]");

if (openLoginButton && loginModal) {
  openLoginButton.addEventListener("click", () => {
    loginModal.classList.add("open");
  });
}

if (closeLoginButton && loginModal) {
  closeLoginButton.addEventListener("click", () => {
    loginModal.classList.remove("open");
  });
}

if (loginModal) {
  loginModal.addEventListener("click", (event) => {
    if (event.target === loginModal) {
      loginModal.classList.remove("open");
    }
  });
}

if (loginSubmitButton) {
  loginSubmitButton.addEventListener("click", async () => {
    const email = qs("[data-login-email]")?.value?.trim();
    const password = qs("[data-login-password]")?.value;
    const status = qs("[data-login-status]");
    if (!email || !password) {
      if (status) status.textContent = "Informe e-mail e senha.";
      return;
    }
    if (status) status.textContent = "Entrando...";
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      if (status) status.textContent = data.error || "Erro ao entrar.";
      return;
    }
    if (status) status.textContent = "Login realizado.";
    window.location.href = "/planos.html";
  });
}

const registerButton = qs("[data-register-submit]");
if (registerButton) {
  registerButton.addEventListener("click", async () => {
    const payload = {
      name: qs("[data-register-name]")?.value?.trim(),
      email: qs("[data-register-email]")?.value?.trim(),
      phone: qs("[data-register-phone]")?.value?.trim(),
      country: qs("[data-register-country]")?.value?.trim(),
      passport: qs("[data-register-passport]")?.value?.trim(),
      age: qs("[data-register-age]")?.value?.trim(),
      gender: qs("[data-register-gender]")?.value?.trim(),
      password: qs("[data-register-password]")?.value,
    };
    const status = qs("[data-register-status]");
    if (!payload.name || !payload.email || !payload.password) {
      if (status) status.textContent = "Preencha nome, e-mail e senha.";
      return;
    }
    if (status) status.textContent = "Criando conta...";
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      if (status) status.textContent = data.error || "Erro ao cadastrar.";
      return;
    }
    if (status) status.textContent = "Conta criada. Redirecionando...";
    window.location.href = "/planos.html";
  });
}

const userStatus = qs("[data-user-status]");
if (userStatus) {
  fetch("/api/me")
    .then((res) => res.json())
    .then((data) => {
      if (data?.authenticated && data.user) {
        userStatus.textContent = `Olá, ${data.user.name}`;
      }
    })
    .catch(() => {});
}

