import React from "react";

type ButtonSize = "xs" | "sm" | "md" | "lg";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	size?: ButtonSize;
	label: string;
};

const sizeClasses: Record<ButtonSize, string> = {
	xs: "h-8",
	sm: "h-10",
	md: "h-12",
	lg: "h-14",
};

export default function AddButton({ size = "md", label, className, ...props }: Props) {
	return (
		<button {...props} className={`bg-primary rounded-full cursor-pointer w-25 text-white hover:bg-primaryH ${sizeClasses[size]} ${className ?? ""}`}>
			{label}
		</button>
	);
}
