import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendDown,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "../../../../axios";

import "./Product.css";
import ShowListProduct from "../../../Layout/ShowListProduct";
import Header from "../../../Layout/Header";
function DetailProduct() {
  const [cookies, setCookie] = useCookies(["authorization"]);
  // current Product
  const [product, setProduct] = useState({
    _id: "123456",
    images: [
      "product-1681974909770-iPhone-14-plus.jpg",
      "product-1681974909771-iphone-13-starlight.jpg",
      "product-1681974909771-iPhone-14.jpg",
    ],
    name: "Iphone 14 Pro Max 128Gb",
    description: "Sản phẩm mới nhất của nhãn hàng Iphone",
    detail: {
      rear_camera: "14",
      front_camera: "14",
      operating_system: "IOS",
      display_size: "6.1",
      power: "3279",
      memory: "128",
      ram: "4",
    },
    category: "Iphone",
    price: 29999990,
    discount: 5,
  });
  // suggest Product
  const [products, setProducts] = useState([]);
  const measure = ["MP", "MP", "", "Inch", "mAh", "GB", "GB"];

  const [currentImage, setCurrentImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const params = useParams();

  useEffect(() => {
    axios.get(`/products/${params.productId}`).then((response) => {
      let product = response.data.product;
      setProduct(product);
      setCurrentImage(product.images[0]);

      axios.get(`/products/categorys/${product.category}`).then((response) => {
        setProducts(response.data.products);
      });
    });
    window.scrollTo(0, 0);
  }, [params.productId]);

  const handleChangeImage = (url) => {
    setCurrentImage(url);
  };

  const handleQuantity = (operator) => {
    if (operator === "-") {
      quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    console.log(cookies.access_token);
    axios
      .post(
        "/carts/add",
        {
          cartItems: {
            product: params.productId,
            quantity: quantity,
            price: product.price,
          },
        },
        {
          headers: {
            Authorization: "bearer " + cookies.access_token,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.errorCode === 0) {
          alert("Đã thêm thành công!");
        } else {
          alert("Thất bại!");
        }
      })
      .catch((error) => console.log(error));
  };

  const getUrl = (filename) => {
    let host = "http://localhost:8080/images/";
    return host + filename;
  };
  return (
    <div className="wrapper">
      <Header />
      <div className="container contentContainer">
        <div className="info">
          <div className="image">
            <div
              className="currentImage"
              style={{ backgroundImage: `url(${getUrl(currentImage)})` }}
            ></div>
            <div className="moreImage">
              {product.images.map((url, index) => {
                return (
                  <div
                    key={index}
                    className="subImage"
                    style={{ backgroundImage: `url(${getUrl(url)})` }}
                    onMouseOver={() => handleChangeImage(url)}
                  ></div>
                );
              })}
            </div>
          </div>
          <div className="subInfo">
            <h3 className="productName">{product.name}</h3>
            <div className="price">
              {product.discount > 0 ? (
                <>
                  <p className="realPrice">{product.price}</p>
                  <p className="discountPrice">
                    {parseInt((product.price * (100 - product.discount)) / 100)}
                  </p>
                  <p className="discount">
                    <FontAwesomeIcon icon={faArrowTrendDown} />{" "}
                    {product.discount}%
                  </p>
                </>
              ) : (
                <p className="notDiscount">{product.price}</p>
              )}
            </div>
            <div className="quantity">
              <span>Số lượng: </span>
              <div>
                <button onClick={() => handleQuantity("-")}>-</button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantity("+")}>+</button>
              </div>
            </div>

            <div className="btn">
              <div className="addToCartBtn" onClick={handleAddToCart}>
                <FontAwesomeIcon icon={faCartPlus} />
                <div>Thêm vào giỏ hàng</div>{" "}
              </div>
              <div className="buyNowBtn">Mua ngay</div>
            </div>
          </div>
        </div>
        <div className="detail">
          <h3>Chi tiết sản phẩm</h3>
          <table>
            <tbody>
              {Object.keys(product.detail).map((key, index) => {
                let title = key.split("_").join(" ");
                return (
                  <tr key={index}>
                    <th>{title}: </th>
                    <td>
                      {product.detail[key]} {measure[index]}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="recommend">
          <h3>Có thể bạn sẽ thích</h3>
          <div className="productRecommend">
            <ShowListProduct products={products} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
