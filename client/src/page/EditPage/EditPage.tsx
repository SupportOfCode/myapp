import { useState } from "react";
import { updateTodo } from "../../api/callApi";
import { useLocation, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { updateStateTodo } from "../../store/todoSlice";

const EditPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { id, title, status } = location.state || {};

  const [newTitle, setNewTitle] = useState(title);
  const [newStatus, setNewStatus] = useState(status || "Pending");
  const [error, setError] = useState("");
  // const dispatch = useDispatch<AppDispatch>();

  const handleSave = () => {
    if (!newTitle.trim() || !newStatus.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    updateTodo({ id, title: newTitle, status: newStatus });
    // dispatch(updateStateTodo({ _id: id, title: newTitle, status: newStatus }));
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-gray-100 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-semibold mb-4">Edit Todo</h2>
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Todo title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="p-2 border border-gray-300 rounded-md text-lg w-full"
        />

        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          className="p-2 border border-gray-300 rounded-md text-lg w-full bg-white"
        >
          <option value="Pending">Pending</option>
          <option value="Cancel">Cancel</option>
          <option value="Success">Success</option>
        </select>

        <button
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition text-lg"
          onClick={handleSave}
        >
          ✅ Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditPage;
