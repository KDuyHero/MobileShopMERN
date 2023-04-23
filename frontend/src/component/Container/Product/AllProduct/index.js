import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../../../axios";

import styles from "./AllProduct.module.css";
function AllProduct() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("/products")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleAddButton = () => {
    navigate("/products/new");
  };
  const handleDeleteProduct = (productId) => {
    alert("delete " + productId);
  };
  return (
    <div className={styles.wrapper}>
      <div className="container">
        <Link to="/">
          <h1 style={{ cursor: "pointer" }}>My Mobile Shop</h1>
        </Link>
      </div>
      <div
        className={[styles.container, styles.allProduct, "container"].join(" ")}
      >
        <div className={styles.header}>
          <h3>Danh sách sản phẩm</h3>
          <button className="btn btn-primary" onClick={handleAddButton}>
            Thêm sản phẩm
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Số</th>
              <th>Tên sản phẩm</th>
              <th>Giá bán</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => navigate(`/products/${product._id}/edit`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllProduct;
