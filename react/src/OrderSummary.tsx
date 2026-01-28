import orderSummarySvg from "../../SVGS/Resumo do pedido.svg?react";
import { SvgScreen } from "./SvgScreen";

type OrderSummaryProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
};

export const OrderSummary = ({ onSelectTab }: OrderSummaryProps): JSX.Element => {
  return (
    <SvgScreen
      SvgComponent={orderSummarySvg}
      title="Resumo do pedido"
      activeTab="schedule"
      onSelectTab={onSelectTab}
    />
  );
};
