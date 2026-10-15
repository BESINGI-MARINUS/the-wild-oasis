export type CabinType = {
  id?: string;
  name: string;
  maxCapacity: number;
  regularPrize: number;
  discount: number;
  description: string;
  image: FileList | string | { name: string };
  created_at?: string;
};

export interface SettingsType {
  id?: number;
  breakfastPrice: number;
  created_at?: string;
  maxBookingLength: number;
  maxGuestPerBooking: number;
  minBookingLength: number;
}

export type BookingStatus =
  | "pending"
  | "unconfirmed"
  | "checked-in"
  | "checked-out";

export interface GuestType {
  id: string;
  email: string;
  fullName: string;
  created_at?: string;
  nationalID: string;
  countryFlag?: string;
  nationality: string;
}

export interface BookingType {
  id: number;
  created_at?: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: BookingStatus;
  hasBreakfast: boolean;
  hasPaid: boolean;
  observations: string | null;
  guests: GuestType;
  cabins: CabinType;
}
