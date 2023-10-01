import React from "react";
import Image from "next/image";
import classes from "./hero-section.module.css";
const HeroSection = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/karim-shabana.jpeg"
          alt="karim-shabana"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi I&apos;m Karim Shabana</h1>
      <p>
        I blog about web development - especially frontend frameworks like React,
        Next.js and Angular
      </p>
    </section>
  );
};

export default HeroSection;
