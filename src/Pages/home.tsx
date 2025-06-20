import Intro from "../ResumeSections/Intro";
import Experience from "../ResumeSections/Experience";
import Header from "../ResumeSections/Header";
import SkillsFlow from "../ResumeSections/Skills";
import SkillsFlowMobile from "../ResumeSections/SkillsMobile";

export default function Home() {
  return <>
    <Header />
    <Intro />
    <div className="hidden md:block">
      <SkillsFlow />
    </div>
    <div className="md:hidden">
      <SkillsFlowMobile />
    </div>
    <Experience />
  </>;
}
