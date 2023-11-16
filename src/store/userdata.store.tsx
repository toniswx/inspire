import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type userDataType = { name: string; email: string };

interface User {
  user: userDataType | undefined;
  isLoading: boolean;
  setUserData: (UserData: { name: string; email: string } | undefined) => void;
  switchLoadingState: (isLoading: boolean) => void;
}

export const useUserData = create<User>()((set) => ({
  user: undefined,
  isLoading: false,
  switchLoadingState: (by) => set((state) => ({ isLoading: by })),

  setUserData: (by) => {
    if (by === undefined) {
      set((state) => ({ user: undefined }));
    } else {
      set((state) => ({ user: { name: by.name, email: by.email } }));
    }
  },
}));
