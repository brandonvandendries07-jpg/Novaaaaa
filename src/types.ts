export type Page = 'home' | 'gallery' | 'booking' | 'pricing';

export interface Booking {
  id?: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  address: string;
  vehicle_type: string;
  service: string;
  preferred_date: string;
  comment: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  vehicle: string;
  service: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface Realization {
  id: number;
  vehicle: string;
  type: 'interieur' | 'exterieur' | 'complet';
  service: string;
  duration: string;
  beforeImage: string;
  afterImage: string;
}

export interface PricingCard {
  id: string;
  name: string;
  type: 'care' | 'premium' | 'subscription';
  description?: string;
  price: number;
  features: string[];
  popular?: boolean;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}
