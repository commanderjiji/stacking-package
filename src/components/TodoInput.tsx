//@ts-check
import React, { useState } from "react";

import AddButton from "./ui/AddButton";

interface InputProps {
	onAddTodo: (value: string) => void;
}

export default function TodoInput({ onAddTodo }: InputProps) {
	const [input, setInput] = useState("");

	const onHandleSubmit = () => {
		if (input.trim()) {
			onAddTodo(input);
			setInput("");
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && input.trim()) {
			onAddTodo(input.trim());
			setInput(""); // Clear input after adding
		}
	};

	return (
		<div className="flex mb-5">
			<input className="input w-1/2 mr-2.5 outline-none bg-white shadow-xs rounded-full px-5 h-12" type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Add Todo" />

			<AddButton onClick={onHandleSubmit} />
		</div>
	);
}
