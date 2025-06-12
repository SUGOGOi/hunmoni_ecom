export interface adminDetails {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  is_email_verified: boolean;
  is_phone_verified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface useStoreType {
  //for active menu
  activeMenuItem: string | null;
  setActiveMenuItem: (change: string | null) => void;

  isLogin: boolean | null;
  setIsLogin: (change: boolean | null) => void;

  //for admin details
  admin: adminDetails | null;
  setAdmin: (change: adminDetails | null) => void;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  type: "percentage" | "fixed";
  value: number;
  minOrderAmount: number;
  maxDiscount?: number;
  usageLimit: number;
  usedCount: number;
  status: "active" | "inactive" | "expired";
  startDate: string;
  endDate: string;
  createdDate: string;
}

export interface CouponModalProps {
  isOpen: boolean;
  mode: "add" | "edit" | "view";
  coupon: Coupon | null;
  onClose: () => void;
  onSave: (coupon: Coupon) => void;
}
