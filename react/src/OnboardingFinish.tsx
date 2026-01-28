import { OnboardingDots } from "./OnboardingDots";
import finishSvg from "../../SVGS/Ir para meu painel.svg?raw";

type OnboardingFinishProps = {
  onContinue?: () => void;
  onStepChange?: (index: number) => void;
  stepIndex?: number;
};

export const OnboardingFinish = ({
  onContinue,
  onStepChange,
  stepIndex = 0,
}: OnboardingFinishProps): JSX.Element => {
  const finishMarkup = finishSvg
    .replace('viewBox="0 0 393 852"', 'viewBox="32 192 330 330"')
    .replace("<svg", '<svg class="h-[320px] w-[320px]"');

  return (
    <div className="min-h-screen w-full bg-[#f7fafd] flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen px-6 pb-8 pt-10 flex flex-col">
        <div className="mt-2 flex items-center justify-center">
          <div dangerouslySetInnerHTML={{ __html: finishMarkup }} />
        </div>
        <h1 className="mt-6 text-center text-[22px] font-bold text-[#1b1b1b]">
          Tudo o que você precisa para cuidar da sua saúde mental e se integrar
        </h1>
        <p className="mt-2 text-center text-sm text-[#4c4c4c]">
          Agora em um só lugar.
        </p>
        <div className="mt-auto flex flex-col items-center gap-5">
          <OnboardingDots activeIndex={stepIndex} onSelect={onStepChange} />
          <button
            className="w-full h-12 rounded-xl bg-[#fd723c] text-white text-base font-bold shadow-[0_16px_28px_rgba(253,114,60,0.2)] transition-transform active:scale-[0.98]"
            type="button"
            onClick={onContinue}
          >
            Ir para meu painel
          </button>
        </div>
      </div>
    </div>
  );
};
