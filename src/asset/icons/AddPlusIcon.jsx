import SvgIcon from "@mui/material/SvgIcon";

export default function SvgIconChildren(props) {
	return (
		<SvgIcon {...props}>
			{/* credit: plus icon from https://heroicons.com/ */}
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M5 10H15" stroke="#F2FAFE" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10 15V5" stroke="#F2FAFE" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
		</SvgIcon>
	);
}
