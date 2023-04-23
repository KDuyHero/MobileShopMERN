import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import styles from "./Login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "../../../../axios.js";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["authorization"]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleShowPassword = (e) => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // reset error
    setErrorMessage("");
    axios
      .post("/users/signin", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response && response.data.errorCode !== 0) {
          setErrorMessage(response.data.message);
        } else {
          // setCookie("access_token", response.data.access_token);
          setCookie("isLogin", true);
          navigate("/");
        }
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  };

  const handleRegisterAccount = () => {
    navigate("/register");
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.slogan}>
        <h3
          style={{ cursor: "pointer" }}
          className={styles.shopName}
          onClick={() => navigate("/")}
        >
          My Mobile Shop
        </h3>
        <h1 className={styles.welcome}>
          Welcome <br /> to my store
        </h1>
      </div>
      <form className={styles.formLogin} onSubmit={(e) => handleSubmit(e)}>
        <h3 style={{ fontSize: 40, fontWeight: 700 }}>Login</h3>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Email"
            required
            onChange={(event) => handleEmailChange(event)}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            placeholder="Password"
            required
            onChange={(event) => handlePasswordChange(event)}
          />
          <span onClick={handleShowPassword} className={styles.showIcon}>
            {showPassword ? (
              <FontAwesomeIcon icon={faEye} />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} />
            )}
          </span>
        </div>

        <div className={styles.formGroup}>
          <input className={styles.submitBtn} type="submit" value="Login" />
        </div>

        <div className={styles.formGroup}>
          <p className={styles.errorMessage}>{errorMessage}</p>
        </div>

        <div
          className={styles.formGroup}
          onClick={handleRegisterAccount}
          style={{ cursor: "pointer" }}
        >
          <p className={styles.otherAction}>Register your account!!</p>
        </div>
      </form>
    </div>
  );
}

export default Login;
