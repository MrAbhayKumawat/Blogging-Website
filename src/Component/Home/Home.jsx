import { useState } from "react"; // Import useState
import "./Home.scss";
import Navbar from "../Navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cards from "../Card/Cards";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const Home = () => {
  const location = useLocation();
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  const id = location.state ? location.state.id : null;

  return (
    <>
      <Navbar id={id} />
      <div className="Home-container">
        <div className="Banner-container">
          <h1>Welcome To Our Tech Blogs</h1>
          <p>On this site, you can read tech and coding-related blogs.</p>
          <button
            className="btn"
            onClick={() => {
              if (id) {
                navigate("/CreateNewPost", { state: { id: id } });
              } else {
                setShowError(true);
              }
            }}
          >
            Create New Post
          </button>
        </div>
      </div>
      <h3 style={{ padding: "1%" }}>OUR LATEST BLOGS</h3>
      <div>
        {showError && (
          <Stack sx={{ width: "100%", alignItems: "center" }} spacing={2}>
            <Alert severity="error">
              You are not Loged in plese Login First{" "}
              <span>
                <a href="/Login"> Login</a>
              </span>
            </Alert>
          </Stack>
        )}
      </div>
      <br />

      <div className="main-card">
        <Cards userId={id} />
      </div>
    </>
  );
};

export default Home;
