import React from "react";
import choosePackageSvg from "../../SVGS/Escolha seu pacote de consultas.svg?react";
import { createAppointment, getPackages, getPsychologists, Package } from "./api";
import { SvgScreen } from "./SvgScreen";

type ChoosePackageProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
  onBooked?: () => void;
};

export const ChoosePackage = ({
  onSelectTab,
  onBooked,
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
    <SvgScreen
      SvgComponent={choosePackageSvg}
      title="Escolha seu pacote de consultas"
      activeTab="schedule"
      onSelectTab={onSelectTab}
    >
      <div className="absolute left-6 right-6 top-24 space-y-3">
        {loading ? (
          <div className="rounded-2xl bg-white/90 px-4 py-3 text-sm text-[#897561] shadow-sm">
            Carregando pacotes...
          </div>
        ) : (
          <>
            {packages.map((pkg) => (
              <button
                className={`w-full rounded-2xl px-4 py-3 text-left shadow-sm ${
                  selected?.code === pkg.code ? "bg-[#2d77e3]/10" : "bg-white/90"
                }`}
                key={pkg.code}
                type="button"
                onClick={() => setSelected(pkg)}
              >
                <p className="text-sm font-semibold text-[#1b1b1b]">
                  Pacote {pkg.sessions} sessões
                </p>
                <p className="text-xs text-[#897561]">
                  €{(pkg.price_cents / 100).toFixed(2)}
                </p>
              </button>
            ))}
            {error ? (
              <div className="rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600">
                {error}
              </div>
            ) : null}
            <button
              className="w-full h-12 rounded-xl bg-[#2d77e3] text-white text-base font-bold shadow-[0_16px_28px_rgba(45,119,227,0.2)] transition-transform active:scale-[0.98]"
              type="button"
              onClick={handleBook}
              disabled={submitting}
            >
              {submitting ? "Agendando..." : "Confirmar agendamento"}
            </button>
          </>
        )}
      </div>
    </SvgScreen>
  );
};
