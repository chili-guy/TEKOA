type InDevelopmentProps = {
  onBack?: () => void;
};

export const InDevelopment = ({ onBack }: InDevelopmentProps): JSX.Element => {
  return (
    <div className="min-h-screen w-full bg-[#f7fafd] flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen px-6 flex flex-col items-center justify-center gap-4">
        <p className="text-xl font-bold text-[#1b1b1b]">Em desenvolvimento</p>
        <button
          className="h-11 rounded-xl bg-[#2d77e3] px-6 text-white text-sm font-bold"
          type="button"
          onClick={onBack}
        >
          Voltar
        </button>
      </div>
    </div>
  );
};
