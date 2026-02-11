import { BottomNav } from "./BottomNav";

type AppointmentConfirmedProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
  onNavigate?: (screen: string) => void;
};

export const AppointmentConfirmed = ({
  onSelectTab,
  onNavigate,
}: AppointmentConfirmedProps): JSX.Element => {
  return (
    <div className="min-h-screen w-full bg-[#f7fafd] flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen px-4 pb-28 pt-10">
        <section className="rounded-3xl bg-white px-5 py-8 text-center shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#2f6fe4]/10 text-[#2f6fe4]">
            <span className="material-symbols-outlined text-3xl">check_circle</span>
          </div>
          <h1 className="mt-4 text-xl font-semibold text-slate-900">
            Consulta agendada!
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Você receberá uma notificação com os detalhes da sessão.
          </p>
          <div className="mt-5 rounded-2xl bg-[#f6f8fc] px-4 py-3 text-left">
            <p className="text-xs text-slate-500">Próxima sessão</p>
            <p className="text-sm font-semibold text-slate-900">
              Ter, 05 Fev • 14:00
            </p>
            <p className="text-xs text-slate-500">Online com psicólogo(a)</p>
          </div>
          <button
            className="mt-5 w-full h-12 rounded-xl bg-[#2d77e3] text-white text-base font-bold shadow-[0_16px_28px_rgba(45,119,227,0.2)] transition-transform active:scale-[0.98]"
            type="button"
            onClick={() => onNavigate?.("appointments")}
          >
            Ver agendamentos
          </button>
          <button
            className="mt-3 w-full h-12 rounded-xl border border-[#e6ecf5] bg-white text-sm font-semibold text-slate-700"
            type="button"
            onClick={() => onNavigate?.("hello-maria")}
          >
            Voltar ao início
          </button>
        </section>
        <BottomNav active="schedule" onSelect={onSelectTab} />
      </div>
    </div>
  );
};
