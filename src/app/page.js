import Image from "next/image";
import Header from "./components/layout/Header";
import Hero from "./components/layout/Hero";
import HomeAccessories from "./components/layout/HomeAccessories";
import HomeCategories from "./components/layout/HomeCategories";
import HomeTestimonials from "./components/layout/HomeTestimonials";
import HomeAboutUs from "./components/layout/HomeAboutUs";

export default function Home() {
  return (
    <>
      <Header></Header>
      <Hero></Hero>
      <HomeCategories></HomeCategories>
      <HomeAccessories></HomeAccessories>
      <HomeAboutUs></HomeAboutUs>
      <HomeTestimonials></HomeTestimonials>
    </>
  );
}
