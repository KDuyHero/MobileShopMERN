import Homepage from "../component/Container/Homepage";
import Login from "../component/Container/Auth/Login";
import Register from "../component/Container/Auth/Register";
import AllProduct from "../component/Container/Product/AllProduct";
import ProductOfCategory from "../component/Container/Product/ProductOfCategory";
import AddProduct from "../component/Container/Product/AddProduct";
import DetailProduct from "../component/Container/Product/DetailProduct";
import EditProduct from "../component/Container/Product/EditProduct";
import Cart from "../component/Container/Cart";
import Profile from "../component/Container/Profile";

const publicRoutes = [
  { path: "/", component: Homepage },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: `/products/categorys/:category`, component: ProductOfCategory },
  // { path: `/products/:productId/edit`, component: EditProduct },
  { path: `/products/new`, component: AddProduct },
  { path: `/products/:productId`, component: DetailProduct },
  { path: "/products", component: AllProduct },
  { path: `/users/cart`, component: Cart },
  { path: `/users/:id`, component: Profile },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
