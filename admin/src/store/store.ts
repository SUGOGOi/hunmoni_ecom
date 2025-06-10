import type { useStoreType } from "../types/types";

import { create } from "zustand";

import { devtools } from "zustand/middleware";

export const useStore = create<useStoreType>()(
  devtools((set) => ({
    // for active menu (admin sidebar)
    activeMenuItem: null,
    setActiveMenuItem: (change) => set(() => ({ activeMenuItem: change })),

    //for login check
    isLogin: null,
    setIsLogin: (change) => set(() => ({ isLogin: change })),
  }))
);

export const SERVER_URL = "http://localhost:4000";
