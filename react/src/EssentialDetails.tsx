import React from "react";
import headerShape from "./header-shape.png";
import { apiPost } from "./api";

type EssentialDetailsProps = {
  onBack?: () => void;
  onSuccess?: () => void;
};

const EssentialDetails = ({
  onBack,
  onSuccess,
}: EssentialDetailsProps): JSX.Element => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [phoneCountry, setPhoneCountry] = React.useState("+55");
  const [countryOrigin, setCountryOrigin] = React.useState("");
  const [countryResidence, setCountryResidence] = React.useState("");
  const [goal, setGoal] = React.useState("");
  const [wellBeing, setWellBeing] = React.useState(3);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError("Preencha nome, e-mail e senha.");
      return;
    }
    if (password !== confirmPassword) {
      setError("As senhas não conferem.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await apiPost("/api/register", { name, email, password });
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar conta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex justify-center">
      <div className="relative w-full max-w-[393px] flex flex-col min-h-screen bg-white overflow-hidden">
        <header className="relative h-[200px] overflow-hidden rounded-b-[32px] px-5 pt-8 pb-8 text-white bg-[linear-gradient(180deg,#5b97e7_0%,#5394de_40%,#4d8cd2_70%,#4c8bcf_100%)]">
          <img
            src={headerShape}
            alt=""
            className="absolute right-0 top-0 h-full w-[55%] object-cover opacity-25"
          />
          <button
            className="absolute left-4 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-lg backdrop-blur"
            type="button"
            aria-label="Voltar"
            onClick={onBack}
          >
            ←
          </button>
          <div className="relative z-10 mt-6 text-center">
            <h1 className="text-2xl font-semibold">Crie sua conta</h1>
            <p className="mt-2 text-sm text-white/90">
              Vamos começar com algumas informações essenciais.
            </p>
          </div>
        </header>

        <main className="flex-1 px-4 pb-32 -mt-6">
          <div className="rounded-[28px] bg-white px-4 pt-8 pb-6 shadow-[0_-8px_24px_rgba(15,23,42,0.08)]">
            <div className="flex flex-col gap-4">
              <label className="flex flex-col w-full">
                <span className="text-[#333D5F] text-base font-medium leading-normal pb-2">
                  Nome
                </span>
                <input
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#333D5F] bg-[#f6f7f8] focus:outline-0 focus:ring-2 focus:ring-[#2c74e8] h-14 placeholder:text-gray-400 p-4 border border-gray-200 text-base font-normal leading-normal"
                  placeholder="Digite seu nome completo"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </label>

              <label className="flex flex-col w-full">
                <span className="text-[#333D5F] text-base font-medium leading-normal pb-2">
                  E-mail
                </span>
                <span className="text-xs text-gray-500 pb-2">
                  Para login, comunicação e recuperação de conta.
                </span>
                <input
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#333D5F] bg-[#f6f7f8] focus:outline-0 focus:ring-2 focus:ring-[#2c74e8] h-14 placeholder:text-gray-400 p-4 border border-gray-200 text-base font-normal leading-normal"
                  placeholder="seuemail@exemplo.com"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>

              <label className="flex flex-col w-full">
                <span className="text-[#333D5F] text-base font-medium leading-normal pb-2">
                  Telefone com WhatsApp
                </span>
                <span className="text-xs text-gray-500 pb-2">
                  Importante para notificações e contato de suporte.
                </span>
                <div className="flex gap-2">
                  <select
                    className="w-24 appearance-none rounded-xl text-[#333D5F] bg-[#f6f7f8] focus:outline-0 focus:ring-2 focus:ring-[#2c74e8] h-14 p-4 border border-gray-200 text-base font-normal leading-normal"
                    value={phoneCountry}
                    onChange={(event) => setPhoneCountry(event.target.value)}
                  >
                    <option value="+55">+55</option>
                    <option value="+351">+351</option>
                    <option value="+1">+1</option>
                    <option value="+353">+353</option>
                  </select>
                  <input
                    className="flex-1 min-w-0 resize-none overflow-hidden rounded-xl text-[#333D5F] bg-[#f6f7f8] focus:outline-0 focus:ring-2 focus:ring-[#2c74e8] h-14 placeholder:text-gray-400 p-4 border border-gray-200 text-base font-normal leading-normal"
                    placeholder="(11) 98765-4321"
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </div>
              </label>

              <label className="flex flex-col w-full">
                <span className="text-[#333D5F] text-base font-medium leading-normal pb-2">
                  País de origem
                </span>
                <input
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#333D5F] bg-[#f6f7f8] focus:outline-0 focus:ring-2 focus:ring-[#2c74e8] h-14 placeholder:text-gray-400 p-4 border border-gray-200 text-base font-normal leading-normal"
                  placeholder="Brasil"
                  value={countryOrigin}
                  onChange={(event) => setCountryOrigin(event.target.value)}
                />
              </label>

              <label className="flex flex-col w-full">
                <span className="text-[#333D5F] text-base font-medium leading-normal pb-2">
                  País de residência atual
                </span>
                <input
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#333D5F] bg-[#f6f7f8] focus:outline-0 focus:ring-2 focus:ring-[#2c74e8] h-14 placeholder:text-gray-400 p-4 border border-gray-200 text-base font-normal leading-normal"
                  placeholder="Portugal"
                  value={countryResidence}
                  onChange={(event) => setCountryResidence(event.target.value)}
                />
              </label>

              <label className="flex flex-col w-full">
                <span className="text-[#333D5F] text-base font-medium leading-normal pb-2">
                  Qual é o seu principal objetivo ao usar o Tekoa?
                </span>
                <div className="relative w-full">
                  <select
                    className="w-full appearance-none rounded-xl text-[#333D5F] bg-[#f6f7f8] focus:outline-0 focus:ring-2 focus:ring-[#2c74e8] h-14 p-4 border border-gray-200 text-base font-normal leading-normal"
                    value={goal}
                    onChange={(event) => setGoal(event.target.value)}
                  >
                    <option value="">Selecione uma opção</option>
                    <option>Apoio emocional</option>
                    <option>Integração e vida no exterior</option>
                    <option>Carreira e estudos</option>
                    <option>Comunidade e conexões</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#333D5F]">
                    <span className="text-xl">▾</span>
                  </div>
                </div>
              </label>

              <label className="flex flex-col w-full">
                <span className="text-[#333D5F] text-base font-medium leading-normal pb-2">
                  Como você descreveria seu bem-estar geral recentemente?
                </span>
                <span className="text-xs text-gray-500 pb-2">
                  Uma pergunta leve para sugerir conteúdos adequados.
                </span>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { value: 1, icon: "sentiment_very_dissatisfied" },
                    { value: 2, icon: "sentiment_dissatisfied" },
                    { value: 3, icon: "sentiment_neutral" },
                    { value: 4, icon: "sentiment_satisfied" },
                    { value: 5, icon: "sentiment_very_satisfied" },
                  ].map(({ value, icon }) => (
                    <button
                      key={value}
                      className={`flex h-12 flex-col items-center justify-center rounded-xl border text-[11px] font-semibold ${
                        wellBeing === value
                          ? "border-[#2c74e8] bg-[#2c74e8] text-white"
                          : "border-gray-200 bg-[#f6f7f8] text-[#333D5F]"
                      }`}
                      type="button"
                      onClick={() => setWellBeing(value)}
                    >
                      <span className="material-symbols-outlined text-base">
                        {icon}
                      </span>
                      {value}
                    </button>
                  ))}
                </div>
                <div className="mt-2 rounded-xl bg-[#f6f7f8] px-4 py-3 text-xs text-gray-500">
                  {wellBeing === 1 &&
                    "Estou com dificuldades (maior suporte e acolhimento)."}
                  {wellBeing === 2 &&
                    "Não estou muito bem (desconforto ou desafios moderados)."}
                  {wellBeing === 3 &&
                    "Estou mais ou menos (transição ou adaptação)."}
                  {wellBeing === 4 &&
                    "Estou bem (equilíbrio e manutenção)."}
                  {wellBeing === 5 &&
                    "Estou muito bem! (momento positivo e crescimento)."}
                </div>
              </label>

              <label className="flex flex-col w-full">
                <span className="text-[#333D5F] text-base font-medium leading-normal pb-2">
                  Crie uma senha segura
                </span>
                <input
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#333D5F] bg-[#f6f7f8] focus:outline-0 focus:ring-2 focus:ring-[#2c74e8] h-14 placeholder:text-gray-400 p-4 border border-gray-200 text-base font-normal leading-normal"
                  placeholder="Crie uma senha"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>

              <label className="flex flex-col w-full">
                <span className="text-[#333D5F] text-base font-medium leading-normal pb-2">
                  Confirme sua senha
                </span>
                <input
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#333D5F] bg-[#f6f7f8] focus:outline-0 focus:ring-2 focus:ring-[#2c74e8] h-14 placeholder:text-gray-400 p-4 border border-gray-200 text-base font-normal leading-normal"
                  placeholder="Repita a senha"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </label>
            </div>
          </div>
        </main>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="mx-auto w-full max-w-[393px] px-4 py-4">
            {error ? (
              <p className="mb-2 text-center text-sm text-red-600">{error}</p>
            ) : null}
            <button
              className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 bg-[#2c74e8] text-white gap-2 text-base font-bold leading-normal tracking-[0.015em]"
              onClick={handleRegister}
              type="button"
              disabled={loading}
            >
              {loading ? "Criando conta..." : "Continuar para selecionar o plano"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { EssentialDetails };
export default EssentialDetails;

