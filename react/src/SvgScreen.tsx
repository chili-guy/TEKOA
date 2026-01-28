import * as React from "react";
import { BottomNav } from "./BottomNav";

type SvgScreenProps = {
  SvgComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title?: string;
  background?: string;
  showNav?: boolean;
  activeTab?: "home" | "schedule" | "content" | "profile";
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
  children?: React.ReactNode;
};

export const SvgScreen = ({
  SvgComponent,
  title,
  background = "#f7fafd",
  showNav = true,
  activeTab = "home",
  onSelectTab,
  children,
}: SvgScreenProps): JSX.Element => {

  return (
    <div className="min-h-screen w-full flex justify-center" style={{ backgroundColor: background }}>
      <div className="w-full max-w-[393px] min-h-screen pb-24 relative">
        {title ? (
          <h1 className="sr-only">{title}</h1>
        ) : null}
        <div className="relative">
          <SvgComponent className="w-full h-auto" />
          <div
            className="absolute top-0 left-0 right-0 h-14 pointer-events-none"
            style={{ backgroundColor: background }}
          />
          {children}
        </div>
      </div>
      {showNav ? <BottomNav active={activeTab} onSelect={onSelectTab} /> : null}
    </div>
  );
};
