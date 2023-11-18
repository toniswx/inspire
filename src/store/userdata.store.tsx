import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

export type userDataType = { name: string; email: string };

interface User {
  user: userDataType | undefined;
  isLoading: boolean;
  openModaltoLogin: boolean;
  setUserData: (UserData: { name: string; email: string } | undefined) => void;
  switchLoadingState: (isLoading: boolean) => void;
}

export const useUserData = create<User>()(
  devtools(
    persist(
      (set) => ({
        user: undefined,
        isLoading: false,
        openModaltoLogin:false,
        switchLoadingState: (by) => set((state) => ({ isLoading: by })),
        setUserData: (by) => {
          if (by === undefined) {
            set((state) => ({ user: undefined }));
          } else {
            set((state) => ({ user: { name: by.name, email: by.email } }));
          }
        },
      }), // Move the closing parenthesis here
      {
        name: "user-quick-data", // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      }
    )
  )
);
