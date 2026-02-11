import React from "react";
import { useCurrentUser } from "./hooks/useCurrentUser";
import { BottomNav } from "./BottomNav";

type ProfileDetailsProps = {
  onSelectTab?: (tab: "home" | "schedule" | "content" | "profile") => void;
};

export const ProfileDetails = ({ onSelectTab }: ProfileDetailsProps): JSX.Element => {
  const { data } = useCurrentUser();
  const name = data?.user?.name ?? "Usuário";
  const email = data?.user?.email ?? "email@exemplo.com";
  const [fullName, setFullName] = React.useState(name);
  const [userEmail, setUserEmail] = React.useState(email);
  const [phone, setPhone] = React.useState("(11) 98765-4321");
  const [country, setCountry] = React.useState("Brasil");
  const [language, setLanguage] = React.useState("Português");
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    setFullName(name);
    setUserEmail(email);
  }, [name, email]);

  return (
    <div className="min-h-screen w-full bg-[#f7fafd] flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen px-4 pb-28 pt-6">
        <header className="rounded-3xl bg-white px-5 py-5 shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
          <p className="text-sm text-slate-500">Perfil</p>
          <h1 className="mt-1 text-xl font-semibold text-slate-900">
            Dados pessoais
          </h1>
          <p className="mt-2 text-xs text-slate-500">
            Atualize suas informações de perfil.
          </p>
        </header>

        <section className="mt-5 space-y-4">
          <label className="flex flex-col">
            <span className="text-xs font-semibold text-slate-600">
              Nome completo
            </span>
            <input
              className="mt-2 w-full rounded-2xl border border-[#e6ecf5] bg-white px-4 py-3 text-sm text-slate-900 shadow-[0_6px_18px_rgba(15,23,42,0.04)] focus:border-[#2d77e3] focus:outline-none"
              value={fullName}
              onChange={(event) => {
                setFullName(event.target.value);
                setSaved(false);
              }}
            />
          </label>
          <label className="flex flex-col">
            <span className="text-xs font-semibold text-slate-600">E-mail</span>
            <input
              className="mt-2 w-full rounded-2xl border border-[#e6ecf5] bg-white px-4 py-3 text-sm text-slate-900 shadow-[0_6px_18px_rgba(15,23,42,0.04)] focus:border-[#2d77e3] focus:outline-none"
              type="email"
              value={userEmail}
              onChange={(event) => {
                setUserEmail(event.target.value);
                setSaved(false);
              }}
            />
          </label>
          <label className="flex flex-col">
            <span className="text-xs font-semibold text-slate-600">
              Telefone
            </span>
            <input
              className="mt-2 w-full rounded-2xl border border-[#e6ecf5] bg-white px-4 py-3 text-sm text-slate-900 shadow-[0_6px_18px_rgba(15,23,42,0.04)] focus:border-[#2d77e3] focus:outline-none"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
                setSaved(false);
              }}
            />
          </label>
          <label className="flex flex-col">
            <span className="text-xs font-semibold text-slate-600">
              País de residência
            </span>
            <input
              className="mt-2 w-full rounded-2xl border border-[#e6ecf5] bg-white px-4 py-3 text-sm text-slate-900 shadow-[0_6px_18px_rgba(15,23,42,0.04)] focus:border-[#2d77e3] focus:outline-none"
              value={country}
              onChange={(event) => {
                setCountry(event.target.value);
                setSaved(false);
              }}
            />
          </label>
          <label className="flex flex-col">
            <span className="text-xs font-semibold text-slate-600">
              Idioma de preferência
            </span>
            <select
              className="mt-2 w-full rounded-2xl border border-[#e6ecf5] bg-white px-4 py-3 text-sm text-slate-900 shadow-[0_6px_18px_rgba(15,23,42,0.04)] focus:border-[#2d77e3] focus:outline-none"
              value={language}
              onChange={(event) => {
                setLanguage(event.target.value);
                setSaved(false);
              }}
            >
              <option>Português</option>
              <option>Inglês</option>
              <option>Espanhol</option>
              <option>Francês</option>
            </select>
          </label>
          <button
            className="w-full rounded-2xl bg-[#2d77e3] py-3 text-sm font-semibold text-white shadow-[0_16px_28px_rgba(45,119,227,0.2)]"
            type="button"
            onClick={() => setSaved(true)}
          >
            {saved ? "Dados salvos" : "Salvar alterações"}
          </button>
        </section>
        <BottomNav active="profile" onSelect={onSelectTab} />
      </div>
    </div>
  );
};
