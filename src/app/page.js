"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import styles from './page.module.css';
import NextImage from 'next/image';

// --- DATA CONFIGURATION --- 
const heroSlides = [
  { id: 1, title: "Asia's No.1 Psychology Learning Platform", subtitle: "Join the elite 1% of Psychologists today.", bg: "#1e293b" },
  { id: 2, title: "Expert Led Coaching", subtitle: "Learn from industry giants directly.", bg: "#0f172a" },
  { id: 3, title: "Build Your Career in Psychology", subtitle: "We are the most popular online Psychology Learning platform.", bg: "#1e1b4b" },
];

const courseList = [
  { id: 1, name: "Advanced CBT Master Class", img: "/c1.jpg" },
  { id: 2, name: "Advanced NLP Master Class", img: "/c2.jpg" },
  { id: 3, name: "Psychotherapy Practical Program", img: "/c3.jpg" },
  { id: 4, name: "Counselling Practical Internship", img: "/c4.jpg" },
  { id: 5, name: "Clinical Practical Internship", img: "/c5.jpg" },
  { id: 6, name: "Advanced Hypnotherapy Master Class", img: "/c6.jpg" },
  { id: 7, name: "Child Psychology Practical Program", img: "/c7.jpg" },
  { id: 8, name: "Diploma In Counselling", img: "/c8.jpg" },
  { id: 9, name: "Diploma In Child Psychology", img: "/c9.jpg" },
  { id: 10, name: "Psychological Research Papers", img: "/c10.jpg" },
  { id: 11, name: "Psychological Assessment Tools", img: "/c11.jpg" },
  { id: 12, name: "Advanced School Counselling Course", img: "/c12.jpg" },
  { id: 13, name: "Art and Movement Therapy", img: "/c13.jpg" },
  { id: 14, name: "Diploma in School Counselling", img: "/c14.jpg" },
  { id: 15, name: "Industrial Psychology Internship", img: "/c15.jpg" },
  { id: 16, name: "Diploma In Industrial Psychology", img: "/c16.jpg" },
  { id: 17, name: "Diploma in Psychotherapy", img: "/c17.jpg" },
  { id: 18, name: "Diploma in Clinical Psychology", img: "/c18.jpg" },
  { id: 19, name: "Music Therapy", img: "/c19.jpg" },
];

const features = [
  { title: "Career Counselling", description: "Unlock your true potential and make confident career decisions." },
  { title: "Live Case Studies", description: "Engage in real-time analysis of clinical scenarios under expert supervision." },
  { title: "Career Placement", description: "Exclusive access to our hiring network of hospitals, clinics, and wellness centers." }
];

const awardLogos = [
  { id: 1, src: "/iso.png", name: "ISO Certified"},
  { id: 2, src: "/cdcl.png", name: "CDCL Recognized"},
  { id: 3, src: "/iaap.png", name: "IAAP Member"}, 
  { id: 4, src: "/msme.png", name: "MSME Registered"},
  { id: 5, src: "/ugac.png", name: "UGAC Approved"},
  { id: 6, src: "/iso9001.png", name: "ISO 9001:2015"},
];

const highlightSlides = [
  { id: 1, title: "Expert Mentorship", description: "Get 1-on-1 guidance from PhD scholars and clinical veterans with 15+ years of experience.", image: "/image1.jpg" },
  { id: 2, title: "Global Certification", description: "Our certificates are recognized by international bodies, helping you practice globally.", image: "/image2.jpg" },
  { id: 3, title: "Practical Internships", description: "Work with real patients in clinical settings to build your confidence and skills.", image: "/image3.jpg" },
  { id: 4, title: "Market Leaders", description: "Our work and offerings are helping you practice globally.", image: "/image4.jpg" }
];

