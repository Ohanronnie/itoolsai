import Image from "next/image";
import AnimateOnScroll from "./AnimateOnScroll";
import Link from "next/link";
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
              Schedule and automate tweets across multiple accounts with
              precision timing and consistency. Generate engaging, on-brand
              tweet content with the help of smart AI tailored to your niche.
            </p>
          </div>
          <AnimateOnScroll animation="fade">
            <div className="mt-8 flex justify-center md:block">
              <Link href="/auth/login">
                <button className="relative inline-flex items-center justify-center px-6 py-5 overflow-hidden text-sm font-semibold text-white bg-base rounded-full shadow-lg group hover:bg-base/90 transition-all duration-300">
                  <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform translate-x-full bg-white opacity-10 group-hover:translate-x-0"></span>
                  <span className="relative z-10">
                    🚀 Start Free 7-Day Trial – No Card Needed!
                  </span>
                </button>
              </Link>
            </div>
          </AnimateOnScroll>
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
