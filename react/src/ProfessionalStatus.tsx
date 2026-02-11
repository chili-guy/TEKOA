type ProfessionalStatusProps = {
  onContinue?: () => void;
};

export const ProfessionalStatus = ({
  onContinue,
}: ProfessionalStatusProps): JSX.Element => {
  return (
    <div className="min-h-screen w-full bg-white flex justify-center">
      <div className="w-full max-w-[393px] px-4 pb-12 pt-10">
        <div className="rounded-[28px] bg-white px-5 pt-8 pb-8 text-center shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f1ff] text-[#2c74e8]">
            <span className="material-symbols-outlined text-2xl">verified</span>
          </div>
          <h1 className="mt-4 text-xl font-semibold text-[#333D5F]">
            Recebemos seu cadastro!
          </h1>
          <p className="mt-2 text-sm text-[#6b7280]">
            Nossa equipe está analisando suas informações. Assim que aprovado,
            seu perfil ficará disponível para agendamentos.
          </p>
          <div className="mt-4 rounded-2xl bg-[#f6f7f8] px-4 py-3 text-xs text-[#6b7280]">
            Isso geralmente leva até 48 horas úteis.
          </div>
          <button
            className="mt-6 w-full rounded-xl bg-[#2c74e8] py-3 text-sm font-semibold text-white"
            type="button"
            onClick={onContinue}
          >
            Acompanhar status
          </button>
        </div>
      </div>
    </div>
  );
};
