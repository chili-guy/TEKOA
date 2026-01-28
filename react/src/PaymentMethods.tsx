import paymentMethodsSvg from "../../SVGS/Métodos de Pagamento.svg?react";
import { SvgScreen } from "./SvgScreen";

type PaymentMethodsProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
};

export const PaymentMethods = ({ onSelectTab }: PaymentMethodsProps): JSX.Element => {
  return (
    <SvgScreen
      SvgComponent={paymentMethodsSvg}
      title="Métodos de Pagamento"
      activeTab="profile"
      onSelectTab={onSelectTab}
    />
  );
};
