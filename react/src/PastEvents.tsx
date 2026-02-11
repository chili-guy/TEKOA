import { BottomNav } from "./BottomNav";

type PastEventsProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
  onNavigate?: (screen: string) => void;
};

export const PastEvents = ({
  onSelectTab,
  onNavigate,
}: PastEventsProps): JSX.Element => {
  const events = [
    {
      id: "1",
      title: "Roda de conversa: adaptação cultural",
      date: "28 Jan • 18:00",
    },
    {
      id: "2",
      title: "Como lidar com ansiedade na imigração",
      date: "15 Jan • 19:00",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#f7fafd] flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen px-4 pb-28 pt-6">
        <header className="rounded-3xl bg-white px-5 py-5 shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
          <p className="text-sm text-slate-500">Eventos Anteriores</p>
          <h1 className="mt-1 text-xl font-semibold text-slate-900">
            Relembre encontros
          </h1>
          <button
            className="mt-3 text-xs font-semibold text-[#2d77e3]"
            type="button"
            onClick={() => onNavigate?.("upcoming-events")}
          >
            Ver próximos eventos
          </button>
        </header>

        <section className="mt-5 space-y-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="rounded-2xl bg-white px-4 py-4 shadow-[0_10px_25px_rgba(15,23,42,0.06)]"
            >
              <p className="text-sm font-semibold text-slate-900">
                {event.title}
              </p>
              <p className="mt-1 text-xs text-slate-500">{event.date}</p>
              <button
                className="mt-3 w-full rounded-xl border border-[#e6ecf5] bg-white py-2 text-xs font-semibold text-slate-700"
                type="button"
              >
                Ver resumo
              </button>
            </div>
          ))}
        </section>
        <BottomNav active="content" onSelect={onSelectTab} />
      </div>
    </div>
  );
};
