import styles from "./ShowListProduct.module.css";
import Card from "../Card";
function ShowListProduct({ products }) {
  return (
    <div className={[styles.container, "container"].join(" ")}>
      {products.map((product, index) => {
        return <Card key={index} className={styles.card} product={product} />;
      })}
    </div>
  );
}

export default ShowListProduct;
