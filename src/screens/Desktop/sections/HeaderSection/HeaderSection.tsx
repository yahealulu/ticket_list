import {
  MailIcon,
  PaperclipIcon,
  PhoneIcon,
  SendIcon,
  SmileIcon,
  StarIcon,
  XIcon,
} from "lucide-react";
import React, { KeyboardEvent } from "react";
import { Avatar, AvatarFallback } from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Ticket } from "../../../../types/ticket";
import { formatDistanceToNow } from 'date-fns';
import MapPinIcon from "../../../../assets/map-pin.svg";

interface HeaderSectionProps {
  selectedTicket: Ticket | null;
  messageInput: string;
  setMessageInput: (message: string) => void;
  sendMessage: (message: string) => void;
  onClose: () => void;
}

export const HeaderSection = ({ 
  selectedTicket,
  messageInput,
  setMessageInput,
  sendMessage,
  onClose
}: HeaderSectionProps): JSX.Element => {
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && messageInput.trim()) {
      sendMessage(messageInput.trim());
    }
  };

  const handleSendClick = () => {
    if (messageInput.trim()) {
      sendMessage(messageInput.trim());
    }
  };

  if (!selectedTicket) {
    return <div className="w-full h-[682px] flex items-center justify-center text-gray-500">
      Select a ticket to view details
    </div>;
  }

  return (
    <Card className="w-full h-[682px] border-l-4 border-[#e0d7f6] rounded-none relative">
      {/* Header section with user info */}
      <div className="w-full">
        <div className="relative">
          <div className="flex items-start justify-between p-4 w-full [background:linear-gradient(0deg,rgba(177,137,253,0.2)_0%,rgba(177,137,253,0.2)_100%),url(..//frame-2610487.png)_50%_50%_/_cover]">
            <div className="flex items-center gap-2">
              <Avatar className="w-16 h-16 bg-[#d5d3d8] rounded-[32px] border-2 border-solid border-[#ffffff80]">
                <AvatarFallback>
                  {selectedTicket.customer_name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start gap-2">
                <div className="font-semibold text-[#252526] text-sm font-['DM_Sans',Helvetica]">
                  {selectedTicket.customer_name}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-8 h-8 p-2 bg-[#ffffffcc] rounded-full"
                  >
                    <PhoneIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-8 h-8 p-2 bg-[#ffffffcc] rounded-full"
                  >
                    <MailIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-8 h-8 p-2 bg-[#ffffffcc] rounded-full"
                  >
                    <img
                      className="w-[11px] h-3.5"
                      alt="Location"
                      src={MapPinIcon}
                    />
                  </Button>
                </div>
              </div>
            </div>
            <Button
              size="icon"
              variant="outline"
              className="p-1 bg-white rounded-full border border-solid border-[#dad4ea]"
              onClick={onClose}
            >
              <XIcon className="w-5 h-5" />
            </Button>
          </div>

          {/* Ticket info section */}
          <div className="w-full h-[74px] bg-[#ac8cf533] backdrop-blur-[7.5px]">
            <div className="flex w-full h-[42px] items-start justify-between p-4">
              <div className="flex flex-col items-start justify-center gap-2">
                <div className="font-medium text-[#252526] text-sm font-['DM_Sans',Helvetica]">
                  Ticket Subject
                </div>
                <div className="font-normal text-[#6b6b6b] text-xs font-['DM_Sans',Helvetica]">
                  {selectedTicket.subject}
                </div>
              </div>
              <div className="font-normal text-[#6b6b6b] text-xs font-['DM_Sans',Helvetica]">
                {formatDistanceToNow(new Date(selectedTicket.timestamp), { addSuffix: true })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat messages */}
      <CardContent className="p-4 flex flex-col gap-6 overflow-y-auto h-[calc(100%-240px)]">
        {selectedTicket.messages.map((message, index) => (
          <div
            key={index}
            className={`flex flex-col items-${message.sender === 'agent' ? 'end' : 'start'} gap-2 ${
              message.sender === 'agent' ? 'self-end' : ''
            }`}
          >
            <div className={`flex items-center ${message.sender === 'agent' ? 'justify-end' : ''} gap-2`}>
              <div className="text-[#6b6b6b] text-xs font-['Inter',Helvetica]">
                {message.sender === 'agent' ? 'Agent' : selectedTicket.customer_name}
              </div>
              <Avatar className="w-8 h-8 bg-[#d9d9d9] rounded-2xl">
                <AvatarFallback>
                  {message.sender === 'agent' ? 'A' : selectedTicket.customer_name[0]}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className={`${
              message.sender === 'agent'
                ? 'bg-[#3a2f53] text-white rounded-[16px_0px_16px_16px]'
                : 'bg-[#f0f0f0] text-[#252526] rounded-[0px_16px_16px_16px]'
            } p-2 max-w-[273px]`}>
              <div className="text-sm font-['DM_Sans',Helvetica]">
                {message.message}
              </div>
            </div>
            <div className="text-[#6b6b6b] text-xs font-['DM_Sans',Helvetica] self-center">
              {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
            </div>
          </div>
        ))}
      </CardContent>

      {/* Message input area */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="relative w-full h-12 bg-[#f0f0f0] rounded-[40px] overflow-hidden flex items-center justify-between px-4">
          <div className="flex items-center gap-2 flex-1">
            <SmileIcon className="w-5 h-5 text-[#6b6b6b]" />
            <Input
              type="text"
              placeholder="Enter Message"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="border-none bg-transparent text-sm focus:outline-none focus:ring-0"
            />
          </div>
          <div className="flex items-center gap-4">
            <StarIcon className="w-5 h-5" />
            <PaperclipIcon className="w-5 h-5" />
            <Button
              size="icon"
              className="w-10 h-10 bg-[#3a2f53] rounded-[20px]"
              onClick={handleSendClick}
              disabled={!messageInput.trim()}
            >
              <SendIcon className="w-5 h-5 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};