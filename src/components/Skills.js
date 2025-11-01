import JS from "../assets/img/logos/JS.jpeg";
import AS from "../assets/img/logos/AS.png";
import cpp from "../assets/img/logos/c++.png";
import cs from "../assets/img/logos/file.png";
import cs3 from "../assets/img/logos/CSS3.png";
import Html from "../assets/img/logos/HTML5.png";
import figma from "../assets/img/logos/FIG.png";
import ill from "../assets/img/logos/AI.png";
import photo from "../assets/img/logos/PH.png";
import react from "../assets/img/logos/s.png";
import colorSharp from "../assets/img/color-sharp.png";
import { Card, CardContent } from '@/components/ui/card';
import TrackVisibility from 'react-on-screen';

export const Skills = () => {
  const skills = [
    { name: "CSS3", logo: cs3 },
    { name: "HTML5", logo: Html },
    { name: "JavaScript", logo: JS },
    { name: "Figma", logo: figma },
    { name: "React", logo: react },
    { name: "Android Application", logo: AS },
    { name: "C++", logo: cpp },
    { name: "C#", logo: cs },
    { name: "Illustrator", logo: ill },
    { name: "PhotoShop", logo: photo }
  ];

  return (
    <section className="relative py-20 bg-dark-bg overflow-hidden" id="skills">
      <div className="container mx-auto px-4">
        <div className="bg-dark-secondary rounded-3xl p-12 relative z-10">
          <h2 className="text-5xl font-bold text-white text-center mb-4">Skills</h2>
          <p className="text-white/60 text-center mb-12">This is some of my skills.</p>

          <TrackVisibility>
            {({ isVisible }) => (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {skills.map((skill, index) => (
                  <Card
                    key={index}
                    className={`bg-dark-bg border-white/10 hover:border-primary-purple/50 transition-all hover:scale-105 group ${isVisible ? 'animate__animated animate__fadeIn' : ''}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <img src={skill.logo} alt={skill.name} className="w-20 h-20 object-contain mb-4" />
                      <h5 className="text-white text-center font-medium">{skill.name}</h5>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TrackVisibility>
        </div>
      </div>
      <img className="absolute bottom-0 left-0 w-1/2 opacity-30 -z-10" src={colorSharp} alt="" />
    </section>
  )
}
