import React, { FormEvent, useState } from "react";
import classes from "./contact-form.module.css";
import { Contact } from "@/types/contact";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import ReactDOM from "react-dom";

const ContactForm = () => {
  // states
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // functions
  const sendMessageHandler = async (event: FormEvent) => {
    event.preventDefault();
    const newMessage: Contact = {
      name,
      email,
      message,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(newMessage),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      toast.success("Message sent successfully!");
      console.log(data);
      resetFormData();
    } catch (err) {
      toast.error("Failed to send message!");
      console.log(err);
    }
  };

  const resetFormData = () => {
    setEmail("");
    setName("");
    setMessage("");
  };
  return (
    <section className={classes.contact}>
      <h1>How can i help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              rows={5}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      <ToastContainer position="top-center" theme="light" />,
    </section>
  );
};

export default ContactForm;
