import meter1 from "../assets/img/meter1.svg";
import meter2 from "../assets/img/meter2.svg";
import meter3 from "../assets/img/meter3.svg";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import arrow1 from "../assets/img/arrow1.svg";
import arrow2 from "../assets/img/arrow2.svg";

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



import colorSharp from "../assets/img/color-sharp.png"

export const Skills = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="skill" id="skills">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="skill-bx wow zoomIn">
                        <h2>Skills</h2>
                        <p>This is some of my skills.</p>
                        <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                            <div className="item">
                                <img src={cs3} alt="Image" className="item-img" />
                                <h5>CSS3</h5>
                            </div>
                            <div className="item">
                                <img src={Html} alt="Image" className="item-img" />
                                <h5>HTML5</h5>
                            </div>
                            <div className="item">
                                <img src={JS} alt="Image" className="item-img" />
                                <h5>JavaScript</h5>
                            </div>
                            <div className="item">
                                <img src={figma} alt="Image" className="item-img" />
                                <h5>Figma</h5>
                            </div>
                            <div className="item">
                                <img src={react} alt="Image" className="item-img" />
                                <h5>Web Development - React</h5>
                            </div>
                            <div className="item">
                                <img src={AS} alt="Image" className="item-img" />
                                <h5>Android Application</h5>
                            </div>
                            <div className="item">
                                <img src={cpp} alt="Image" className="item-img" />
                                <h5>C++</h5>
                            </div>
                            <div className="item">
                                <img src={cs} alt="Image" className="item-img" />
                                <h5>C#</h5>
                            </div>
                            <div className="item">
                                <img src={ill} alt="Image" className="item-img" />
                                <h5>Illustrator</h5>
                            </div>
                            <div className="item">
                                <img src={photo} alt="Image" className="item-img" />
                                <h5>PhotoShop</h5>
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
        <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )
}
