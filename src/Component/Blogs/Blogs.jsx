import React from "react";
import "./Blogs.scss";
import Cards from "../Card/Cards";

function Blogs() {
  return (
    <>
              <h2 style={{textAlign:"center",letterSpacing:'5px',marginTop:"45px"}}>All Latest Blogs</h2>
          <div style={{ marginTop: "5%" }}>
          <Cards />
    </div>
    </>
  );
}

export default Blogs;
