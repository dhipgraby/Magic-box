import React, { useState } from 'react';

export const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [globalVariable, setGlobalVariable] = useState(null);
  const [chatConversation, setChatConversation] = useState({ fileName: "default.json", content: [], docname: "New conversation" })

  return (
    <GlobalContext.Provider value={{ globalVariable, setGlobalVariable, chatConversation, setChatConversation }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
