import ToggleThemeButtonStyled from "../components/ToggleThemeButton";
import { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import ToggleLanguageButton from "../components/ToggleLanguageButton";

const Header = () => {
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 30;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <div className={`z-20 w-full flex items-center justify-between pr-16 pl-16 p-4 fixed 
      ${theme === 'dark' ? 'bg-gray-950 border-b-[#e4d8b4]' : 'bg-[#e4d8b4] border-b-amber-950'} 
      ease-out transition-all duration-300} 
      ${scrolled && 'border-b-1'}`}>
      <div>
        <ToggleLanguageButton />
      </div>
      <div className="flex gap-4">
        <a href="https://www.linkedin.com/in/gabriel-b-4ba810124/" target="_blank" className="hover:text-blue-600 cursor-pointer">
          LinkedIn
        </a>
        <a href="https://github.com/Gabriel637" target="_blank" className="hover:text-purple-400 cursor-pointer">
          GitHub
        </a>
      </div>
      <div className="flex gap-4">
        <ToggleThemeButtonStyled />
      </div>
    </div>
  )
}

export default Header;