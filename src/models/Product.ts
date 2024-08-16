export default interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  postedAt: Date;
  description?: string;
  isSold?: boolean;
}
