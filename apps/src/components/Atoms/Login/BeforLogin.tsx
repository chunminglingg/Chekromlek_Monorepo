import React from "react";


interface BeforeLoginProps {
  onLogin: Function; // Define the type of onLogin prop
}

const BeforeLogin: React.FC<BeforeLoginProps> = ({ onLogin }) => {
  const handleLogin = () => {
    if (typeof onLogin === "function") {
      onLogin();
    }
  };

  return (

    // BeforLogin
    <div className=" flex gap-2 items-end justify-end ">
        <button  className=" w-[130px] h-[40px] broder rounded-lg bg-purple-600 hover:bg-teal-400"
        onClick={handleLogin} >
          Login
        </button>
      <div>
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <rect
            width="34"
            height="34"
            fill="url(#pattern0_2261_2086)"
            fill-opacity="0.6"
          />
          <defs>
            <pattern
              id="pattern0_2261_2086"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use xlinkHref="#image0_2261_2086" transform="scale(0.0111111)" />
            </pattern>
            <image
              id="image0_2261_2086"
              width="90"
              height="90"
              xlinkHref="data:image/png;base64,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"
            />
          </defs>
        </svg>
      </div>
    </div>

  );
}
export default BeforeLogin;
