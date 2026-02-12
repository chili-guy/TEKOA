import maskGroup from "./mask-group.svg";

type SplashProps = {
  onContinue?: () => void;
};

export const Splash = ({ onContinue }: SplashProps): JSX.Element => {
  return (
    <div className="bg-[linear-gradient(189deg,rgba(61,93,166,1)_0%,rgba(77,152,214,1)_20%,rgba(77,150,162,1)_40%,rgba(97,154,127,1)_54%,rgba(253,188,94,1)_80%,rgba(232,102,38,1)_100%)] w-full min-h-screen flex flex-col items-center justify-between px-6 py-10">
      <main className="flex flex-1 items-center justify-center w-full">
        <img
          className="w-[200px] max-w-[70vw] h-auto md:w-[241px]"
          alt="Tekōa logo"
          src={maskGroup}
        />
      </main>
      <div className="w-full max-w-[360px] pb-2">
        <button
          className="w-full h-12 rounded-xl bg-white text-[#2d77e3] text-base font-bold shadow-[0_16px_28px_rgba(45,119,227,0.2)] transition-transform active:scale-[0.98]"
          type="button"
          onClick={onContinue}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

