// Interface definitions

export interface RootState {
  user: UserState;
  userApi: any;
  auth: any;
}

export interface UserState {
  token: string | null;
  profile: IUser;
  user?: IUser;
  updatePassData: any;
}

export interface EstateSummary {
  id: string;
  estateName: string;
  slug: string;
}

export interface IUser {
  id: string;
  email: string;
  name: string;
  phone: string;
  password: string;
  temporaryPassword: boolean;
  status: "ACTIVE" | "INACTIVE"; // Extend this if you have other status enums
  userType: "TENANTADMIN" | "RESIDENT" | "SUPERADMIN" | "GUARD"; // Adjust based on your system
  createdAt: string; // Use `Date` if parsing to a Date object
  updatedAt: string;
  unitNumber?: string; // Optional field for residents
  estateId?: string; // Optional field for residents
  estate: EstateSummary;
}

export interface EstateAddress {
  id: number;
  streetName: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Tenant {
  id: string;
  estateName: string;
  tenantAdminEmail: string;
  tenantAdminName: string;
  tenantAdminPhone: string;
  paymentReference: string | null;
  isPaymentVerified: boolean;
  paymentVerifiedAt: string | null;
  estateAddressId: number;
  subscriptionStartDate: string;
  subscriptionEndDate: string;
  paymentStatus: "PENDING" | "SUCCESS" | "FAILED";
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  createdAt: string;
  updatedAt: string;
  estateAddress: EstateAddress;
}

export interface PaymentInfo {
  authorization_url: string;
  reference: string;
  access_code: string;
}

export interface CheckoutData {
  tenant: Tenant;
  payment: PaymentInfo;
  verify_url: string;
}

export interface CheckoutPopupProps {
  isOpen: boolean;
  onClose: () => void;
  data: TenantCreationResponse;
}

export interface TenantCreationResponse {
  tenant: {
    id: string;
    email: string;
    name: string;
    phone: string;
    password: string;
    status: "ACTIVE" | "INACTIVE" | string;
    userType: "TENANTADMIN" | string;
    createdAt: string; // ISO 8601 timestamp
    updatedAt: string;
  };
  estate: {
    id: string;
    estateName: string;
    paymentReference: string | null;
    tenantAdminId: string;
    isPaymentVerified: boolean;
    paymentVerifiedAt: string | null;
    estateAddressId: number;
    estatePlan: "ANNUAL" | "BASIC" | "MEDIUM";
    subscriptionStartDate: string;
    subscriptionEndDate: string;
    paymentStatus: "PENDING" | "PAID" | "FAILED" | string;
    estateAddress: {
      id: number;
      streetName: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  payment: {
    authorization_url: string;
    reference: string;
    access_code: string;
  };
  verify_url: string;
}

export interface Resident {
  id: string;
  email: string;
  name: string;
  phone: string;
  status: "ACTIVE" | "INACTIVE";
  unitNumber: string | null;
  userType: "RESIDENT";
  createdAt: string;
  updatedAt: string;
  estateId: string;
}

export interface Guard {
  id: string;
  email: string;
  name: string;
  phone: string;
  status: "ACTIVE" | "INACTIVE";
  unitNumber: string | null;
  userType: "RESIDENT";
  createdAt: string;
  updatedAt: string;
  estateId: string;
}
