import { OnboardingDots } from "./OnboardingDots";

type ClubWelcomeProps = {
  onContinue?: () => void;
  onStepChange?: (index: number) => void;
  stepIndex?: number;
};

export const ClubWelcome = ({
  onContinue,
  onStepChange,
  stepIndex = 0,
}: ClubWelcomeProps): JSX.Element => {
  return (
    <div className="min-h-screen w-full bg-[#f7fafd] flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen px-6 pb-8 pt-10 flex flex-col">
        <div className="mt-6 flex items-center justify-center">
          <svg
            className="h-[280px] w-[280px]"
            viewBox="32 192 330 330"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#club-clip)">
              <rect width="330" height="330" x="32" y="192" fill="#f1f6fd" rx="165" />
              <path fill="url(#club-d)" d="M125.736 548.455v-34.538l-10.848.882 1.14 32.433-1.14 4.675s7.814 4.057 14.051 6.751c6.236 2.693 7.645-1.347 7.645-1.347z" />
              <path fill="url(#club-e)" d="m106.266 547.231-.83-32.433-10.848-.882 1.798 34.677-10.677 8.715s1.408 4.04 7.646 1.347 14.05-6.751 14.05-6.751z" />
              <path fill="#2d2e5a" d="M123.809 382.331s13.077 8.28 10.492 46.076-6.573 110.586-6.573 110.586h-13.344l-4.514-124.746-2.188-.093.06 124.839H94.398L83.907 425.585s-3.076-25.221 9.283-43.254c-1.753 1.154 16.064-8.412 30.619 0" />
              <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".415" d="m115.782 414.238-13.413.614" />
              <path fill="#fab024" d="M153.635 363.82s-7.247-11.634-12.794-23.95c-2.951-6.553-6.746-8.845-9.65-9.555v-.003l-10.776-2.541-26.04-.757-9.618 2.561c-2.99.339-7.497 2.234-10.893 9.774-5.547 12.317-11.168 26.389-11.168 26.389l10.293 2.768 13.36-19.84a8275 8275 0 0 1 6.84 29.534c15.073-2.574 30.619 0 30.619 0 1.371-7.356 3.094-18.448 4.53-28.105l13.377 18.931z" />
              <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".415" d="m128.34 350.094.587-5.827" />
              <path fill="url(#club-f)" d="m182.67 345.131 3.466 5.102-33.834 22.686c-3.843 2.478-8.99.738-10.541-3.563a7.11 7.11 0 0 1 3.974-8.983z" />
              <path fill="#1e0b02" d="M123.809 378.199v4.132s-15.309-1.728-30.619 0v-4.132l15.34-4.448z" />
              <path fill="url(#club-g)" d="m113.372 324.552-.866-12.779-8.517-.183-1.188 12.244-8.425 3.179s1.374 6.339 12.543 6.321c13.109-.021 13.496-5.564 13.496-5.564z" />
              <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".415" d="m86.586 349.008-1.017-5.405" />
              <path fill="url(#club-h)" d="m72.341 364.346-16.553-36.248a9 9 0 0 0-.18-1.403l-.341-1.566a13.75 13.75 0 0 0-2.769-5.742l-2.394-2.941a1.457 1.457 0 0 0-2.224-.042 1.865 1.865 0 0 0-.263 2.071l1.813 3.593-11.59-7.627a1.128 1.128 0 0 0-1.645.405l-.21.404a1.13 1.13 0 0 0 .29 1.399l7.613 5.41-9.604-5.005a1.128 1.128 0 0 0-1.612.506l-.137.306c-.232.52-.04 1.132.448 1.426l8.24 4.902-7.072-2.347a1.127 1.127 0 0 0-1.506.908l-.02.144c-.066.489.194.966.642 1.174l7.173 2.962-4.04-.674a1.128 1.128 0 0 0-.78 2.115l15.323 6.097 8.037 34.462c1.118 4.433 6.068 6.675 10.137 4.589a7.107 7.107 0 0 0 3.224-9.278" />
              <path stroke="#d6967c" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".374" d="M49.431 322.068s-1.194 2.886.79 6.253" />
              <path fill="url(#club-i)" d="M108.004 280.385c5.326 0 9.643-4.317 9.643-9.642a9.643 9.643 0 0 0-9.643-9.643c-5.325 0-9.642 4.317-9.642 9.643 0 5.325 4.317 9.642 9.642 9.642" />
              <path fill="url(#club-j)" d="M121.673 297.356s2.549-1.981 4.412.371c2.83 3.573-2.123 10.045-6.431 6.713z" />
              <path fill="#000" d="M121.285 302.534a.224.224 0 0 1-.2-.326c1.608-3.135 3.165-2.686 3.233-2.667a.224.224 0 0 1-.132.429c-.026-.007-1.296-.3-2.703 2.442a.22.22 0 0 1-.198.122" />
              <path fill="url(#club-k)" d="M121.056 313.496c-1.662 0-3.473-1.712-3.716-4.985a.446.446 0 0 1 .412-.477.464.464 0 0 1 .477.412c.201 2.702 1.607 4.16 2.828 4.16 1.517 0 2.749-1.744 2.749-3.888 0-2.143-1.233-3.887-2.749-3.887a.446.446 0 1 1 0-.891c2.008 0 3.641 2.144 3.641 4.779-.001 2.634-1.634 4.777-3.642 4.777" />
              <path fill="url(#club-l)" d="M94.339 297.356s-2.549-1.981-4.412.371c-2.83 3.573 2.123 10.045 6.43 6.713z" />
              <path fill="#000" d="M94.727 302.533a.22.22 0 0 1-.198-.121c-1.418-2.763-2.69-2.446-2.705-2.442a.226.226 0 0 1-.276-.152.22.22 0 0 1 .145-.277c.067-.019 1.624-.47 3.233 2.666a.224.224 0 0 1-.199.326" />
              <path fill="url(#club-m)" d="M94.956 313.496c-2.008 0-3.642-2.144-3.642-4.779s1.634-4.778 3.642-4.778a.445.445 0 1 1 0 .89c-1.517 0-2.75 1.745-2.75 3.888s1.234 3.887 2.75 3.887c1.186 0 2.947-1.864 2.947-4.437a.445.445 0 1 1 .891 0c0 2.952-2.1 5.329-3.838 5.329" />
              <path fill="url(#club-n)" d="M107.917 306.499c9.006 0 16.307-7.12 16.307-15.902s-7.301-15.903-16.307-15.903c-9.007 0-16.308 7.12-16.308 15.903 0 8.782 7.302 15.902 16.308 15.902" />
              <path fill="#e19a7c" d="M103.617 313.017c.375.207 9.407 6.58 9.407 6.58l-.524-7.962z" />
              <path fill="url(#club-o)" d="M121.699 289.41s1.718 24.552-13.219 24.552c-16.156 0-14.461-24.552-14.461-24.552s.09-11.055 13.964-11.055c12.717 0 13.716 11.055 13.716 11.055" />
              <path fill="url(#club-p)" d="M112.828 298.007a1.179 1.179 0 1 0 2.357 0 1.179 1.179 0 0 0-2.357 0" />
              <path fill="url(#club-q)" d="M101.045 298.007a1.18 1.18 0 1 0 2.358 0 1.18 1.18 0 0 0-2.358 0" />
              <path fill="#fff" d="M112.34 305.2h-7.449s.503 1.89 3.682 1.89 3.767-1.89 3.767-1.89" />
              <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".216" d="M109.258 300.97v1.911l-1.395.026" />
              <path fill="url(#club-r)" d="M102.324 291.374s3.025-.589 3.165 1.039c0 0 .071 1.104-2.572 1.549-2.644.446-4.498.566-4.81-.451s2.789-2.006 4.217-2.137" />
              <path fill="url(#club-s)" d="M116.189 291.531s3.079.136 2.833 1.752c0 0-.189 1.09-2.863.904s-4.575-.494-4.575-1.671c0-1.371 3.186-1.192 4.605-.985" />
              <path fill="url(#club-t)" d="M122.768 289.884c-.314-9.472-5.595-11.344-8.786-11.608l.009-.037s-1.137-2.801-10.588-1.081c-9.452 1.72-10.676 12.277-10.676 12.277 12.223.406 17.525-4.396 19.75-7.839 2.745 6.255 10.291 8.288 10.291 8.288" />
              <path fill="#1c53a4" d="M314.845 381.473c1.056 11.273 9.504 160.485 9.504 160.485h-21.936L292.8 409.421l-3.952.075-2.557 132.462h-20.959s-1.195-138.446.082-160.132z" />
              <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".397" d="M283.308 409.52h16.073" />
              <path fill="#e8b499" d="m326.035 396.401 6.433 16.398 4.972-.527-3.771-21.212z" />
              <path fill="url(#club-u)" d="M332.227 410.216s-2.55 4.596-.46 10.118l-.949 5.582c-.147.867.324 1.736 1.105 2.036.845.325 1.759-.124 2.065-1.015l1.093-3.188.209 1.181c.332 1.876.07 3.8-.744 5.461l-2.317 4.727a1.8 1.8 0 0 0 .086 1.717c.613 1.008 1.959 1.06 2.588.101l3.779-5.757c1.464-2.231 1.946-5.062 1.323-7.765l-3.347-14.53z" />
              <path fill="#fd713c" d="M339.137 409.796s-8.329-60.684-16.362-83.333c-4.01-11.305-11.538-13.2-11.538-13.2l-4.695-2.089-32.042-.032-6.582 2.761c-.35.146-.682.321-.998.515-20.925 10.815-37.993 30.117-37.993 30.117l11.476 13.823 23.066-14.653v46.908h54.057l-.02-6.071 7.253 27.966z" />
              <path fill="url(#club-v)" d="m297.995 307.469-1.193-14.723s-2.658 1.876-5.079 2.339-4.776-.943-4.805-.96l-2.828-1.627-1.132 15.166-8.458 3.477c15.976 14.551 32.042.032 32.042.032z" />
              <path stroke="#fff" strokeMiterlimit="10" strokeWidth=".808" d="M274.499 311.141s5.566 6.586 15.979 6.586 16.062-6.554 16.062-6.554" />
              <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".397" d="m317.498 382.643-.152-46.513M263.467 343.704V335.9" />
              <path fill="url(#club-w)" d="M298.44 256.697c-10.766-5.487-16.842 2.735-16.842 2.735-12.521 3.3-5.073 16.308-5.073 16.308l3.524-4.575 23.816 4.512s6.377-12.966-5.425-18.98" />
              <path fill="url(#club-x)" d="M282.149 281.752a4.713 4.713 0 1 1-9.423.267 4.713 4.713 0 0 1 9.423-.267" />
              <path stroke="#c47268" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".287" d="M274.762 281.223s1.875-.913 3.66 2.343" />
              <path fill="url(#club-y)" d="M299.359 281.886a4.713 4.713 0 1 0 9.426 0 4.713 4.713 0 0 0-9.426 0" />
              <path stroke="#c47268" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".287" d="M306.728 281.147s-1.899-.859-3.593 2.446" />
              <path fill="url(#club-z)" d="m284.251 292.628 12.557.143.789 9.543z" />
              <path fill="url(#club-A)" d="M303.482 273.68a58.8 58.8 0 0 1-1.453 13.196c-.728 3.198-3.542 5.442-6.49 7.254l-.538.33c-3.119 1.917-5.699 1.982-8.887.166-3.214-1.832-6.202-4.257-6.91-7.681-1.287-6.229-1.459-13.134-1.459-13.134s-1.809-14.411 12.072-14.22 13.665 14.089 13.665 14.089" />
              <path fill="url(#club-B)" d="M285.749 277.907a1.123 1.123 0 1 1-2.247-.001 1.123 1.123 0 0 1 2.247.001" />
              <path fill="url(#club-C)" d="M296.771 277.907a1.123 1.123 0 1 1-2.247-.001 1.123 1.123 0 0 1 2.247.001" />
              <path stroke="#c47268" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".287" d="M289.118 280.846v1.8h1.458" />
              <path fill="url(#club-D)" d="m280.44 273.16 7.339-.661s-.657-1.902-3.624-1.593c-3.036.314-3.715 2.254-3.715 2.254" />
              <path fill="url(#club-E)" d="m299.359 273.16-7.339-.661s.657-1.902 3.624-1.593c3.036.314 3.715 2.254 3.715 2.254" />
              <path fill="#fff" d="M286.606 285.211h7.241s-.341 2.218-3.728 2.218-3.513-2.218-3.513-2.218" />
              <path fill="url(#club-F)" d="m302.018 261.338.13 2.65c-1.73-2.832-5.277-6.578-11.899-6.455-9.615.18-7.804 3.097-7.383 3.64-8.036 2.122-8.193 9.546-8.193 9.546l2.942 8.754s2.398-8.939 2.251-13.168c-.142-4.084 3.86-5.308 4.133-5.387 1.21-.218 3.29-.072 5.365 2.538 2.485 3.124 8.661 6.315 12.971 4.342l.622 12.706c5.08-13.187-.939-19.166-.939-19.166m-18.275-.367q.075-.017.155-.033-.078.016-.155.033" />
              <path fill="url(#club-G)" d="m190.975 523.837-2.92 27.671-10.515.529-.853-32.896z" />
              <path fill="url(#club-H)" d="M217.181 523.379 220.1 551.05l10.515.528.854-32.896z" />
              <path fill="#66d096" d="m226.756 394.978-26.417-2.336-21.86-1.081-8.834 75.065a11.5 11.5 0 0 0 .062 2.815l1.446 65.425h22.472l-1.307-64.913 10.46-51.805 10.712 118.544h21.296z" />
              <path fill="url(#club-I)" d="m262.065 358.655-10.447-41.164 5.151-23.054a1.26 1.26 0 0 0-2.43-.663l-2.01 6.224 1.961-10.561a1.26 1.26 0 0 0-.652-1.345l-.143-.076a1.262 1.262 0 0 0-1.804.782l-2.944 9.801 1.377-12.522a1.26 1.26 0 0 0-1.007-1.332l-.368-.075a1.26 1.26 0 0 0-1.506 1.139l-1.679 11.985.018-10.437a1.26 1.26 0 0 0-1.084-1.172l-.505-.071a1.26 1.26 0 0 0-1.435 1.233l-.583 17.606-2.092-3.982a2.08 2.08 0 0 0-2.055-1.104 1.627 1.627 0 0 0-1.405 2.051l1.122 4.087a15.4 15.4 0 0 0 3.428 6.245l3.097 3.419 1.883 34.099-12.576-7.789-16.64 9.902 33.561 16.024-.001-.004a7.93 7.93 0 0 0 4.973 1.183c5.09-.483 8.409-5.577 6.795-10.429" />
              <path stroke="#a8523f" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".312" d="M241.975 304.952s3.401.788 5.177 4.778M245.891 350.432l.69 8.633" />
              <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".397" d="m228.691 364.212-6.108-2.835" />
              <path fill="url(#club-J)" d="M194.124 404.066c-3.295-1.695-10.231-5.657-12.965-6.645l-11-15.197 8.668-21.671-15.488-5.477-7.57 27.267c-.548 2.758 1.328 5.747 3.836 7.844 5.412 5.892 15.83 13.171 15.83 13.171s.846 4.456 2.567 5.972c0 0 7.448 1.158 10.645-3.211 0 0 2.57 1.292 5.098.777 1.395-.284 1.644-2.179.379-2.83" />
              <path stroke="#a8523f" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".312" d="m170.159 382.224-2.938-4.061" />
              <path fill="#1c53a4" d="M242.881 347.865s-7.601-8.976-18.841-13.196l-.003-.002-15.914-6.276-15.097.132-19.905 9.314s-12.55 4.192-15.137 26.476l16.714 4.977 2.225 26.301 49.921-.688 1.847-30.691 4.825 2.238z" />
              <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".397" d="m174.974 369.851-1.117-12.382" />
              <path fill="url(#club-K)" d="M182.733 333.353s-2.532 1.354-.546 5.286a4.885 4.885 0 0 1-1.719 6.313l-4.378 2.815c-2.443 1.57-5.736.69-7.013-1.918-.861-1.756-1.405-3.758-.752-5.473 1.572-4.134 10.81-8.879 14.408-7.023" />
              <path fill="url(#club-L)" d="M208.054 328.47h-.029l.099-.08-1.227-15.133s-2.657 1.875-5.078 2.338-4.777-.943-4.806-.96l-2.828-1.627-1.159 15.515.094.078-.164.001-4.448 2.044s-.048 7.456 12.037 7.07c12.391-.397 12.364-7.418 12.364-7.418z" />
              <path fill="url(#club-M)" d="M205.236 278.904s6.946-3.096 9.408 2.757c2.371 5.635-7.044 11.004-7.044 11.004z" />
              <path fill="url(#club-N)" d="M192.245 302.263a4.713 4.713 0 1 1-4.845-4.578 4.713 4.713 0 0 1 4.845 4.578" />
              <path stroke="#a8523f" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".312" d="M184.858 301.735s1.873-.913 3.66 2.343" />
              <path fill="url(#club-O)" d="M209.454 302.397a4.713 4.713 0 1 0 9.426 0 4.713 4.713 0 0 0-9.426 0" />
              <path stroke="#a8523f" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".312" d="M216.823 301.659s-1.899-.859-3.592 2.446" />
              <path fill="#e19a7c" d="m194.384 314.057 12.557.144.789 9.542z" />
              <path fill="url(#club-P)" d="M213.577 294.192a58.7 58.7 0 0 1-1.454 13.196c-.727 3.198-2.809 5.442-5.758 7.254l-.537.33c-3.12 1.917-7.163 1.982-10.35.166-3.214-1.832-5.47-4.257-6.178-7.681-1.288-6.23-1.46-13.135-1.46-13.135s-1.809-14.411 12.072-14.22 13.665 14.09 13.665 14.09" />
              <path fill="url(#club-Q)" d="M195.845 298.419a1.123 1.123 0 1 1-2.247-.001 1.123 1.123 0 0 1 2.247.001" />
              <path fill="url(#club-R)" d="M205.743 299.542a1.123 1.123 0 1 0 0-2.247 1.123 1.123 0 0 0 0 2.247" />
              <path stroke="#a8523f" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".312" d="M199.212 300.059v3.098h2.002" />
              <path fill="url(#club-S)" d="m190.536 293.671 7.339-.661s-.657-1.902-3.624-1.593c-3.037.315-3.715 2.254-3.715 2.254" />
              <path fill="url(#club-T)" d="m209.454 293.671-7.339-.661s.657-1.902 3.624-1.593c3.037.315 3.715 2.254 3.715 2.254" />
              <path fill="#fff" d="M196.7 305.723h7.241s-.341 2.218-3.728 2.218c-3.387-.001-3.513-2.218-3.513-2.218" />
              <path fill="url(#club-U)" d="M188.313 301.141s2.055-15.587 1.05-18.155c0 0-6.991 5.783-1.05 18.155" />
              <path fill="url(#club-V)" d="M213.054 301.016s-2.312-14.885-1.672-19.167c0 0 6.751 5.979 1.672 19.167" />
              <path fill="url(#club-W)" d="M210.744 284.963s-4.135 3.435-9.468.581c0 0-13.567 8.358-17.397-.741-3.192-7.585 10.061-17.88 23.734-6.28z" />
              <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".397" d="m195.958 416.433 13.715 1.744" />
            </g>
            <defs>
              <linearGradient id="club-d" x1="125.736" x2="125.736" y1="559.582" y2="513.917" gradientUnits="userSpaceOnUse">
                <stop stopColor="#efbfab" />
                <stop offset=".994" stopColor="#e2a286" />
              </linearGradient>
              <linearGradient id="club-e" x1="96.557" x2="96.557" y1="559.582" y2="513.917" gradientUnits="userSpaceOnUse">
                <stop stopColor="#efbfab" />
                <stop offset=".994" stopColor="#e2a286" />
              </linearGradient>
              <linearGradient id="club-f" x1="141.338" x2="186.137" y1="359.594" y2="359.594" gradientUnits="userSpaceOnUse">
                <stop stopColor="#efbfab" />
                <stop offset=".994" stopColor="#e2a286" />
              </linearGradient>
              <linearGradient id="club-g" x1="107.395" x2="107.395" y1="333.335" y2="311.59" gradientUnits="userSpaceOnUse">
                <stop stopColor="#efbfab" />
                <stop offset=".994" stopColor="#e2a286" />
              </linearGradient>
              <linearGradient id="club-h" x1="32.438" x2="72.985" y1="344.326" y2="344.326" gradientUnits="userSpaceOnUse">
                <stop stopColor="#efbfab" />
                <stop offset=".994" stopColor="#e2a286" />
              </linearGradient>
              <linearGradient id="club-i" x1="108.004" x2="108.004" y1="280.385" y2="261.1" gradientUnits="userSpaceOnUse">
                <stop stopColor="#181915" />
                <stop offset=".999" stopColor="#3a3a3a" />
              </linearGradient>
              <linearGradient id="club-j" x1="119.654" x2="126.917" y1="300.97" y2="300.97" gradientUnits="userSpaceOnUse">
                <stop offset=".006" stopColor="#e2a286" />
                <stop offset="1" stopColor="#efbfab" />
              </linearGradient>
              <linearGradient id="club-k" x1="117.339" x2="124.697" y1="308.717" y2="308.717" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7627ec" />
                <stop offset="1" stopColor="#a46ff0" />
              </linearGradient>
              <linearGradient id="club-l" x1="89.095" x2="96.358" y1="300.97" y2="300.97" gradientUnits="userSpaceOnUse">
                <stop stopColor="#efbfab" />
                <stop offset=".994" stopColor="#e2a286" />
              </linearGradient>
              <linearGradient id="club-m" x1="91.315" x2="98.794" y1="308.717" y2="308.717" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7627ec" />
                <stop offset="1" stopColor="#a46ff0" />
              </linearGradient>
              <linearGradient id="club-n" x1="107.917" x2="107.917" y1="306.499" y2="274.695" gradientUnits="userSpaceOnUse">
                <stop stopColor="#181915" />
                <stop offset=".999" stopColor="#3a3a3a" />
              </linearGradient>
              <linearGradient id="club-o" x1="107.863" x2="107.863" y1="313.962" y2="278.355" gradientUnits="userSpaceOnUse">
                <stop stopColor="#efbfab" />
                <stop offset=".994" stopColor="#e2a286" />
              </linearGradient>
              <linearGradient id="club-p" x1="114.007" x2="114.007" y1="299.186" y2="296.829" gradientUnits="userSpaceOnUse">
                <stop stopColor="#181915" />
                <stop offset=".999" stopColor="#3a3a3a" />
              </linearGradient>
              <linearGradient id="club-q" x1="102.224" x2="102.224" y1="299.186" y2="296.829" gradientUnits="userSpaceOnUse">
                <stop stopColor="#181915" />
                <stop offset=".999" stopColor="#3a3a3a" />
              </linearGradient>
              <linearGradient id="club-r" x1="101.787" x2="101.787" y1="294.293" y2="291.27" gradientUnits="userSpaceOnUse">
                <stop stopColor="#181915" />
                <stop offset=".999" stopColor="#3a3a3a" />
              </linearGradient>
              <linearGradient id="club-s" x1="115.31" x2="115.31" y1="294.209" y2="291.389" gradientUnits="userSpaceOnUse">
                <stop stopColor="#181915" />
                <stop offset=".999" stopColor="#3a3a3a" />
              </linearGradient>
              <linearGradient id="club-t" x1="107.747" x2="107.747" y1="289.884" y2="276.599" gradientUnits="userSpaceOnUse">
                <stop stopColor="#181915" />
                <stop offset=".999" stopColor="#3a3a3a" />
              </linearGradient>
              <linearGradient id="club-u" x1="330.792" x2="340.273" y1="423.255" y2="423.255" gradientUnits="userSpaceOnUse">
                <stop stopColor="#d6816e" />
                <stop offset=".649" stopColor="#e19381" />
                <stop offset="1" stopColor="#e89f8e" />
              </linearGradient>
              <linearGradient id="club-v" x1="290.52" x2="290.52" y1="317.617" y2="292.498" gradientUnits="userSpaceOnUse">
                <stop stopColor="#d6816e" />
                <stop offset=".649" stopColor="#e19381" />
                <stop offset="1" stopColor="#e89f8e" />
              </linearGradient>
              <linearGradient id="club-w" x1="289.955" x2="289.955" y1="275.74" y2="254.809" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2d2e5a" />
                <stop offset="1" stopColor="#42457c" />
              </linearGradient>
              <linearGradient id="club-x" x1="272.724" x2="282.151" y1="281.885" y2="281.885" gradientUnits="userSpaceOnUse">
                <stop stopColor="#e89f8e" />
                <stop offset=".512" stopColor="#e79d8c" />
                <stop offset=".741" stopColor="#e39685" />
                <stop offset=".912" stopColor="#dc8a78" />
                <stop offset="1" stopColor="#d6816e" />
              </linearGradient>
              <linearGradient id="club-y" x1="299.359" x2="308.786" y1="281.886" y2="281.886" gradientUnits="userSpaceOnUse">
                <stop stopColor="#d6816e" />
                <stop offset=".512" stopColor="#e19381" />
                <stop offset="1" stopColor="#e89f8e" />
              </linearGradient>
              <linearGradient id="club-z" x1="284.251" x2="297.597" y1="302.171" y2="302.171" gradientUnits="userSpaceOnUse">
                <stop stopColor="#d6816e" />
                <stop offset=".649" stopColor="#e19381" />
                <stop offset="1" stopColor="#e89f8e" />
              </linearGradient>
              <linearGradient id="club-A" x1="291.122" x2="291.122" y1="294.626" y2="259.592" gradientUnits="userSpaceOnUse">
                <stop stopColor="#d6816e" />
                <stop offset=".649" stopColor="#e19381" />
                <stop offset="1" stopColor="#e89f8e" />
              </linearGradient>
              <linearGradient id="club-B" x1="284.626" x2="284.626" y1="279.03" y2="276.784" gradientUnits="userSpaceOnUse">
                <stop stopColor="#181915" />
                <stop offset=".999" stopColor="#3a3a3a" />
              </linearGradient>
              <linearGradient id="club-C" x1="295.648" x2="295.648" y1="279.03" y2="276.784" gradientUnits="userSpaceOnUse">
                <stop stopColor="#181915" />
                <stop offset=".999" stopColor="#3a3a3a" />
              </linearGradient>
              <linearGradient id="club-D" x1="283.795" x2="283.795" y1="274.423" y2="271.4" gradientUnits="userSpaceOnUse">
                <stop stopColor="#181915" />
                <stop offset=".999" stopColor="#3a3a3a" />
              </linearGradient>
              <linearGradient id="club-E" x1="297.659" x2="297.659" y1="274.423" y2="271.4" gradientUnits="userSpaceOnUse">
                <stop stopColor="#181915" />
                <stop offset=".999" stopColor="#3a3a3a" />
              </linearGradient>
              <linearGradient id="club-F" x1="288.597" x2="288.597" y1="280.241" y2="257.533" gradientUnits="userSpaceOnUse">
                <stop stopColor="#181915" />
                <stop offset=".999" stopColor="#3a3a3a" />
              </linearGradient>
              <linearGradient id="club-G" x1="183.628" x2="190.975" y1="551.979" y2="523.837" gradientUnits="userSpaceOnUse">
                <stop stopColor="#d6816e" />
                <stop offset=".649" stopColor="#e19381" />
                <stop offset="1" stopColor="#e89f8e" />
              </linearGradient>
              <linearGradient id="club-H" x1="223.528" x2="216.011" y1="552.382" y2="523.379" gradientUnits="userSpaceOnUse">
                <stop stopColor="#d6816e" />
                <stop offset=".649" stopColor="#e19381" />
                <stop offset="1" stopColor="#e89f8e" />
              </linearGradient>
              <linearGradient id="club-I" x1="223.863" x2="243.657" y1="326.233" y2="333.165" gradientUnits="userSpaceOnUse">
                <stop stopColor="#efbfab" />
                <stop offset=".994" stopColor="#e2a286" />
              </linearGradient>
              <linearGradient id="club-J" x1="158.659" x2="198.652" y1="381.105" y2="381.105" gradientUnits="userSpaceOnUse">
                <stop stopColor="#efbfab" />
                <stop offset=".994" stopColor="#e2a286" />
              </linearGradient>
              <linearGradient id="club-K" x1="180.406" x2="167.021" y1="349.924" y2="330.122" gradientUnits="userSpaceOnUse">
                <stop stopColor="#efbfab" />
                <stop offset=".994" stopColor="#e2a286" />
              </linearGradient>
              <linearGradient id="club-L" x1="200.979" x2="200.979" y1="337.709" y2="313.008" gradientUnits="userSpaceOnUse">
                <stop stopColor="#efbfab" />
                <stop offset=".994" stopColor="#e2a286" />
              </linearGradient>
              <linearGradient id="club-M" x1="202.019" x2="216.004" y1="295.066" y2="295.066" gradientUnits="userSpaceOnUse">
                <stop stopColor="#e2a286" />
                <stop offset="1" stopColor="#efbfab" />
              </linearGradient>
              <linearGradient id="club-N" x1="187.531" x2="192.323" y1="307.057" y2="307.057" gradientUnits="userSpaceOnUse">
                <stop stopColor="#e2a286" />
                <stop offset="1" stopColor="#efbfab" />
              </linearGradient>
              <linearGradient id="club-O" x1="209.454" x2="218.88" y1="302.397" y2="302.397" gradientUnits="userSpaceOnUse">
                <stop stopColor="#efbfab" />
                <stop offset=".994" stopColor="#e2a286" />
              </linearGradient>
              <linearGradient id="club-P" x1="200.739" x2="200.739" y1="315.138" y2="280.103" gradientUnits="userSpaceOnUse">
                <stop stopColor="#e2a286" />
                <stop offset="1" stopColor="#efbfab" />
              </linearGradient>
              <linearGradient id="club-Q" x1="194.721" x2="194.721" y1="299.542" y2="297.296" gradientUnits="userSpaceOnUse">
                <stop stopColor="#181915" />
                <stop offset=".999" stopColor="#3a3a3a" />
              </linearGradient>
              <linearGradient id="club-R" x1="205.743" x2="205.743" y1="299.542" y2="297.296" gradientUnits="userSpaceOnUse">
                <stop stopColor="#181915" />
                <stop offset=".999" stopColor="#3a3a3a" />
              </linearGradient>
              <linearGradient id="club-S" x1="194.885" x2="194.885" y1="293.836" y2="290.813" gradientUnits="userSpaceOnUse">
                <stop stopColor="#181915" />
                <stop offset=".999" stopColor="#3a3a3a" />
              </linearGradient>
              <linearGradient id="club-T" x1="208.75" x2="208.75" y1="293.836" y2="290.813" gradientUnits="userSpaceOnUse">
                <stop stopColor="#181915" />
                <stop offset=".999" stopColor="#3a3a3a" />
              </linearGradient>
              <linearGradient id="club-U" x1="188.651" x2="189.715" y1="291.993" y2="291.993" gradientUnits="userSpaceOnUse">
                <stop stopColor="#181915" />
                <stop offset=".999" stopColor="#3a3a3a" />
              </linearGradient>
              <linearGradient id="club-V" x1="211.817" x2="213.977" y1="291.433" y2="291.433" gradientUnits="userSpaceOnUse">
                <stop stopColor="#181915" />
                <stop offset=".999" stopColor="#3a3a3a" />
              </linearGradient>
              <linearGradient id="club-W" x1="183.531" x2="210.744" y1="281.178" y2="281.178" gradientUnits="userSpaceOnUse">
                <stop stopColor="#181915" />
                <stop offset=".999" stopColor="#3a3a3a" />
              </linearGradient>
              <clipPath id="club-clip">
                <rect width="330" height="330" x="32" y="192" fill="#fff" rx="165" />
              </clipPath>
            </defs>
          </svg>
        </div>

        <h1 className="mt-6 text-center text-[22px] font-bold text-[#1b1b1b]">
          Bem-vindo(a) ao Clube do Imigrante
        </h1>
        <p className="mt-2 text-center text-sm text-[#4c4c4c]">
          Aqui você encontrará webinars e eventos online sobre saúde mental, integração e
          qualidade de vida.
        </p>

        <div className="mt-auto flex flex-col items-center gap-5">
          <OnboardingDots activeIndex={stepIndex} onSelect={onStepChange} />

          <button
            className="w-full h-12 rounded-xl bg-[#2d77e3] text-white text-base font-bold shadow-[0_16px_28px_rgba(45,119,227,0.2)] transition-transform active:scale-[0.98]"
            type="button"
            onClick={onContinue}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};
