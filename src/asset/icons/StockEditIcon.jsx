import SvgIcon from "@mui/material/SvgIcon";

export default function SvgIconChildren(props) {
  return (
    <SvgIcon {...props}>
      {/* credit: plus icon from https://heroicons.com/ */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M9.16602 1.66699H7.49935C3.33268 1.66699 1.66602 3.33366 1.66602 7.50033V12.5003C1.66602 16.667 3.33268 18.3337 7.49935 18.3337H12.4993C16.666 18.3337 18.3327 16.667 18.3327 12.5003V10.8337"
          stroke="#242424"
          stroke-width="1.25"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M13.3675 2.51639L6.80088 9.08306C6.55088 9.33306 6.30088 9.82472 6.25088 10.1831L5.89254 12.6914C5.75921 13.5997 6.40088 14.2331 7.30921 14.1081L9.81754 13.7497C10.1675 13.6997 10.6592 13.4497 10.9175 13.1997L17.4842 6.63306C18.6175 5.49972 19.1509 4.18306 17.4842 2.51639C15.8175 0.849722 14.5009 1.38306 13.3675 2.51639Z"
          stroke="#242424"
          stroke-width="1.25"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.4258 3.45898C12.9841 5.45065 14.5424 7.00898 16.5424 7.57565"
          stroke="#242424"
          stroke-width="1.25"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}
