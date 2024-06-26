import MainButton from "../../components/Button";
import Text from "../../components/Text";
import BlurShape from "../../components/BlurShape";
import { ArrowRightOutlined } from "@ant-design/icons";

function Header() {
  const hero = (
    <>
      <div className="mx-auto max-w-2xl lg:mx-0 w-full text-center ">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-title font-black italic tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan to-green mb-6">
          Your Team Awaits !
        </h2>
        <Text
          type="subtitle"
          text="Find your ideal sports partner and play together anytime, anywhere.
          Connect with athletes who match your skill level and interests."
          color="text-gray-600"
        />
      </div>
      <MainButton
        href="/account/sign-up"
        text="get started"
        icon={<ArrowRightOutlined />}
      />
    </>
  );
  const statsList = [
    { name: "Sports Categories", value: "+50" },
    { name: "Active Users", value: "+300" },
    { name: "Partner Matches", value: "+100" },
    { name: "Service Cost", value: "Free" },
  ];
  const stats = (
    <dl className="mt-16 grid  gap-8 grid-cols-2 lg:grid-cols-4 text-center">
      {statsList.map((stat) => (
        <div key={stat.name} className="flex flex-col-reverse lg:gap-2">
          <dt className="text-base lg:text-lg leading-7 text-gray-600">
            {stat.name}
          </dt>
          <dd className="text-2xl lg:text-3xl font-bold leading-9 tracking-tight text-gray-800">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );

  return (
    <div className="relative isolate pt-24 lg:pt-36 pb-12 md:pb-16 lg:pb-20 flex overflow-hidden ">
      <img
        src="/images/header-bg.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover md:object-center grayscale opacity-70"
      />
      <span
        className="absolute w-full h-full top-0 left-0 "
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #ffffff , #ffffffca, #ffffffea 90%, #ffffff )",
        }}
      ></span>
      <span
        className="absolute -top-10 -left-1/4 transform-gpu blur-3xl sm:translate-x-0 sm:transform-gpu opacity-20"
        aria-hidden="true"
      >
        <BlurShape color="bg-green" />
      </span>
      <span
        className="absolute -top-52 left-1/2 transform-gpu blur-3xl sm:ml-16 opacity-30"
        aria-hidden="true"
      >
        <BlurShape color="bg-cyan" />
      </span>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center gap-8 z-10">
        {hero}
        {stats}
      </div>
    </div>
  );
}

export default Header;
