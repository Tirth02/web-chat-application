import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef();
  const { userInfo } = useAppStore();

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });
      socket.current.on("connect", () => {
        console.log("Connected to socket server");
      });

      const handleRecieveMessage = (message) => {
        const { selectedChatType, selectedChatData, addMessage,addContactsInDMContacts } =
          useAppStore.getState();

        // it is used to check particular user chat suppose meet talks to radhika then when messagecontainer of tirth opens it should not show the messages of meet and radhika
        if (
          selectedChatType !== undefined &&
          (selectedChatData._id === message.sender._id ||
            selectedChatData._id === message.recipient._id)
        ) {
            addMessage(message);
        }
        addContactsInDMContacts(message);
      };

      const handleRecieveChannelMessage = (message) =>{
        const {selectedChatData, selectedChatType, addMessage,addChannelInChannelList} = useAppStore.getState();
        
        if(selectedChatType !== undefined && selectedChatData._id ===message.channelId)
        {
          addMessage(message);
        }
        addChannelInChannelList(message);
      }

      socket.current.on("recieveMessage", handleRecieveMessage);
      socket.current.on("recieve-channel-message",handleRecieveChannelMessage);
      return () => {
        socket.current.disconnect();
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
