import React from "react";
import headerShape from "./header-shape.png";
import { apiPost } from "./api";

type LoginProps = {
  onBack?: () => void;
  onSuccess?: () => void;
};

export const Login = ({ onBack, onSuccess }: LoginProps): JSX.Element => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await apiPost("/api/login", { email, password });
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao entrar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex justify-center">
      <div className="w-full max-w-[393px] flex flex-col min-h-screen">
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
            <h1 className="text-2xl font-semibold">Entrar</h1>
            <p className="mt-2 text-sm text-white/90">
              Acesse sua conta para continuar.
            </p>
          </div>
        </header>

        <main className="flex-1 px-4 pb-32 -mt-6">
          <div className="rounded-[28px] bg-white px-4 pt-8 pb-6 shadow-[0_-8px_24px_rgba(15,23,42,0.08)]">
            <div className="flex flex-col gap-4">
              <label className="flex flex-col w-full">
                <span className="text-[#333D5F] text-base font-medium leading-normal pb-2">
                  E-mail
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
                  Senha
                </span>
                <input
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#333D5F] bg-[#f6f7f8] focus:outline-0 focus:ring-2 focus:ring-[#2c74e8] h-14 placeholder:text-gray-400 p-4 border border-gray-200 text-base font-normal leading-normal"
                  placeholder="Sua senha"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>

              {error ? (
                <p className="text-sm text-red-600 text-center">{error}</p>
              ) : null}

              <button
                className="mt-2 w-full h-14 rounded-xl bg-[#2c74e8] text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] transition-transform active:scale-[0.98]"
                type="button"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>

              <button
                className="w-full h-12 rounded-xl border border-[#2c74e8] text-[#2c74e8] text-base font-semibold bg-white"
                type="button"
                onClick={onBack}
              >
                Voltar
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

