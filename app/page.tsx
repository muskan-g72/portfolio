import { About } from "@/components/about/About";
import { Contact } from "@/components/contact/Contact";
import { Experience } from "@/components/experience/Experience";
import { Handoff } from "@/components/handoff/Handoff";
import { Hero } from "@/components/hero/Hero";
import { HashOnLoad } from "@/components/layout/HashOnLoad";
import { Playground } from "@/components/playground/Playground";
import { TopologyBackdrop } from "@/components/topology/TopologyBackdrop";
import { Works } from "@/components/works/Works";

export default function Home() {
  return (
    <main className="relative">
      <HashOnLoad />
      <TopologyBackdrop />
      <Hero />
      <About />
      <Experience />
      <Handoff />
      <Works />
      <Playground />
      <Contact />
    </main>
  );
}
