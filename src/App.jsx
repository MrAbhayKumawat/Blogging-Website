import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Component/Home/Home";
import SignUp from "./Component/Auths/SignUp";
import Banner from "./Component/Banner/Banner";
import Login from "./Component/Auths/Login";
import CreateNewPost from "./Component/CreatePost/CreateNewPost";
import SingleProduct from "./Component/SIngleProduct/SingleProduct";
import Blogs from "./Component/Blogs/Blogs";
import AboutUs from "./Component/Aboutus/AboutUs";
import Contact from "./Component/Contact/Contact";
import NotFound from "./Component/NotFound/NotFound";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Banner />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/CreateNewPost" element={<CreateNewPost />} />
          <Route path="/SingleProduct" element={<SingleProduct />} />
          <Route path="/Blogs" element={<Blogs />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/ContactUs" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
