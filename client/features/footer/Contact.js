/* eslint-disable no-unused-vars */
import React from "react";

const ContactForm = () => {
  return (
    <>
      <div>
        <div id="contact-container">
          <h1>CONNECT WITH US</h1>
          <div class="underline"></div>
          <div class="icon_wrapper"></div>
          <form action="#" method="post" id="contact_form">
            <div class="name">
              <label for="name"></label>
              <input
                className="input"
                type="text"
                placeholder="NAME"
                name="name"
                id="name_input"
                required
              ></input>
            </div>
            <div class="email">
              <label for="email"></label>
              <input
                className="input"
                type="email"
                placeholder="EMAIL"
                name="email"
                id="email_input"
                required
              ></input>
            </div>
            <div class="telephone">
              <label for="name"></label>
              <input
                className="input"
                type="text"
                placeholder="NUMBER"
                name="telephone"
                id="telephone_input"
                required
              ></input>
            </div>
            <div class="subject">
              <label for="subject"></label>
              <select
                placeholder="Subject"
                name="subject"
                id="subject_input"
                required
              >
                <option>Subject</option>
                <option>I'd like to be an admin</option>
                <option>I'd like to ask a question about an order</option>
                <option>I'd like to sell my soul</option>
              </select>
            </div>
            <div class="message">
              <label for="message"></label>
              <textarea
                name="message"
                placeholder="I'd like to chat about"
                id="message_input"
                cols="30"
                rows="5"
                required
              ></textarea>
            </div>
            <div class="submit">
              <input
                className="input"
                type="submit"
                value="Send Message"
                id="form_button"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
