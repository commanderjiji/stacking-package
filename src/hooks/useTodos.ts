import { useReducer } from "react";
import type { Todo } from "../types/todo";

type Action = { type: "ADD_TODO"; payload: string } | { type: "TOGGLE_TODO"; payload: number } | { type: "EDIT_TODO"; payload: { id: number; title: string } } | { type: "DELETE_TODO"; payload: number };

function todosReducer(state: Todo[], action: Action): Todo[] {
	switch (action.type) {
		case "ADD_TODO":
			return [...state, { id: Date.now(), title: action.payload, completed: false }];
		case "TOGGLE_TODO":
			return state.map((todo) => (todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo));
		case "EDIT_TODO":
			return state.map((todo) => (todo.id === action.payload.id ? { ...todo, title: action.payload.title } : todo));
		case "DELETE_TODO":
			return state.filter((todo) => todo.id !== action.payload);

		default:
			return state;
	}
}

export function useTodos() {
	const [todos, dispatch] = useReducer(todosReducer, []);

	const addTodo = (title: string) => {
		dispatch({ type: "ADD_TODO", payload: title });
	};

	const toggleTodo = (id: number) => {
		dispatch({ type: "TOGGLE_TODO", payload: id });
	};

	const editTodo = (id: number, title: string) => {
		dispatch({ type: "EDIT_TODO", payload: { id, title } });
	};

	const deleteTodo = (id: number) => {
		dispatch({ type: "DELETE_TODO", payload: id });
	};

	return {
		todos,
		addTodo,
		toggleTodo,
		editTodo,
		deleteTodo,
	};
}
