import { BottomNav } from "./BottomNav";

type EmotionalHealthProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
};

export const EmotionalHealth = ({ onSelectTab }: EmotionalHealthProps): JSX.Element => {
  const resources = [
    {
      id: "1",
      title: "Avaliação rápida de estresse",
      description: "Descubra seu nível atual em poucos minutos.",
    },
    {
      id: "2",
      title: "Ansiedade e adaptação cultural",
      description: "Conteúdos e exercícios para o dia a dia.",
    },
    {
      id: "3",
      title: "Autocuidado guiado",
      description: "Rotinas simples para manter o equilíbrio.",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#f7fafd] flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen px-4 pb-28 pt-6">
        <header className="rounded-3xl bg-white px-5 py-5 shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
          <p className="text-sm text-slate-500">Saúde Emocional</p>
          <h1 className="mt-1 text-xl font-semibold text-slate-900">
            Cuidar de você
          </h1>
          <p className="mt-2 text-xs text-slate-500">
            Recursos e avaliações para seu bem-estar.
          </p>
        </header>

        <section className="mt-5 space-y-3">
          {resources.map((item) => (
            <button
              key={item.id}
              className="flex w-full items-center justify-between rounded-2xl bg-white px-4 py-4 text-left shadow-[0_10px_25px_rgba(15,23,42,0.06)]"
              type="button"
            >
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {item.title}
                </p>
                <p className="text-xs text-slate-500">{item.description}</p>
              </div>
              <span className="text-lg text-slate-400">›</span>
            </button>
          ))}
        </section>
        <BottomNav active="content" onSelect={onSelectTab} />
      </div>
    </div>
  );
};
