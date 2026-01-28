type BottomNavProps = {
  active: "home" | "schedule" | "content" | "profile";
  onSelect?: (tab: "home" | "schedule" | "content" | "profile") => void;
};

export const BottomNav = ({ active, onSelect }: BottomNavProps): JSX.Element => {
  const baseItem =
    "inline-flex flex-col items-center justify-center px-5 text-xs";
  const activeItem = "text-[#ee8c2b] font-semibold";
  const inactiveItem = "text-[#897561] hover:text-[#ee8c2b]";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-[#ecf1f8] bg-white/95 backdrop-blur-sm h-20">
      <div className="grid h-full max-w-[393px] grid-cols-4 mx-auto font-medium">
        <button
          className={`${baseItem} ${active === "home" ? activeItem : inactiveItem}`}
          type="button"
          onClick={() => onSelect?.("home")}
        >
          <span className="material-symbols-outlined text-2xl mb-1">home</span>
          <span>Início</span>
        </button>
        <button
          className={`${baseItem} ${active === "schedule" ? activeItem : inactiveItem}`}
          type="button"
          onClick={() => onSelect?.("schedule")}
        >
          <span className="material-symbols-outlined text-2xl mb-1">calendar_month</span>
          <span>Agendar</span>
        </button>
        <button
          className={`${baseItem} ${active === "content" ? activeItem : inactiveItem}`}
          type="button"
          onClick={() => onSelect?.("content")}
        >
          <span className="material-symbols-outlined text-2xl mb-1">article</span>
          <span>Conteúdos</span>
        </button>
        <button
          className={`${baseItem} ${active === "profile" ? activeItem : inactiveItem}`}
          type="button"
          onClick={() => onSelect?.("profile")}
        >
          <span className="material-symbols-outlined text-2xl mb-1">person</span>
          <span>Perfil</span>
        </button>
      </div>
    </nav>
  );
};
