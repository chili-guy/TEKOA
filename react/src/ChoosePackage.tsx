import React from "react";
import { BottomNav } from "./BottomNav";
import { createAppointment, getPackages, getPsychologists, Package } from "./api";

type ChoosePackageProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
  onBooked?: () => void;
  onNavigate?: (screen: string) => void;
};

export const ChoosePackage = ({
  onSelectTab,
  onBooked,
  onNavigate,
}: ChoosePackageProps): JSX.Element => {
  const [packages, setPackages] = React.useState<Package[]>([]);
  const [psychologistId, setPsychologistId] = React.useState<string | null>(null);
  const [selected, setSelected] = React.useState<Package | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    Promise.all([getPackages(), getPsychologists()])
      .then(([pkgList, psychList]) => {
        if (!mounted) {
          return;
        }
        setPackages(pkgList);
        setSelected(pkgList[0] ?? null);
        setPsychologistId(psychList[0]?.id ?? null);
      })
      .catch((err) => {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Erro inesperado.");
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleBook = async () => {
    if (!selected || !psychologistId) {
      setError("Selecione um pacote e um profissional.");
      return;
    }
    setSubmitting(true);
    setError(null);
    const scheduledAt = new Date();
    scheduledAt.setDate(scheduledAt.getDate() + 1);
    scheduledAt.setHours(10, 0, 0, 0);
    try {
      await createAppointment({
        psychologistId,
        scheduledAt: scheduledAt.toISOString(),
        packageCode: selected.code,
      });
      onBooked?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f7fafd] flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen px-4 pb-28 pt-6">
        <header className="flex items-center gap-3">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 shadow-[0_10px_25px_rgba(15,23,42,0.06)]"
            type="button"
            onClick={() => onNavigate?.("appointments")}
            aria-label="Voltar"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </button>
          <div>
            <p className="text-sm text-slate-500">Agendamento</p>
            <h1 className="text-xl font-semibold text-slate-900">
              Escolha seu pacote
            </h1>
          </div>
        </header>

        <section className="mt-5 rounded-3xl bg-white px-5 py-5 shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
          <p className="text-sm font-semibold text-slate-900">
            Pacotes disponíveis
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Selecione o plano que melhor se encaixa no seu momento.
          </p>

          <div className="mt-4 space-y-3">
            {loading ? (
              <div className="rounded-2xl bg-[#f6f8fc] px-4 py-3 text-sm text-slate-500">
                Carregando pacotes...
              </div>
            ) : (
              packages.map((pkg) => (
                <button
                  className={`w-full rounded-2xl px-4 py-4 text-left transition ${
                    selected?.code === pkg.code
                      ? "border border-[#2d77e3] bg-[#2d77e3]/10"
                      : "border border-transparent bg-[#f6f8fc]"
                  }`}
                  key={pkg.code}
                  type="button"
                  onClick={() => setSelected(pkg)}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">
                      Pacote {pkg.sessions} sessões
                    </p>
                    <span className="text-sm font-semibold text-[#2d77e3]">
                      €{(pkg.price_cents / 100).toFixed(2)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    Sessões individuais com acompanhamento contínuo.
                  </p>
                </button>
              ))
            )}
          </div>

          {error ? (
            <div className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600">
              {error}
            </div>
          ) : null}

          <div className="mt-4 rounded-2xl bg-[#f6f8fc] px-4 py-3">
            <p className="text-xs text-slate-500">Profissional</p>
            <p className="text-sm font-semibold text-slate-900">
              Psicólogo(a) disponível
            </p>
          </div>

          <button
            className="mt-4 w-full h-12 rounded-xl bg-[#2d77e3] text-white text-base font-bold shadow-[0_16px_28px_rgba(45,119,227,0.2)] transition-transform active:scale-[0.98]"
            type="button"
            onClick={handleBook}
            disabled={submitting}
          >
            {submitting ? "Agendando..." : "Confirmar agendamento"}
          </button>
        </section>
        <BottomNav active="schedule" onSelect={onSelectTab} />
      </div>
    </div>
  );
};
