import { useState } from "react";
import { addTodo } from "../../api/callApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addStateTodo } from "../../store/todoSlice";

const AddPage = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<string>("Pending");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleAdd = () => {
    if (title === "" || status === "") {
      setError("Please fill in all fields.");
      return;
    }

    addTodo({ title, status });
    dispatch(addStateTodo({ _id: "temp", title, status }));
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-gray-100 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-semibold mb-4">New Todo</h2>
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="todo title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border border-gray-300 rounded-md text-lg w-full"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 border border-gray-300 rounded-md text-lg w-full bg-white"
        >
          <option value="Pending">Pending</option>
          <option value="Cancel">Cancel</option>
          <option value="Success">Success</option>
        </select>

        <button
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition text-lg"
          onClick={handleAdd}
        >
          ➕ Add Todo
        </button>
      </div>
    </div>
  );
};

export default AddPage;
