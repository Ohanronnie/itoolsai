import Image from "next/image";
import Header from "./ui/Header";
import Hero from "./ui/Hero";
import { CalendarSync, Landmark, MoveUpRight, Shield } from "lucide-react";
import Link from "next/link";
import Footer from "./ui/Footer";
import AnimateOnScroll from "./ui/AnimateOnScroll";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Header />
      <section className="mt-8 mx-6 md:mx-12">
        <AnimateOnScroll animation="fade">
          <Hero />
        </AnimateOnScroll>

        {/* What We Offer */}
        <AnimateOnScroll animation="slide-up">
          <div className="md:mt-8 mt-12 bg--white py-4 px-4 md:px-8 rounded-lg shadow--md">
            <div>
              <h1 className="uppercase mt-8 text-base font-semibold text-center">
                What we offer
              </h1>
              <div className="mt-4 md:mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 space--y-6">
                <AnimateOnScroll animation="zoom-in">
                  <div className="bg-white w-full h-full p-6 md:px-2 md:py-14 rounded-lg justify-center shadow--md flex flex-col items-center">
                    <p className="font-semibold">Automated Posting</p>
                    <p className="text-gray-600 text-center text-sm mt-2">
                      Schedule and automate tweets across multiple accounts with
                      precision timing and consistency.
                    </p>
                  </div>
                </AnimateOnScroll>
                <AnimateOnScroll animation="zoom-in">
                  <div className="bg-white w-full h-full p-6 md:px-2 md:py-14 rounded-lg justify-center shadow--md flex flex-col items-center">
                    <p className="font-semibold">AI-Powered Content</p>
                    <p className="text-gray-600 text-center mt-2 text-sm">
                      Generate engaging, on-brand tweet content with the help of
                      smart AI tailored to your niche.
                    </p>
                  </div>
                </AnimateOnScroll>
                <AnimateOnScroll animation="zoom-in">
                  <div className="bg-white w-full h-full p-6 md:px-2 md:py-14 rounded-lg justify-center shadow--md flex flex-col items-center">
                    <p className="font-semibold">One-Click Monetization</p>
                    <p className="text-gray-600 text-center text-sm mt-2">
                      Start monetizing modified or AI-enhanced content
                      instantly—no copyright stress.
                    </p>
                  </div>
                </AnimateOnScroll>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Why Us */}
        <AnimateOnScroll animation="slide-down">
          <div className="mt-8 md:mt-12">
            <p className="text-center text-base uppercase font-bold">Why us</p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <AnimateOnScroll animation="slide-up">
                <div className="bg-white p-6 md:py-14 rounded-lg shadow--md flex flex-col justify-center items-center">
                  <Landmark className="text-base w-10 h-10 mb-2" />
                  <h2 className="text-lg font-semibold">
                    Monetization Freedom
                  </h2>
                  <p className="text-gray-600 text-sm text-center">
                    Unlock new revenue streams with copyright-safe content that
                    performs across platforms.
                  </p>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="slide-up">
                <div className="bg-white p-6 md:py-14 rounded-lg shadow--md flex flex-col justify-center items-center">
                  <CalendarSync className="text-base w-10 h-10 mb-2" />
                  <h2 className="text-lg font-semibold">
                    Automated Scheduling
                  </h2>
                  <p className="text-gray-600 text-sm text-center">
                    Stay consistent with automated tweet scheduling tailored to
                    your audience’s peak hours.
                  </p>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="slide-up">
                <div className="bg-white p-6 md:py-14 rounded-lg shadow--md flex flex-col justify-center items-center">
                  <Shield className="text-base w-10 h-10 mb-2" />
                  <h2 className="text-lg font-semibold">Legal Confidence</h2>
                  <p className="text-gray-600 text-sm text-center">
                    Modified content is optimized to stay within legal
                    boundaries, so you never stress over copyright.
                  </p>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Steps Section */}
      <AnimateOnScroll animation="zoom-in">
        <section className="mt-12 px-8 md:px-12 py-12 bg-[#023347]">
          <p className="uppercase text-base font-semibold">How it works</p>
          <h1 className="text-white font-sans text-2xl">
            Start managing and monetizing your X content in minutes.
          </h1>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimateOnScroll animation="fade">
              <div className="bg-[#0b3a4f] p-6 rounded-lg">
                <h1 className="text-7xl font-bold bg-gradient-to-b from-white via-base/90 to-transparent text-transparent bg-clip-text">
                  1
                </h1>
                <p className="text-white text-lg mt-2">Connect Your Account</p>
                <p className="text-base text-lg mt-2">
                  Link your X (Twitter) account to unlock AI-powered automation
                  tools.
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade">
              <div className="bg-[#0b3a4f] p-6 rounded-lg">
                <h1 className="text-7xl font-bold bg-gradient-to-b from-white via-base/90 to-transparent text-transparent bg-clip-text">
                  2
                </h1>
                <p className="text-white text-lg mt-2">Set Your Schedule</p>
                <p className="text-base text-lg mt-2">
                  Choose what content goes out and when. Let AI handle the
                  posting.
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade">
              <div className="bg-[#0b3a4f] p-6 rounded-lg">
                <h1 className="text-7xl font-bold bg-gradient-to-b from-white via-base/90 to-transparent text-transparent bg-clip-text">
                  3
                </h1>
                <p className="text-white text-lg mt-2">Track & Earn</p>
                <p className="text-base text-lg mt-2">
                  Watch your engagement grow and revenue roll in—all copyright
                  safe.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      </AnimateOnScroll>

      {/* Mission & Plans */}
      <AnimateOnScroll animation="zoom-out">
        <section className="mt-12 px-8 flex-col items-center md:px-12 py-12">
          <p className="text-base uppercase text-center font-semibold">
            our mission
          </p>
          <p className="text-center mt-2 text-lg font-sans font-medium">
            Powering Creators, Amplifying Voices
          </p>
          <p className="mt-2 text-center font-sans text-sm">
            We help digital creators and brands effortlessly manage their X
            accounts and grow their audience with smart, automated tools.
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0">
            <AnimateOnScroll animation="slide-up">
              <div className="p-6 rounded-lg flex flex-col items-center">
                <h1 className="text-5xl font-bold ">92%</h1>
                <p>Time saved scheduling tweets</p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="slide-up">
              <div className="p-6 rounded-lg flex flex-col items-center">
                <h1 className="text-5xl font-bold">100+</h1>
                <p>Happy users managing accounts</p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="slide-up">
              <div className="p-6 rounded-lg flex flex-col items-center">
                <h1 className="text-5xl font-bold">50+</h1>
                <p>Successful content campaigns</p>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Pricing */}
          <div className="mt-8">
            <p className="text-center font-bold text-base">CHOOSE PLAN</p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimateOnScroll animation="zoom-in">
                <div className="bg-white p-6 rounded-lg text-text-base">
                  <h2 className="text-lg font-semibold font-sans">
                    Starter Plan
                  </h2>
                  <p className="text-gray-600 text-sm mt-2">
                    Perfect for individuals who want to automate one account and
                    get started with smart scheduling. Free for the first 7
                    days.
                  </p>
                  <p className="text-xl font-sans font-medium mt-4 flex justify-between items-center">
                    Free
                    <Link href={"/auth/signup"}>
                      <MoveUpRight size={20} className="text-text-base " />
                    </Link>
                  </p>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="zoom-in">
                <div className="p-6 bg-base text-white  rounded-lg shadow--md">
                  <h2 className="text-lg font-semibold font-sans">Pro Plan</h2>
                  <p className="text-text-base text-sm mt-2">
                    Ideal for power users managing multiple X accounts with
                    advanced AI tools.
                  </p>
                  <p className="text-xl font-sans font-medium mt-4 flex justify-between items-center">
                    $20/month
                    <Link href={"/auth/signup"}>
                      <MoveUpRight size={20} className="text-white " />
                    </Link>
                  </p>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Final CTA */}
            <div className="bg-[#023347] px-8 py-12 mt-12 md:mt-12 w-full grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-20 rounded-lg">
              <div>
                <p className="text-base font-bold  text-sm ">TRY IT NOW</p>
                <h1 className="text-2xl my-2 text-white">
                  Ready to automate your Twitter presence?
                </h1>
                <p className="text-sm text-gray-400 font-sans">
                  Built for content creators and digital marketers who want to
                  schedule, optimize, and monetize effortlessly.
                </p>
              </div>

              <div className="flex items-center mt-4 md:mt-0  space-x-4">
                <Link href={"/auth/signup"}>
                  <button className="transition-colors duration-300 px-4 py-2 text-white  text-sm rounded-lg border border-slate-500 hover:bg-base hover:text-white">
                    Get Started Now
                  </button>
                </Link>
                <button className="px-4 py-2 text-sm rounded-lg bg-[#2a8e9e] text-white hover:bg-transparent hover:text-white transition-colors duration-300 hover:border hover:border-slate-500 border border-[#2a8e9e]">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      <Footer />
    </div>
  );
}
