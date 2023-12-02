import "./Navbar.scss";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Navbar(props) {
  const [showLogout, setShowLogout] = useState(false); // Change variable names for consistency
  const navigate = useNavigate(); // Change variable names for consistency
  const [Na, setna] = useState(props.id || "NA");
  if (Na === "Na") {
    setShowLogout(true);
  }
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand bold" href="/">
              AkTechSin
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbtn">
                <AccountCircleIcon /> {props.id ? props.id.toUpperCase() : "NA"}{" "}
                {/* Fixed conditional rendering */}
              </span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item dt-5">
                  {" "}
                  {/* Changed "class" to "className" */}
                  <a
                    className="nav-link active bold"
                    aria-current="page"
                    href="/Home"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  {" "}
                  {/* Changed "class" to "className" */}
                  <a
                    className="nav-link active bold"
                    aria-current="page"
                    href="/Blogs"
                  >
                    Blogs
                  </a>
                </li>
                <li className="nav-item">
                  {" "}
                  {/* Changed "class" to "className" */}
                  <a
                    className="nav-link active bold"
                    aria-current="page"
                    href="/AboutUs"
                  >
                    About
                  </a>
                </li>
                <li className="nav-item">
                  {" "}
                  {/* Changed "class" to "className" */}
                  <a
                    className="nav-link active bold"
                    aria-current="page"
                    href="/ContactUs"
                  >
                    Contact Us
                  </a>
                </li>
                <li className="nav-item">
                  <p className="nav-link">
                    <span
                      id="Hero-name"
                      onClick={() => {
                        if (Na === "NA") {
                          setShowLogout(false);
                        } else {
                          setShowLogout(!showLogout); // Toggle the showLogout state
                        }
                      }}
                    >
                      <AccountCircleIcon style={{ fontSize: "30px" }} />
                      {props.id ? props.id.toUpperCase() : Na}{" "}
                      {/* Fixed conditional rendering */}
                    </span>
                    {showLogout && (
                      <p
                        id="Logout"
                        onClick={() => {
                          navigate("/Login");
                          Window.reload();
                        }}
                      >
                        <LogoutIcon /> Logout
                      </p>
                    )}{" "}
                    {/* Use a logical && operator for conditional rendering */}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
