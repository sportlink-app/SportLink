import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import Text from "../../components/Text";
import Container from "../../components/Container";
import BlurShape from "../../components/styled/BlurShape";
import {
  UserOutlined,
  NodeIndexOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

function Features() {
  const featuresList = [
    {
      title: "smart matchmaking",
      description:
        "Our advanced algorithm connects you with sports partners who share your interests, skill level, ensuring a perfect match for every game.",
      icon: (
        <NodeIndexOutlined style={{ fontSize: "20px", color: "#ffffff" }} />
      ),
    },
    {
      title: "real-time availability",
      description:
        "Check the availability of potential partners in real-time, and schedule your sports activities instantly.",
      icon: (
        <ThunderboltOutlined style={{ fontSize: "20px", color: "#ffffff" }} />
      ),
    },
    {
      title: "comprehensive profiles",
      description:
        "View detailed profiles of potential partners, including their sports interests, experience level, and past reviews from other users",
      icon: <UserOutlined style={{ fontSize: "20px", color: "#ffffff" }} />,
    },
    {
      title: "enhanced security",
      description:
        "Our platform prioritizes your safety with verified profiles, secure communication channels, and user reporting features.",
      icon: <SafetyOutlined style={{ fontSize: "20px", color: "#ffffff" }} />,
    },
  ];
  const features = (
    <dl className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 lg:gap-y-16 lg:gap-x-28">
      {featuresList.map((feature) => (
        <div key={feature.title} className="relative pl-16 text-left">
          <dt className="text-base font-semibold leading-7 text-gray-900 capitalize">
            <div className="absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-green to-cyan ">
              {feature.icon}
            </div>
            {feature.title}
          </dt>
          <dd className="mt-2 text-base leading-7 text-gray-600">
            {feature.description}
          </dd>
        </div>
      ))}
    </dl>
  );
  return (
    <Container>
      <div
        className="absolute top-0 -left-1/2 -translate-x-1/2 transform-gpu blur-3xl sm:ml-16 sm:translate-x-0 sm:transform-gpu opacity-15"
        aria-hidden="true"
      >
        <BlurShape color="bg-cyan" />
      </div>
      <div
        className="absolute -top-52 left-1/2 transform-gpu blur-3xl sm:ml-16 opacity-20"
        aria-hidden="true"
      >
        <BlurShape color="bg-gradient-to-r from-yellow to-green" />
      </div>
      <div id="features" className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl ">
          <Text type="title" text="explore our features" />
          <Text
            type="subtitle"
            text="Uncover the capabilities that make our platform unique and effective in connecting athletes seamlessly."
          />
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          {features}
        </div>
      </div>
    </Container>
  );
}

export default Features;