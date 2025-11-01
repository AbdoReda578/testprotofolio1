import { useState, useEffect } from "react";
import headerImg from "../assets/img/header-img.svg";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { Button } from '@/components/ui/button';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "Web Developer", "Graphic Designer", "UI/UX Designer" ];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  return (
    <section className="min-h-screen flex items-center bg-dark-bg py-20" id="home">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="inline-block px-4 py-2 border border-white/30 rounded-full text-white/80 text-sm mb-6">
                  Welcome to my Portfolio
                </span>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                  {`Hi! I'm Abdulrhman `}
                  <span className="bg-gradient-to-r from-primary-purple to-primary-blue bg-clip-text text-transparent">
                    <span className="wrap">{text}</span>
                  </span>
                </h1>
                <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-2xl">
                  Abdulrahman is a passionate web developer focused on creating outstanding websites with a strong emphasis on User Experience (UX) and User Interface (UI) design. He has experience with technologies such as HTML, CSS, JavaScript, and React, and is currently working on developing his personal portfolio website. In addition to web development, Abdulrahman is also interested in desktop development, Android development, and cybersecurity.
                </p>
                <Button
                  className="bg-gradient-to-r from-primary-purple to-primary-blue text-white text-lg px-8 py-6 rounded-full hover:scale-105 transition-transform"
                  onClick={() => window.location.hash = '#connect'}
                >
                  Let's Connect <ArrowRightCircle className="ml-2" size={25} />
                </Button>
              </div>}
            </TrackVisibility>
          </div>
          <div className="order-1 md:order-2">
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header" className="w-full max-w-md mx-auto"/>
                </div>}
            </TrackVisibility>
          </div>
        </div>
      </div>
    </section>
  )
}
