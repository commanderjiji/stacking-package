//@ts-check
import React from "react";
import { useState } from "react";

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
		<div>
			<input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} className="input" placeholder="Add Todo" />

			<button className="todo-add" type="button" onClick={onHandleSubmit}>
				Add
			</button>
		</div>
	);
}
