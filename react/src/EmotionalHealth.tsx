import emotionalSvg from "../../SVGS/Saude Emocional.svg?react";
import { SvgScreen } from "./SvgScreen";

type EmotionalHealthProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
};

export const EmotionalHealth = ({ onSelectTab }: EmotionalHealthProps): JSX.Element => {
  return (
    <SvgScreen
      SvgComponent={emotionalSvg}
      title="Saúde Emocional"
      activeTab="content"
      onSelectTab={onSelectTab}
    />
  );
};
