import { BottomNav } from "./BottomNav";

type SupportNetworkScreenProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
};

export const SupportNetworkScreen = ({
  onSelectTab,
}: SupportNetworkScreenProps): JSX.Element => {
  const orgs = [
    {
      id: "1",
      name: "Casa do Imigrante",
      description: "Acolhimento e orientação para recém-chegados.",
    },
    {
      id: "2",
      name: "Rede Apoio Mulher",
      description: "Suporte psicológico e jurídico especializado.",
    },
    {
      id: "3",
      name: "Centro de Integração",
      description: "Cursos e apoio para adaptação cultural.",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#f7fafd] flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen px-4 pb-28 pt-6">
        <header className="rounded-3xl bg-white px-5 py-5 shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
          <p className="text-sm text-slate-500">Rede de Apoio</p>
          <h1 className="mt-1 text-xl font-semibold text-slate-900">
            Apoio ao Imigrante
          </h1>
          <p className="mt-2 text-xs text-slate-500">
            Encontre organizações e iniciativas confiáveis.
          </p>
        </header>

        <section className="mt-5 space-y-3">
          {orgs.map((org) => (
            <div
              key={org.id}
              className="rounded-2xl bg-white px-4 py-4 shadow-[0_10px_25px_rgba(15,23,42,0.06)]"
            >
              <p className="text-sm font-semibold text-slate-900">{org.name}</p>
              <p className="mt-1 text-xs text-slate-500">{org.description}</p>
              <div className="mt-3 flex gap-2">
                <button
                  className="flex-1 rounded-xl border border-[#e6ecf5] bg-white py-2 text-xs font-semibold text-slate-700"
                  type="button"
                >
                  Detalhes
                </button>
                <button
                  className="flex-1 rounded-xl bg-[#2d77e3] py-2 text-xs font-semibold text-white"
                  type="button"
                >
                  Contato
                </button>
              </div>
            </div>
          ))}
        </section>
        <BottomNav active="content" onSelect={onSelectTab} />
      </div>
    </div>
  );
};
