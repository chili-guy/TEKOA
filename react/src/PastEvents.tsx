import pastSvg from "../../SVGS/Eventos Anteriorwes.svg?react";
import { SvgScreen } from "./SvgScreen";

type PastEventsProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
};

export const PastEvents = ({ onSelectTab }: PastEventsProps): JSX.Element => {
  return (
    <SvgScreen
      SvgComponent={pastSvg}
      title="Eventos Anteriores"
      activeTab="content"
      onSelectTab={onSelectTab}
    />
  );
};
