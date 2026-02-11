import { BottomNav } from "./BottomNav";

type OrderSummaryProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
  onNavigate?: (screen: string) => void;
};

export const OrderSummary = ({
  onSelectTab,
  onNavigate,
}: OrderSummaryProps): JSX.Element => {
  return (
    <div className="min-h-screen w-full bg-[#f7fafd] flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen px-4 pb-28 pt-6">
        <header className="flex items-center gap-3">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 shadow-[0_10px_25px_rgba(15,23,42,0.06)]"
            type="button"
            onClick={() => onNavigate?.("choose-package")}
            aria-label="Voltar"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </button>
          <div>
            <p className="text-sm text-slate-500">Resumo</p>
            <h1 className="text-xl font-semibold text-slate-900">
              Detalhes do pedido
            </h1>
          </div>
        </header>

        <section className="mt-5 rounded-3xl bg-white px-5 py-5 shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">Pacote</p>
            <p className="text-sm font-semibold text-[#2d77e3]">3 sessões</p>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Acompanhamento contínuo com psicólogo(a) especializado.
          </p>
          <div className="mt-4 rounded-2xl bg-[#f6f8fc] px-4 py-3">
            <p className="text-xs text-slate-500">Agendamento</p>
            <p className="text-sm font-semibold text-slate-900">
              Ter, 05 Fev • 14:00
            </p>
          </div>
          <div className="mt-3 rounded-2xl bg-[#f6f8fc] px-4 py-3">
            <p className="text-xs text-slate-500">Valor total</p>
            <p className="text-lg font-semibold text-slate-900">€149,00</p>
          </div>
          <button
            className="mt-5 w-full h-12 rounded-xl bg-[#2d77e3] text-white text-base font-bold shadow-[0_16px_28px_rgba(45,119,227,0.2)] transition-transform active:scale-[0.98]"
            type="button"
            onClick={() => onNavigate?.("appointment-confirmed")}
          >
            Confirmar pagamento
          </button>
        </section>
        <BottomNav active="schedule" onSelect={onSelectTab} />
      </div>
    </div>
  );
};
