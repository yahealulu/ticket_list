import { BellIcon, FuelIcon, SearchIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { motion } from "framer-motion";
import UserIcon from "../../../../assets/user.svg";
import { ThemeToggle } from "../../../../components/ThemeToggle";

interface SidebarSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SidebarSection = ({ searchQuery, setSearchQuery }: SidebarSectionProps): JSX.Element => {
  return (
    <header className="w-full bg-[#f9f5ff] dark:bg-gray-800 shadow-[0px_2px_6px_#b9b5c0a6] dark:shadow-[0px_2px_6px_rgba(0,0,0,0.3)] flex flex-col lg:flex-row items-center justify-between px-4 lg:px-[91px] py-4 lg:py-2 transition-colors duration-300 sticky top-0 z-50">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-semibold text-[#7336e6] dark:text-indigo-400 text-xl [font-family:'DM_Sans',Helvetica] tracking-[0] mb-4 lg:mb-0 transition-colors duration-300"
      >
        Ticket List
      </motion.h1>

      <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-2 w-full lg:w-auto lg:ml-[170px]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex w-full lg:w-[281px] items-center justify-between px-4 py-1.5 bg-white dark:bg-gray-700 rounded-[40px] border border-solid border-[#dad4ea] dark:border-gray-600 transition-colors duration-300"
        >
          <Input
            type="text"
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-none text-xs dark:text-gray-200 dark:placeholder:text-gray-400 focus:outline-none focus:ring-0 bg-transparent transition-colors duration-300"
          />
          <SearchIcon className="w-5 h-5" />
        </motion.div>

        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 bg-white dark:bg-gray-700 rounded-[100px] border border-solid border-[#dad4ea] dark:border-gray-600 p-0 transition-colors duration-300"
            >
              <FuelIcon className="w-5 h-5" />
            </Button>
          </motion.div>

          <ThemeToggle />

          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative p-1 bg-white dark:bg-gray-700 rounded-[100px] border border-solid border-[#dad4ea] dark:border-gray-600 transition-colors duration-300"
          >
            <BellIcon className="w-6 h-6" />
            <div className="absolute w-1.5 h-1.5 top-1.5 left-[19px] bg-[#e76a63] rounded-[3px]" />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            className="p-1 bg-[#c9c1de] dark:bg-gray-600 rounded-[100px] border border-solid border-[#dad4ea] dark:border-gray-700 transition-colors duration-300"
          >
            <div className="relative w-6 h-6">
              <img
                className="absolute w-4 h-[21px] top-0.5 left-1"
                alt="User avatar"
                src={UserIcon}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};