import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "../../../axios";

import Header from "../../Layout/Header";
import styles from "./Cart.module.css";
function Cart() {
  const [cookies, setCookie] = useCookies(["authorization"]);
  const [cartItems, setCartItems] = useState([]);
  const getTotal = () => {
    return cartItems.reduce((sum, currentItem) => {
      let add = currentItem.price * currentItem.quantity;
      return sum + add;
    }, 0);
  };
  let header = {
    Authorization: "bearer " + cookies.access_token,
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
  const handleRemoveItem = (index) => {
    console.log(cartItems);
    axios
      .post(
        "/carts/remove",
        {
          cartItems: {
            product: cartItems[index].product._id,
            quantity: cartItems[index].quantity,
            price: cartItems[index].price,
          },
        },
        {
          headers: header,
        }
      )
      .then((response) => {
        console.log(response.data);
        setCartItems(cartItems.filter((v, i) => i !== index));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handlePay = () => {};
  return (
    <div>
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
                      onClick={() => handleRemoveItem(index)}
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
                  <td>{cartItem.price}</td>
                  <td>{cartItem.quantity}</td>
                  <td>{cartItem.quantity * cartItem.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={styles.pay}>
          <div className={styles.total}>
            <span>Total: &nbsp;</span>
            <h3>{getTotal()}</h3>
          </div>
          <div className={styles.payBtn} onClick={handlePay}>
            Thanh toán
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
