import supportSvg from "../../SVGS/Rede de Apoio ao Imigrante.svg?react";
import { SvgScreen } from "./SvgScreen";

type SupportNetworkScreenProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
};

export const SupportNetworkScreen = ({
  onSelectTab,
}: SupportNetworkScreenProps): JSX.Element => {
  return (
    <SvgScreen
      SvgComponent={supportSvg}
      title="Rede de Apoio ao Imigrante"
      activeTab="content"
      onSelectTab={onSelectTab}
    />
  );
};
