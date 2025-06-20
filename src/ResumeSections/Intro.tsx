"use client";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Intro() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const scrollToSection = () => {
    const section = document.getElementById('skills');
    if (section) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const sectionRect = section.getBoundingClientRect().top;
      const sectionPosition = sectionRect - bodyRect;
      const offsetPosition = sectionPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  return (
    <motion.section
      className="min-h-screen flex items-center justify-center px-4 md:px-8 "
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-2xl mx-auto text-center">
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl font-bold  leading-tight"
        >
          {t('summary.presentation')}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 text-lg md:text-x"
        >
          {t('summary.content')}
        </motion.p>

        <motion.div variants={itemVariants} className="mt-8 flex justify-center gap-4">
          <motion.button
            onClick={scrollToSection}
            whileHover={{ scale: 1.05 }}
            className={`px-6 py-3 border ${theme === "dark"
              ? "border-amber-200 hover:bg-amber-200/10"
              : "border-amber-950 hover:bg-amber-950/10"
              } font-medium rounded-xl transition-all cursor-pointer`}
          >
            {t('buttonIntro')}
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
