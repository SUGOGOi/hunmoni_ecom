export interface useStoreType {
  //for active menu
  activeMenuItem: string | null;
  setActiveMenuItem: (change: string | null) => void;
}
