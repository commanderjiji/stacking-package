import { useReducer } from "react";

import type { FilterType } from "./ui.reducer";
import type { UIState } from "./ui.reducer";
import { uiReducer } from "./ui.reducer";

const initialUIState: UIState = {
	filter: "all",
	isModalOpen: false,
	editingTodoId: null,
};

function useUI() {
	const [ui, dispatch] = useReducer(uiReducer, initialUIState);

	const setFilter = (payload: FilterType) => {
		dispatch({ type: "FILTER_UI", payload });
	};

	const toggleModal = () => {
		dispatch({ type: "MODAL_UI" });
	};

	const setEditingTodo = (id: string | null) => {
		dispatch({ type: "EDIT_UI", id });
	};

	return {
		ui,
		setFilter,
		toggleModal,
		setEditingTodo,
	};
}
