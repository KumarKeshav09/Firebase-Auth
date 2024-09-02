import Image from "next/image";
import { MacbookScroll } from "../components/scroll";
import { FloatingDock } from "@/components/features";
import { AppleCardsCarouselDemo } from "@/components/slider";
import { BackgroundBeamsWithCollision, Globe } from "@/components/globe";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import { TextRevealCard, TextRevealCardDescription, TextRevealCardTitle } from "@/components/textreveal";
import { GlobeDemo } from "@/components/globe/globedetails";
import { FeaturesSectionDemo } from "@/components/gridcard";

export default function Home() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Products",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Components",
      icon: (
        <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Aceternity UI",
      icon: (
        <Image
          src=""
          width={20}
          height={20}
          alt="Aceternity Logo"
        />
      ),
      href: "#",
    },
    {
      title: "Changelog",
      icon: (
        <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];
  return (
    <>
      {/* <MacbookScroll /> */}
      <div className="flex items-center justify-center mt-2 w-full">
        <FloatingDock
          items={links}
        />
      </div>
      <GlobeDemo />
      <div>
        <AppleCardsCarouselDemo />
      </div>
      <BackgroundBeamsWithCollision>
        <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
          What&apos;s cooler than Beams?{" "}
          <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
            <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              <span className="">Exploding beams</span>
            </div>
            <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
              <span className="">Exploding beams.</span>
            </div>
          </div>
        </h2>
      </BackgroundBeamsWithCollision>
      <div className="flex items-center justify-center bg-[#0E0E10] h-[20rem] rounded-2xl w-full">
        <TextRevealCard
          text="You know the business"
          revealText="I know the chemistry "
        >
          <TextRevealCardTitle>
            Sometimes, you just need to see it.
          </TextRevealCardTitle>
          <TextRevealCardDescription>
            This is a text reveal card. Hover over the card to reveal the hidden
            text.
          </TextRevealCardDescription>
        </TextRevealCard>
      </div>
      <div>
      <FeaturesSectionDemo />
      </div>

    </>
  );
}
