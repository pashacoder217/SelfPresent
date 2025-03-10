'use client';

import { createContext, useContext, useState, ReactNode } from "react";

type onbardingContextType = {
  isNext: boolean;
  jurisdiction: string;
  assistantID: string;
  userInfo: Record<string, string>;
  childrenInfo: Record<string, string>;
  saveIsNext: (value: boolean) => void;
  saveJurisdictionInfo: (value: string) => void;
  saveUserInfo: (value: Record<string, string>) => void;
  saveChildrenInfo: (value: Record<string, string>) => void;
  saveAssistant: (value: string) => void;
};

const onboardingContextDefaultValues: onbardingContextType = {
  isNext: false,
  jurisdiction: "",
  assistantID: "",
  userInfo: {},
  childrenInfo: {},
  saveIsNext: () => { },
  saveJurisdictionInfo: () => { },
  saveUserInfo: () => { },
  saveChildrenInfo: () => { },
  saveAssistant: () => { }
};

const OnbardingContext = createContext<onbardingContextType>(onboardingContextDefaultValues);

export const useOnboarding = () => {
  return useContext(OnbardingContext);
}


type Props = {
  children: ReactNode;
};

export const OnboardingProvider = ({ children }: Props) => {
  const [isNext, setIsNext] = useState<boolean>(false);
  const [jurisdiction, setJurisdition] = useState<string>("");
  const [userInfo, setUserInfo] = useState<Record<string, string>>({});
  const [childrenInfo, setChildrenInfo] = useState<Record<string, string>>({});
  const [assistantID, setAssistantID] = useState<string>("");

  const saveIsNext = (value: boolean) => {
    setIsNext(value);
  }
  const saveJurisdictionInfo = (value: string) => {
    setJurisdition(value);
  }
  
  const saveAssistant = (value: string) => {
    setAssistantID(value);
  }
  const saveUserInfo = (value: Record<string, string>) => {
    setUserInfo(value);
  }

  const saveChildrenInfo = (value: Record<string, string>) => {
    setChildrenInfo(value);
  }
  const value = {
    isNext,
    jurisdiction,
    userInfo,
    childrenInfo,
    assistantID,
    saveIsNext,
    saveJurisdictionInfo,
    saveUserInfo,
    saveChildrenInfo,
    saveAssistant,
  }
  return (
    <>
      <OnbardingContext.Provider value={value}>
        {children}
      </OnbardingContext.Provider>
    </>
  )
}