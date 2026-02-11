import { BottomNav } from "./BottomNav";

type BlogNewsDetailProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
  onNavigate?: (screen: string) => void;
};

export const BlogNewsDetail = ({
  onSelectTab,
  onNavigate,
}: BlogNewsDetailProps): JSX.Element => {
  return (
    <div className="min-h-screen w-full bg-[#f7fafd] flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen px-4 pb-28 pt-6">
        <header className="flex items-center gap-3">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 shadow-[0_10px_25px_rgba(15,23,42,0.06)]"
            type="button"
            onClick={() => onNavigate?.("blog-news")}
            aria-label="Voltar"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </button>
          <div>
            <p className="text-sm text-slate-500">Blog & Notícias</p>
            <h1 className="text-xl font-semibold text-slate-900">
              Artigo
            </h1>
          </div>
        </header>

        <section className="mt-5 rounded-3xl bg-white px-5 py-5 shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="rounded-full bg-[#2f6fe4]/10 px-2 py-1 text-[11px] font-semibold text-[#2f6fe4]">
              Saúde emocional
            </span>
            <span>6 min</span>
          </div>
          <h2 className="mt-3 text-lg font-semibold text-slate-900">
            Como lidar com a ansiedade na adaptação cultural
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Estratégias práticas para reduzir o estresse e manter o equilíbrio no dia a dia.
          </p>
          <div className="mt-4 h-36 rounded-2xl bg-gradient-to-br from-[#e7f0ff] to-[#f5f9ff] flex items-center justify-center text-[#2f6fe4]">
            <span className="material-symbols-outlined text-4xl">article</span>
          </div>
          <div className="mt-5 space-y-3 text-sm text-slate-600">
            <p>
              Mudanças de país trazem novos desafios emocionais. Uma rotina previsível,
              pausas conscientes e apoio social são fatores que reduzem a ansiedade.
            </p>
            <p>
              Defina horários para alimentação e descanso, pratique respiração guiada
              e mantenha contato com pessoas de confiança. Pequenos hábitos geram
              estabilidade e bem-estar.
            </p>
            <p>
              Caso perceba sintomas persistentes, agendar uma sessão com um profissional
              pode ajudar a construir estratégias personalizadas.
            </p>
          </div>
          <button
            className="mt-5 w-full h-12 rounded-xl bg-[#2d77e3] text-white text-base font-bold shadow-[0_16px_28px_rgba(45,119,227,0.2)] transition-transform active:scale-[0.98]"
            type="button"
            onClick={() => onNavigate?.("appointments")}
          >
            Agendar sessão
          </button>
        </section>
        <BottomNav active="content" onSelect={onSelectTab} />
      </div>
    </div>
  );
};
