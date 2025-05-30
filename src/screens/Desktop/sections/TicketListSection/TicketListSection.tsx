import React from "react";
import openIcon from "../../../../assets/open.svg";
import pendingIcon from "../../../../assets/pending.svg";
import closeIcon from "../../../../assets/close.svg";

interface TicketListSectionProps {
  currentStatus: string;
  setStatus: (status: 'open' | 'pending' | 'closed') => void;
  statusCounts: {
    open: number;
    pending: number;
    closed: number;
  };
}

export const TicketListSection = ({ currentStatus, setStatus, statusCounts }: TicketListSectionProps): JSX.Element => {
  const ticketStatuses = [
    {
      id: "open",
      label: "Open",
      count: statusCounts.open,
      icon: <img src={openIcon} alt="Open icon" className="w-5 h-5" />,
      isActive: currentStatus === 'open',
    },
    {
      id: "pending",
      label: "Pending",
      count: statusCounts.pending,
      icon: <img src={pendingIcon} alt="Pending icon" className="w-5 h-5" />,
      isActive: currentStatus === 'pending',
    },
    {
      id: "closed",
      label: "Closed",
      count: statusCounts.closed,
      icon: <img src={closeIcon} alt="Closed icon" className="w-5 h-5" />,
      isActive: currentStatus === 'closed',
    },
  ];

  return (
    <nav className="w-[164px] h-[682px] bg-white shadow-[2px_0px_4px_#e2dee8]">
      <ul className="flex flex-col w-full items-start pt-10">
        {ticketStatuses.map((status) => (
          <li
            key={status.id}
            onClick={() => setStatus(status.id as 'open' | 'pending' | 'closed')}
            className={`flex items-center gap-2 px-4 py-3 relative self-stretch w-full cursor-pointer ${
              status.isActive
                ? "bg-white shadow-[0px_2px_8px_#dad5e2,0px_10px_10px_#bfa3f54c]"
                : "bg-[#ffffff66] shadow-[0px_1px_2px_#00000026]"
            }`}
          >
            {status.icon}
            <span className="font-sans font-normal text-[#252526] text-sm">
              {status.label} ({status.count})
            </span>
            {status.isActive && (
              <div className="absolute w-[3px] h-11 top-0 right-0 bg-[#7336e6]" />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};