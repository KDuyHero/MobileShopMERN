import { useState } from "react";
import Header from "../../../Layout/Header";
import axios from "../../../../axios";

import styles from "./AddProduct.module.css";
function AddProduct() {
  const init = {
    category: "Iphone",
    name: "",
    selectedFiles: [],
    price: "",
    discount: "",
    description: "",
    detail: {
      rear_camera: "",
      front_camera: "",
      operating_system: "IOS",
      display_size: "",
      power: "",
      memory: "",
      ram: "",
    },
  };
  const categorys = ["Iphone", "Samsung", "Xiaomi", "Realme", "Nokia"];
  const [name, setName] = useState("");
  const [selectedFiles, setSeletedFile] = useState([]);
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Iphone");
  const [detail, setDetail] = useState({
    rear_camera: "",
    front_camera: "",
    operating_system: "IOS",
    display_size: "",
    power: "",
    memory: "",
    ram: "",
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
      rear_camera: detail.rear_camera,
      front_camera: detail.front_camera,
      operating_system: detail.operating_system,
      display_size: detail.display_size,
      power: detail.power,
      memory: detail.memory,
      ram: detail.ram,
    };

    for (const key of Object.keys(selectedFiles)) {
      formData.append("images", selectedFiles[key]);
    }
    for (const key of Object.keys(data)) {
      formData.append(key, data[key]);
    }
    console.log(formData.detail);

    axios
      .post("/products", formData)
      .then((response) => {
        window.location.reload();
        window.scrollTo(0, 0);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={[styles.container, "container"].join(" ")}>
        <div className={styles.formContainer}>
          <h3>Thêm sản phẩm mới</h3>
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
                  onChange={(e) =>
                    setDetail({ ...detail, ram: e.target.value })
                  }
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
