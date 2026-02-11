import { BottomNav } from "./BottomNav";
import profileIcon from "./assets/profile-icon.svg";
import { useCurrentUser } from "./hooks/useCurrentUser";

type ProfileScreenProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
  onNavigate?: (screen: string) => void;
};

export const ProfileScreen = ({
  onSelectTab,
  onNavigate,
}: ProfileScreenProps): JSX.Element => {
  const { data } = useCurrentUser();
  const name = data?.user?.name ?? "Usuário";
  const email = data?.user?.email ?? "email@exemplo.com";
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <div className="min-h-screen w-full bg-[#f7fafd] flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen px-4 pb-28 pt-6">
        <header className="rounded-3xl bg-white px-5 py-6 text-center shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
          <p className="text-sm text-slate-500">Profile</p>
          <div className="mt-4 flex flex-col items-center">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#eef3ff]">
                <img
                  src={profileIcon}
                  alt={name || initials || "Perfil"}
                  className="h-10 w-10 text-[#2d77e3]"
                />
              </div>
              <button
                className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#2d77e3] text-white shadow"
                type="button"
                onClick={() => onNavigate?.("profile-details")}
                aria-label="Editar foto"
              >
                <span className="material-symbols-outlined text-[16px]">
                  edit
                </span>
              </button>
            </div>
            <p className="mt-3 text-sm font-semibold text-slate-900">{name}</p>
            <p className="text-xs text-slate-500">{email}</p>
          </div>
        </header>

        <section className="mt-5 space-y-3">
          <button
            className="flex w-full items-center justify-between rounded-2xl bg-white px-4 py-4 text-left shadow-[0_10px_25px_rgba(15,23,42,0.06)]"
            type="button"
            onClick={() => onNavigate?.("appointments")}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e7f0ff] text-[#2d77e3]">
                <span className="material-symbols-outlined text-lg">
                  calendar_month
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Meus Agendamentos
                </p>
                <p className="text-xs text-slate-500">
                  Ver histórico e próximos
                </p>
              </div>
            </div>
            <span className="text-lg text-slate-400">›</span>
          </button>
          <button
            className="flex w-full items-center justify-between rounded-2xl bg-white px-4 py-4 text-left shadow-[0_10px_25px_rgba(15,23,42,0.06)]"
            type="button"
            onClick={() => onNavigate?.("subscription")}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#fff4e5] text-[#f4a441]">
                <span className="material-symbols-outlined text-lg">
                  workspace_premium
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Assinatura
                </p>
                <p className="text-xs text-slate-500">Gerenciar seu plano</p>
              </div>
            </div>
            <span className="text-lg text-slate-400">›</span>
          </button>
          <button
            className="flex w-full items-center justify-between rounded-2xl bg-white px-4 py-4 text-left shadow-[0_10px_25px_rgba(15,23,42,0.06)]"
            type="button"
            onClick={() => onNavigate?.("account-settings")}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e8f8ef] text-[#37b676]">
                <span className="material-symbols-outlined text-lg">settings</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Configurações da Conta
                </p>
                <p className="text-xs text-slate-500">
                  Dados pessoais e segurança
                </p>
              </div>
            </div>
            <span className="text-lg text-slate-400">›</span>
          </button>
          <button
            className="flex w-full items-center justify-between rounded-2xl bg-white px-4 py-4 text-left shadow-[0_10px_25px_rgba(15,23,42,0.06)]"
            type="button"
            onClick={() => onNavigate?.("payment-methods")}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e7f7ff] text-[#3fb9e6]">
                <span className="material-symbols-outlined text-lg">
                  credit_card
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Métodos de Pagamento
                </p>
                <p className="text-xs text-slate-500">Cartões e faturas</p>
              </div>
            </div>
            <span className="text-lg text-slate-400">›</span>
          </button>
          <button
            className="flex w-full items-center justify-between rounded-2xl bg-white px-4 py-4 text-left shadow-[0_10px_25px_rgba(15,23,42,0.06)]"
            type="button"
            onClick={() => onNavigate?.("support-network")}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#fff6d6] text-[#f0b93a]">
                <span className="material-symbols-outlined text-lg">help</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Ajuda / Suporte
                </p>
                <p className="text-xs text-slate-500">Fale conosco</p>
              </div>
            </div>
            <span className="text-lg text-slate-400">›</span>
          </button>
        </section>

        <button
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-[#2d77e3] bg-white py-3 text-sm font-semibold text-[#2d77e3]"
          type="button"
          onClick={() => onNavigate?.("login")}
        >
          <span className="material-symbols-outlined text-lg">logout</span>
          Sair Da Conta
        </button>
        <BottomNav active="profile" onSelect={onSelectTab} />
      </div>
    </div>
  );
};
