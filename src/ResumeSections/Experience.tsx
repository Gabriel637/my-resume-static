import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

const Experience = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const experiences = t('experience.items', { returnObjects: true }) as {
    title: string;
    description: string[];
    company: string;
    period: string;
    role: string;
  }[];

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section
      className={`py-16 px-4 sm:px-6 lg:px-8`}
      id="experience"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl font-bold sm:text-4xl`}>
            {t('experience.title')}
          </h2>
          <p className={`mt-4 text-lg`}>
            {t('experience.subtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          {experiences && experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              variants={item}
              className={`relative pl-8 pb-8 ${index !== experiences.length - 1 ? 'border-l' : ''} 
                ${theme === 'dark' ? 'border-amber-200' : 'border-amber-900'}`}
            >
              <div className={`absolute -left-2.5 top-0 h-5 w-5 rounded-full 
                ${theme === 'dark' ? 'bg-amber-200' : 'bg-amber-900'}`}>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <h3 className={`text-xl font-semibold`}>
                  {exp.role}
                </h3>
                <p className={`text-sm mt-1 sm:mt-0`}>
                  {exp.period}
                </p>
              </div>

              <h4 className={`mt-1 text-lg text-indigo-600}`}>
                {exp.company}
              </h4>

              <ul className="mt-4 space-y-2">
                {exp.description.map((desc, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    className={`flex items-start`}
                  >
                    <span className="mr-2 mt-1">•</span>
                    <span>{desc}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;