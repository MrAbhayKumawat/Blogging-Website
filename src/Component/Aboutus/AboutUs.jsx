// AboutUs.js

import React from "react";
import "./AboutUs.css"
const AboutUs = () => {
    return (
        <>
        <div className="about-us-container">
            <h1 style={{paddingBottom:"50px"}}>About Us</h1>
            <div className="about-con">
                <div>
                    <img src="https://images.pexels.com/photos/5076530/pexels-photo-5076530.jpeg?auto=compress&cs=tinysrgb&w=600" alt="A description of your image"/>
                </div>

                <div style={{ paddingLeft:"50px"}}> 
                    <h1 style={{paddingLeft:'1.8%'}}>Hello’ everyone</h1>
                    <p>
                    It’s great to have you on the blog and fantastic that you’re taking an interest in who we are and what we do!I am telling you about tech blogging.
                    </p>
                    <p>
                    Technology Bloggers is a community blog, which is run and supported by several individuals.


                    </p>
                </div>
            </div>
            {/* Add more content about your team, mission, etc. */}
            </div>
            </>
    );
};

export default AboutUs;
