import SvgIcon from "@mui/material/SvgIcon";

export default function SvgIconChildren(props) {
	return (
		<SvgIcon {...props}>
			{/* credit: plus icon from https://heroicons.com/ */}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="28"
				height="28"
				viewBox="0 0 28 28"
				fill="none"
			>
				<path
					d="M13.999 19.8327V11.666M13.999 11.666L17.499 15.166M13.999 11.666L10.499 15.166"
					stroke="#9E9E9E"
					stroke-width="1.75"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M18.6663 8.16536H9.33301M25.6663 13.9987C25.6663 19.4984 25.6663 22.2482 23.9572 23.9562C22.2503 25.6654 19.4993 25.6654 13.9997 25.6654C8.50001 25.6654 5.75017 25.6654 4.04101 23.9562C2.33301 22.2494 2.33301 19.4984 2.33301 13.9987C2.33301 8.49903 2.33301 5.7492 4.04101 4.04003C5.75134 2.33203 8.50001 2.33203 13.9997 2.33203C19.4993 2.33203 22.2492 2.33203 23.9572 4.04003C25.0935 5.17636 25.4738 6.77353 25.6022 9.33203"
					stroke="#9E9E9E"
					stroke-width="1.75"
					stroke-linecap="round"
				/>
			</svg>
		</SvgIcon>
	);
}
