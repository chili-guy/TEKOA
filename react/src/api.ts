export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const message = data?.error || "Erro inesperado.";
    throw new Error(message);
  }

  return response.json();
}

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(path, { credentials: "include" });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const message = data?.error || "Erro inesperado.";
    throw new Error(message);
  }
  return response.json();
}

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

export type MeResponse = {
  authenticated: boolean;
  user?: CurrentUser;
};

export type Appointment = {
  id: string;
  user_id: string;
  psychologist_id: string;
  scheduled_at: string;
  duration_minutes: number;
  status: string;
  package_code: string;
  created_at: string;
};

export type Package = {
  code: string;
  sessions: number;
  price_cents: number;
  discount_cents: number | null;
};

export type Psychologist = {
  id: string;
  name: string;
  title: string;
  price_cents: number;
  rating: number;
  bio: string;
  tags: string[];
  image_url: string | null;
};

export async function getCurrentUser(): Promise<MeResponse> {
  return apiGet<MeResponse>("/api/me");
}

export async function getAppointments(): Promise<Appointment[]> {
  return apiGet<Appointment[]>("/api/appointments");
}

export async function getPackages(): Promise<Package[]> {
  return apiGet<Package[]>("/api/packages");
}

export async function getPsychologists(): Promise<Psychologist[]> {
  return apiGet<Psychologist[]>("/api/psychologists");
}

export async function createAppointment(body: {
  psychologistId: string;
  scheduledAt: string;
  packageCode: string;
}): Promise<{ ok: true; appointmentId: string }> {
  return apiPost<{ ok: true; appointmentId: string }>("/api/appointments", body);
}

