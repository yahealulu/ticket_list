import {
  FileBarChartIcon,
  LayoutGridIcon,
  SettingsIcon,
  StarIcon,
  TicketIcon,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { HeaderSection } from "./sections/HeaderSection";
import { SidebarSection } from "./sections/SidebarSection/SidebarSection";
import { TicketDetailSection } from "./sections/TicketDetailSection/TicketDetailSection";
import { TicketListSection } from "./sections/TicketListSection/TicketListSection";
import { useTickets } from "../../hooks/useTickets";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { motion } from "framer-motion";
import LogoImage from "../../assets/Logo.svg";

export const Desktop = (): JSX.Element => {
  const {
    tickets,
    loading,
    error,
    currentStatus,
    currentPage,
    itemsPerPage,
    totalPages,
    setStatus,
    setPage,
    setItemsPerPage,
    totalTickets,
    selectedTicket,
    fetchTicketDetails,
    messageInput,
    setMessageInput,
    sendMessage,
    searchQuery,
    setSearchQuery
  } = useTickets();

  const [isChatVisible, setIsChatVisible] = useState(true);

  // Calculate status counts
  const statusCounts = {
    open: tickets.filter(t => t.status === 'open').length,
    pending: tickets.filter(t => t.status === 'pending').length,
    closed: tickets.filter(t => t.status === 'closed').length
  };

  // Navigation items data for the sidebar
  const navItems = [
    { icon: <LayoutGridIcon className="w-5 h-5 text-white" />, active: false },
    { icon: <TicketIcon className="w-5 h-5 text-white" />, active: true },
    { icon: <StarIcon className="w-5 h-5 text-white" />, active: false },
    { icon: <FileBarChartIcon className="w-5 h-5 text-white" />, active: false },
    { icon: <SettingsIcon className="w-5 h-5 text-white" />, active: false },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-12 h-12 border-4 border-[#7336e6] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center h-screen text-red-500"
      >
        Error: {error}
      </motion.div>
    );
  }

  return (
    <div className="bg-[#f8f5ff] dark:bg-gray-900 flex flex-row justify-center w-full transition-colors duration-300">
      <div className="bg-[#f8f5ff] dark:bg-gray-900 w-full max-w-[1440px] relative flex flex-row transition-colors duration-300">
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          className="w-[72px] h-screen flex-shrink-0 [background:linear-gradient(90deg,rgba(37,31,50,1)_0%,rgba(58,47,83,1)_100%)]"
        >
          <div className="flex justify-center pt-4">
            <motion.img
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-6 h-6"
              alt="Logo"
              src={LogoImage}
            />
          </div>

          <div className="flex flex-col items-center gap-[42px] mt-[74px]">
            {navItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full p-2 ${
                    item.active ? "bg-[#ffffff33]" : ""
                  }`}
                >
                  {item.icon}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Logout button removed */}
        </motion.div>

        <div className="flex-1 flex flex-col">
          <SidebarSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          <div className="flex flex-1">
            <PanelGroup direction="horizontal">
              <Panel defaultSize={20} minSize={15}>
                <TicketListSection
                  currentStatus={currentStatus}
                  setStatus={setStatus}
                  statusCounts={statusCounts}
                />
              </Panel>

              <PanelResizeHandle className="w-1 bg-gray-200 hover:bg-gray-300 transition-colors" />

              <Panel defaultSize={50} minSize={30}>
                <TicketDetailSection
                  tickets={tickets}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  totalPages={totalPages}
                  setPage={setPage}
                  setItemsPerPage={setItemsPerPage}
                  onTicketSelect={(id) => {
                    fetchTicketDetails(id);
                    setIsChatVisible(true);
                  }}
                />
              </Panel>

              {isChatVisible && (
                <>
                  <PanelResizeHandle className="w-1 bg-gray-200 hover:bg-gray-300 transition-colors" />
                  <Panel defaultSize={30} minSize={20}>
                    <HeaderSection 
                      selectedTicket={selectedTicket}
                      messageInput={messageInput}
                      setMessageInput={setMessageInput}
                      sendMessage={sendMessage}
                      onClose={() => setIsChatVisible(false)}
                    />
                  </Panel>
                </>
              )}
            </PanelGroup>
          </div>
        </div>
      </div>
    </div>
  );
};