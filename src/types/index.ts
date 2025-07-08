// Core type definitions for the HQ House membership system

export interface House {
  id: string;
  name: string;
  slug: string; // e.g., "kenya", "dc"
  location: string;
  currency: string;
  description: string;
  heroImage?: string;
  benefits: string[];
  testimonials: Testimonial[];
  createdAt: string;
  updatedAt: string;
}

export interface MembershipType {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  initiationFee: number;
  currency: string;
  features: string[];
  accessLevel: 'basic' | 'premium' | 'executive' | 'corporate';
  maxMembers?: number; // For corporate memberships
  billingInterval: 'monthly' | 'annual';
  trialPeriod?: number; // in days
  isActive: boolean;
  houseId: string;
}

export interface Member {
  id: string;
  houseId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  membershipTypeId: string;
  status: 'active' | 'inactive' | 'suspended' | 'cancelled';
  joinDate: string;
  nextBillingDate: string;
  stripeCustomerId?: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  houseId: string;
  membershipTypeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  jobTitle?: string;
  motivation: string;
  referralSource?: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNotes?: string;
  paymentLinkSent?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  memberId: string;
  houseId: string;
  amount: number;
  currency: string;
  type: 'initiation' | 'monthly' | 'annual' | 'prorated';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  stripePaymentIntentId?: string;
  billingPeriodStart?: string;
  billingPeriodEnd?: string;
  failureReason?: string;
  retryCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Admin {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'super_admin' | 'admin' | 'manager';
  assignedHouses: string[]; // House IDs this admin can manage
  permissions: AdminPermission[];
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminPermission {
  resource: 'members' | 'applications' | 'payments' | 'analytics' | 'settings';
  actions: ('view' | 'create' | 'edit' | 'delete')[];
}

export interface Testimonial {
  id: string;
  memberName: string;
  memberTitle?: string;
  content: string;
  rating: number;
  featured: boolean;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: 'welcome' | 'application_approved' | 'application_rejected' | 'payment_failed' | 'newsletter' | 'custom';
  houseId: string;
}

export interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  content: string;
  recipients: string[];
  scheduledAt?: Date;
  sentAt?: Date;
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  houseId: string;
}

export interface Analytics {
  houseId: string;
  totalRevenue: number;
  monthlyRevenue: number;
  activeMembers: number;
  newMembersThisMonth: number;
  churnRate: number;
  averageRevenuePerMember: number;
  failedPayments: number;
  period: string;
}
