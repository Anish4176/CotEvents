import { getAllEvents } from "@/actions/event.action";
import Category from "@/components/shared/Category";
import EventCollection from "@/components/shared/EventCollection";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Home = async({searchParams}:any) => {
  const query= searchParams?.query as string || "";
  const category=searchParams?.category as string || "";
  const allEvents=await getAllEvents({
    limit:6,
    category,
    query,
    page:1
  });
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
      <section id="events" className="w-[100%] py-5 md:py-10">
      <div className="wrapper flex flex-col justify-center items-start gap-5">
        <h1 className="text-[24px] lg:text-[33px] lg:leading-[2.4rem] tracking-wide font-bold text-start">
          Trusted by <br /> Thousands of events
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          <Search />
          <Category/>
        </div>
        <div className="wrapper w-full flex flex-col justify-center items-start gap-5 my-10">
          <EventCollection
           data={allEvents?.data}
           type="All_Events"
           emptyTitle="No Events Found"
           emptySubTitle="Come back later"
          />
        </div>
      </div>
    </section>
    </main>
  );
};

export default Home;
