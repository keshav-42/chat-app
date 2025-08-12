import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    const currentUser = useAuthStore.getState().authUser;
    
    console.log("=== SENDING MESSAGE FROM FRONTEND ===");
    console.log("Current user:", currentUser._id, currentUser.fullName);
    console.log("Selected user:", selectedUser._id, selectedUser.fullName);
    console.log("Message data:", messageData);
    console.log("URL being called:", `/messages/send/${selectedUser._id}`);
    
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      console.log("Response from backend:", res.data);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    const currentUser = useAuthStore.getState().authUser;
    
    console.log("=== SUBSCRIBING TO MESSAGES ===");
    console.log("Current logged-in user:", currentUser._id, currentUser.fullName);
    console.log("Selected user (chatting with):", selectedUser._id, selectedUser.fullName);
    console.log("Socket connected:", socket?.connected);

    socket.on("newMessage", (newMessage) => {
      console.log("=== RECEIVED NEW MESSAGE ===");
      console.log("Message:", newMessage);
      console.log("From:", newMessage.senderId);
      console.log("To:", newMessage.receiverId);
      console.log("Current user ID:", currentUser._id);
      console.log("Selected user ID:", selectedUser._id);
      
      // Check if this message is part of the current conversation
      const isMessageInCurrentConversation = 
        (newMessage.senderId === selectedUser._id && newMessage.receiverId === currentUser._id) || // Message from selected user to me
        (newMessage.senderId === currentUser._id && newMessage.receiverId === selectedUser._id);   // Message from me to selected user
      
      console.log("Is message in current conversation?", isMessageInCurrentConversation);
      
      if (!isMessageInCurrentConversation) {
        console.log("Message not for current conversation, ignoring");
        return;
      }

      console.log("Adding message to conversation");
      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    console.log("Unsubscribing from messages");
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
