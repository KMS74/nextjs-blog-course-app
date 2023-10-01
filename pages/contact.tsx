import ContactForm from "@/components/contact/ContactForm";
import Head from "next/head";
import React from "react";

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Contact Me</title>
        <meta name="description" content="Send me your messages" />
      </Head>
      <ContactForm />;
    </>
  );
};

export default ContactPage;
