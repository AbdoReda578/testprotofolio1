import { MailchimpForm } from "./MailchimpForm";
import logo from "../assets/img/logo.svg";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";

export const Footer = () => {
  return (
    <footer className="bg-dark-secondary py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <MailchimpForm />
          <div className="flex flex-col items-center md:items-start">
            <img src={logo} alt="Logo" className="h-16 mb-4" />
          </div>
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <div className="flex items-center gap-4 mb-4">
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
            <p className="text-white/70 mb-2">+201507064713</p>
            <p className="text-white/50 text-sm">Copyright 2024. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
