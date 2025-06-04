"use client";

import { userAgent } from "next/server";
import { useEffect } from "react";
import { create } from "zustand";

export interface Store {
  userAgent?: ReturnType<typeof userAgent>;
}

// Créer un nouveau store
export const useUserAgentStore = create<Store>((set) => ({
  userAgent: undefined,
}));

// Créer un composant qui prends en paramètre le store et qui initialise le store
export const InjectUserAgent = (props: Store) => {
  useEffect(() => {
    useUserAgentStore.setState(props);
  }, []);
  return null;
};
