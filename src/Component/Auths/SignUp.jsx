import  { useState, useEffect } from "react";
import "./SignUp.scss";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showSucces, setShowSucces] = useState(false);
  const [emailarray, setemailarray] = useState([]);
  const [showError, setShowError] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (emailarray.includes(formData.email)) {
      setShowError(true);
      return;
    } else {
      setShowError(false);
    }
  }, [formData.email]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form data
    const validationErrors = {};
    if (!formData.username.trim()) {
      validationErrors.username = "Username is required";
    }
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    }
    if (!formData.password) {
      validationErrors.password = "Password is required";
    }
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch(
        "https://ak-blogging-464b5-default-rtdb.firebaseio.com/Ak-Blogging.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Form data submitted successfully");
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setShowSucces(true);
        setTimeout(() => {
          setShowSucces(false);
          navigate("/Login")

          
        }, 3000);
        // You can display a success message here or redirect to another page.
      } else {
        console.error("Error submitting form data");
        // You can handle error cases here.
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      // You can handle error cases here.
    }
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
      .then((data) => {
        const emails = Object.values(data).map((item) => item.email);
        setemailarray(emails);
        console.log(emails);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="App">
      <form className="form" onSubmit={handleSubmit}>
        <p
          className="title"
          style={{ fontSize: "2.3rem", letterSpacing: "2.5px" }}
        >
          Register
        </p>
        <p className="message">
          Sign up now and get full access to our Web app.
        </p>

        <label>
          <input
            required
            placeholder="Username"
            type="text"
            className="input"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <div className="error">{errors.username}</div>}
        </label>

        <label>
          <input
            required
            placeholder="Email"
            type="email"
            className="input"
            name="email"
            value={formData.email}
            onChange={handleChange}
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
            onChange={handleChange}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </label>

        <label>
          <input
            required
            placeholder="Confirm Password"
            type="password"
            className="input"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <div className="error">{errors.confirmPassword}</div>
          )}
        </label>
        {showError && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">
              This user is Already Register Please Login
            </Alert>
          </Stack>
        )}
        {showSucces && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="success">
              Your are Successfully Register Please Login
            </Alert>
          </Stack>
        )}
        <button
          className="submit"
          type="submit"
          style={{ textAlign: "center" }}
        >
          Submit
        </button>

        <p className="signin">
          Already have an account?{" "}
          <span
            style={{ color: "royalblue" ,cursor:"pointer"}}
            onClick={() => {
              navigate("/Login");
            }}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
