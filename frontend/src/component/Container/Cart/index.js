import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "../../../axios";

import Header from "../../Layout/Header";
import styles from "./Cart.module.css";
function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // get total price
  const getTotal = () => {
    return cartItems.reduce((sum, currentItem) => {
      let add = currentItem.price * currentItem.quantity;
      return sum + add;
    }, 0);
  };

  // convert number to form x.xxx.xxx VNĐ
  const convertPriceToString = (price) => {
    return price.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };
  // header for axios
  let header = {
    Authorization: "bearer " + window.localStorage.token,
  };
  // use effect to get data first time
  useEffect(() => {
    axios
      .get("/users/cart", {
        headers: header,
      })
      .then((response) => {
        let cartItems = response.data.cart.cartItems;
        // promise.all return array
        Promise.all(
          cartItems.map((item, value) => {
            return axios
              .get(`/products/${item.product}`)
              .then((response) => {
                return {
                  product: response.data.product,
                  quantity: item.quantity,
                  price: item.price,
                };
              })
              .catch((error) => console.log(error));
          })
        )
          .then((data) => setCartItems(data))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, []);

  // get URL from name for Image product
  const getUrl = (filename) => {
    let host = "http://localhost:8080/images/";
    return host + filename;
  };
  // remove item
  const handleReduceItem = (index, quantity) => {
    axios
      .post(
        "/carts/remove",
        {
          cartItems: {
            product: cartItems[index].product._id,
            quantity: quantity,
            price: cartItems[index].price,
          },
        },
        {
          headers: header,
        }
      )
      .then((response) => {
        let newQuantity = cartItems[index].quantity - quantity;
        // remove
        if (newQuantity === 0) {
          setCartItems(cartItems.filter((v, i) => i !== index));
        } else {
          setCartItems((preCart) => {
            let cart = [...preCart];
            cart[index] = { ...cart[index], quantity: newQuantity };
            return cart;
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Pay
  const handlePay = () => {};
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={[styles.cart, "container"].join(" ")}>
        <h3>Giỏ hàng của tôi</h3>
        <table>
          <tbody>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Calculate Price</th>
            </tr>
            {cartItems.map((cartItem, index) => {
              return (
                <tr key={index}>
                  <td>
                    <FontAwesomeIcon
                      icon={faXmark}
                      className={styles.deleteIcon}
                      onClick={() => handleReduceItem(index, cartItem.quantity)}
                    />
                    <div
                      className={styles.productImage}
                      style={{
                        backgroundImage: `url(${getUrl(
                          cartItem.product.images[0]
                        )})`,
                      }}
                    ></div>
                    <span>{cartItem.product.name}</span>
                  </td>
                  <td>{convertPriceToString(cartItem.price)}</td>
                  {/* quantity */}
                  <td className={styles.btnAction}>
                    <button onClick={() => handleReduceItem(index, 1)}>
                      -
                    </button>
                    {cartItem.quantity}
                    <button onClick={() => handleReduceItem(index, -1)}>
                      +
                    </button>
                  </td>
                  <td>
                    {convertPriceToString(cartItem.quantity * cartItem.price)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={styles.pay}>
          <div className={styles.total}>
            <span>Total: &nbsp;</span>
            <h3>{convertPriceToString(getTotal())}</h3>
          </div>
          <div
            className={styles.payBtn}
            onClick={() => setShowModal(!showModal)}
          >
            Thanh toán
          </div>
        </div>
      </div>

      {/* Bill */}
      {showModal && (
        <div className={styles.modalPay}>
          <div
            className={styles.layer}
            onClick={() => setShowModal(!showModal)}
          ></div>
          <div className={styles.bill}>
            <h1>Xác nhận thanh toán</h1>
            {cartItems && (
              <table>
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Số lượng</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.product.name}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <strong>
              Xác nhận thanh toán:{" "}
              <span>{convertPriceToString(getTotal())}</span>
            </strong>
            <div className={styles.button}>
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(!showModal)}
              >
                Cancer
              </button>
              <button className="btn btn-success" onClick={() => handlePay()}>
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
