import { BottomNav } from "./BottomNav";
import { useAppointments } from "./hooks/useAppointments";

type AppointmentsDetailProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
  onNavigate?: (screen: string) => void;
};

export const AppointmentsDetail = ({
  onSelectTab,
  onNavigate,
}: AppointmentsDetailProps): JSX.Element => {
  const { appointments } = useAppointments();
  const latest = appointments[0];

  return (
    <div className="min-h-screen w-full bg-[#f7fafd] flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen px-4 pb-28 pt-6">
        <header className="flex items-center gap-3">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 shadow-[0_10px_25px_rgba(15,23,42,0.06)]"
            type="button"
            onClick={() => onNavigate?.("appointments")}
            aria-label="Voltar"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </button>
          <div>
            <p className="text-sm text-slate-500">Detalhes</p>
            <h1 className="text-xl font-semibold text-slate-900">
              Agendamento
            </h1>
          </div>
        </header>

        {latest ? (
          <section className="mt-5 rounded-3xl bg-white px-5 py-5 shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">
                Consulta{" "}
                {latest.status === "scheduled" ? "agendada" : latest.status}
              </p>
              <span className="rounded-full bg-[#2f6fe4]/10 px-2 py-1 text-[11px] font-semibold text-[#2f6fe4]">
                Online
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              {new Date(latest.scheduled_at).toLocaleString("pt-BR", {
                dateStyle: "full",
                timeStyle: "short",
              })}
            </p>
            <div className="mt-4 rounded-2xl bg-[#f6f8fc] px-4 py-3">
              <p className="text-xs text-slate-500">Profissional</p>
              <p className="text-sm font-semibold text-slate-900">
                Psicólogo(a) disponível
              </p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                className="rounded-2xl border border-[#e6ecf5] bg-white py-3 text-xs font-semibold text-slate-700"
                type="button"
                onClick={() => onNavigate?.("choose-package")}
              >
                Reagendar
              </button>
              <button
                className="rounded-2xl bg-[#2f6fe4] py-3 text-xs font-semibold text-white"
                type="button"
                onClick={() => onNavigate?.("appointment-confirmed")}
              >
                Confirmar presença
              </button>
            </div>
          </section>
        ) : (
          <section className="mt-6 rounded-2xl bg-white px-4 py-4 text-sm text-slate-500 shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
            Nenhum agendamento encontrado.
          </section>
        )}
        <BottomNav active="schedule" onSelect={onSelectTab} />
      </div>
    </div>
  );
};
