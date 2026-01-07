import React from "react";

type ButtonSize = "sm" | "md" | "lg";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	size?: ButtonSize;
};

const sizeClasses: Record<ButtonSize, string> = {
	sm: "h-10",
	md: "h-12",
	lg: "h-14",
};

export default function AddButton({ size = "md", className, ...props }: Props) {
	return (
		<button {...props} className={`bg-primary rounded-full cursor-pointer w-25 text-white hover:bg-primaryH ${sizeClasses[size]} ${className ?? ""}`}>
			Add
		</button>
	);
}
