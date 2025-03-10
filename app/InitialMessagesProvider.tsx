// src/app/InitialMessagesProvider.tsx

'use client';

import React, { createContext, useState } from 'react';

export interface Message {
  id: string;
  role: 'function' | 'system' | 'user' | 'assistant' | 'data' | 'tool';
  content: string;
  createdAt?: Date;
}

export const InitialMessagesContext = createContext<{
  initialMessages: Message[];
  setInitialMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}>({
  initialMessages: [],
  setInitialMessages: () => {}
});

export const InitialMessagesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);

  return (
    <InitialMessagesContext.Provider
      value={{ initialMessages, setInitialMessages }}
    >
      {children}
    </InitialMessagesContext.Provider>
  );
};
