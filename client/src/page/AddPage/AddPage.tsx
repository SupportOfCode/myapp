import { useState } from "react";
import { addProduct } from "../../api/product";
import { useNavigate } from "react-router-dom";
import "./AddPage.css";

const AddPage = () => {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAdd = () => {
    if (title === "" || img === "") {
      setError("Please fill in all fields.");
      console.log(error);
      return;
    }

    addProduct({ title, img });
    navigate("/");
  };

  return (
    <div className="add-container">
      <h2>Add New Product</h2>
      {error && <p className="error">{error}</p>}
      <div className="input-group">
        <input
          type="text"
          placeholder="Product title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          className="input-field"
        />
        <button className="btn add-btn" onClick={handleAdd}>
          ➕ Add Product
        </button>
      </div>
    </div>
  );
};

export default AddPage;
