import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { useTheme } from '../contexts/ThemeContext';

type SkillItem = {
  title: string;
  icon: string;
  skills: string[];
  description: string;
}

export default function RadialSkills() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const skillFlow = t('skillFlow', { returnObjects: true }) as SkillItem[];

  return (
    <section className="relative" id="skills">
      <div className="max-w-4xl mx-auto px-4 text-center mb-12">
        <Link to="/love">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold bg-clip-text mb-4"
          >
            {t('skillFlowTitle')}
          </motion.h2>
        </Link>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg"
        >
          {t('skillFlowSubtitle')}
        </motion.p>
      </div>
      <div className="relative h-full w-full">

        <div className='flex justify-around cursor-pointer mb-8'>
          {skillFlow.map((skill, index) => {
            return (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={{
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 50,
                    damping: 10,
                    delay: index * 0.1 + 0.4
                  }
                }}
                whileHover={{ scale: 1.05 }}
                className={`w-64 p-6
               rounded-xl z-10 shadow-md border
               ${theme === "dark" ? "bg-gray-950" : "bg-[#e4d8b4]"}
               `}
              >
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{skill.icon}</span>
                  <h3 className="text-xl font-semibold">{skill.title}</h3>
                </div>

                <p className="text-sm mb-4">{skill.description}</p>

                <div className="flex flex-wrap gap-2">
                  {skill.skills.map(item => (
                    <span
                      key={item}
                      className="px-3 py-1 text-xs font-medium border rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}