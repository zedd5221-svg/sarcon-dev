import { LogoLoop, type LogoItem } from "./LogoLoop";
import { Braces, Code2, CodeXml, Component, Database, GitBranch, PenTool, Wind } from "lucide-react";

const technologies: LogoItem[] = [
	{ node: <TechIcon icon={<CodeXml />} label="HTML" />, title: "HTML" },
	{ node: <TechIcon icon={<Code2 />} label="CSS" />, title: "CSS" },
	{ node: <TechIcon icon={<Braces />} label="JavaScript" />, title: "JavaScript" },
	{ node: <TechIcon icon={<Code2 />} label="TypeScript" />, title: "TypeScript" },
	{ node: <TechIcon icon={<Component />} label="React" />, title: "React" },
	{ node: <TechIcon icon={<Wind />} label="Tailwind" />, title: "Tailwind CSS" },
	{ node: <TechIcon icon={<GitBranch />} label="Git" />, title: "Git" },
	{ node: <TechIcon icon={<Code2 />} label="PHP" />, title: "PHP" },
	{ node: <TechIcon icon={<Database />} label="MySQL" />, title: "MySQL" },
	{ node: <TechIcon icon={<PenTool />} label="Figma" />, title: "Figma" },
];

function TechIcon({ icon}: { icon: React.ReactNode; label: string }) {
	return (
		<div className="flex min-w-24 flex-col items-center gap-2 text-center">
			<i className="not-italic" aria-hidden="true">
				{icon}
			</i>
			
		</div>
	);
}

function Techstack() {
	return (
		<section id="techstack" className="relative grid min-h-screen w-screen grid-rows-2 md:grid-rows-2 grid-cols-1 md:h-screen md:grid-cols-1">
			<div className="w-full">
				
				<LogoLoop
					logos={technologies}
					speed={70}
					logoHeight={24}
					gap={40}
					pauseOnHover
					scaleOnHover
					ariaLabel="Technologies used in my portfolio"
				/>
			</div>
            <div className="flex items-start justify-center p-4 md:p-16">
                <p className="max-w-md text-xs font-light leading-tight text-justify sm:text-lg">
                    These are the technologies I have experience with and have used in my projects. I am constantly learning and exploring new technologies to improve my skills and stay up-to-date with the latest trends in web development.
                </p>
            </div>
		</section>
	);
}

export default Techstack;
