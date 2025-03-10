import { useState } from "react";
import { updateProduct } from "../../api/product";
import { useLocation, useNavigate } from "react-router-dom";

const EditPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { id, title, img } = location.state || {};

  const [newTitle, setNewTitle] = useState(title);
  const [newImg, setNewImg] = useState(img || "");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!newTitle.trim() || !newImg.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    updateProduct({ id, title: newTitle, img: newImg });
    navigate("/");
  };

  return (
    <div className="add-container">
      <h2>Edit Product</h2>
      {error && <p className="error">{error}</p>}
      <div className="input-group">
        <input
          type="text"
          placeholder="Product title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newImg}
          onChange={(e) => setNewImg(e.target.value)}
          className="input-field"
        />
        <button className="btn add-btn" onClick={handleSave}>
          ✅ Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditPage;
