import React from "react";

type Props = {
	onClick?: () => void;
};

export default function AddButton({ onClick }: Props) {
	return (
		<div>
			<button className="bg-primary rounded-full cursor-pointer h-10 w-25 text-white hover:bg-primaryH" onClick={onClick}>
				Add
			</button>
		</div>
	);
}
