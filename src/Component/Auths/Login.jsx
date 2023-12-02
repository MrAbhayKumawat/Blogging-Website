import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import "./Login.scss";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [apidata, setapidata] = useState({});
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [showError, setShowError] = useState(false);
  const [showError2, setShowError2] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    fetch("https://ak-blogging-464b5-default-rtdb.firebaseio.com/Ak-Blogging.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok (Status: ${response.status})`
          );
        }
        return response.json();
      })
      .then((json) => setapidata(json)).then((data) =>console.log(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset error states
    setShowError(false);
    setShowError2(false);

    if (validateForm()) {
      const emailArray = Object.keys(apidata).map((key) => apidata[key].email);
      const passArray = Object.keys(apidata).map(
        (key) => apidata[key].password
      );
      const usernameArray = Object.keys(apidata).map(
        (key) => apidata[key].username
      );

      const enteredEmail = formData.email.toUpperCase();

      const emailIndex = emailArray.findIndex(
        (email) => email.toUpperCase() === enteredEmail
      );

      if (emailIndex !== -1) {
        if (
          formData.password === passArray[emailIndex] ||
          formData.password === "LoginNow"
        ) {
          const username = usernameArray[emailIndex];
          navigate("/Home", { state: { id: username } });
        } else {
          setShowError(true);
        }
      } else {
        setShowError2(true);
      }
    }
  };

  return (
    <>
      <div className="form-main">
        <form className="form" onSubmit={handleSubmit}>
          <p className="title" style={{ fontSize: "2.3rem" }}>
            Login
          </p>
          <p className="message">Login now and get full access to our Web app.</p>

          <label>
            <input
              required
              placeholder="Email"
              type="email"
              className="input"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </label>

          <label>
            <input
              required
              placeholder="Password"
              type="password"
              className="input"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </label>
          <p className="Loginf" onClick={() => setShowError(true)}>
            Forgot Password?
          </p>

          {/* Error Alert */}
          {showError && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="error">
                Your Temporary password is : LoginNow
              </Alert>
            </Stack>
          )}
          {showError2 && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="error">User not found!</Alert>
            </Stack>
          )}

          <button className="submit" type="submit" style={{ textAlign: "center" }}>
            Submit
          </button>

          <p className="signin">
            Create Your Account?{" "}
            <span
              style={{ color: "royalblue", cursor: "pointer" }}
              onClick={() => {
                navigate("/SignUp");
              }}
            >
              SignUp
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
