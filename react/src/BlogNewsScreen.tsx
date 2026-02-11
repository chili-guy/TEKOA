import React from "react";
import { BottomNav } from "./BottomNav";
import newsImageOne from "./assets/news-1.jpg";
import newsImageTwo from "./assets/news-2.jpg";

type BlogNewsScreenProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
  onNavigate?: (screen: string) => void;
};

const articles = [
  {
    id: "1",
    title: "Como lidar com a saudade de casa",
    excerpt:
      "Dicas práticas para manter a saúde mental e fortalecer o bem-estar.",
    tag: "Saúde Mental",
    readTime: "5 min",
    author: "Equipe Advena",
    image:
      "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "2",
    title: "Primeiros dias no novo país: o que priorizar",
    excerpt:
      "Organização, documentos essenciais e como criar uma rotina sustentável.",
    tag: "Integração",
    readTime: "4 min",
    author: "Equipe Advena",
    image:
      "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=900&q=80",
  },
];

const newsItems = [
  {
    id: "n1",
    title: "Serviços de apoio ampliados para imigrantes em 2026",
    excerpt: "Novas iniciativas incluem mentorias gratuitas e grupos de suporte.",
    tag: "Notícias",
    image: newsImageOne,
  },
  {
    id: "n2",
    title: "Guia atualizado de documentação para residência",
    excerpt: "Veja o que mudou nos processos e prazos deste ano.",
    tag: "Atualização",
    image: newsImageTwo,
  },
];

export const BlogNewsScreen = ({
  onSelectTab,
  onNavigate,
}: BlogNewsScreenProps): JSX.Element => {
  const [activeTab, setActiveTab] = React.useState<"blog" | "news">("blog");

  return (
    <div className="min-h-screen w-full bg-[#f7fafd] flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen px-4 pb-28 pt-6">
        <header className="rounded-3xl bg-white px-5 py-5 shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
          <p className="text-sm font-semibold text-slate-900">Blog & Notícias</p>
          <p className="mt-1 text-xs text-slate-500">
            Informação para cuidar da sua saúde e integração
          </p>
          <div className="mt-4 rounded-2xl bg-[#f6f8fc] p-1">
            <div className="grid grid-cols-2 gap-2">
              <button
                className={`rounded-2xl px-4 py-2 text-xs font-semibold ${
                  activeTab === "blog"
                    ? "bg-[#37b676] text-white"
                    : "bg-white text-slate-500"
                }`}
                type="button"
                onClick={() => setActiveTab("blog")}
              >
                Blog Advena
              </button>
              <button
                className={`rounded-2xl px-4 py-2 text-xs font-semibold ${
                  activeTab === "news"
                    ? "bg-[#37b676] text-white"
                    : "bg-white text-slate-500"
                }`}
                type="button"
                onClick={() => setActiveTab("news")}
              >
                Notícias
              </button>
            </div>
          </div>
        </header>

        {activeTab === "blog" ? (
          <section className="mt-4 space-y-4">
            <button
              className="w-full overflow-hidden rounded-3xl bg-white text-left shadow-[0_12px_25px_rgba(15,23,42,0.08)]"
              type="button"
              onClick={() => onNavigate?.("blog-news-detail")}
            >
              <div className="h-40 w-full">
                <img
                  src={articles[0].image}
                  alt={articles[0].title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="px-4 py-4">
                <span className="rounded-full bg-[#ffefe9] px-2 py-1 text-[11px] font-semibold text-[#ff6b4a]">
                  {articles[0].tag}
                </span>
                <h2 className="mt-2 text-base font-semibold text-slate-900">
                  {articles[0].title}
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  {articles[0].excerpt}
                </p>
                <p className="mt-2 text-[11px] text-slate-400">
                  Por {articles[0].author} · Leitura {articles[0].readTime}
                </p>
                <div className="mt-4">
                  <div className="w-full rounded-2xl bg-[#2d77e3] py-3 text-center text-sm font-semibold text-white">
                    Ler Artigo
                  </div>
                </div>
              </div>
            </button>

            <button
              className="w-full overflow-hidden rounded-3xl bg-white text-left shadow-[0_10px_25px_rgba(15,23,42,0.06)]"
              type="button"
              onClick={() => onNavigate?.("blog-news-detail")}
            >
              <div className="h-28 w-full">
                <img
                  src={articles[1].image}
                  alt={articles[1].title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="px-4 py-4">
                <span className="rounded-full bg-[#e7f0ff] px-2 py-1 text-[11px] font-semibold text-[#2d77e3]">
                  {articles[1].tag}
                </span>
                <h3 className="mt-2 text-sm font-semibold text-slate-900">
                  {articles[1].title}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  {articles[1].excerpt}
                </p>
                <p className="mt-2 text-[11px] text-slate-400">
                  Por {articles[1].author} · Leitura {articles[1].readTime}
                </p>
                <div className="mt-4">
                  <div className="w-full rounded-2xl bg-[#2d77e3] py-3 text-center text-xs font-semibold text-white">
                    Ler Artigo
                  </div>
                </div>
              </div>
            </button>
          </section>
        ) : (
          <section className="mt-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">Notícias</p>
              <button
                className="text-xs font-semibold text-[#2f6fe4]"
                type="button"
              >
                Ver todas
              </button>
            </div>
            <div className="mt-3 space-y-3">
              {newsItems.map((item) => (
                <button
                  className="flex w-full flex-col gap-2 rounded-2xl bg-white px-4 py-4 text-left shadow-[0_10px_25px_rgba(15,23,42,0.06)]"
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate?.("blog-news-detail")}
                >
                <div className="h-28 w-full overflow-hidden rounded-2xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="rounded-full bg-[#f2f6ff] px-2 py-1 text-[11px] font-semibold text-[#2d77e3]">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-500">{item.excerpt}</p>
                  <div className="mt-2">
                    <div className="w-full rounded-2xl bg-[#2d77e3] py-3 text-center text-xs font-semibold text-white">
                      Ler Artigo
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}
        <BottomNav active="content" onSelect={onSelectTab} />
      </div>
    </div>
  );
};
