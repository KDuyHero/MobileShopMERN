import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "../../../../axios.js";
function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
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
    setErrorMessage("");
    // if (firstName === "") {
    //   setErrorMessage("FirstName is require!");
    //   firstNameRef.current.focus();
    // } else if (lastName === "") {
    //   setErrorMessage("LastName is require!");
    //   lastNameRef.current.focus();
    // } else if (email === "") {
    //   setErrorMessage("Email is require!");
    //   emailRef.current.focus();
    // } else if (password === "") {
    //   setErrorMessage("Password is require!");
    //   passwordRef.current.focus();}
    axios
      .post("/users/signup", {
        firstName,
        lastName,
        email: email,
        password: password,
      })
      .then((response) => {
        if (response && response.data.errorCode !== 0) {
          setErrorMessage(response.data.message);
        } else {
          navigate("/login");
        }
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  };

  const handleLoginAccount = () => {
    navigate("/login");
  };
  return (
    <div className={styles.wrapper}>
      <h1
        style={{ cursor: "pointer" }}
        className={styles.shopName}
        onClick={() => navigate("/")}
      >
        My Mobile Shop
      </h1>
      <form className={styles.formRegister} onSubmit={(e) => handleSubmit(e)}>
        <h3 style={{ fontSize: 40, fontWeight: 700 }}>Register</h3>
        <div className={styles.formDoubleGroup}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">FirstName</label>
            <input
              type="text"
              ref={firstNameRef}
              id="firstName"
              value={firstName}
              placeholder="FirstName"
              required
              onChange={(event) => handleFirstNameChange(event)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="lastName">LastName</label>
            <input
              type="text"
              ref={lastNameRef}
              id="lastName"
              value={lastName}
              placeholder="LastName"
              required
              onChange={(event) => handleLastNameChange(event)}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            ref={emailRef}
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
            ref={passwordRef}
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
          <input className={styles.submitBtn} type="submit" value="Register" />
        </div>

        <div className={styles.formGroup}>
          <p className={styles.errorMessage}>{errorMessage}</p>
        </div>

        <div
          className={styles.formGroup}
          onClick={handleLoginAccount}
          style={{ cursor: "pointer" }}
        >
          <p className={styles.otherAction}>
            You had an account? Go to login!!
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
