import { BottomNav } from "./BottomNav";

type SubscriptionProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
};

export const Subscription = ({ onSelectTab }: SubscriptionProps): JSX.Element => {
  return (
    <div className="min-h-screen w-full bg-[#f7fafd] flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen px-4 pb-28 pt-6">
        <header className="rounded-3xl bg-white px-5 py-5 shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
          <p className="text-sm text-slate-500">Minha Assinatura</p>
          <h1 className="mt-1 text-xl font-semibold text-slate-900">
            Plano atual
          </h1>
        </header>

        <section className="mt-5 space-y-3">
          <div className="rounded-3xl bg-[#2d77e3] px-5 py-5 text-white shadow-[0_16px_28px_rgba(45,119,227,0.2)]">
            <p className="text-xs text-white/80">Plano ativo</p>
            <p className="mt-2 text-lg font-semibold">Pacote 3 sessões</p>
            <p className="mt-1 text-xs text-white/80">Renova em 05/03</p>
          </div>
          <div className="rounded-2xl bg-white px-4 py-4 shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
            <p className="text-sm font-semibold text-slate-900">Benefícios</p>
            <ul className="mt-2 space-y-1 text-xs text-slate-500">
              <li>• Sessões individuais com psicólogo(a)</li>
              <li>• Acesso à videoteca e conteúdos</li>
              <li>• Prioridade em eventos ao vivo</li>
            </ul>
          </div>
          <button
            className="w-full rounded-2xl border border-[#e6ecf5] bg-white py-3 text-xs font-semibold text-slate-700"
            type="button"
          >
            Alterar plano
          </button>
        </section>
        <BottomNav active="profile" onSelect={onSelectTab} />
      </div>
    </div>
  );
};
