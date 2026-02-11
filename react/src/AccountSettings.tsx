import React from "react";
import { BottomNav } from "./BottomNav";
import { useCurrentUser } from "./hooks/useCurrentUser";

type AccountSettingsProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
  onNavigate?: (screen: string) => void;
};

const STORAGE_KEY = "account-settings";

type AccountFormState = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  language: string;
};

export const AccountSettings = ({
  onSelectTab,
  onNavigate,
}: AccountSettingsProps): JSX.Element => {
  const { data } = useCurrentUser();
  const [form, setForm] = React.useState<AccountFormState>({
    fullName: data?.user?.name ?? "Maria Silva",
    email: data?.user?.email ?? "maria.silva@email.com",
    phone: "(11) 98765-4321",
    country: "Brasil",
    language: "Português",
  });
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AccountFormState;
        setForm((prev) => ({ ...prev, ...parsed }));
      } catch {
        // ignore invalid storage
      }
    }
  }, []);

  React.useEffect(() => {
    if (data?.user) {
      setForm((prev) => ({
        ...prev,
        fullName: data.user.name ?? prev.fullName,
        email: data.user.email ?? prev.email,
      }));
    }
  }, [data?.user]);

  const handleChange = (field: keyof AccountFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (saved) {
      setSaved(false);
    }
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    window.dispatchEvent(new Event("account-settings-updated"));
    setSaved(true);
  };

  return (
    <div className="min-h-screen w-full bg-[#f7fafd] flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen px-4 pb-28 pt-6">
        <header className="flex items-center gap-3">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 shadow-[0_10px_25px_rgba(15,23,42,0.06)]"
            type="button"
            onClick={() => onNavigate?.("profile")}
            aria-label="Voltar"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </button>
          <div>
            <p className="text-sm text-slate-500">Configurações da Conta</p>
            <p className="text-xs text-slate-400">
              Atualize seus dados pessoais
            </p>
          </div>
        </header>

        <section className="mt-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-600">
              Nome Completo
            </label>
            <input
              className="mt-2 w-full rounded-2xl border border-[#e6ecf5] bg-white px-4 py-3 text-sm text-slate-900 shadow-[0_6px_18px_rgba(15,23,42,0.04)] focus:border-[#2d77e3] focus:outline-none"
              value={form.fullName}
              onChange={(event) => handleChange("fullName", event.target.value)}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">E-mail</label>
            <input
              className="mt-2 w-full rounded-2xl border border-[#e6ecf5] bg-white px-4 py-3 text-sm text-slate-900 shadow-[0_6px_18px_rgba(15,23,42,0.04)] focus:border-[#2d77e3] focus:outline-none"
              type="email"
              value={form.email}
              onChange={(event) => handleChange("email", event.target.value)}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">
              WhatsApp / Telefone
            </label>
            <input
              className="mt-2 w-full rounded-2xl border border-[#e6ecf5] bg-white px-4 py-3 text-sm text-slate-900 shadow-[0_6px_18px_rgba(15,23,42,0.04)] focus:border-[#2d77e3] focus:outline-none"
              value={form.phone}
              onChange={(event) => handleChange("phone", event.target.value)}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">
              País de Residência
            </label>
            <div className="relative mt-2">
              <select
                className="w-full appearance-none rounded-2xl border border-[#e6ecf5] bg-white px-4 py-3 text-sm text-slate-900 shadow-[0_6px_18px_rgba(15,23,42,0.04)] focus:border-[#2d77e3] focus:outline-none"
                value={form.country}
                onChange={(event) => handleChange("country", event.target.value)}
              >
                <option>Brasil</option>
                <option>Portugal</option>
                <option>Irlanda</option>
                <option>Estados Unidos</option>
                <option>Canadá</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-base text-slate-400">
                expand_more
              </span>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">
              Idioma de Preferência
            </label>
            <div className="relative mt-2">
              <select
                className="w-full appearance-none rounded-2xl border border-[#e6ecf5] bg-white px-4 py-3 text-sm text-slate-900 shadow-[0_6px_18px_rgba(15,23,42,0.04)] focus:border-[#2d77e3] focus:outline-none"
                value={form.language}
                onChange={(event) => handleChange("language", event.target.value)}
              >
                <option>Português</option>
                <option>Inglês</option>
                <option>Espanhol</option>
                <option>Francês</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-base text-slate-400">
                expand_more
              </span>
            </div>
          </div>

          <button
            className="mt-2 w-full rounded-2xl bg-[#2d77e3] py-3 text-sm font-semibold text-white shadow-[0_16px_28px_rgba(45,119,227,0.2)]"
            type="button"
            onClick={handleSave}
          >
            {saved ? "Mudanças Salvas" : "Salvar Mudanças"}
          </button>

          <div className="rounded-2xl bg-white px-4 py-4 text-xs text-slate-500 shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-lg text-slate-400">
                lock
              </span>
              <p>
                Sua privacidade é importante. Seus dados são criptografados e
                utilizados apenas para melhorar sua experiência na Advena.
              </p>
            </div>
          </div>
        </section>
        <BottomNav active="profile" onSelect={onSelectTab} />
      </div>
    </div>
  );
};
