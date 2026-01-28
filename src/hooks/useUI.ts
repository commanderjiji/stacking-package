import { useReducer } from "react";

import type { FilterType } from "../reducer/uiReducer";
import type { UIState } from "../reducer/uiReducer";
import { uiReducer } from "../reducer/uiReducer";

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
