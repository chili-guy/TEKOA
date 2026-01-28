import appointmentsSvg from "../../SVGS/Meus Agendamentos.svg?react";
import { SvgScreen } from "./SvgScreen";
import { useAppointments } from "./hooks/useAppointments";

type AppointmentsProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
};

export const Appointments = ({ onSelectTab }: AppointmentsProps): JSX.Element => {
  const { appointments } = useAppointments();

  return (
    <SvgScreen
      SvgComponent={appointmentsSvg}
      title="Meus Agendamentos"
      activeTab="schedule"
      onSelectTab={onSelectTab}
    >
      <div className="absolute left-6 right-6 top-28 space-y-3">
        {appointments.length === 0 ? (
          <div className="rounded-2xl bg-white/90 px-4 py-3 text-sm text-[#897561] shadow-sm">
            Nenhum agendamento encontrado.
          </div>
        ) : (
          appointments.slice(0, 3).map((item) => (
            <div
              className="rounded-2xl bg-white/90 px-4 py-3 shadow-sm"
              key={item.id}
            >
              <p className="text-sm font-semibold text-[#1b1b1b]">
                Consulta {item.status === "scheduled" ? "agendada" : item.status}
              </p>
              <p className="text-xs text-[#897561]">
                {new Date(item.scheduled_at).toLocaleString("pt-BR", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
          ))
        )}
      </div>
    </SvgScreen>
  );
};
