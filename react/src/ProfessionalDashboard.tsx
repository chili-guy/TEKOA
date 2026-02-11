import { BottomNav } from "./BottomNav";

type ProfessionalDashboardProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
  onNavigate?: (screen: string) => void;
};

export const ProfessionalDashboard = ({
  onSelectTab,
  onNavigate,
}: ProfessionalDashboardProps): JSX.Element => {
  return (
    <div className="min-h-screen w-full bg-[#f7fafd] flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen px-4 pb-28 pt-6">
        <header>
          <p className="text-sm text-slate-500">Olá, Profissional</p>
          <h1 className="mt-1 text-base font-semibold text-slate-900">
            Como podemos apoiar sua rotina hoje?
          </h1>
        </header>

        <section className="mt-4 rounded-3xl bg-[#2d77e3] px-4 py-4 text-white shadow-[0_12px_25px_rgba(45,119,227,0.3)]">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20">
              <span className="material-symbols-outlined text-lg">calendar_month</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Agenda de Consultas</p>
              <p className="text-xs text-white/90">
                Gerencie horários e atendimentos
              </p>
              <p className="mt-2 text-[11px] text-white/80">
                Próxima sessão hoje às 16:00
              </p>
            </div>
          </div>
          <button
            className="mt-4 w-full rounded-2xl bg-white py-2 text-xs font-semibold text-[#2d77e3]"
            type="button"
            onClick={() => onNavigate?.("appointments")}
          >
            Ver agenda
          </button>
        </section>

        <section className="mt-6 grid grid-cols-2 gap-4">
          <button
            className="rounded-3xl bg-[#57c789] p-4 text-left text-white shadow-[0_12px_25px_rgba(87,199,137,0.25)]"
            type="button"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <span className="material-symbols-outlined text-xl">groups</span>
            </span>
            <p className="mt-3 text-sm font-medium opacity-90">Pacientes</p>
            <p className="mt-6 text-xs font-semibold">Ver lista</p>
          </button>
          <button
            className="rounded-3xl bg-[#31c9df] p-4 text-left text-white shadow-[0_12px_25px_rgba(49,201,223,0.25)]"
            type="button"
            onClick={() => onNavigate?.("blog-news")}
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <span className="material-symbols-outlined text-xl">article</span>
            </span>
            <p className="mt-3 text-sm font-medium opacity-90">Conteúdos</p>
            <p className="mt-6 text-xs font-semibold">Acessar</p>
          </button>
          <button
            className="rounded-3xl bg-[#f4c463] p-4 text-left text-white shadow-[0_12px_25px_rgba(244,196,99,0.25)]"
            type="button"
            onClick={() => onNavigate?.("upcoming-events")}
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <span className="material-symbols-outlined text-xl">event</span>
            </span>
            <p className="mt-3 text-sm font-medium opacity-90">Eventos</p>
            <p className="mt-6 text-xs font-semibold">Ver agenda</p>
          </button>
          <button
            className="rounded-3xl bg-[#2f6fe4] p-4 text-left text-white shadow-[0_12px_25px_rgba(47,111,228,0.25)]"
            type="button"
            onClick={() => onNavigate?.("subscription")}
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <span className="material-symbols-outlined text-xl">payments</span>
            </span>
            <p className="mt-3 text-sm font-medium opacity-90">Pagamentos</p>
            <p className="mt-6 text-xs font-semibold">Ver repasses</p>
          </button>
        </section>

        <section className="mt-5 rounded-3xl bg-white px-4 py-5 text-slate-900 shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Perfil profissional</p>
              <p className="mt-1 text-xs text-slate-500">
                Atualize seus dados e documentos
              </p>
            </div>
            <span className="text-lg text-slate-400">›</span>
          </div>
        </section>

        <BottomNav active="home" onSelect={onSelectTab} />
      </div>
    </div>
  );
};
