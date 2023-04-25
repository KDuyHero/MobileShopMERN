import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../Layout/Header";
import ShowListProduct from "../../../Layout/ShowListProduct";

import styles from "./ProductOfCategory.module.css";
import axios from "../../../../axios";
function ProductOfCategory() {
  const params = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`/products/categorys/${params.category}`).then((response) => {
      setProducts(response.data.products);
      window.scrollTo(0, 0);
    });
  }, [params.category]);
  return (
    <div className={styles.wrapper}>
      <div className="container">
        <Header />
        <h1>{params.category}</h1>
        <ShowListProduct products={products} />
      </div>
    </div>
  );
}

export default ProductOfCategory;
