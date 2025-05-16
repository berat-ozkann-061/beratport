
import "./App.css";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { motion, useInView } from "framer-motion";
import React, { useState, useRef } from "react";




const sections = [
    { id: "home", label: "Ana Sayfa" },
    { id: "about", label: "Ben Kimim?" },
    { id: "skills", label: "Neler Yapabilirim?" },
    { id: "portfolio", label: "Portfolyo" },
    { id: "contact", label: "İletişim" },
];

const AnimatedText = ({ text, className }) => (
    <motion.div className={`animated-text ${className}`}>
        {text.split("").map((char, index) => (
            <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07 }}
            >
                {char}
            </motion.span>
        ))}
    </motion.div>
);


const FadeInSection = ({ id, children }) => {
    const isHome = id === "home";
    const backgroundStyle = isHome
        ? {
            backgroundImage: `url(${process.env.PUBLIC_URL + "/berat.jpg"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "relative",
        }
        : {};

    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-100px", amount: 0.3 });

    return (
        <motion.section
            ref={ref}
            id={id}
            className={`section ${isHome ? "home" : ""}`}
            style={backgroundStyle}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
        >
            {isHome && <div className="overlay" />}
            <div className="content-wrapper">{children}</div>
        </motion.section>
    );
};

function App() {
    const [animationKey, setAnimationKey] = useState(0);

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

        // Eğer home'a tıklanıyorsa animasyonu tetikle
        if (id === "home") {
            setAnimationKey(prev => prev + 1); // Key'i değiştir → yeniden render tetikler
        }
    };

    return (
        <div className="App">
            <nav className="navbar">
                {sections.map((sec) => (
                    <button key={sec.id} onClick={() => scrollToSection(sec.id)}>
                        {sec.label}
                    </button>
                ))}
            </nav>

            <FadeInSection id="home">
                <div className="hero-text">
                    <AnimatedText text="BERAT ÖZKAN" className="main-title" key={`title-${animationKey}`} />
                    <AnimatedText
                        text="HOŞGELDİNİZ! BENİ YAKINDAN TANIMAYA NE DERSİNİZ?"
                        className="sub-title"
                        key={`subtitle-${animationKey}`}
                    />
                </div>
            </FadeInSection>

            <FadeInSection id="about">
                <motion.div
                    className="about-section"
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                >
                    <motion.div
                        className="about-images"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <img
                            src={process.env.PUBLIC_URL + "/kimbuberat.jpg"}
                            alt="Berat Özkan"
                            className="profile-img"
                        />
                        <img
                            src={process.env.PUBLIC_URL + "/about-bg.jpg"}
                            alt="Arka Plan"
                            className="background-img"
                        />
                    </motion.div>

                    <motion.div
                        className="about-text"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h2>Ben Kimim?</h2>
                        <p>
                            Merhaba! Ben Berat Özkan. 2004 yılında Trabzon’da doğdum, şu anda Balıkesir Üniversitesi
                            Bilgisayar Mühendisliği 2. sınıf öğrencisiyim. Küçüklüğümden beri teknolojiye ve yaratıcı
                            fikirlere büyük bir ilgim vardı. Zamanla bu ilgi beni yazılım, tasarım ve kodlamayla tanıştırdı.
                            Şimdi ise bu alanda kendimi her gün geliştirerek, hem öğreniyor hem de üretiyorum. Kendi
                            projelerimi hayata geçirmeyi, yeni şeyler keşfetmeyi ve öğrendiklerimi paylaşmayı çok
                            seviyorum.
                        </p>
                    </motion.div>
                </motion.div>
            </FadeInSection>


            <FadeInSection id="skills">
                <div
                    className="skills-section"
                    style={{
                        backgroundImage: `url(${process.env.PUBLIC_URL + "/yapabilirimneler.jpg"})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: "black",
                        height: "100vh",
                        position: "relative",
                    }}
                >
                    {/* Koyu filtre katmanı */}
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                            zIndex: 0,
                        }}
                    ></div>

                    <h2
                        className="skills-title"
                        style={{ position: "relative", zIndex: 1 }}
                    >
                        Neler Yapabilirim?
                    </h2>

                    <div
                        className="skills-grid"
                        style={{ position: "relative", zIndex: 1 }}
                    >
                        {[
                            { src: "pythonon.jpg", alt: "Python" },
                            { src: "html-css.webp", alt: "HTML / CSS" },
                            { src: "javascript.jpg", alt: "JavaScript" },
                            { src: "react.png", alt: "React" },
                        ].map((skill, index) => (
                            <div key={index} className="skill-card">
                                <img
                                    src={process.env.PUBLIC_URL + "/" + skill.src}
                                    alt={skill.alt}
                                />
                                <p>{skill.alt}</p>
                            </div>
                        ))}
                    </div>

                    <div
                        className="skills-description"
                        style={{ position: "relative", zIndex: 1 }}
                    >
                        <p>
                            Üniversite hayatım boyunca yazılım alanında kendimi geliştirdim. Python, HTML/CSS, JavaScript ve React gibi
                            teknolojilerle çeşitli projeler gerçekleştirdim. Her geçen gün bu dillerle daha yaratıcı çözümler üretmekten
                            büyük keyif alıyorum.
                        </p>
                    </div>
                </div>
            </FadeInSection>


            <FadeInSection id="portfolio">
                <div
                    className="portfolio-wrapper"
                    style={{
                        backgroundImage: "url('/portfolyo.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        padding: '60px 20px',
                        color: 'white',
                    }}
                >
                    <h2 className="portfolio-title">Portfolyo</h2>

                    {/* Projelerim */}
                    <div className="portfolio-section">
                        <h3 className="portfolio-subtitle">Projelerim</h3>
                        <div className="card-container">
                            <div className="project-card">
                                <img src="/tarımrobotu.jpg" alt="Tarım Robotu" />
                            </div>
                            <div className="project-card">
                                <img src="/otelrezervasyonsistemi.png" alt="Otel Rezervasyon Sistemi" />
                            </div>
                        </div>
                        <p className="description">
                            İnsansız tarım robotu ile otel rezervasyon sistemi tasarladım ve bu projeleri daha da geliştirmek istiyorum ve bu projeler üzerine çalışmalarımı sürdürüyorum.
                        </p>
                    </div>

                    {/* Hobilerim */}
                    <div className="portfolio-section">
                        <h3 className="portfolio-subtitle">Hobilerim</h3>
                        <div className="card-container">
                            <div className="project-card">
                                <img src="/hakem.webp" alt="Hakemlik" />
                            </div>
                            <div className="project-card">
                                <img src="/satranç.jpg" alt="Satranç" />
                            </div>
                            <div className="project-card">
                                <img src="/seyahat.jpg" alt="Seyahat" />
                            </div>
                        </div>
                        <p className="description">
                            Aktif olarak hakemlik yapıyorum ve hakemlik benim için çok zevkli bir hobi
                            ve geri kalan boş zamanlarımı ise satranç oynayarak ve şehir şehir gezerek geçiriyorum.
                        </p>
                    </div>
                </div>
            </FadeInSection>




            <FadeInSection id="contact">
                <div className="contact-section">
                    <h2>İletişim</h2>
                    <form className="contact-form">
                        <input type="text" placeholder="Ad Soyad" required />
                        <input type="email" placeholder="Mail" required />
                        <textarea placeholder="İçerik" required />
                        <button type="submit">Gönder</button>
                    </form>

                    <div className="social-icons">
                        <a href="#"><FaLinkedin /></a>
                        <a href="https://github.com/berat-ozkann-061" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                        <a href="https://www.instagram.com/beratzkn61/"><FaInstagram /></a>
                    </div>
                </div>
            </FadeInSection>

        </div>
    );
}

export default App;
