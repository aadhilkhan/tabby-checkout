import { useTheme } from '../../context/ThemeContext';
import { SunIcon } from '../../assets/icons/SunIcon';
import { MoonIcon } from '../../assets/icons/MoonIcon';

export function DarkModeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-[var(--line-disabled)] transition-colors cursor-pointer bg-transparent border-none text-[var(--front-secondary)]"
      aria-label="Toggle dark mode"
    >
      {isDark ? <SunIcon size={20} /> : <MoonIcon size={20} />}
    </button>
  );
}
