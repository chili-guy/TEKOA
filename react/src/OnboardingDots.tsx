type OnboardingDotsProps = {
  activeIndex: number;
  total?: number;
  onSelect?: (index: number) => void;
  className?: string;
};

export const OnboardingDots = ({
  activeIndex,
  total = 8,
  onSelect,
  className = "",
}: OnboardingDotsProps): JSX.Element => {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`.trim()}>
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={`onboarding-dot-${index}`}
            type="button"
            aria-label={`Ir para etapa ${index + 1}`}
            onClick={() => onSelect?.(index)}
            className={`${
              isActive ? "w-5 bg-[#2d77e3]" : "w-2 bg-[#ecf1f8]"
            } h-2 rounded-full transition-transform active:scale-95`}
          />
        );
      })}
    </div>
  );
};
