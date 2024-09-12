export default interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  postedAt: Date;
  ownerId: number;
  ownerEmail: string;
  description?: string;
  isSold?: boolean;
}
