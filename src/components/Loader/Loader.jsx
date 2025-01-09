import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative w-24 h-24 rounded-full bg-transparent">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1596 1336"
          fill="none"
          className="absolute inset-0 w-full h-full"
        >
          {/* First Path */}
          <g>
            <path
              d="M 794.5,45.5 C 795.496,45.4142 796.329,45.7476 797,46.5C 910.167,243.5 1023.33,440.5 1136.5,637.5C 934.834,638.667 733.167,638.833 531.5,638C 505.16,637.833 478.827,637.333 452.5,636.5C 566.528,439.483 680.528,242.483 794.5,45.5 Z"
              stroke="#425652"
              strokeWidth="20"
              fill="none"
              strokeDasharray="1000"
              strokeDashoffset="1000"
              className="animate-dash"
            />
          </g>

          {/* Second Path */}
          <g>
            <path
              d="M 1572.5,426.5 C 1573.59,426.62 1574.25,427.287 1574.5,428.5C 1494.44,718.739 1413.78,1008.74 1332.5,1298.5C 1221.12,1111.56 1110.12,924.398 999.5,737C 999.645,736.228 999.978,735.561 1000.5,735C 1191.39,632.392 1382.05,529.559 1572.5,426.5 Z"
              stroke="#425652"
              strokeWidth="20"
              fill="none"
              strokeDasharray="1000"
              strokeDashoffset="1000"
              className="animate-dash delay-500"
            />
          </g>

          {/* Third Path */}
          <g>
            <path
              d="M 15.5,427.5 C 206.939,530.054 398.272,632.887 589.5,736C 590.022,736.561 590.355,737.228 590.5,738C 479.885,925.398 368.885,1112.56 257.5,1299.5C 175.908,1009.14 95.2411,718.469 15.5,427.5 Z"
              stroke="#425652"
              strokeWidth="20"
              fill="none"
              strokeDasharray="1000"
              strokeDashoffset="1000"
              className="animate-dash delay-1000"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Loader;
