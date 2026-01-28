import profileDetailSvg from "../../SVGS/Profile (1).svg?react";
import { SvgScreen } from "./SvgScreen";
import { useCurrentUser } from "./hooks/useCurrentUser";

type ProfileDetailsProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
};

export const ProfileDetails = ({ onSelectTab }: ProfileDetailsProps): JSX.Element => {
  const { data } = useCurrentUser();
  const name = data?.user?.name ?? "Usuário";
  const email = data?.user?.email ?? "email@exemplo.com";

  return (
    <SvgScreen
      SvgComponent={profileDetailSvg}
      title="Perfil"
      activeTab="profile"
      onSelectTab={onSelectTab}
    >
      <div className="absolute left-6 right-6 top-24 rounded-2xl bg-white/80 px-4 py-3 text-left shadow-sm">
        <p className="text-sm font-semibold text-[#1b1b1b]">{name}</p>
        <p className="text-xs text-[#897561]">{email}</p>
      </div>
    </SvgScreen>
  );
};
