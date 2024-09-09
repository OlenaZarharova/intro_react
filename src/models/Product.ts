export default interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  postedAt: Date;
  postedBy: string;
  description?: string;
  isSold?: boolean;
}
