import { useState, useEffect } from "react";
import "./SingleProduct.scss";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
function SingleProduct() {
  const [postData, setPostData] = useState(null);

  const location = useLocation();
  const apiurl = `https://ak-blogging-data-default-rtdb.firebaseio.com/Ak-Blogging-Data/${location.state.ProductID}.json`;

  useEffect(() => {
    fetch(apiurl)
      .then((response) => response.json())
      .then((data) => {
        setPostData(data); // Update the postData state with fetched data
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [apiurl]);

  return (
    <>
      <div className="navb">
        {" "}
        <Navbar id={location.state.id} />
      </div>{" "}
      <div className="SingleProduct-hero">
        <div className="SingleProduct-Container">
          <div className="SingleProduct">
            <h1 className="Heading">{postData?.Title}</h1>
            <p> PublishDate - {postData?.PublishDate}</p>
            {postData?.postImage && (
              <img src={postData.postImage} alt="Post-Img"></img>
            )}
            <h3 className="Title">{postData?.Title}</h3>
            <p className="Main-Content">{postData?.Content}...</p>
            <hr />
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;
