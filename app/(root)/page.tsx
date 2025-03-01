import Events from "@/components/shared/Events";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Home = () => {
  return (
    <main className="flex flex-col space-y-7 md:space-y-10  justify-center items-center w-full">
      <section className="bg-gray-50 w-[100%] py-10 md:py-20">
        <div className="wrapper flex flex-col md:flex-row justify-between items-center space-y-7 ">
          <div className="md:w-[45%] space-y-4 md:space-y-8 max-md:text-center">
            <h1 className="text-[32px] lg:text-[45px] lg:leading-[3.4rem] tracking-wide font-bold">
              Discover Our Campus Events, All in One Place!
            </h1>
            <p className="text-base md:text-xl font-medium ">
            Browse, create, and get tickets for every event happening in campus—everything you need is here.
            </p>
            <Button size="lg" className="rounded-full ">Explore Events</Button>
          </div>
          <div className="md:w-[45%]">
            <Image
              src="/HeroBanner.png"
              alt="Banner"
              width={600}
              height={600}
            />
          </div>
        </div>
      </section>
      <Events />
    </main>
  );
};

export default Home;