const testimonialVideos = [
  { id: 1, videoId: "FI6BdVQXZdw" },
  { id: 2, videoId: "khFE8v1gKSQ" },
  { id: 3, videoId: "hUMfIPfDf5k" },
  { id: 4, videoId: "jbzGTBm9mdk" },
  { id: 5, videoId: "I6Dy0wyQYPE" },
  { id: 6, videoId: "gHs4qrFKzNQ" },
];

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [studentCount, setStudentCount] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const formRef = useRef(null);
  const awardsRef = useRef(null); 
  const testimonialRef = useRef(null);

  const totalPages = Math.ceil(testimonialVideos.length / itemsPerPage);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToAwards = () => awardsRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToTestimonials = () => testimonialRef.current?.scrollIntoView({ behavior: 'smooth' });

  // POST API Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Capture Form Data
    const formData = {
      fullName: e.target[0].value,
      mobile: e.target[1].value,
      email: e.target[2].value,
      course: e.target[3].value,
      source: "Website Landing Page", // Helpful for tracking in NeoDove
      timestamp: new Date().toISOString(),
    };

    try {
      // 2. NeoDove Integration Endpoint
      const response = await fetch('https://7818d07e-2281-4c5a-846c-34a9531429b6.neodove.com/integration/custom/69db3ac0-0579-49ad-b1e2-cf0af067dfec/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        // If NeoDove returns an error (like 400 or 500)
        const errorData = await response.json().catch(() => ({}));
        console.error("Server Error:", errorData);
        alert("We couldn't process your request. Please try again later.");
      }
    } catch (error) {
      // Handle network errors or CORS issues
      console.error("Submission error:", error);
      alert("Network error. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 768 ? 1 : 3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let start = 0;
    const end = 12400;
    const duration = 2000;
    const increment = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setStudentCount(end); clearInterval(timer); }
      else { setStudentCount(start); }
    }, 16);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const highlightTimer = setInterval(() => setActiveHighlight(p => (p + 1) % highlightSlides.length), 3000);
    const videoTimer = setInterval(() => setVideoIndex(p => (p + 1) % totalPages), 5000);
    const heroTimer = setInterval(() => setCurrentSlide(p => (p + 1) % heroSlides.length), 6000);
    return () => { 
      clearInterval(highlightTimer); 
      clearInterval(videoTimer); 
      clearInterval(heroTimer);
    };
  }, [activeHighlight, videoIndex, currentSlide, isPaused, totalPages]);

  return (
    <div className={styles.mainWrapper}>
      {/* 1. Marquee */}
      <div className={styles.marqueeBar}>
        <div className={styles.marqueeTrack}>
          <span>🚀 BOOST YOUR CAREER IN COUNSELLING AND PSYCHOLOGY • LIVE SESSIONS BY RCI APPROVED TRAINERS • LIMITED SLOTS LEFT • 🚀 ENROLLMENT OPEN FOR SPRING 2026 • 🚀 </span>
          <span>🚀 BOOST YOUR CAREER IN COUNSELLING AND PSYCHOLOGY • LIVE SESSIONS BY RCI APPROVED TRAINERS • LIMITED SLOTS LEFT • 🚀 ENROLLMENT OPEN FOR SPRING 2026 • 🚀 </span>
        </div>
      </div>

      {/* 2. Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logoContainer}>
          <NextImage src="/logo.png" alt="Logo" width={180} height={45} priority className={styles.logoImage} />
        </div>
        <div className={styles.navLinks}>
          <button type="button" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Home</button>
          <button type="button" onClick={scrollToForm}>Courses</button>
          <button type="button" onClick={scrollToTestimonials}>Highlights</button>
          <button type="button" onClick={scrollToAwards}>Recognitions</button>
          <button type="button" className={styles.navCTA} onClick={scrollToForm}>Join Now</button>
        </div>
      </nav>

      {/* 3. Hero Section */}
      <section className={styles.heroSection}>
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.slide}
            style={{ backgroundColor: heroSlides[currentSlide].bg }}
          >
            <h1>{heroSlides[currentSlide].title}</h1>
            <p>{heroSlides[currentSlide].subtitle}</p>
            
            <div className={styles.heroButtons}>
              <button className={styles.primaryBtn} onClick={scrollToForm}>Explore Now</button>
              <div className={styles.liveCounter}>
                <div className={styles.pulseDot}></div>
                <div className={styles.counterText}>
                  <span className={styles.countNumber}>{studentCount.toLocaleString()}+</span>
                  <span className={styles.countLabel}>Students Enrolled</span>
                </div>
              </div>
            </div>

          <h2>Enroll Now</h2>

            <div ref={formRef} className={styles.heroFormContainer}>
              {!isSubmitted ? (
                <form className={styles.heroForm} onSubmit={handleSubmit}>
                  <input type="text" placeholder="Full Name" required className={styles.heroInput} />
                  <input type="tel" placeholder="Mobile number" required className={styles.heroInput} />
                  <input type="email" placeholder="Email Address" required className={styles.heroInput} />
                  <select className={styles.heroSelect} required>
                    <option value="">Select Course</option>
                    {courseList.map((course) => (
                      <option key={course.id} value={course.name}>{course.name}</option>
                    ))}
                  </select>
                  <button 
                    type="submit" 
                    className={styles.heroSubmitBtn} 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Get Early Access"}
                  </button>
                </form>
              ) : (
                <div className={styles.thankYouMessage}>
                  <div className={styles.successIcon}>✓</div>
                  <h3>You're on the list!</h3>
                  <p>Our team will contact you within 24 hours.</p>
                  <button onClick={() => setIsSubmitted(false)} className={styles.resetBtn}>Edit details</button>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* 4. Feature Ribbon */}
      <section className={styles.ribbonSection}>
        <div className={styles.ribbonContainer}>
          {features.map((f, i) => (
            <motion.div key={i} whileHover={{ y: -5 }} className={styles.featureBox}>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Course Carousel */}
      <section className={styles.coursesSection}>
        <h2 className={styles.sectionTitle}>Courses We Offer</h2>
        <div className={styles.courseCarouselContainer}>
          <div className={styles.courseTrack}>
            {[...courseList, ...courseList].map((course, index) => (
              <div key={index} className={styles.courseCard}>
                <div className={styles.courseImageWrapper}>
                  <NextImage src={course.img} alt={course.name} fill className={styles.courseImg} />
                </div>
                <div className={styles.courseInfo}>
                  <h4>{course.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Awards Showcase */}
      <section ref={awardsRef} className={styles.awardsSection}>
        <h2 className={styles.sectionTitle}>Our Global Recognitions</h2>
        <div className={styles.awardsGrid}>
          {awardLogos.map((a) => (
            <div key={a.id} className={styles.awardItem}>
              <div className={styles.logoWrapper}>
                <NextImage src={a.src} alt={a.name} width={120} height={60} className={styles.partnerLogo} />
              </div>
              <span className={styles.awardLabel}>{a.name}</span>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.gradientRibbon} />

      {/* 7. Highlight Carousel */}
      <section className={styles.highlightCarouselSection}>
        <div className={styles.highlightWrapper} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeHighlight}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={styles.highlightCard}
            >
              <div className={styles.highlightImageArea}>
                <NextImage src={highlightSlides[activeHighlight].image} alt="highlight" fill className={styles.highlightImg} />
              </div>
              <div className={styles.highlightTextArea}>
                <span className={styles.highlightNumber}>0{activeHighlight + 1}</span>
                <h2>{highlightSlides[activeHighlight].title}</h2>
                <p>{highlightSlides[activeHighlight].description}</p>
                <div className={styles.highlightNav}>
                  <button onClick={() => setActiveHighlight(p => (p - 1 + highlightSlides.length) % highlightSlides.length)} className={styles.hNavBtn}><ChevronLeft /></button>
                  <button onClick={() => setActiveHighlight(p => (p + 1) % highlightSlides.length)} className={styles.hNavBtn}><ChevronRight /></button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 8. Video Highlights */}
      <section ref={testimonialRef} className={styles.testimonialSection}>
        <h2 className={styles.sectionTitle}>Our Highlights</h2>
        <div className={styles.videoOuterWrapper} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          <button className={`${styles.vArrow} ${styles.vLeft}`} onClick={() => setVideoIndex(p => (p - 1 + totalPages) % totalPages)}><ChevronLeft /></button>
          <div className={styles.videoCarouselContainer}>
            <AnimatePresence mode="wait">
              <motion.div 
                key={`${videoIndex}-${itemsPerPage}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, { offset }) => {
                  const swipe = offset.x;
                  if (swipe < -50) setVideoIndex((p) => (p + 1) % totalPages);
                  else if (swipe > 50) setVideoIndex((p) => (p - 1 + totalPages) % totalPages);
                }}
                className={styles.videoGrid}
              >
                {testimonialVideos
                  .slice(videoIndex * itemsPerPage, (videoIndex + 1) * itemsPerPage)
                  .map((v) => (
                    <div key={v.id} className={styles.videoCard}>
                      <div className={styles.videoResponsiveContainer}>
                        <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${v.videoId}`} frameBorder="0" allowFullScreen></iframe>
                      </div>
                    </div>
                  ))}
              </motion.div>
            </AnimatePresence>
          </div>
          <button className={`${styles.vArrow} ${styles.vRight}`} onClick={() => setVideoIndex(p => (p + 1) % totalPages)}><ChevronRight /></button>
        </div>
      </section>

      {/* 9. Action Ribbon */}
      <section className={styles.actionRibbon}>
        <div className={styles.actionContent}>
          <h2>Transform your career in just 12 weeks.</h2>
          <button className={styles.whiteBtn} onClick={scrollToForm}>Get Started Now</button>
        </div>
      </section>

      {/* 10. Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <h3>INDIAN COUNSELLING SERVICES</h3>
            <p>The future of online psychology education.</p>
          </div>
          <div className={styles.socials}>
            <a href="https://www.facebook.com/IndianCounsellingServices" target="_blank" rel="noreferrer"><Facebook /></a>
            <a href="https://x.com/IndianCounselli" target="_blank" rel="noreferrer"><Twitter /></a>
            <a href="https://www.instagram.com/indiancounsellingservices/" target="_blank" rel="noreferrer"><Instagram /></a>
            <a href="https://www.linkedin.com/company/indiancounsellings/posts/?feedView=all" target="_blank" rel="noreferrer"><Linkedin /></a>
          </div>
        </div>
        <div className={styles.copyright}>© 2026 All Rights Reserved.</div>
      </footer>
    </div>
  );
}