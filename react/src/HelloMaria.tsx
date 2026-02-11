import { BottomNav } from "./BottomNav";
import { useCurrentUser } from "./hooks/useCurrentUser";

type HelloMariaProps = {
  onNavigate?: (screen: string) => void;
};

export const HelloMaria = ({ onNavigate }: HelloMariaProps): JSX.Element => {
  const { data } = useCurrentUser();
  const name = data?.user?.name ?? "Maria";
  const handleTabSelect = (
    tab: "home" | "schedule" | "content" | "profile",
  ) => {
    if (tab === "home") {
      onNavigate?.("hello-maria");
      return;
    }
    if (tab === "schedule") {
      onNavigate?.("appointments");
      return;
    }
    if (tab === "content") {
      onNavigate?.("blog-news");
      return;
    }
    onNavigate?.("profile");
  };
  const goDev = () => onNavigate?.("in-development");
  const goContent = () => onNavigate?.("blog-news");
  const goSupportNetwork = () => onNavigate?.("support-network");
  const goUpcomingEvents = () => onNavigate?.("upcoming-events");
  const goEmotionalHealth = () => onNavigate?.("emotional-health");
  const goAppointments = () => onNavigate?.("appointments");
  const goAppointmentsDetail = () => onNavigate?.("appointments-detail");
  const goChoosePackage = () => onNavigate?.("choose-package");

  return (
    <div className="min-h-screen w-full bg-[#f7fafd] flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen px-4 pb-28 pt-6">
        <header>
          <p className="text-sm text-slate-500">Olá, {name}</p>
          <h1 className="mt-1 text-base font-semibold text-slate-900">
            Como podemos te ajudar hoje?
          </h1>
        </header>

        <section className="mt-4 rounded-3xl bg-[#ff7a3c] px-4 py-4 text-white shadow-[0_12px_25px_rgba(255,122,60,0.3)]">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20">
              <span className="material-symbols-outlined text-lg">psychology</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Apoio Psicológico</p>
              <p className="text-xs text-white/90">
                Psicologia intercultural
              </p>
              <p className="mt-2 text-[11px] text-white/80">
                Sessões a €17 · até 50 min
              </p>
            </div>
          </div>
          <button
            className="mt-4 w-full rounded-2xl bg-white py-2 text-xs font-semibold text-[#ff7a3c]"
            type="button"
            onClick={goChoosePackage}
          >
            Agendar Consulta
          </button>
        </section>

        <section className="mt-6 grid grid-cols-2 gap-4">
          <button
            className="rounded-3xl bg-[#2f6fe4] p-4 text-left text-white shadow-[0_12px_25px_rgba(47,111,228,0.25)]"
            type="button"
            onClick={goDev}
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <span className="material-symbols-outlined text-xl">psychology</span>
            </span>
            <p className="mt-3 text-sm font-medium opacity-90">Mentorias</p>
            <p className="mt-6 text-xs font-semibold">Agendar Sessão</p>
          </button>
          <button
            className="rounded-3xl bg-[#57c789] p-4 text-left text-white shadow-[0_12px_25px_rgba(87,199,137,0.25)]"
            type="button"
            onClick={goDev}
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <span className="material-symbols-outlined text-xl">play_circle</span>
            </span>
            <p className="mt-3 text-sm font-medium opacity-90">Videoteca</p>
            <p className="mt-6 text-xs font-semibold">Assistir Vídeos</p>
          </button>
          <button
            className="rounded-3xl bg-[#31c9df] p-4 text-left text-white shadow-[0_12px_25px_rgba(49,201,223,0.25)]"
            type="button"
            onClick={goUpcomingEvents}
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <span className="material-symbols-outlined text-xl">event</span>
            </span>
            <p className="mt-3 text-sm font-medium opacity-90">Eventos Online</p>
            <p className="mt-6 text-xs font-semibold">Ver Eventos</p>
          </button>
          <button
            className="rounded-3xl bg-[#f4c463] p-4 text-left text-white shadow-[0_12px_25px_rgba(244,196,99,0.25)]"
            type="button"
            onClick={goDev}
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <span className="material-symbols-outlined text-xl">groups</span>
            </span>
            <p className="mt-3 text-sm font-medium opacity-90">Comunidade</p>
            <p className="mt-6 text-xs font-semibold">Acessar</p>
          </button>
        </section>

        <section className="mt-5 rounded-3xl bg-[#0f2f55] px-4 py-5 text-white shadow-[0_12px_25px_rgba(15,47,85,0.25)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold">Rede de Apoio ao Imigrante</p>
              <p className="mt-1 text-xs text-white/80">
                Conecte-se com suporte especializado
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
              <span className="text-lg">👥</span>
            </div>
          </div>
          <button
            className="mt-4 w-full rounded-2xl bg-white py-3 text-sm font-semibold text-[#0f2f55]"
            type="button"
            onClick={goSupportNetwork}
          >
            Acessar Rede de Apoio
          </button>
        </section>

        <section className="mt-4 space-y-3 pb-6">
          <button
            className="flex w-full items-center justify-between rounded-2xl bg-white px-4 py-4 text-left text-slate-900 shadow-[0_10px_25px_rgba(15,23,42,0.06)]"
            type="button"
            onClick={goContent}
          >
            <div>
              <p className="text-sm font-semibold">Blog & Conteúdos</p>
              <p className="text-xs text-slate-500">
                Artigos e dicas para sua jornada
              </p>
            </div>
            <span className="text-lg text-slate-400">›</span>
          </button>
          <button
            className="flex w-full items-center justify-between rounded-2xl bg-white px-4 py-4 text-left text-slate-900 shadow-[0_10px_25px_rgba(15,23,42,0.06)]"
            type="button"
            onClick={goEmotionalHealth}
          >
            <div>
              <p className="text-sm font-semibold">Testes de Saúde Mental</p>
              <p className="text-xs text-slate-500">
                Avaliações rápidas e anônimas
              </p>
            </div>
            <span className="text-lg text-slate-400">›</span>
          </button>
        </section>
        <BottomNav active="home" onSelect={handleTabSelect} />
      </div>
    </div>
  );
};
