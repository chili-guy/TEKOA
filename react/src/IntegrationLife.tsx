import integrationSvg from "../../SVGS/Integracao & Vida.svg?react";
import { SvgScreen } from "./SvgScreen";

type IntegrationLifeProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
};

export const IntegrationLife = ({ onSelectTab }: IntegrationLifeProps): JSX.Element => {
  return (
    <SvgScreen
      SvgComponent={integrationSvg}
      title="Integração & Vida"
      activeTab="content"
      onSelectTab={onSelectTab}
    />
  );
};
