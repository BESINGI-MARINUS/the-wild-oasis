export type CabinType = {
  id: string;
  name: string;
  maxCapacity: number;
  regularPrize: number;
  discount: number;
  description: string;
  image: File | string;
  created_at?: string;
};
