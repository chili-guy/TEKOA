import { BottomNav } from "./BottomNav";
import { useAppointments } from "./hooks/useAppointments";

type AppointmentsProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
  onNavigate?: (screen: string) => void;
};

export const Appointments = ({
  onSelectTab,
  onNavigate,
}: AppointmentsProps): JSX.Element => {
  const { appointments } = useAppointments();
  const formatDate = (value: string) =>
    new Date(value).toLocaleString("pt-BR", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div className="min-h-screen w-full bg-[#f7fafd] flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen px-4 pb-28 pt-6">
        <header className="rounded-3xl bg-white px-5 py-5 shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">Meus Agendamentos</p>
              <h1 className="mt-1 text-xl font-semibold text-slate-900">
                Suas próximas sessões
              </h1>
            </div>
            <button
              className="text-xs font-semibold text-[#2f6fe4]"
              type="button"
              onClick={() => onNavigate?.("choose-package")}
            >
              Novo
            </button>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Acompanhe horários, status e detalhes.
          </p>
        </header>

        <section className="mt-5 space-y-3">
          {appointments.length === 0 ? (
            <div className="rounded-2xl bg-white px-4 py-4 text-sm text-slate-500 shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
              Nenhum agendamento encontrado.
            </div>
          ) : (
            appointments.slice(0, 5).map((item) => (
              <div
                className="rounded-2xl bg-white px-4 py-4 shadow-[0_10px_25px_rgba(15,23,42,0.06)]"
                key={item.id}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">
                    Consulta{" "}
                    {item.status === "scheduled" ? "agendada" : item.status}
                  </p>
                  <span className="rounded-full bg-[#2f6fe4]/10 px-2 py-1 text-[11px] font-semibold text-[#2f6fe4]">
                    Online
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  {formatDate(item.scheduled_at)}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xs text-slate-500">
                    Psicólogo(a) disponível
                  </p>
                  <button
                    className="text-xs font-semibold text-[#2f6fe4]"
                    type="button"
                    onClick={() => onNavigate?.("appointments-detail")}
                  >
                    Detalhes
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
        <BottomNav active="schedule" onSelect={onSelectTab} />
      </div>
    </div>
  );
};
