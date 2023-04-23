import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../../axios";
import styles from "./EditProduct.module.css";
import { useEffect } from "react";
function EditProduct() {
  const params = useParams();
  let productId = params.productId;
  const product = {
    _id: "123456",
    image: [
      "https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/1896224739.jpeg",
      "https://tmobile368.com/wp-content/uploads/2022/09/3-1.png",
      "https://news.khangz.com/wp-content/uploads/2022/09/iphone_14_3.png",
      "https://thoapple.com/wp-content/uploads/2022/04/iphone14-tim.jpg",
      "https://preview.redd.it/new-iphone-day-my-ip14-plus-finally-arrived-replacing-my-v0-6ge01mcwa35a1.jpg?width=1980&format=pjpg&auto=webp&s=e810da30283e39851dde3102c612e9536c63e1c3",
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
  };

  const categorys = ["Iphone", "Sam sung", "Xiaomi", "Realme", "Nokia"];
  const [name, setName] = useState(product.name);
  const [selectedFiles, setSeletedFile] = useState(product.image);
  const [price, setPrice] = useState(product.price);
  const [discount, setDiscount] = useState(product.discount);
  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState(product.category);
  const [detail, setDetail] = useState({
    ...product.detail,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    let data = {
      name: name,
      price: price,
      discount: discount,
      description: description,
      category: category,
      detail: detail,
    };

    for (const key of Object.keys(selectedFiles)) {
      formData.append("images", selectedFiles[key]);
    }
    for (const key of Object.keys(data)) {
      formData.append(key, data[key]);
    }

    axios
      .post("/products", formData)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {});

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3>My Mobile Shop</h3>
      </div>
      <div className={[styles.container, "container"].join(" ")}>
        <h3>Thông tin sản phẩm</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              {categorys.map((value, index) => {
                return (
                  <option key={index} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="price">Price (VNĐ)</label>
            <input
              type="number"
              id="price"
              min={1}
              step={1}
              datatype="inputnumber"
              value={price}
              placeholder="min: 1"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="discount">Discount (%)</label>
            <input
              type="number"
              id="discount"
              max={99}
              min={0}
              value={discount}
              placeholder="0-99"
              onChange={(e) => setDiscount(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              multiple
              onChange={(e) =>
                setSeletedFile([...selectedFiles, e.target.files[0]])
              }
            />
            <ul>
              {selectedFiles.map((file, index) => {
                return <li key={index}>{file.name}</li>;
              })}
            </ul>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="detail" style={{ marginBottom: 10 }}>
              Thông số cấu hình:
            </label>
            <div
              className={styles.subDetail}
              style={{ border: "1px solid transparent" }}
            >
              <label htmlFor="rear_camera">Rear camera (MP): </label>
              <input
                type="number"
                value={detail.rear_camera}
                id="rear_camera"
                placeholder="rear-camera"
                onChange={(e) =>
                  setDetail({ ...detail, rear_camera: e.target.value })
                }
              />
            </div>

            <div className={styles.subDetail}>
              <label htmlFor="front_camera">Front camera (MP): </label>
              <input
                type="number"
                value={detail.front_camera}
                id="front_camera"
                placeholder="rear-camera"
                onChange={(e) =>
                  setDetail({ ...detail, front_camera: e.target.value })
                }
              />
            </div>
            <div className={styles.subDetail}>
              <label htmlFor="operating_system">Hệ điều hành: </label>
              <select
                name="operating_system"
                id="operating_system"
                onChange={(e) =>
                  setDetail({ ...detail, operating_system: e.target.value })
                }
              >
                <option value="Ios">IOS</option>
                <option value="Android">Android</option>
                <option value="Window_phone">Windows Phone</option>
                <option value="Symbian">Symbian</option>
                <option value="BlackBerry">BlackBerry</option>
              </select>
            </div>
            <div className={styles.subDetail}>
              <label htmlFor="display_size">Display size (Inch): </label>
              <input
                type="number"
                value={detail.display_size}
                id="display_size"
                placeholder="Display size"
                onChange={(e) =>
                  setDetail({ ...detail, display_size: e.target.value })
                }
              />
            </div>
            <div className={styles.subDetail}>
              <label htmlFor="power">Power (mAh): </label>
              <input
                type="number"
                value={detail.power}
                id="power"
                placeholder="Power"
                onChange={(e) =>
                  setDetail({ ...detail, power: e.target.value })
                }
              />
            </div>

            <div className={styles.subDetail}>
              <label htmlFor="memory">Memory (GB): </label>
              <input
                type="number"
                value={detail.memory}
                id="memory"
                placeholder="Memory"
                onChange={(e) =>
                  setDetail({ ...detail, memory: e.target.value })
                }
              />
            </div>

            <div className={styles.subDetail}>
              <label htmlFor="ram">Ram (GB): </label>
              <input
                type="number"
                value={detail.ram}
                id="ram"
                placeholder="Ram"
                onChange={(e) => setDetail({ ...detail, ram: e.target.value })}
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <input className="btn btn-primary" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
