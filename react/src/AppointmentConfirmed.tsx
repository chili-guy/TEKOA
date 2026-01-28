import confirmedSvg from "../../SVGS/Consulta agendada.svg?react";
import { SvgScreen } from "./SvgScreen";

type AppointmentConfirmedProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
};

export const AppointmentConfirmed = ({
  onSelectTab,
}: AppointmentConfirmedProps): JSX.Element => {
  return (
    <SvgScreen
      SvgComponent={confirmedSvg}
      title="Consulta agendada"
      activeTab="schedule"
      onSelectTab={onSelectTab}
    />
  );
};
