import { useState, useEffect } from "react";
import axios from "../../../axios";
import Header from "../../Layout/Header";
import ShowListProduct from "../../Layout/ShowListProduct";
import styles from "./Homepage.module.css";
function Homepage() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("/products")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header />
      <ShowListProduct products={products} />
    </div>
  );
}

export default Homepage;
