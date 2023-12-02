import React, { useState } from "react";
import swal from "sweetalert";
import "./contact.scss"
function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    try {
      // Fixing the fetch request
      const response = await fetch(
        "https://ak-blogging-contact-default-rtdb.firebaseio.com/Ak-Blogging-contact.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Error sending data");
      }

      // Handle success
      swal({
        title: "Success",
        text: `Hello ${formData.name}, your message was sent successfully`,
        icon: "success",
        button: "success",
      });

      // Reset form data
      setFormData({
        name: "",
        email: "",
        message: "",
      });

      // EmailJS code
      emailjs
        .sendForm(
          "service_lqcnuh9",
          "template_mutyjal",
          event.target,
          "VPphtxslHwCF0OB4T"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );

      // Twilio code
      const accountSid = 'AC73f1407decc7dfc37d0b8aea6bce8474';
      const authToken = '89f45ebde460ef95fc27cbbee1eea970';
      const client = require('twilio')(accountSid, authToken);

      try {
        const message = await client.messages.create({
          to: '+917489433640', // Receiver's phone number
          from: '+12565675804', // Your Twilio phone number
          body: 'Hello from Twilio!', // SMS message content
        });

        console.log('Message sent:', message.sid);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <>
      <div className="Contact-page">
        <h1 style={{ textAlign: "center", fontSize: "40px" }}>
          Contact <span style={{ color: "rgb(2, 251, 168)" }}>Me</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="contact-container">
            <div>
              <img
                src="https://jigarsable.vercel.app/contact.png"
                alt="Contact"
              />
            </div>
            <div className="contact-form">
              <h3>
                Get in <span style={{ color: "rgb(2, 251, 168)" }}>touch</span>
              </h3>
              <p>
                My inbox is always open. Whether you have a question or just
                want to say hello, I will try my best to get back to you!
              </p>
              <input
                type="text"
                placeholder="Name*"
                value={formData.name}
                name="name"
                onChange={handleChange}
              />
              <br />
              <br />
              <input
                type="email"
                placeholder="Email*"
                value={formData.email}
                name="email"
                onChange={handleChange}
              />
              <br />
              <br />
              <div className="textareas">
                <textarea
                  placeholder="Message..."
                  value={formData.message}
                  name="message"
                  onChange={handleChange}
                />
              </div>
              <br />
              <div>
                <button type="submit">Submit</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Contact;
