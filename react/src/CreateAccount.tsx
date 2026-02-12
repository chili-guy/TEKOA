import React from "react";
import illustration from "./illustration-0.png";

type CreateAccountProps = {
  onContinue?: () => void;
  onLogin?: () => void;
};

export const CreateAccount = ({
  onContinue,
  onLogin,
}: CreateAccountProps): JSX.Element => {
  const [wellBeing, setWellBeing] = React.useState(3);

  return (
    <div className="min-h-screen w-full bg-white flex justify-center">
      <div className="w-full max-w-[393px] px-4 pb-10 pt-10 flex flex-col items-center">
        <div className="w-[139px] h-[178px] rounded-[20px] overflow-hidden bg-[#f7fafd]">
          <img
            src={illustration}
            alt="Ilustração de criação de conta"
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="mt-8 text-[24px] font-heading-h1 text-b-1 text-center">
          Crie sua conta
        </h1>
        <p className="mt-2 text-b-2 text-sm text-center max-w-[320px]">
          Preencha os dados para personalizar sua jornada.
        </p>

        <form className="mt-8 w-full max-w-[361px] space-y-4">
          <div>
            <label className="text-xs font-semibold text-b-2">Nome</label>
            <input
              className="mt-2 w-full h-12 rounded-xl border border-line px-4 text-sm text-b-1"
              type="text"
              placeholder="Seu nome completo"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-b-2">
              E-mail (para login, comunicação e recuperação de conta)
            </label>
            <input
              className="mt-2 w-full h-12 rounded-xl border border-line px-4 text-sm text-b-1"
              type="email"
              placeholder="voce@email.com"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-b-2">
              Telefone com WhatsApp (para notificações e suporte)
            </label>
            <div className="mt-2 flex gap-2">
              <select className="h-12 w-24 rounded-xl border border-line px-3 text-sm text-b-1">
                <option>+55</option>
                <option>+351</option>
                <option>+1</option>
                <option>+353</option>
              </select>
              <input
                className="h-12 flex-1 rounded-xl border border-line px-4 text-sm text-b-1"
                type="tel"
                placeholder="(11) 98765-4321"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-b-2">
              País de origem
            </label>
            <input
              className="mt-2 w-full h-12 rounded-xl border border-line px-4 text-sm text-b-1"
              type="text"
              placeholder="Brasil"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-b-2">
              País de residência atual
            </label>
            <input
              className="mt-2 w-full h-12 rounded-xl border border-line px-4 text-sm text-b-1"
              type="text"
              placeholder="Portugal"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-b-2">
              Qual é o seu principal objetivo ao usar o Tekoa?
            </label>
            <select className="mt-2 w-full h-12 rounded-xl border border-line px-4 text-sm text-b-1">
              <option>Apoio emocional</option>
              <option>Integração e vida no exterior</option>
              <option>Carreira e estudos</option>
              <option>Comunidade e conexões</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-b-2">
              Como você descreveria seu bem-estar geral recentemente?
            </label>
            <div className="mt-3 flex items-center justify-between gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  className={`flex h-10 flex-1 items-center justify-center rounded-xl border text-xs font-semibold ${
                    wellBeing === value
                      ? "border-main bg-main text-white"
                      : "border-line bg-white text-b-2"
                  }`}
                  type="button"
                  onClick={() => setWellBeing(value)}
                >
                  {value}
                </button>
              ))}
            </div>
            <div className="mt-2 rounded-xl bg-[#f7fafd] px-3 py-2 text-[11px] text-b-2">
              {wellBeing === 1 &&
                "Estou com dificuldades (maior suporte e acolhimento)."}
              {wellBeing === 2 &&
                "Não estou muito bem (desconforto ou desafios moderados)."}
              {wellBeing === 3 &&
                "Estou mais ou menos (ponto neutro de transição)."}
              {wellBeing === 4 && "Estou bem (equilíbrio e manutenção)."}
              {wellBeing === 5 &&
                "Estou muito bem! (momento positivo e crescimento)."}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-b-2">
              Crie uma senha segura
            </label>
            <input
              className="mt-2 w-full h-12 rounded-xl border border-line px-4 text-sm text-b-1"
              type="password"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-b-2">
              Confirme sua senha
            </label>
            <input
              className="mt-2 w-full h-12 rounded-xl border border-line px-4 text-sm text-b-1"
              type="password"
              placeholder="••••••••"
            />
          </div>
        </form>

        <button
          className="mt-8 w-full max-w-[361px] h-12 rounded-xl bg-main text-white text-base font-button-blod-16 shadow-[0_16px_28px_rgba(45,119,227,0.2)] transition-transform active:scale-[0.98]"
          type="button"
          onClick={onContinue}
        >
          Continuar para selecionar o plano
        </button>
        <button
          className="mt-3 w-full max-w-[361px] h-12 rounded-xl border border-main text-main text-base font-button-blod-16 bg-white transition-transform active:scale-[0.98]"
          type="button"
          onClick={onLogin}
        >
          Já tenho conta
        </button>
      </div>
    </div>
  );
};

