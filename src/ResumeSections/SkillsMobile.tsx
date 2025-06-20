import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function SkillsFlowMobile() {
  const { t } = useTranslation();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const skillFlow = t('skillFlow', { returnObjects: true }) as {
    title: string;
    icon: string;
    skills: string[];
    description: string;
  }[];

  return (
    <section className="py-12 px-4 md:hidden">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold bg-clip-text mb-3"
        >
          {t('skillFlowTitle')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {t('skillFlowSubtitle')}
        </motion.p>
      </div>

      <div className="space-y-4">
        {skillFlow.map((skill, index) => (
          <motion.div
            key={skill.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-xl overflow-hidden border ${expandedIndex === index ? 'shadow-lg' : 'shadow-md'}`}
          >
            <motion.button
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className={`w-full flex items-center justify-between p-5`}
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">{skill.icon}</span>
                <h3 className="text-lg font-semibold text-left">{skill.title}</h3>
              </div>
              <motion.div
                animate={{ rotate: expandedIndex === index ? 180 : 0 }}
              >
                ▼
              </motion.div>
            </motion.button>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: expandedIndex === index ? 'auto' : 0,
                opacity: expandedIndex === index ? 1 : 0
              }}
            >
              <div className="p-5 pt-0">
                <p className="mb-4">{skill.description}</p>
                <div className="flex flex-wrap gap-2">
                  {skill.skills.map((item) => (
                    <motion.span
                      key={item}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="px-3 py-1 rounded-full text-sm border"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}