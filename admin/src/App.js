import Topbar from "./Components/topbar/Topbar";
import Sidebar from "./Components/sidebar/sidebar";
import "./App.css";
import Home from "./pages/home/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./pages/users/list";
import Order from "./pages/orders/list";
import ProductList from "./pages/products/list";
import NewProduct from "./pages/products/NewProduct";
import Category from "./pages/category/list";
import NewCategory from "./pages/category/newCategory";
import EditProduct from "./pages/products/editProduct";
import EditCategory from "./pages/category/editCategory";
import Login from "./pages/login/Login";
import useToken from './slices/useToken';

function App() {
const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route path="/users" element={<UserList />} />
          <Route path="/orders" element={<Order />} />

          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:productId" element={<EditProduct />} />
          <Route path="/products/newProduct" element={<NewProduct />} />

          <Route path="/categories" element={<Category />} />
          <Route path="/categories/:categoryId" element={<EditCategory />} />
          <Route path="/categories/newCategory" element={<NewCategory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
