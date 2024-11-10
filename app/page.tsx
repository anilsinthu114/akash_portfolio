"use client";

import { Analytics } from "@vercel/analytics/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Handle scroll events for smooth navigation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 20);

      // Determine active section based on scroll position
      const sections = [
        "home",
        "about",
        "experience",
        "education",
        "projects",
        "contact",
      ];
      let currentSection = sections[0];
      let minDistance = Infinity;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = section;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section with animation
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);

    if (element) {
      // Add offset for mobile screens to account for fixed header
      const offset = window.innerWidth < 768 ? -75 : -30; // Reduced offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY + offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header/Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolling
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4 md:p-6">
          <motion.h1
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl md:text-3xl font-bold cursor-pointer"
            onClick={() => scrollToSection("home")}
          >
            <span className="text-blue-600">Akash</span>{" "}
            <span className="text-purple-600">Sintu</span>
          </motion.h1>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 lg:space-x-8">
            {[
              "home",
              "about",
              "experience",
              "education",
              "projects",
              "contact",
            ].map((section) => (
              <motion.button
                key={section}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => scrollToSection(section)}
                className={`${
                  activeSection === section
                    ? "text-purple-600 font-semibold scale-105 bg-purple-50 px-3 lg:px-4 py-2 rounded-full"
                    : "text-gray-600 hover:text-blue-500 px-3 lg:px-4 py-2"
                } transition-all duration-200 capitalize text-base lg:text-lg tracking-wide relative group`}
              >
                {section}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                    activeSection === section ? "scale-x-100" : ""
                  }`}
                />
              </motion.button>
            ))}
          </div>
        </div>
        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-[72px] left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-200 max-h-[calc(100vh-72px)] overflow-y-auto"
          >
            <div className="p-4 space-y-2">
              {[
                "home",
                "about",
                "experience",
                "education",
                "projects",
                "contact",
              ].map((section) => (
                <motion.button
                  key={section}
                  whileHover={{ scale: 1.02, x: 8 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection(section)}
                  className={`${
                    activeSection === section
                      ? "text-purple-600 font-semibold bg-purple-50"
                      : "text-gray-600 hover:bg-gray-50"
                  } block w-full text-left py-3 px-4 rounded-lg capitalize transition-all duration-200 text-lg`}
                >
                  {section}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 10 }}
        transition={{ duration: 0.8 }}
        id="home"
        className="min-h-screen flex items-center pt-16 px-4 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100" // Reduced padding top
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative inline-block mb-8"
          >
            <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto">
              <Image
                src="/akash.jpg"
                alt="Profile"
                fill
                priority
                className="rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 object-cover"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-2 right-0 bg-green-500 w-5 h-5 md:w-6 md:h-6 rounded-full border-4 border-white shadow-lg"
              />
            </div>
              <Analytics />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text animate-gradient"
          >
            Welcome to My Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            PLM Windchill | Selenium Automation Tester | Quality Assurance
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full hover:shadow-lg transform transition-all duration-300 text-lg font-medium"
              onClick={() => {
                const modal = document.createElement("div");
                modal.className =
                  "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center space-evenly z-50";
                modal.innerHTML = `
                                    <div class="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full mx-auto">
                                        <div class="flex justify-center gap-8">
                                            <a href="https://github.com/akashsintu112" target="_blank" rel="noopener noreferrer"
                                               class="text-gray-900 hover:scale-110 transition-transform">
                                                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                                </svg>
                                            </a>
                                            <a href="https://www.linkedin.com/in/akash-sintu-sure2527/" target="_blank" rel="noopener noreferrer"
                                               class="text-[#0A66C2] hover:scale-110 transition-transform">
                                                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                                </svg>
                                            </a>
                                            <a href="mailto:akashsintu112@gmail.com"
                                               class="text-red-500 hover:scale-110 transition-transform">
                                                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                `;

                modal.addEventListener("click", (e) => {
                  if (e.target === modal) {
                    document.body.removeChild(modal);
                  }
                });

                document.body.appendChild(modal);
              }}
            >
              Get in Touch
              <motion.svg
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </motion.svg>
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("projects");
              }}
              className="inline-flex items-center gap-2 bg-white text-purple-600 border-2 border-purple-600 px-8 py-3 rounded-full hover:bg-purple-50 transition-all duration-300 text-lg font-medium"
            >
              View Projects
              <motion.svg
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                />
              </motion.svg>
            </motion.a>
          </motion.div>
        </div>
      </motion.section>
      <Analytics />
      {/* About Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        id="about"
        className="py-16 md:py-20 px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50"
      >
        {" "}
        {/* Reduced padding */}
        <motion.div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 md:mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            About Me
          </h2>
          <motion.div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <ul className="text-lg md:text-xl text-gray-700 leading-relaxed space-y-6">
              <li className="flex items-start gap-4">
                <span className="text-purple-600 mt-1">•</span>I am a dedicated
                Quality Assurance professional with expertise in PLM Windchill
                and Selenium Testing.
              </li>
              <li className="flex items-start gap-4">
                <span className="text-purple-600 mt-1">•</span>
                With several years of experience in the field, I specialize in
                ensuring software quality through comprehensive testing
                methodologies.
              </li>
              <li className="flex items-start gap-4">
                <span className="text-purple-600 mt-1">•</span>
                My strong analytical skills and attention to detail allow me to
                effectively identify and document software defects, while my
                knowledge of PLM Windchill enables me to streamline product
                lifecycle management processes.
              </li>
              <li className="flex items-start gap-4">
                <span className="text-purple-600 mt-1">•</span>I am passionate
                about maintaining high quality standards and continuously
                improving testing procedures to deliver exceptional results.
              </li>
              <li className="flex items-start gap-4">
                <span className="text-purple-600 mt-1">•</span>
                My collaborative nature and excellent communication skills make
                me an effective team player who can work seamlessly with
                developers, stakeholders, and cross-functional teams.
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Experience Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        id="experience"
        className="py-16 md:py-20 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" // Reduced padding
      >
        <motion.div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 md:mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Experience
          </h2>
          <div className="space-y-8">
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src="/images/tcs.png"
                  alt="TCS Logo"
                  width={48}
                  height={48}
                  className="rounded-lg"
                />
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                    Senior System Engineer
                  </h3>
                  <p className="text-purple-600 text-lg">
                    Tata Consultancy Services • Sept 2024 - Present
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Bangalore, India</span>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-3 text-lg">
                <li>
                  Currently working on PLM Windchill and Selenium Automation
                  Testing
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src="/images/infosys.jpg"
                  alt="Infosys Logo"
                  width={48}
                  height={48}
                  className="rounded-lg"
                />
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                    Senior System Engineer
                  </h3>
                  <p className="text-purple-600 text-lg">
                    Infosys • Mar 2022 - Aug 2024
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Vishakhapatnam, India (Hybrid)</span>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-3 text-lg">
                <li>
                  Executed manual and automated testing for web applications
                </li>
                <li>
                  Created and maintained test documentation and test cases
                </li>
                <li>
                  Collaborated with development team for bug fixes and
                  improvements
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src="/images/infosys.jpg"
                  alt="Infosys Logo"
                  width={48}
                  height={48}
                  className="rounded-lg"
                />
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                    System Engineer
                  </h3>
                  <p className="text-purple-600 text-lg">
                    Infosys • Jan 2022 - Mar 2022
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Hyderabad, India (Remote)</span>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-3 text-lg">
                <li>
                  Executed manual and automated testing for web applications
                </li>
                <li>
                  Created and maintained test documentation and test cases
                </li>
                <li>
                  Collaborated with development team for bug fixes and
                  improvements
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Education Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        id="education"
        className="py-16 md:py-20 px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50" // Reduced padding
      >
        <motion.div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 md:mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Education
          </h2>
          <div className="space-y-8">
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Bachelor of Technology in Mechanical Engineering
              </h3>
              <p className="text-purple-600 text-lg mb-4">
                Sri Venkateswara College of Engineering, Etcherla, Andhra
                Pradesh • 2018 - 2021
              </p>
              <p className="text-gray-700 text-lg flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                CGPA: 7.2
              </p>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Diploma in Mechanical Engineering
              </h3>
              <p className="text-purple-600 text-lg mb-4">
                Govt. Polytechnic College, Amadalavalasa, Andhra Pradesh • 2015
                - 2018
              </p>
              <p className="text-gray-700 text-lg flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Percentage: 83.9%
              </p>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Secondary School
              </h3>
              <p className="text-purple-600 text-lg mb-4">
                Kranthi Vidyanikethan, Singupuram, Srikakulam, Andhra Pradesh •
                2014 - 2015
              </p>
              <p className="text-gray-700 text-lg flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                CGPA: 9.2
              </p>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Certifications
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-700 text-lg">
                  <span className="text-purple-600">•</span>
                  Selenium WebDriver with Java
                </li>
                <li className="flex items-center gap-3 text-gray-700 text-lg"></li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        id="projects"
        className="py-16 md:py-20 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      >
        <motion.div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Project Card 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <Image
                  src="/images/qkartqa.png"
                  alt="QKart QA"
                  layout="fill"
                  objectFit="contain"
                  className="transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-purple-600 mb-3">
                  QKart QA
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  The application under test is QKart, an e-commerce platform.
                  During the course of this project, Debugged failing test cases
                  and issues with log statements Automated testing with selenium
                  Utilised implicit and explicit waits correctly to avoid
                  synchronisation issues Improved the tests with XPath Migrated
                  tests to the TestNG test automation framework Performed
                  Data-driven test automation with Apache POI
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                    Selenium
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                    Java
                  </span>
                  <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                    Unit Testing
                  </span>
                  <span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full">
                    Locators
                  </span>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full">
                    HTML
                  </span>
                  <span className="bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full">
                    Developer Tools
                  </span>
                  <span className="bg-pink-100 text-pink-800 text-xs px-3 py-1 rounded-full">
                    Window Handling
                  </span>
                  <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                    Screenshots
                  </span>
                  <span className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full">
                    Developer Tools Selenium Waits
                  </span>
                  <span className="bg-teal-100 text-teal-800 text-xs px-3 py-1 rounded-full">
                    XPath
                  </span>
                  <span className="bg-lime-100 text-lime-800 text-xs px-3 py-1 rounded-full">
                    TestNG
                  </span>
                  <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                    Apache POI
                  </span>
                </div>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <Image
                  src="/images/wiki_automation.png"
                  alt="Wikipedia Automation"
                  layout="fill"
                  objectFit="contain"
                  className="transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-purple-600 mb-3">
                  Wikipedia Automation
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  This project involves automating the search feature of
                  Wikipedia to validate certain factual data, such as the name
                  of the founder of certain organizations.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                    Selenium
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                    Window Handling
                  </span>
                  <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                    Xpath
                  </span>
                </div>
              </div>
            </div>

            {/* Project Card 3 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <Image
                  src="/images/amazon_automation.png"
                  alt="Amazon Store Automation"
                  layout="fill"
                  objectFit="contain"
                  className="transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-purple-600 mb-3">
                  Amazon Store Automation
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  This project involves automating the search feature of Amazon
                  store and validating the resultant data. Additionally menu
                  features and footers are also being validated.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                    Selenium
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                    Java
                  </span>
                  <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                    TestNG
                  </span>
                </div>
              </div>
            </div>
            {/* Project Card 4 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <svg
                  viewBox="0 0 24 24"
                  className="w-full h-full p-8 transition-transform duration-300 hover:scale-110"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    fill="#4F46E5"
                  />
                  <path
                    d="M15.5 9.5L11 14L8.5 11.5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 7H16M8 11H10M8 15H14"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-purple-600 mb-3">
                  Xquiz
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  Xquiz is a quiz application that allows users to take quizzes
                  on various topics. It is built using React, Next.js, and
                  Tailwind CSS.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                    Java
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                    OOPS
                  </span>
                  <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                    Unit Testing
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <svg
                  viewBox="0 0 24 24"
                  className="w-full h-full p-8 transition-transform duration-300 hover:scale-110"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="20"
                    height="20"
                    x="2"
                    y="2"
                    rx="2"
                    fill="#4F46E5"
                  />
                  <rect x="4" y="4" width="16" height="4" fill="white" />
                  <text x="5" y="7" fontSize="3" fill="#4F46E5">
                    123.45
                  </text>
                  <g transform="translate(4, 9)">
                    <rect width="3.5" height="2.5" rx="0.5" fill="white" />
                    <rect
                      x="4.5"
                      width="3.5"
                      height="2.5"
                      rx="0.5"
                      fill="white"
                    />
                    <rect
                      x="9"
                      width="3.5"
                      height="2.5"
                      rx="0.5"
                      fill="white"
                    />
                    <rect
                      x="13.5"
                      width="2.5"
                      height="2.5"
                      rx="0.5"
                      fill="white"
                    />
                  </g>
                  <g transform="translate(4, 12.5)">
                    <rect width="3.5" height="2.5" rx="0.5" fill="white" />
                    <rect
                      x="4.5"
                      width="3.5"
                      height="2.5"
                      rx="0.5"
                      fill="white"
                    />
                    <rect
                      x="9"
                      width="3.5"
                      height="2.5"
                      rx="0.5"
                      fill="white"
                    />
                    <rect
                      x="13.5"
                      width="2.5"
                      height="2.5"
                      rx="0.5"
                      fill="white"
                    />
                  </g>
                  <g transform="translate(4, 16)">
                    <rect width="3.5" height="2.5" rx="0.5" fill="white" />
                    <rect
                      x="4.5"
                      width="3.5"
                      height="2.5"
                      rx="0.5"
                      fill="white"
                    />
                    <rect
                      x="9"
                      width="3.5"
                      height="2.5"
                      rx="0.5"
                      fill="white"
                    />
                    <rect
                      x="13.5"
                      width="2.5"
                      height="2.5"
                      rx="0.5"
                      fill="white"
                    />
                  </g>
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-purple-600 mb-3">
                  QCalc
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  QCalc is a calculator application that allows users to perform
                  basic arithmetic operations. It is built using Java and
                  JavaFX.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                    Java
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                    Debugging
                  </span>
                  <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                    OOPS
                  </span>
                  <span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full">
                    Unit Testing
                  </span>
                </div>
              </div>
            </div>

            {/* Project Card 5 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/project1.png"
                  alt="Atmospheric Water Generator"
                  layout="fill"
                  objectFit="contain"
                  className="transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-purple-600 mb-3">
                  Atmospheric Water Generator
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  An Atmospheric Water Generator (AWG) is a device that extracts
                  water from the humid air around us. It basically works like a
                  high-tech dehumidifier, condensing moisture from the air into
                  liquid water.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                    Refrigeration
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                    Mechanical
                  </span>
                  <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                    Conditioning
                  </span>
                  <span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full">
                    Engineering
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        id="contact"
        className="py-20 px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50"
      >
        <motion.div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Contact Me
          </h2>
          <div className="flex justify-center space-x-8">
            <a
              href="https://linkedin.com/in/akash-sintu-sure2527"
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-all duration-200 transform hover:scale-110"
            >
              <svg
                className="w-8 h-8"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span className="text-lg">LinkedIn</span>
            </a>
            <a
              href="mailto:akashsintu112@gmail.com"
              className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-all duration-200 transform hover:scale-110"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-lg">Email</span>
            </a>
          </div>
          <div>
            <Analytics />
          </div>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
        <motion.div className="max-w-6xl mx-auto px-4 text-center">
          <p className="mb-6">
            &copy; {new Date().getFullYear()} Akash Sintu. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/akashsintu112"
              target="_blank"
              rel="noopener"
              className="text-gray-300 hover:text-white transition-all duration-200 transform hover:scale-110"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://twitter.com/akashsintu112"
              target="_blank"
              rel="noopener"
              className="text-gray-300 hover:text-white transition-all duration-200 transform hover:scale-110"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/akash-sintu-sure2527"
              target="_blank"
              rel="noopener"
              className="text-gray-300 hover:text-white transition-all duration-200 transform hover:scale-110"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
          <div className="flex justify-center space-x-10 mt-auto">
            <p className="text-xs text-gray-300">
              Designed and Developed by{" "}
              <a
                href="https://anilsinthu.vercel.app"
                target="_blank"
                rel="noopener"
                className="text-gray-300 hover:text-white transition-all duration-200 transform hover:scale-110"
              >
                Anil Sinthu{" "}
              </a>
            </p>
          </div>
        </motion.div>
      </footer>
    </main>
  );
}
