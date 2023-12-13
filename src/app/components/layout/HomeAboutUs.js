import Image from "next/image";
import React from "react";
import SectionHeaders from "./SectionHeaders";

const HomeAboutUs = () => {
  return (
    <section className="text-center mt-10" id="about">
      <SectionHeaders
        subHeader={"Our Story"}
        mainHeader={"About Us"}
      ></SectionHeaders>
      <div className="grid lg:gird-cols-2 md:grid-cols-2 grid-cols-1 gap-4 ">
        <div className="max-w-md mx-auto text-grey-500 mt-4 flex flex-col gap-4">
          <p>
            Welcome to Pure Pump, where fitness meets excellence. At Pure Pump,
            we are passionate about supporting your fitness goals by offering a
            curated collection of high-quality supplements and premium gym
            accessories. Our mission is to empower individuals on their fitness
            journey, providing the tools and resources needed to achieve peak
            performance and optimal well-being.
          </p>
          <p>
            Established by a team of fitness enthusiasts and experts, Pure Pump
            is more than just a brand—it is a commitment to your success. We
            understand that each fitness journey is unique, and our goal is to
            cater to a diverse range of needs.
          </p>
          <p>
            What sets Pure Pump apart is our unwavering dedication to quality
            and customer satisfaction. We source only the finest supplements and
            accessories, ensuring that every product you find on our platform is
            designed to enhance your workouts, boost your performance, and make
            your fitness experience truly exceptional.
          </p>
        </div>
        <div className="relative">
          <Image
            src={"/gym-supplements-about-us-png.png"}
            layout={"fill"}
            objectFit={"contain"}
            alt="banner-image of a supplement"
          ></Image>
        </div>
      </div>
    </section>
  );
};

export default HomeAboutUs;
