import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative"
    >
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="w-8 h-8 bg-white dark:bg-gray-800 rounded-[100px] border border-solid border-[#dad4ea] dark:border-gray-700 p-0"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20 
          }}
          key={theme === "dark" ? "dark-icon" : "light-icon"}
        >
          {theme === "dark" ? (
            <MoonIcon className="w-5 h-5 text-indigo-400" />
          ) : (
            <SunIcon className="w-5 h-5 text-amber-500" />
          )}
        </motion.div>
      </Button>
    </motion.div>
  );
}