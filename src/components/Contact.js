import { useState } from "react";
import contactImg from "../assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

export const Contact = () => {
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  }
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send');
  const [errors, setErrors] = useState({});
  const { toast } = useToast();

  const validateForm = () => {
    const errors = {};

    // First name
    if (!formDetails.firstName.trim()) {
      errors.firstName = "First name is required";
    } else if (formDetails.firstName.trim().length < 2) {
      errors.firstName = "Name must be at least 2 characters";
    } else if (formDetails.firstName.trim().length > 50) {
      errors.firstName = "Name is too long";
    }

    // Last name
    if (!formDetails.lastName.trim()) {
      errors.lastName = "Last name is required";
    } else if (formDetails.lastName.trim().length < 2) {
      errors.lastName = "Name must be at least 2 characters";
    } else if (formDetails.lastName.trim().length > 50) {
      errors.lastName = "Name is too long";
    }

    // Email
    if (!formDetails.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formDetails.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Phone (optional but validated if provided)
    if (formDetails.phone.trim() && !/^[\d\s\-\+\(\)]+$/.test(formDetails.phone)) {
      errors.phone = "Please enter a valid phone number";
    }

    // Message
    if (!formDetails.message.trim()) {
      errors.message = "Message is required";
    } else if (formDetails.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    } else if (formDetails.message.trim().length > 1000) {
      errors.message = "Message is too long";
    }

    return errors;
  };

  const handleBlur = (field) => {
    const validationErrors = validateForm();
    if (validationErrors[field]) {
      setErrors(prev => ({ ...prev, [field]: validationErrors[field] }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value
    });
    // Clear error when user starts typing
    if (errors[category]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[category];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setButtonText("Sending...");
    setErrors({});

    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
      let response = await fetch(`${apiUrl}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(formDetails),
      });

      setButtonText("Send");
      let result = await response.json();

      if (result.code === 200) {
        setFormDetails(formInitialDetails);
        toast({
          title: "Success!",
          description: "Message sent successfully. We'll get back to you within 24 hours.",
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setButtonText("Send");
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-20 bg-dark-bg" id="connect">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <TrackVisibility>
              {({ isVisible }) =>
                <img
                  className={`w-full max-w-md mx-auto ${isVisible ? "animate__animated animate__zoomIn" : ""}`}
                  src={contactImg}
                  alt="Contact Us"
                />
              }
            </TrackVisibility>
          </div>
          <div className="order-1 md:order-2">
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2 className="text-5xl font-bold mb-8">
                    Get In <span className="bg-gradient-to-r from-primary-purple to-primary-blue bg-clip-text text-transparent">Touch</span>
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* First & Last Name Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <Input
                          type="text"
                          value={formDetails.firstName}
                          placeholder="First Name"
                          onChange={(e) => onFormUpdate('firstName', e.target.value)}
                          onBlur={() => handleBlur('firstName')}
                          className="bg-transparent border-b-2 border-t-0 border-x-0 border-white/30 rounded-none focus:border-primary-purple px-0 py-3 text-white placeholder:text-white/60"
                        />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <Input
                          type="text"
                          value={formDetails.lastName}
                          placeholder="Last Name"
                          onChange={(e) => onFormUpdate('lastName', e.target.value)}
                          onBlur={() => handleBlur('lastName')}
                          className="bg-transparent border-b-2 border-t-0 border-x-0 border-white/30 rounded-none focus:border-primary-purple px-0 py-3 text-white placeholder:text-white/60"
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                      </div>
                    </div>

                    {/* Email & Phone Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <Input
                          type="email"
                          value={formDetails.email}
                          placeholder="Email Address"
                          onChange={(e) => onFormUpdate('email', e.target.value)}
                          onBlur={() => handleBlur('email')}
                          className="bg-transparent border-b-2 border-t-0 border-x-0 border-white/30 rounded-none focus:border-primary-purple px-0 py-3 text-white placeholder:text-white/60"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <Input
                          type="tel"
                          value={formDetails.phone}
                          placeholder="Phone Number"
                          onChange={(e) => onFormUpdate('phone', e.target.value)}
                          onBlur={() => handleBlur('phone')}
                          className="bg-transparent border-b-2 border-t-0 border-x-0 border-white/30 rounded-none focus:border-primary-purple px-0 py-3 text-white placeholder:text-white/60"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <Textarea
                        value={formDetails.message}
                        placeholder="Your message here..."
                        onChange={(e) => onFormUpdate('message', e.target.value)}
                        onBlur={() => handleBlur('message')}
                        className="bg-transparent border-b-2 border-t-0 border-x-0 border-white/30 rounded-none focus:border-primary-purple px-0 py-3 text-white placeholder:text-white/60 min-h-[120px] resize-y"
                        rows={6}
                      />
                      {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-auto bg-gradient-to-r from-primary-purple to-primary-blue text-white px-12 py-6 rounded-full hover:translate-x-2 transition-transform text-lg font-bold"
                    >
                      {buttonText} →
                    </Button>

                    {/* Helper text */}
                    <p className="text-white/50 text-sm text-center mt-6">We'll get back to you within 24 hours</p>
                  </form>
                </div>
              }
            </TrackVisibility>
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  )
}
