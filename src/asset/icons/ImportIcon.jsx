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
				<g clip-path="url(#clip0_690_51571)">
					<path
						d="M13.3335 13.3332L10.0002 9.9999M10.0002 9.9999L6.66688 13.3332M10.0002 9.9999V17.4999M16.9919 15.3249C17.8047 14.8818 18.4467 14.1806 18.8168 13.3321C19.1868 12.4835 19.2637 11.5359 19.0354 10.6388C18.807 9.7417 18.2865 8.94616 17.5558 8.37778C16.8251 7.80939 15.9259 7.50052 15.0002 7.4999H13.9502C13.698 6.52427 13.2278 5.61852 12.5752 4.85073C11.9225 4.08295 11.1042 3.47311 10.182 3.06708C9.25967 2.66104 8.25734 2.46937 7.25031 2.50647C6.24328 2.54358 5.25777 2.80849 4.36786 3.28129C3.47795 3.7541 2.7068 4.42249 2.1124 5.23622C1.51799 6.04996 1.11579 6.98785 0.936028 7.9794C0.756269 8.97095 0.803632 9.99035 1.07456 10.961C1.34548 11.9316 1.83291 12.8281 2.50021 13.5832"
						stroke="#142E56"
						stroke-width="1.67"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</g>
				<defs>
					<clipPath id="clip0_690_51571">
						<rect width="20" height="20" fill="white" />
					</clipPath>
				</defs>
			</svg>
		</SvgIcon>
	);
}
