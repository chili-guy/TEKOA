import accountSettingsSvg from "../../SVGS/Configurações da Conta.svg?react";
import { SvgScreen } from "./SvgScreen";

type AccountSettingsProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
};

export const AccountSettings = ({ onSelectTab }: AccountSettingsProps): JSX.Element => {
  return (
    <SvgScreen
      SvgComponent={accountSettingsSvg}
      title="Configurações da Conta"
      activeTab="profile"
      onSelectTab={onSelectTab}
    />
  );
};
