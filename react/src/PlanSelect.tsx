import { useMemo } from "react";
import headerShape from "./header-shape.png";

type PlanSelectProps = {
  onBack?: () => void;
  onSelect?: (code: string) => void;
};

type ApiPackage = {
  code: string;
  sessions: number;
  price_cents: number;
  discount_cents?: number;
};

type PlanCard = {
  code: string;
  title: string;
  price: string;
  period: string;
  badge?: string;
};

export const PlanSelect = ({ onBack, onSelect }: PlanSelectProps): JSX.Element => {
  const plans = useMemo<PlanCard[]>(() => {
    return [
      { code: "pkg-1", title: "Plano Mensal", price: "€7", period: "mês" },
      {
        code: "pkg-2",
        title: "Plano Semestral",
        price: "€36",
        period: "semestre",
        badge: "Economize €12",
      },
      {
        code: "pkg-3",
        title: "Plano Anual",
        price: "€60",
        period: "ano",
        badge: "Economize €24",
      },
    ];
  }, []);

  return (
    <div className="min-h-screen w-full bg-white flex justify-center">
      <div className="w-full max-w-[393px] flex flex-col min-h-screen">
        <header className="relative h-[220px] overflow-hidden rounded-b-[32px] px-5 pt-8 pb-8 text-white bg-[linear-gradient(180deg,#5b97e7_0%,#5394de_40%,#4d8cd2_70%,#4c8bcf_100%)]">
          <img
            src={headerShape}
            alt=""
            className="absolute right-0 top-0 h-full w-[55%] object-cover opacity-25"
          />
          <button
            className="absolute left-4 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-lg backdrop-blur"
            type="button"
            aria-label="Voltar"
            onClick={onBack}
          >
            ←
          </button>
          <div className="relative z-10 mt-6 text-center">
            <h1 className="text-xl font-semibold">Escolha seu plano</h1>
            <p className="mt-2 text-sm text-white/90">
              Escolha o plano ideal para suas necessidades e aceda a funcionalidades!
            </p>
          </div>
        </header>

        <main className="flex-1 px-4 pb-24 -mt-6">
          <div className="rounded-[28px] bg-white px-4 pt-6 pb-6 shadow-[0_-8px_24px_rgba(15,23,42,0.08)]">
            <div className="flex flex-col gap-4">
              {plans.map((plan) => (
                <div
                  key={plan.code}
                  className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#6b7280]">{plan.title}</p>
                    {plan.badge ? (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-600">
                        {plan.badge}
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-2 text-xl font-semibold text-[#111827]">
                    {plan.price}/{plan.period}
                  </div>
                  <button
                    className="mt-3 w-full rounded-xl border border-[#2c74e8] py-2 text-sm font-semibold text-[#2c74e8]"
                    type="button"
                    onClick={() => onSelect?.(plan.code)}
                  >
                    Selecionar Plano
                  </button>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-[#6b7280]">
              Todos os planos incluem: Acesso a psicólogos interculturais, mentorias de
              integração com especialistas, videoteca, eventos online e descontos exclusivos.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

