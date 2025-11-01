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
      let response = await fetch("http://localhost:5000/contact", {
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
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us"/>
              }
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h2>Get In Touch</h2>
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col size={12} sm={6} className="px-1">
                      <input type="text" value={formDetails.firstName} placeholder="First Name" onChange={(e) => onFormUpdate('firstName', e.target.value)} />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="text" value={formDetails.lasttName} placeholder="Last Name" onChange={(e) => onFormUpdate('lastName', e.target.value)}/>
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="email" value={formDetails.email} placeholder="Email Address" onChange={(e) => onFormUpdate('email', e.target.value)} />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="tel" value={formDetails.phone} placeholder="Phone No." onChange={(e) => onFormUpdate('phone', e.target.value)}/>
                    </Col>
                    <Col size={12} className="px-1">
                      <textarea rows="6" value={formDetails.message} placeholder="Message" onChange={(e) => onFormUpdate('message', e.target.value)}></textarea>
                      <button type="submit"><span>{buttonText}</span></button>
                    </Col>
                    {
                      status.message &&
                      <Col>
                        <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                      </Col>
                    }
                  </Row>
                </form>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
