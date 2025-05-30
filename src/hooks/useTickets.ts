import { useState, useEffect } from 'react';
import axios from 'axios';
import { Ticket, TicketState } from '../types/ticket';

const API_URL = 'https://openapi.pythonanywhere.com/api/tickets';

export const useTickets = () => {
  const [state, setState] = useState<TicketState>({
    tickets: [],
    loading: true,
    error: null,
    currentStatus: 'open',
    currentPage: 1,
    itemsPerPage: 10,
    selectedTicket: null,
    messageInput: '',
    searchQuery: ''
  });

  const fetchTickets = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await axios.get(API_URL);
      setState(prev => ({ ...prev, tickets: response.data, loading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to fetch tickets'
      }));
    }
  };

  const fetchTicketDetails = async (ticketId: number) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await axios.get(`${API_URL}/${ticketId}`);
      setState(prev => ({ ...prev, selectedTicket: response.data, loading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to fetch ticket details'
      }));
    }
  };

  const sendMessage = async (message: string) => {
    if (!state.selectedTicket) return;
    
    try {
      setState(prev => ({ ...prev, loading: true }));
      await axios.post(`${API_URL}/${state.selectedTicket.id}/reply`, {
        sender: 'agent',
        message
      });
      await fetchTicketDetails(state.selectedTicket.id);
      setState(prev => ({ ...prev, messageInput: '' }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to send message'
      }));
    }
  };

  const setMessageInput = (message: string) => {
    setState(prev => ({ ...prev, messageInput: message }));
  };

  const setSearchQuery = (query: string) => {
    setState(prev => ({ ...prev, searchQuery: query, currentPage: 1 }));
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const filteredTickets = state.tickets
    .filter(ticket => ticket.status === state.currentStatus)
    .filter(ticket => 
      state.searchQuery
        ? ticket.customer_name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          ticket.subject.toLowerCase().includes(state.searchQuery.toLowerCase())
        : true
    );

  const totalPages = Math.ceil(filteredTickets.length / state.itemsPerPage);

  const paginatedTickets = filteredTickets.slice(
    (state.currentPage - 1) * state.itemsPerPage,
    state.currentPage * state.itemsPerPage
  );

  const setStatus = (status: 'open' | 'pending' | 'closed') => {
    setState(prev => ({ ...prev, currentStatus: status, currentPage: 1 }));
  };

  const setPage = (page: number) => {
    setState(prev => ({ ...prev, currentPage: page }));
  };

  const setItemsPerPage = (items: number) => {
    setState(prev => ({ ...prev, itemsPerPage: items, currentPage: 1 }));
  };

  return {
    tickets: paginatedTickets,
    loading: state.loading,
    error: state.error,
    currentStatus: state.currentStatus,
    currentPage: state.currentPage,
    itemsPerPage: state.itemsPerPage,
    totalPages,
    setStatus,
    setPage,
    setItemsPerPage,
    totalTickets: filteredTickets.length,
    selectedTicket: state.selectedTicket,
    fetchTicketDetails,
    messageInput: state.messageInput,
    setMessageInput,
    sendMessage,
    searchQuery: state.searchQuery,
    setSearchQuery
  };
};