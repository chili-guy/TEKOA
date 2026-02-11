import React from "react";

type RoleSelectProps = {
  onPatient?: () => void;
  onProfessional?: () => void;
  onLogin?: () => void;
};

export const RoleSelect = ({
  onPatient,
  onProfessional,
  onLogin,
}: RoleSelectProps): JSX.Element => {
  return (
    <div className="min-h-screen w-full bg-white flex justify-center">
      <div className="w-full max-w-[393px] px-4 pb-10 pt-12">
        <div className="rounded-[28px] bg-white px-4 pt-6 pb-6 text-center shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
          <h1 className="text-2xl font-semibold text-[#333D5F]">
            Crie sua conta
          </h1>
          <p className="mt-2 text-sm text-[#6b7280]">
            Antes de continuar, selecione seu perfil.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <button
              className="w-full rounded-2xl bg-[#2c74e8] py-4 text-sm font-semibold text-white shadow-[0_16px_28px_rgba(45,119,227,0.2)]"
              type="button"
              onClick={onPatient}
            >
              Sou paciente
            </button>
            <button
              className="w-full rounded-2xl border border-[#2c74e8] bg-white py-4 text-sm font-semibold text-[#2c74e8]"
              type="button"
              onClick={onProfessional}
            >
              Sou profissional
            </button>
          </div>

          <button
            className="mt-5 text-xs font-semibold text-[#6b7280]"
            type="button"
            onClick={onLogin}
          >
            Já tenho conta
          </button>
        </div>
      </div>
    </div>
  );
};
