import BlurShape from "./BlurShape";
import MainButton from "./Button";
import Container from "./Container";
import { ArrowLeftOutlined } from "@ant-design/icons";

function Error() {
  return (
    <Container className="h-screen w-screen flex flex-col justify-center items-center">
      <span
        className="absolute top-0 -left-2/4 transform-gpu blur-3xl sm:translate-x-0 sm:transform-gpu opacity-25"
        aria-hidden="true"
      >
        <BlurShape color="bg-cyan" />
      </span>
      <span className="absolute -top-24 left-1/2 transform-gpu blur-3xl sm:ml-16 opacity-25 md:opacity-30">
        <BlurShape color="bg-green" />
      </span>
      <p className="text-7xl md:text-8xl lg:text-9xl font-semibold  bg-clip-text text-transparent bg-gradient-to-r from-cyan to-green">
        404
      </p>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-800 ">
        Page not found
      </h1>
      <p className="mt-3 text-lg leading-7 text-gray-600">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>

      <MainButton
        href={"/"}
        text="back home"
        type="primary"
        shape="round"
        icon={<ArrowLeftOutlined />}
        iconPosition="start"
        className="mt-6"
      />
    </Container>
  );
}
export default Error;
