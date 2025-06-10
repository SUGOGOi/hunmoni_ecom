export interface useStoreType {
  //for active menu
  activeMenuItem: string | null;
  setActiveMenuItem: (change: string | null) => void;

  isLogin: boolean | null;
  setIsLogin: (change: boolean | null) => void;
}

export interface LoginFormData {
  email: string;
  password: string;
}
