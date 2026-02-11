import { BottomNav } from "./BottomNav";

type UpcomingEventsProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
  onNavigate?: (screen: string) => void;
};

export const UpcomingEvents = ({
  onSelectTab,
  onNavigate,
}: UpcomingEventsProps): JSX.Element => {
  const events = [
    {
      id: "1",
      title: "Workshop de Integração Cultural",
      date: "12 Fev • 18:00",
      location: "Online",
    },
    {
      id: "2",
      title: "Encontro com psicólogos brasileiros",
      date: "20 Fev • 19:00",
      location: "Lisboa",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#f7fafd] flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen px-4 pb-28 pt-6">
        <header className="rounded-3xl bg-white px-5 py-5 shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
          <p className="text-sm text-slate-500">Próximos Eventos</p>
          <h1 className="mt-1 text-xl font-semibold text-slate-900">
            Agenda ao vivo
          </h1>
          <button
            className="mt-3 text-xs font-semibold text-[#2d77e3]"
            type="button"
            onClick={() => onNavigate?.("past-events")}
          >
            Ver eventos anteriores
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
              <p className="text-xs text-slate-500">{event.location}</p>
              <button
                className="mt-3 w-full rounded-xl bg-[#2d77e3] py-2 text-xs font-semibold text-white"
                type="button"
              >
                Participar
              </button>
            </div>
          ))}
        </section>
        <BottomNav active="content" onSelect={onSelectTab} />
      </div>
    </div>
  );
};
