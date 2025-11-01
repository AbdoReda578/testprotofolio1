import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/project-img3.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import img1 from "../assets/img/IMG1.png";
import img2 from "../assets/img/img2.png";
import img3 from "../assets/img/img3.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const Projects = () => {

  const projects = [
    {
      title: "Eva School Web",
      description: "Design & Development",
      imgUrl: img1,
    },
    {
      title: "Sally App UI/UX",
      description: "Design & Prototype",
      imgUrl: img2,
    },
    {
      title: "3",
      description: "Design & Development",
      imgUrl: projImg3,
    },
    {
      title: "4",
      description: "Design & Development",
      imgUrl: projImg2,
    },
    {
      title: "Room Schdule",
      description: "Design & Development & prototype",
      imgUrl: img3,
    },
    {
      title: "6",
      description: "Design & Development",
      imgUrl: projImg1,
    },
  ];

  return (
    <section className="relative py-20 bg-dark-bg" id="projects">
      <div className="container mx-auto px-4">
        <TrackVisibility>
          {({ isVisible }) =>
            <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
              <h2 className="text-5xl font-bold text-white text-center mb-4">Projects</h2>
              <p className="text-white/60 text-center mb-12">Some of My Projects.</p>

              <Tabs defaultValue="tab1" className="w-full">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12 bg-dark-secondary">
                  <TabsTrigger
                    value="tab1"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-purple data-[state=active]:to-primary-blue data-[state=active]:text-white"
                  >
                    Tab 1
                  </TabsTrigger>
                  <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                  <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                </TabsList>

                <TabsContent
                  value="tab1"
                  className={isVisible ? "animate__animated animate__slideInUp" : ""}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                      <ProjectCard key={index} {...project} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="tab2">
                  <p className="text-white/60 text-center">Coming soon...</p>
                </TabsContent>

                <TabsContent value="tab3">
                  <p className="text-white/60 text-center">Coming soon...</p>
                </TabsContent>
              </Tabs>
            </div>
          }
        </TrackVisibility>
      </div>
      <img className="absolute top-0 right-0 w-1/2 opacity-20 -z-10" src={colorSharp2} alt="" />
    </section>
  )
}
