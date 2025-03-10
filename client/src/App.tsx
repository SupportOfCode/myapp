import { Route, BrowserRouter as Router, Routes } from "react-router";
import "./App.css";
import Home from "./page/Home/Home";
import AddPage from "./page/AddPage/AddPage";
import EditPage from "./page/EditPage/EditPage";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addpage" element={<AddPage />} />
          <Route path="/editpage" element={<EditPage />} />
          <Route path="*" element={<h1> PAGE NOT FOUND</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
