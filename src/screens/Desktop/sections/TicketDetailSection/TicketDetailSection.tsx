import React from "react";
import { Avatar, AvatarFallback } from "../../../../components/ui/avatar";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { Ticket } from "../../../../types/ticket";
import { formatDistanceToNow } from 'date-fns';

interface TicketDetailSectionProps {
  tickets: Ticket[];
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  setPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  onTicketSelect: (ticketId: number) => void;
}

export const TicketDetailSection = ({
  tickets,
  currentPage,
  itemsPerPage,
  totalPages,
  setPage,
  setItemsPerPage,
  onTicketSelect
}: TicketDetailSectionProps): JSX.Element => {
  return (
    <section className="flex flex-col w-full max-w-full lg:max-w-[684px] gap-6 p-4 lg:p-6 overflow-x-auto">
      <Card className="border-0 shadow-none">
        <div className="min-w-[300px]">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[200px] font-semibold text-sm text-[#6b6b6b]">
                  Name
                </TableHead>
                <TableHead className="hidden sm:table-cell w-[187px] font-semibold text-sm text-[#6b6b6b]">
                  Subject
                </TableHead>
                <TableHead className="hidden sm:table-cell w-[100px] font-semibold text-sm text-[#6b6b6b]">
                  Timestamp
                </TableHead>
                <TableHead className="w-[54px] font-semibold text-sm text-[#6b6b6b]">
                  State
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow
                  key={ticket.id}
                  className="hover:bg-gray-50 bg-white cursor-pointer"
                  style={{
                    boxShadow: "0px 2px 4px #e2dfe9cc",
                    borderRadius: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                  onClick={() => onTicketSelect(ticket.id)}
                >
                  <TableCell className="flex items-center gap-2 py-1">
                    <Avatar className="w-10 h-10 bg-[#d9d9d9] rounded-[20px]">
                      <AvatarFallback className="bg-[#d9d9d9]">
                        {ticket.customer_name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-normal text-sm text-[#252426]">
                      {ticket.customer_name}
                    </span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell font-normal text-sm text-[#252526] py-1">
                    {ticket.subject}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell font-normal text-sm text-[#6b6b6b] py-1">
                    {formatDistanceToNow(new Date(ticket.timestamp), { addSuffix: true })}
                  </TableCell>
                  <TableCell className="py-1">
                    <Badge 
                      className={`font-normal px-2 py-1 rounded-lg ${
                        ticket.status === 'open' 
                          ? 'bg-[#caedff] text-[#2b9ed7]' 
                          : ticket.status === 'pending'
                          ? 'bg-[#fff3ca] text-[#d7962b]'
                          : 'bg-[#ffcaca] text-[#d72b2b]'
                      }`}
                    >
                      {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 sm:gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#6b6b6b]">Rows per page:</span>
          <Select 
            value={itemsPerPage.toString()} 
            onValueChange={(value) => setItemsPerPage(parseInt(value))}
          >
            <SelectTrigger className="h-4 w-16 p-1 text-xs bg-white shadow-[0px_1px_3px_#d2cbe5e6] rounded">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          <Button
            variant="outline"
            size="icon"
            className="w-4 h-4 p-0 flex items-center justify-center bg-white rounded-full shadow-[0px_1px_3px_#d2cbe5]"
            onClick={() => setPage(1)}
            disabled={currentPage === 1}
          >
            {"<<"}
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="w-4 h-4 p-0 flex items-center justify-center bg-white rounded-full shadow-[0px_1px_3px_#d2cbe5]"
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant="ghost"
                size="icon"
                className="w-4 h-4 p-0 flex items-center justify-center rounded"
                onClick={() => setPage(page)}
              >
                <span className={`text-xs ${
                  currentPage === page 
                    ? "font-semibold text-[#7336e6]" 
                    : "font-normal text-[#00000066]"
                }`}>
                  {page}
                </span>
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="w-4 h-4 p-0 flex items-center justify-center bg-white rounded-full shadow-[0px_1px_3px_#d2cae5]"
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {">"}
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="w-4 h-4 p-0 flex items-center justify-center bg-white rounded-full shadow-[0px_1px_3px_#d2cae5]"
            onClick={() => setPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            {">>"}
          </Button>
        </div>
      </div>
    </section>
  );
};