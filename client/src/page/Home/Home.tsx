import { useEffect, useState } from "react";
import { deleteTodo, getTodo } from "../../api/callApi";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { deleteStateTodo, setStateTodos } from "../../store/todoSlice";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const listTodo = useSelector((state: RootState) => state.todo.todos);

  // const [listTodo, setListTodo] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  // const [filteredTodos, setFilteredTodos] = useState(listTodo);

  // useEffect(() => {
  //   getTodo(setListTodo);
  // }, []);

  useEffect(() => {
    getTodo((todos: any) => dispatch(setStateTodos(todos)));
  }, [dispatch]);

  const filteredTodos = listTodo.filter((todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase())
  );

  // useEffect(() => {
  //   if (listTodo.length > 0) {
  //     setFilteredTodos(
  //       listTodo.filter((todo) =>
  //         todo.title.toLowerCase().includes(search.toLowerCase())
  //       )
  //     );
  //   }
  // }, [search, listTodo]);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Bạn có chắc muốn xóa không?",
      text: "Bạn có thể sẽ không tìm lại được todo này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Có, xóa ngay!",
    });

    if (result.isConfirmed) {
      try {
        await deleteTodo(id);
        dispatch(deleteStateTodo(id));
        // setListTodo((prev) => prev.filter((todo) => todo._id !== id));
        Swal.fire("Thành Công", "Todo đã bị xóa.", "success");
      } catch (error) {
        Swal.fire("Lỗi!", "Không thể xóa todo.", "error");
        console.error("Failed to delete todo:", error);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto my-6 p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex gap-4 mb-4">
        <Link
          to="/addpage"
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          ➕ Add Todo
        </Link>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search todo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md text-lg"
        />
      </div>

      <ul className="space-y-4">
        {filteredTodos.map((todo) => (
          <li
            key={todo._id}
            className="flex items-center justify-between bg-white p-4 rounded-md shadow-md"
          >
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold 
              ${
                todo.status === "Success"
                  ? "text-green-600 bg-green-200"
                  : todo.status === "Pending"
                  ? "text-gray-500 bg-gray-200"
                  : todo.status === "Cancel"
                  ? "text-red-600 bg-red-200"
                  : ""
              }
              `}
            >
              {todo.status}
            </span>

            <span className="flex-1 ml-4 text-lg font-semibold">
              {todo.title}
            </span>

            <div className="flex gap-2">
              <Link
                className="px-3 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition"
                to={{
                  pathname: "/editpage",
                }}
                state={{ id: todo._id, title: todo.title, status: todo.status }}
              >
                Edit
              </Link>

              <button
                className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                onClick={() => handleDelete(todo._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
