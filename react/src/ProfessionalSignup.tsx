import React from "react";

type ProfessionalSignupProps = {
  onBack?: () => void;
  onSuccess?: () => void;
};

export const ProfessionalSignup = ({
  onBack,
  onSuccess,
}: ProfessionalSignupProps): JSX.Element => {
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    onSuccess?.();
  };

  return (
    <div className="min-h-screen w-full bg-white flex justify-center">
      <div className="w-full max-w-[393px] px-4 pb-24 pt-8">
        <header className="relative rounded-[28px] bg-[#5b97e7] px-5 pt-8 pb-8 text-white">
          <button
            className="absolute left-4 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-lg backdrop-blur"
            type="button"
            aria-label="Voltar"
            onClick={onBack}
          >
            ←
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Bem-vindo à Ádvena</h1>
            <p className="mt-2 text-sm text-white/90">
              Saúde e Bem-Estar Para Imigrantes
            </p>
          </div>
        </header>

        <section className="mt-6 text-sm text-[#333D5F] space-y-4">
          <p>
            Obrigado pelo seu interesse em se juntar à nossa equipe de
            profissionais. Para concluir sua inscrição e começar a atender nossos
            clientes, siga as instruções abaixo:
          </p>
          <div>
            <p className="font-semibold">Como funciona agora?</p>
            <p className="mt-1 text-[#6b7280]">
              Para se juntar à nossa equipe, preencha o formulário com suas
              informações pessoais e profissionais, incluindo o link de sua
              agenda no Calendly e uma fotografia para seu perfil. Após análise
              dos dados recebidos, seu perfil será disponibilizado em nossa
              plataforma, permitindo que os pacientes agendem consultas
              diretamente com você.
            </p>
          </div>
          <div className="rounded-2xl bg-[#fff7ed] px-4 py-3 text-[#9a3412]">
            <p className="font-semibold">
              Importante: Demanda por atendimento nos finais de semana
            </p>
            <p className="mt-1 text-xs">
              Recomendamos disponibilizar horários nesses dias, sempre que
              possível.
            </p>
          </div>
        </section>

        <form
          className="mt-6 rounded-[28px] bg-white px-4 pt-6 pb-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4">
            <label className="flex flex-col w-full">
              <span className="text-[#333D5F] text-sm font-semibold pb-2">
                Nome Completo*
              </span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  className="h-12 rounded-xl border border-gray-200 bg-[#f6f7f8] px-4 text-sm"
                  placeholder="First Name"
                  required
                />
                <input
                  className="h-12 rounded-xl border border-gray-200 bg-[#f6f7f8] px-4 text-sm"
                  placeholder="Last Name"
                  required
                />
              </div>
            </label>

            <label className="flex flex-col w-full">
              <span className="text-[#333D5F] text-sm font-semibold pb-2">
                Data de Nascimento*
              </span>
              <input
                className="h-12 rounded-xl border border-gray-200 bg-[#f6f7f8] px-4 text-sm"
                type="date"
                required
              />
            </label>

            <label className="flex flex-col w-full">
              <span className="text-[#333D5F] text-sm font-semibold pb-2">
                Gênero*
              </span>
              <select className="h-12 rounded-xl border border-gray-200 bg-[#f6f7f8] px-4 text-sm" required>
                <option value="">Selecione</option>
                <option>Feminino</option>
                <option>Masculino</option>
                <option>Outro</option>
                <option>Prefiro não dizer</option>
              </select>
            </label>

            <label className="flex flex-col w-full">
              <span className="text-[#333D5F] text-sm font-semibold pb-2">
                E-mail*
              </span>
              <input
                className="h-12 rounded-xl border border-gray-200 bg-[#f6f7f8] px-4 text-sm"
                type="email"
                placeholder="example@example.com"
                required
              />
            </label>

            <label className="flex flex-col w-full">
              <span className="text-[#333D5F] text-sm font-semibold pb-2">
                Telefone Para Contato*
              </span>
              <div className="grid grid-cols-[96px_1fr] gap-2">
                <input
                  className="h-12 rounded-xl border border-gray-200 bg-[#f6f7f8] px-4 text-sm"
                  placeholder="Area Code"
                  required
                />
                <input
                  className="h-12 rounded-xl border border-gray-200 bg-[#f6f7f8] px-4 text-sm"
                  placeholder="Phone Number"
                  required
                />
              </div>
            </label>

            <label className="flex flex-col w-full">
              <span className="text-[#333D5F] text-sm font-semibold pb-2">
                Eu Sou*
              </span>
              <select className="h-12 rounded-xl border border-gray-200 bg-[#f6f7f8] px-4 text-sm" required>
                <option value="">Please Select</option>
                <option>Psicólogo(a)</option>
                <option>Terapeuta</option>
                <option>Coach</option>
                <option>Outro</option>
              </select>
            </label>

            <label className="flex flex-col w-full">
              <span className="text-[#333D5F] text-sm font-semibold pb-2">
                Número do Registro Profissional*
              </span>
              <input
                className="h-12 rounded-xl border border-gray-200 bg-[#f6f7f8] px-4 text-sm"
                required
              />
            </label>

            <label className="flex flex-col w-full">
              <span className="text-[#333D5F] text-sm font-semibold pb-2">
                Estado de emissão do registro profissional*
              </span>
              <input
                className="h-12 rounded-xl border border-gray-200 bg-[#f6f7f8] px-4 text-sm"
                required
              />
            </label>

            <label className="flex flex-col w-full">
              <span className="text-[#333D5F] text-sm font-semibold pb-2">
                Tempo de experiência na área*
              </span>
              <input
                className="h-12 rounded-xl border border-gray-200 bg-[#f6f7f8] px-4 text-sm"
                placeholder="Ex.: 5 anos"
                required
              />
            </label>

            <label className="flex flex-col w-full">
              <span className="text-[#333D5F] text-sm font-semibold pb-2">
                Áreas de atuação*
              </span>
              <input
                className="h-12 rounded-xl border border-gray-200 bg-[#f6f7f8] px-4 text-sm"
                placeholder="Clínica, Esportiva, Inglês, Espanhol..."
                required
              />
            </label>

            <label className="flex flex-col w-full">
              <span className="text-[#333D5F] text-sm font-semibold pb-2">
                Disponibilidade de horário*
              </span>
              <input
                className="h-12 rounded-xl border border-gray-200 bg-[#f6f7f8] px-4 text-sm"
                placeholder="Seg a sex, 9h-18h"
                required
              />
            </label>

            <label className="flex flex-col w-full">
              <span className="text-[#333D5F] text-sm font-semibold pb-2">
                Já teve experiência internacional (morou em outro país)?*
              </span>
              <select className="h-12 rounded-xl border border-gray-200 bg-[#f6f7f8] px-4 text-sm" required>
                <option value="">Selecione</option>
                <option>Sim</option>
                <option>Não</option>
              </select>
            </label>

            <label className="flex flex-col w-full">
              <span className="text-[#333D5F] text-sm font-semibold pb-2">
                Anexar cópia do comprovante de registro profissional*
              </span>
              <input
                className="h-12 rounded-xl border border-dashed border-gray-300 bg-[#f6f7f8] px-4 text-sm"
                type="file"
                required
              />
            </label>

            <label className="flex flex-col w-full">
              <span className="text-[#333D5F] text-sm font-semibold pb-2">
                Anexo currículo profissional*
              </span>
              <input
                className="h-12 rounded-xl border border-dashed border-gray-300 bg-[#f6f7f8] px-4 text-sm"
                type="file"
                required
              />
            </label>

            <label className="flex flex-col w-full">
              <span className="text-[#333D5F] text-sm font-semibold pb-2">
                Seu link de agendamento Calendly*
              </span>
              <input
                className="h-12 rounded-xl border border-gray-200 bg-[#f6f7f8] px-4 text-sm"
                placeholder="https://calendly.com/"
                required
              />
              <p className="mt-2 text-xs text-[#6b7280]">
                Precisa criar? Assista:
                {" "}
                <a
                  className="text-[#2c74e8] underline"
                  href="https://www.youtube.com/results?search_query=como+fazer+um+calendly"
                  target="_blank"
                  rel="noreferrer"
                >
                  como fazer um Calendly
                </a>
              </p>
            </label>

            <label className="flex flex-col w-full">
              <span className="text-[#333D5F] text-sm font-semibold pb-2">
                Foto para o seu perfil em nossa plataforma*
              </span>
              <input
                className="h-12 rounded-xl border border-dashed border-gray-300 bg-[#f6f7f8] px-4 text-sm"
                type="file"
                required
              />
            </label>

            <label className="flex flex-col w-full">
              <span className="text-[#333D5F] text-sm font-semibold pb-2">
                Conta para pagamento pelas consultas realizadas*
              </span>
              <textarea
                className="min-h-[88px] rounded-xl border border-gray-200 bg-[#f6f7f8] px-4 py-3 text-sm"
                placeholder="Informe seu PIX, Conta Corrente ou Conta Poupança"
                required
              />
            </label>
          </div>

          <button
            className="mt-6 w-full rounded-xl bg-[#2c74e8] py-3 text-sm font-semibold text-white"
            type="submit"
          >
            {submitted ? "Enviado" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};
