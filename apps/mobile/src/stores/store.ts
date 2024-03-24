import { create } from "zustand";

interface MainStore {
  userId: string | undefined;
  setUserId: (userId: string) => void;
}

export const useMainStore = create<MainStore>()((set) => ({
  userId: undefined,
  setUserId: (userId) => set({ userId }),
}));
