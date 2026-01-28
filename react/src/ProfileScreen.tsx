import profileSvg from "../../SVGS/Profile.svg?react";
import { SvgScreen } from "./SvgScreen";
import { useCurrentUser } from "./hooks/useCurrentUser";

type ProfileScreenProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
};

export const ProfileScreen = ({ onSelectTab }: ProfileScreenProps): JSX.Element => {
  const { data } = useCurrentUser();
  const name = data?.user?.name ?? "Usuário";
  const email = data?.user?.email ?? "email@exemplo.com";

  return (
    <SvgScreen
      SvgComponent={profileSvg}
      title="Perfil"
      activeTab="profile"
      onSelectTab={onSelectTab}
    >
      <div className="absolute left-6 right-6 top-28 rounded-2xl bg-white/80 px-4 py-3 text-left shadow-sm">
        <p className="text-sm font-semibold text-[#1b1b1b]">{name}</p>
        <p className="text-xs text-[#897561]">{email}</p>
      </div>
    </SvgScreen>
  );
};
