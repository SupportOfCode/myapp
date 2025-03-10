import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Todo = {
  _id: string;
  title: string;
  status: string;
}

type TodoState = {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setStateTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    addStateTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    updateStateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex((todo) => todo._id === action.payload._id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    deleteStateTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);
    },
  },
});

export const { addStateTodo, setStateTodos, updateStateTodo, deleteStateTodo } = todoSlice.actions;
export default todoSlice.reducer;
