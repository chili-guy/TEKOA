import { BottomNav } from "./BottomNav";

type PaymentMethodsProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
};

export const PaymentMethods = ({ onSelectTab }: PaymentMethodsProps): JSX.Element => {
  return (
    <div className="min-h-screen w-full bg-[#f7fafd] flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen px-4 pb-28 pt-6">
        <header className="rounded-3xl bg-white px-5 py-5 shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
          <p className="text-sm text-slate-500">Métodos de Pagamento</p>
          <h1 className="mt-1 text-xl font-semibold text-slate-900">
            Seus cartões
          </h1>
        </header>

        <section className="mt-5 space-y-3">
          <div className="rounded-2xl bg-[#0f2f55] px-4 py-4 text-white shadow-[0_12px_25px_rgba(15,47,85,0.25)]">
            <p className="text-xs text-white/70">Cartão principal</p>
            <p className="mt-2 text-sm font-semibold">Mastercard •••• 4589</p>
            <p className="mt-1 text-xs text-white/70">Validade 12/27</p>
          </div>
          <div className="rounded-2xl bg-white px-4 py-4 shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
            <p className="text-sm font-semibold text-slate-900">
              Visa •••• 2234
            </p>
            <p className="text-xs text-slate-500">Validade 03/26</p>
            <button
              className="mt-3 text-xs font-semibold text-[#2d77e3]"
              type="button"
            >
              Definir como principal
            </button>
          </div>
          <button
            className="w-full rounded-2xl border border-dashed border-[#cbd5f5] bg-white py-3 text-xs font-semibold text-[#2d77e3]"
            type="button"
          >
            Adicionar novo método
          </button>
        </section>
        <BottomNav active="profile" onSelect={onSelectTab} />
      </div>
    </div>
  );
};
