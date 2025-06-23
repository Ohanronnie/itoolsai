import Image from "next/image";
import AnimateOnScroll from "./AnimateOnScroll";
export default function Hero() {
  return (
    <div className="flex flex-col-reverse max-w-7xl items-center gap-10 sm:flex-row text-text-base">
      <div className="flex-1">
        <AnimateOnScroll animation="slide-up">
          <p className="text-4xl sm:text-5xl md:text-4xl leading-tight text-center font-medium md:text-left flex flex-col gap-1">
            <span className="font-semibold">Automate Your Tweets</span>
            <span>Grow Your Audience</span>
            <span>Monetize Effortlessly</span>
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll animation="fade">
          <div className="text-lg mt-6">
            <p className="text-lg text-center md:text-left text-text-base font-sans">
              Manage your Twitter account like a pro. Schedule tweets, generate
              AI-powered content, and monetize your account—all in one place.
            </p>
          </div>
        </AnimateOnScroll>
      </div>
      <div className="flex-1">
        <AnimateOnScroll animation="zoom-in">
          <Image
            src="/images/hero.png"
            alt="Hero Image"
            width={500}
            height={500}
            className="w-full h-auto object-cover rounded-lg"
          />
        </AnimateOnScroll>
      </div>
    </div>
  );
}
