import { useEffect, useState } from "react";
import { deleteProduct, getProduct } from "../../api/product";
import { Product } from "../../type";
import "./home.css";
import { Link } from "react-router";
import Swal from "sweetalert2";

const Home = () => {
  const [listProduct, setListProduct] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [filteredTodos, setFilteredTodos] = useState(listProduct);

  useEffect(() => {
    getProduct(setListProduct);
  }, []);

  useEffect(() => {
    if (listProduct.length > 0) {
      setFilteredTodos(
        listProduct.filter((todo) =>
          todo.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, listProduct]);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Bạn có chắc muốn xóa không?",
      text: "bạn có thể sẽ không tìm kiếm lại ảnh!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Có xóa đi!",
    });

    if (result.isConfirmed) {
      try {
        await deleteProduct(id);
        setListProduct((prev) => prev.filter((product) => product._id !== id));
        Swal.fire("Thành Công", "Ảnh của bạn đã xóa.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to delete product.", "error");
        console.error("Failed to delete product:", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="input-group">
        <Link to={"/addpage"} className="btn add-btn">
          ➕ Add Product
        </Link>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field"
        />
      </div>

      <ul className="product-list">
        {filteredTodos.map((todo) => (
          <li key={todo._id} className="product-item">
            <>
              <img src={todo.img} alt={todo.title} className="product-img" />
              <span className="product-title">{todo.title}</span>
              <Link
                className="btn edit-btn"
                to={{
                  pathname: "/editpage",
                }}
                state={{ id: todo._id, title: todo.title, img: todo.img }}
              >
                Edit
              </Link>
              <button
                className="btn delete-btn"
                onClick={() => handleDelete(todo._id)}
              >
                ❌
              </button>
            </>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
