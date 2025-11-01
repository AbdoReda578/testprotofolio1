import { useState, useEffect } from "react";
import logo from '../assets/img/logo.svg';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';
import { HashLink } from 'react-router-hash-link';
import {
  BrowserRouter as Router
} from "react-router-dom";
import { Button } from '@/components/ui/button';

export const NavBar = () => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
    setMobileMenuOpen(false);
  }

  return (
    <Router>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark-bg py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/">
              <img src={logo} alt="Logo" className="h-20 w-auto" />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#home"
                className={`text-white font-medium text-lg transition-opacity ${activeLink === 'home' ? 'opacity-100' : 'opacity-75 hover:opacity-100'}`}
                onClick={() => onUpdateActiveLink('home')}
              >
                Home
              </a>
              <a
                href="#skills"
                className={`text-white font-medium text-lg transition-opacity ${activeLink === 'skills' ? 'opacity-100' : 'opacity-75 hover:opacity-100'}`}
                onClick={() => onUpdateActiveLink('skills')}
              >
                Skills
              </a>
              <a
                href="#projects"
                className={`text-white font-medium text-lg transition-opacity ${activeLink === 'projects' ? 'opacity-100' : 'opacity-75 hover:opacity-100'}`}
                onClick={() => onUpdateActiveLink('projects')}
              >
                Projects
              </a>
            </div>

            {/* Social Icons & Connect Button */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-4">
                <a href="https://www.linkedin.com/in/abdulrahman-reda-28609b2a2" className="transition-transform hover:scale-110">
                  <img src={navIcon1} alt="LinkedIn" className="w-10 h-10" />
                </a>
                <a href="https://www.facebook.com/abod.reda.1?mibextid=ZbWKwL" className="transition-transform hover:scale-110">
                  <img src={navIcon2} alt="Facebook" className="w-10 h-10" />
                </a>
                <a href="https://www.instagram.com/_xotk/profilecard/?igsh=ZmIxZXNtOGRsNXM3" className="transition-transform hover:scale-110">
                  <img src={navIcon3} alt="Instagram" className="w-10 h-10" />
                </a>
              </div>
              <HashLink to='#connect'>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-dark-bg transition-all">
                  <span>Let's Connect</span>
                </Button>
              </HashLink>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-dark-bg mt-4 p-6 rounded-lg">
              <div className="flex flex-col gap-4">
                <a
                  href="#home"
                  className={`text-white font-medium text-lg transition-opacity ${activeLink === 'home' ? 'opacity-100' : 'opacity-75'}`}
                  onClick={() => onUpdateActiveLink('home')}
                >
                  Home
                </a>
                <a
                  href="#skills"
                  className={`text-white font-medium text-lg transition-opacity ${activeLink === 'skills' ? 'opacity-100' : 'opacity-75'}`}
                  onClick={() => onUpdateActiveLink('skills')}
                >
                  Skills
                </a>
                <a
                  href="#projects"
                  className={`text-white font-medium text-lg transition-opacity ${activeLink === 'projects' ? 'opacity-100' : 'opacity-75'}`}
                  onClick={() => onUpdateActiveLink('projects')}
                >
                  Projects
                </a>
                <div className="flex items-center gap-4 pt-4">
                  <a href="https://www.linkedin.com/in/abdulrahman-reda-28609b2a2">
                    <img src={navIcon1} alt="LinkedIn" className="w-10 h-10" />
                  </a>
                  <a href="https://www.facebook.com/abod.reda.1?mibextid=ZbWKwL">
                    <img src={navIcon2} alt="Facebook" className="w-10 h-10" />
                  </a>
                  <a href="https://www.instagram.com/_xotk/profilecard/?igsh=ZmIxZXNtOGRsNXM3">
                    <img src={navIcon3} alt="Instagram" className="w-10 h-10" />
                  </a>
                </div>
                <HashLink to='#connect'>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-dark-bg transition-all w-full">
                    <span>Let's Connect</span>
                  </Button>
                </HashLink>
              </div>
            </div>
          )}
        </div>
      </nav>
    </Router>
  )
}
