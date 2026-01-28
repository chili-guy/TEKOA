import appointmentsDetailSvg from "../../SVGS/Meus Agendamentos (1).svg?react";
import { SvgScreen } from "./SvgScreen";
import { useAppointments } from "./hooks/useAppointments";

type AppointmentsDetailProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
};

export const AppointmentsDetail = ({
  onSelectTab,
}: AppointmentsDetailProps): JSX.Element => {
  const { appointments } = useAppointments();
  const latest = appointments[0];

  return (
    <SvgScreen
      SvgComponent={appointmentsDetailSvg}
      title="Meus Agendamentos"
      activeTab="schedule"
      onSelectTab={onSelectTab}
    >
      {latest ? (
        <div className="absolute left-6 right-6 top-28 rounded-2xl bg-white/90 px-4 py-3 shadow-sm">
          <p className="text-sm font-semibold text-[#1b1b1b]">
            Consulta {latest.status === "scheduled" ? "agendada" : latest.status}
          </p>
          <p className="text-xs text-[#897561]">
            {new Date(latest.scheduled_at).toLocaleString("pt-BR", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>
      ) : null}
    </SvgScreen>
  );
};
