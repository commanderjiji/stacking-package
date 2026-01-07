import { useEffect, useState, useRef } from "react";
import type { Todo } from "../types/todo";

type Props = {
	todo: Todo;
	onToggle: (id: number) => void;
	onEdit: (id: number, text: string) => void;
	onDelete: (id: number) => void;
};

export default function TodoItems({ todo, onToggle, onEdit, onDelete }: Props) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [editText, setEditText] = useState(todo.title);

	const editInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isEditing && editInputRef.current) {
			editInputRef.current.focus();
		}
	}, [isEditing]);

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;

			if (!target.closest(".edit") && !target.closest(".menu") && !target.closest(".item-edit")) {
				setIsMenuOpen(false);
			}
		};

		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setIsMenuOpen(false);
				setIsEditing(false);
			}
		};

		document.addEventListener("mousedown", handleClick);
		document.addEventListener("keydown", handleKey);

		return () => {
			document.removeEventListener("mousedown", handleClick);
			document.removeEventListener("keydown", handleKey);
		};
	}, []);

	const startEdit = () => {
		setEditText(todo.title);
		setIsEditing(true);
		setIsMenuOpen(false);
	};

	const saveEdit = () => {
		if (!editText.trim()) return;
		onEdit(todo.id, editText);
		setIsEditing(false);
	};

	const cancelEdit = () => {
		setIsEditing(false);
	};

	return (
		<li className="group todo-item py-2.5 pl-7 rounded-2xl flex items-center mb-2 h-15 w-1/2 relative  bg-white shadow-sm">
			{isEditing ? (
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
						{todo.title}
					</div>

					<div className="group-hover:visible item-edit ml-auto mr-5 flex items-center justify-center cursor-pointer invisible rounded-full text-menu hover:bg-menuH hover:text-menu">
						<span onClick={() => setIsMenuOpen(!isMenuOpen)} className="material-symbols-outlined ">
							more_horiz
						</span>
					</div>
				</>
			)}

			{isMenuOpen && (
				<div className="menu text-xs bg-white shadow-sm box-border ml-2.5 p-1 rounded-xl h-full w-1/12 flex left-full flex-col absolute">
					<span className="menu-edit flex items-center flex-1 rounded-lg m-0 py-0 pl-2 cursor-pointer hover:bg-editH " onClick={startEdit}>
						Edit
					</span>
					<span className="menu-del flex items-center flex-1 rounded-lg m-0 py-0 pl-2 cursor-pointer hover:bg-editH " onClick={() => onDelete(todo.id)}>
						Delete
					</span>
				</div>
			)}
		</li>
	);
}
