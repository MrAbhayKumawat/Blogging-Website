import { useState, useEffect } from "react";
import "./Card.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActions, Button } from "@mui/material";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";

function Cards(props) {
  const [postData, setPostData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      "https://ak-blogging-data-default-rtdb.firebaseio.com/Ak-Blogging-Data.json"
    )
      .then((response) => response.json())
      .then((data) => setPostData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="cards">
      {postData ? (
        Object.keys(postData).map((postId) => (
          <div className="Card-container" key={postId}>
            <div className="card">
              <Card sx={{ maxWidth: 350 }}>
                <CardMedia
                  component="img"
                  height="220"
                  image={postData[postId].postImage}
                  alt="Image Alt Text"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {postData[postId].Title}
                    <pre style={{ fontSize: "12px", textAlign: "end" }}>
                      {postData[postId].PublishDate}
                    </pre>
                    <pre style={{ fontSize: "12px", textAlign: "end" }}>
                      {postData[postId].AuthorName}
                    </pre>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {/* Use slice instead of splice for arrays */}
                    {postData[postId].Content.slice(0, 450)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      navigate("/SingleProduct", {
                        state: { ProductID: postId, id: props.userId }
                      });
                    }}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </div>
          </div>
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Cards;
