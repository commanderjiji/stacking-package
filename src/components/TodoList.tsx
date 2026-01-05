import React, { useState, useEffect, useRef } from "react";

import type { Todo } from "../App";

type TodoListProps = {
	todos: Todo[];
	onToggle: (id: number) => void;
	onDelete: (id: number) => void;
	onEdit: (id: number, newText: string) => void;
};

export default function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
	const [openMenuId, setOpenMenuId] = useState<number | null>(null);
	const [editTodos, setEditTodos] = useState<number | null>(null);
	const [editText, setEditText] = useState<string>("");

	const editInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (editTodos !== null && editInputRef.current) {
			editInputRef.current.focus();
		}
	}, [editTodos]);

	useEffect(() => {
		// document.addEventListener("click");

		const handleClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;

			if (!target.closest(".edit") && !target.closest(".menu") && !target.closest(".item-edit")) {
				setOpenMenuId(null);
			}
		};
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setOpenMenuId(null);
			}
		};

		document.addEventListener("mousedown", handleClick);
		document.addEventListener("keydown", handleKey);

		return () => {
			document.removeEventListener("mousedown", handleClick);
			document.removeEventListener("keydown", handleKey);
		};
	}, []);

	const openMenu = (id: number) => {
		setOpenMenuId(openMenuId === id ? null : id);
	};

	const startEdit = (id: number) => {
		const currentTodo = todos.find((todo) => todo.id === id);

		setEditTodos(id);
		setOpenMenuId(null);
		setEditText(currentTodo?.text || "");
	};

	const saveEdit = () => {
		if (editTodos !== null && editText.trim()) {
			onEdit(editTodos, editText);
			setEditTodos(null);
		}
	};

	const cancelEdit = () => {
		setEditTodos(null);
	};

	return (
		<div className="list-container ">
			{todos.length === 0 ? (
				<p>No Task Yet</p>
			) : (
				todos.map((todo) => (
					<ul className="todo-list " key={todo.id}>
						<li className="group todo-item py-2.5 pl-7 rounded-2xl flex items-center mb-2 h-15 w-1/2 relative  bg-white shadow-sm">
							{editTodos === todo.id ? (
								<div className="edit flex items-center w-full">
									<input
										ref={editInputRef}
										type="text"
										value={editText}
										onChange={(e) => setEditText(e.target.value)}
										className="edit-input flex-1 bg-editInput h-10 outline-none rounded-full pl-5 mr-2.5 text-base"
										onKeyDown={(e) => {
											e.key === "Enter" && saveEdit();
											e.key === "Escape" && cancelEdit();
										}}
									/>

									<span onClick={saveEdit} className="material-symbols-outlined google-icon bg-save text-white hover:outline-solid hover:outline-outline hover:outline-2 p-2.5 cursor-pointer rounded-full mr-1.5">
										check
									</span>
									<span onClick={cancelEdit} className="material-symbols-outlined google-icon bg-cancel text-white hover:outline-solid hover:outline-outline hover:outline-2 p-2.5 cursor-pointer rounded-full mr-3.5">
										close
									</span>
								</div>
							) : (
								<>
									<div className="flex">
										<input className="todo-check h-3.5 w-3.5 mr-3 " type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} />
									</div>

									<div
										className="item-head"
										style={{
											textDecoration: todo.completed ? "line-through" : "none",
											color: todo.completed ? "#9ca3af" : "#000",
										}}
									>
										{todo.text}
									</div>

									<div className="group-hover:visible item-edit ml-auto mr-5 flex items-center justify-center cursor-pointer invisible rounded-full text-menu hover:bg-menuH hover:text-menu">
										<span onClick={() => openMenu(todo.id)} className="material-symbols-outlined ">
											more_horiz
										</span>
									</div>
								</>
							)}

							{openMenuId === todo.id && (
								<div className="menu text-xs bg-white shadow-sm box-border ml-2.5 p-1 rounded-xl h-full w-1/12 flex left-full flex-col absolute">
									<span className="menu-edit flex items-center flex-1 rounded-lg m-0 py-0 pl-2 cursor-pointer hover:bg-editH " onClick={() => startEdit(todo.id)}>
										Edit
									</span>
									<span className="menu-del flex items-center flex-1 rounded-lg m-0 py-0 pl-2 cursor-pointer hover:bg-editH " onClick={() => onDelete(todo.id)}>
										Delete
									</span>
								</div>
							)}
						</li>
					</ul>
				))
			)}
		</div>
	);
}
