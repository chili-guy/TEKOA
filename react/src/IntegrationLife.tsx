import { BottomNav } from "./BottomNav";

type IntegrationLifeProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
};

export const IntegrationLife = ({ onSelectTab }: IntegrationLifeProps): JSX.Element => {
  const topics = [
    {
      id: "1",
      title: "Documentação e primeiros passos",
      description: "Guias rápidos para organizar sua chegada.",
    },
    {
      id: "2",
      title: "Trabalho e estudos",
      description: "Dicas para adaptação profissional e acadêmica.",
    },
    {
      id: "3",
      title: "Comunidade e conexões",
      description: "Encontre grupos e eventos locais.",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#f7fafd] flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen px-4 pb-28 pt-6">
        <header className="rounded-3xl bg-white px-5 py-5 shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
          <p className="text-sm text-slate-500">Integração & Vida</p>
          <h1 className="mt-1 text-xl font-semibold text-slate-900">
            Recursos para sua jornada
          </h1>
        </header>

        <section className="mt-5 space-y-3">
          {topics.map((topic) => (
            <button
              key={topic.id}
              className="flex w-full items-center justify-between rounded-2xl bg-white px-4 py-4 text-left shadow-[0_10px_25px_rgba(15,23,42,0.06)]"
              type="button"
            >
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {topic.title}
                </p>
                <p className="text-xs text-slate-500">{topic.description}</p>
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
