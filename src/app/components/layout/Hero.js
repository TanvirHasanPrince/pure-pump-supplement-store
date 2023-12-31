import Image from "next/image";
import RightArrow from "../icons/RightArrow";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="hero mt-4">
      <div className="py-4 md:py-12 lg:py-12">
        <h1 className="text-4xl font-semibold">
          Unleash <br /> Your Peak Performance with&nbsp;
          <span className="text-primary">Premium Fitness Fuel</span>
        </h1>
        <p className="my-6 text-gray-500 text-sm">
          Welcome to Pure Pump, your ultimate destination for top-tier gym
          supplements. Elevate your fitness journey with our premium selection,
          meticulously crafted to fuel your body for peak performance. Whether
          you are a seasoned athlete or a fitness enthusiast, our products are
          designed to enhance your strength, endurance, and recovery. Unleash
          the power within you and achieve your fitness goals with confidence.
          At Pure Pump, we are dedicated to providing you with the highest
          quality supplements to optimize your workouts and maximize your gains.
          Your journey to a stronger, fitter you begins here.
        </p>
        <div className="flex gap-4 text-sm">
          <Link href={'/products'} className="bg-primary flex  items-center gap-2 text-white px-4 py-2 rounded-lg uppercase text-sm font-semibold">
            Order Now!
            <RightArrow />
          </Link>

          <Link href={'/#about'} className="bg-secondary flex  items-center gap-2 text-black px-4 py-2 rounded-lg uppercase text-sm font-semibold">
            Learn More!
            <RightArrow />
          </Link>
        </div>
      </div>

      <div className="relative hidden md:block lg:block">
        <Image
          src={"/banner-gym-supplements-jpeg.png"}
          layout={"fill"}
          objectFit={"contain"}
          alt="banner-image of a supplement"
        ></Image>
      </div>
    </section>
  );
};

export default Hero;
