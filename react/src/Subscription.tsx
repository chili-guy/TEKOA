import subscriptionSvg from "../../SVGS/Minha Assinatura.svg?react";
import { SvgScreen } from "./SvgScreen";

type SubscriptionProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
};

export const Subscription = ({ onSelectTab }: SubscriptionProps): JSX.Element => {
  return (
    <SvgScreen
      SvgComponent={subscriptionSvg}
      title="Minha Assinatura"
      activeTab="profile"
      onSelectTab={onSelectTab}
    />
  );
};
