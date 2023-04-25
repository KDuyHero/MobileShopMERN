import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
function Header({ className = "" }) {
  const navigate = useNavigate();
  const categorys = ["Iphone", "Samsung", "Xiaomi", "Realme", "Nokia"];

  const handleLogout = () => {
    window.localStorage.clear();
    // window.location.reload();
  };

  const handleViewUserDetail = () => {
    let token = window.localStorage.getItem("token");
  };
  return (
    <div className={[styles.wrapper, className].join(" ")}>
      <div className={[styles.container, "container"].join(" ")}>
        <div className={[styles.brand].join(" ")}>
          <Link to="/">My Mobile Shop</Link>
        </div>
        {window.localStorage.getItem("token") ? (
          <div className={styles.user}>
            <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
            <div className={styles.dropDownUser}>
              <a
                href="/users/12345"
                onClick={handleViewUserDetail}
                className={styles.dropDownItem}
              >
                Xem thông tin
              </a>
              <a href="/users/cart" className={styles.dropDownItem}>
                Giỏ hàng
              </a>
              <a
                href="/"
                className={styles.dropDownItem}
                onClick={handleLogout}
              >
                Đăng xuất
              </a>
            </div>
          </div>
        ) : (
          <div className={styles.userService}>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </div>
      <div className={[styles.menu, "container"].join(" ")}>
        {categorys.map((category, index) => {
          return (
            <div
              key={index}
              className="category"
              onClick={() => navigate(`/products/categorys/${category}`)}
            >
              {category}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Header;
