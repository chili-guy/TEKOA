import upcomingSvg from "../../SVGS/Proximos Eventos.svg?react";
import { SvgScreen } from "./SvgScreen";

type UpcomingEventsProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
};

export const UpcomingEvents = ({ onSelectTab }: UpcomingEventsProps): JSX.Element => {
  return (
    <SvgScreen
      SvgComponent={upcomingSvg}
      title="Próximos Eventos"
      activeTab="content"
      onSelectTab={onSelectTab}
    />
  );
};
