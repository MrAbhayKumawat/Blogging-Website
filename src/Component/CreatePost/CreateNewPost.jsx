import React, { useState } from "react";
import "./CreateNewPost.scss";
import Navbar from "../Navbar/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function CreateNewPost() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showError, setshowerror] = useState(false);
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const [imageerror, setimageerror] = useState(true);
  const formattedDate = `${day.toString().padStart(2, "0")}-${month
    .toString()
    .padStart(2, "0")}-${year}`;
  const [postData, setPostData] = useState({
    postImage: "",
    Title: "",
    Content: "",
    PublishDate: formattedDate,
    AuthorName: location.state.id,
  });
  const [inputErrors, setInputErrors] = useState({
    Title: "",
    Content: "",
    postImage: "",
    
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPostData({
          ...postData,
          postImage: e.target.result,
        });
      };
      reader.readAsDataURL(file);
      setInputErrors({ ...inputErrors, postImage: "" });
    }
  };
  function updateImageDisplay() {
    if (postData.postImage) {
      document.getElementById("uploadedFile").style.display = "none";
    }
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPostData({
      ...postData,
      [name]: value,
    });
    setInputErrors({ ...inputErrors, [name]: "" });
  };

  const handlePublish = () => {
    let hasErrors = false;
    const newErrors = {};

    if (postData.Title.trim() === "") {
      newErrors.Title = "Title is required.";
      hasErrors = true;
    }

    if (postData.Content.trim() === "") {
      newErrors.Content = "Content is required.";
      hasErrors = true;
    }

    if (!postData.postImage) {
      newErrors.postImage = "Image is required.";
      hasErrors = true;
    }

    if (hasErrors) {
      setInputErrors(newErrors);
    } else {
      // If there are no errors, you can proceed with form submission or other actions
      if (location.state.id) {
        fetch(
          "https://ak-blogging-data-default-rtdb.firebaseio.com/Ak-Blogging-Data.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            } else {
              console.log("Data sent successfully");
              setPostData({
                postImage: "",
                Title: "",
                Content: "",
                PublishDate: formattedDate,
              });
              navigate(-1, { state: { AuthorName: postData.AuthorName } });
            }
          })
          .then((data) => console.log(data))
          .catch((error) => console.error("Error:", error));
      } else {
        setshowerror(true);
      }
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPostData({
          ...postData,
          postImage: e.target.result,
        });
      };
      reader.readAsDataURL(file);
      setInputErrors({ ...inputErrors, postImage: "" });
    }
  };

  const preventDefault = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Navbar id={location.state.id} />
      <div className="main-con">
        <div className="Post-container">
          <h4>Create Your Post</h4>

          <div
            className="New-Post"
            onDrop={handleDrop}
            onDragOver={preventDefault}
          >
            <div className="img-con">
              <div className="image">
                <Button
                  component="label"
                  variant="contained"
                  id="uploadedFile"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                </Button>

                {postData.postImage && (
                  <div>
                    {updateImageDisplay()}
                    <img
                      src={postData.postImage}
                      className="uploaded-image"
                      alt="Uploaded"
                      style={{ alignItems: "center" }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="input-field">
              <span className="error" style={{ color: "red" }}>
                {inputErrors.Title}
              </span>
            </div>
            <div>
              {showError && (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert severity="error">
                    You Don't have Login Please Login First!
                    <a href="/Login"> Login</a>
                  </Alert>
                </Stack>
              )}
            </div>

            <div
              style={{ textAlign: "end", alignItems: "center" }}
              onClick={() => {

                if (!postData.postImage) {
                  
                  <div>
              {imageerror && (
                <Stack sx={{ width: "100%" }} spacing={2}>
                        <Alert severity="error">
                          Post Image is not Uploaded!
                  
                  </Alert>
                </Stack>
              )}
            </div>
                  
                } else {
                setPostData({
                  ...postData,
                  postImage: "", // Update the postImage property
                });
                document.getElementById("uploadedFile").style.display = "block";
                }
              }
                
                  
                }
            >
              <button id="bottone1">
                <HighlightOffIcon />
                <strong>Remove Image</strong>
              </button>
            </div>
            <div className="input-field">
              <input
                name="Title"
                value={postData.Title}
                onChange={handleInputChange}
                className="input"
                placeholder="Title"
                rows="4"
              />
              <br />
              <br />
              <textarea
                name="Content"
                value={postData.Content}
                onChange={handleInputChange}
                className="input"
                placeholder="Content"
                rows="4"
              />
              <span className="error" style={{ color: "red" }}>
                {inputErrors.Content}
              </span>
            </div>
            <button className="publish-post" onClick={handlePublish}>
              Publish
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateNewPost;
