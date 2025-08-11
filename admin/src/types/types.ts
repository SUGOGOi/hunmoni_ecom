export interface adminDetails {
  id: string;
  name: string;
  email: string;
  phone?: string | null | undefined;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  role: "ADMIN" | "CUSTOMER";
  photoUrl: string | null;
  firebaseUid: string;
  provider: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Brand {
  id: string;
  name: string;
  description: string;
  logoKey: string;
  logoUrl: string;
  status: string;
  createdAt: string;
}

export interface BrandInput {
  name: string;
  description: string;
  status: string;
  file: File | null;
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

  brands: Brand[] | null;
  setBrands: (change: Brand[] | null) => void;
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
