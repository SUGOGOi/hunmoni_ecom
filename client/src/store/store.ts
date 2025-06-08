import type { useStoreType } from "../types/types";

import { create } from "zustand";

import { devtools } from "zustand/middleware";

export const useStore = create<useStoreType>()(
  devtools((set) => ({
    // for active menu (admin sidebar)
    activeMenuItem: null,
    setActiveMenuItem: (change) => set(() => ({ activeMenuItem: change })),
  }))
);
