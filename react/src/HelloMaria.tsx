import HelloMariaSvg from "../../SVGS/Olá, Maria (1).svg?react";

type HelloMariaProps = {
  onNavigate?: (screen: string) => void;
};

export const HelloMaria = ({ onNavigate }: HelloMariaProps): JSX.Element => {
  const goDev = () => onNavigate?.("in-development");

  return (
    <div className="min-h-screen w-full bg-[#f7fafd] flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen relative">
        <div className="relative">
          <HelloMariaSvg className="w-full h-auto" />
          <div className="absolute top-0 left-0 right-0 h-12 bg-[#f7fafd] pointer-events-none" />
          <button
            className="absolute left-[4.07%] top-[12.29%] h-[16.79%] w-[91.81%]"
            type="button"
            aria-label="Apoio Psicológico"
            onClick={goDev}
          />
          <button
            className="absolute left-[4.07%] top-[30.21%] h-[15.38%] w-[44.53%]"
            type="button"
            aria-label="Mentorias"
            onClick={goDev}
          />
          <button
            className="absolute left-[51.65%] top-[30.21%] h-[15.38%] w-[44.25%]"
            type="button"
            aria-label="Videoteca"
            onClick={goDev}
          />
          <button
            className="absolute left-[4.07%] top-[46.70%] h-[15.38%] w-[44.53%]"
            type="button"
            aria-label="Eventos Online"
            onClick={goDev}
          />
          <button
            className="absolute left-[51.65%] top-[46.70%] h-[15.38%] w-[44.25%]"
            type="button"
            aria-label="Comunidade"
            onClick={goDev}
          />
          <button
            className="absolute left-[4.07%] top-[63.23%] h-[11.07%] w-[91.81%]"
            type="button"
            aria-label="Rede de apoio ao imigrante"
            onClick={goDev}
          />
          <button
            className="absolute left-[4.07%] top-[75.60%] h-[6.19%] w-[91.81%]"
            type="button"
            aria-label="Blog e conteúdos"
            onClick={goDev}
          />
          <button
            className="absolute left-[4.07%] top-[82.90%] h-[6.19%] w-[91.81%]"
            type="button"
            aria-label="Testes de Saúde Mental"
            onClick={goDev}
          />
        </div>
      </div>
    </div>
  );
};
