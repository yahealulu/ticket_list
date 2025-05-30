export interface Message {
  sender: 'customer' | 'agent';
  message: string;
  timestamp: string;
}

export interface Ticket {
  id: number;
  customer_name: string;
  subject: string;
  status: 'open' | 'pending' | 'closed';
  timestamp: string;
  messages: Message[];
}

export interface TicketState {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
  currentStatus: 'open' | 'pending' | 'closed';
  currentPage: number;
  itemsPerPage: number;
  selectedTicket: Ticket | null;
  messageInput: string;
  searchQuery: string;
}