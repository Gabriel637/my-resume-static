import { motion } from "framer-motion"
import { FaMoon } from "react-icons/fa";
import { IoMdSunny } from "react-icons/io"
import { useTheme } from '../contexts/ThemeContext';

const ToggleThemeButton = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark'

  return (
    <div className="flex items-center justify-center">
      <div
        className={`w-18 h-9 flex items-center justify-between rounded-full p-1 cursor-pointer ${isDark ? 'bg-amber-950' : 'bg-amber-900'}`}
        onClick={toggleTheme}
      >
        {isDark && <IoMdSunny size={24} />}
        <motion.div
          className="w-8 h-8 bg-amber-200 rounded-full shadow-md"
          layout
          transition={{
            type: "spring",
            stiffness: 700,
            damping: 30
          }}
        />
        {!isDark && <FaMoon className="text-amber-200" size={24} />}
      </div>
    </div>
  )
}

export default ToggleThemeButton;