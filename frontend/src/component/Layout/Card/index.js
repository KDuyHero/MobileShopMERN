import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import styles from "./Card.module.css";
function Card({
  // detail product
  product = {
    _id: "123456",
    image: [
      "https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/1896224739.jpeg",
      "https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/1896224739.jpeg",
      "https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/1896224739.jpeg",
      "https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/1896224739.jpeg",
      "https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/1896224739.jpeg",
    ],
    name: "Iphone 14 Pro Max 128Gb",
    description: "Sản phẩm mới nhất của nhãn hàng Iphone",
    price: 29999990,
    discount: 5,
  },
  // props className
  className = "",
}) {
  // create class for wrapper
  const classes = [
    styles.card,
    "col-12",
    "col-sm-6",
    "col-md-4",
    "col-lg-3",
    className,
  ].join(" ");
  // navigate to redirect
  const navigate = useNavigate();
  // redirect when click other product
  const handleClickProduct = (productId) => {
    navigate(`/products/${productId}`);
  };

  // get URL from name for Image product
  const getUrl = (filename) => {
    let host = "http://localhost:8080/images/";
    return host + filename;
  };

  // convert number to form x.xxx.xxx VNĐ
  const convertPriceToString = (price) => {
    return price.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <div className={classes}>
      <div
        className={styles.cardContainer}
        onClick={() => handleClickProduct(product._id)}
      >
        <div
          className={styles.cardImgTop}
          style={{ backgroundImage: `url(${getUrl(product.images[0])})` }}
        ></div>
        <div className={styles.cardBody}>
          <h5 className={styles.cardTitle}>{product.name}</h5>
          <div className={styles.cardPriceContainer}>
            {product.discount > 0 ? (
              <>
                <p className={styles.realPrice}>
                  {convertPriceToString(product.price)}
                </p>
                <div className={styles.discountPriceContainer}>
                  <p className={styles.discountPrice}>
                    {convertPriceToString(
                      parseInt((product.price * (100 - product.discount)) / 100)
                    )}
                  </p>
                  <p className={styles.discount}>
                    <FontAwesomeIcon icon={faArrowTrendDown} />{" "}
                    {product.discount}%
                  </p>
                </div>
              </>
            ) : (
              <p className={styles.notDiscount}>
                {convertPriceToString(product.price)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
