import Product from "../models/Product";

const date = new Date();

const currentMonth = date.getMonth();

date.setMonth(currentMonth - 3);

const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Yarn",
    price: 100,
    postedAt: date,
    description: "This is a description",
    images: [
      "https://plus.unsplash.com/premium_photo-1661741344546-8512cc5e4ca0?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.pexels.com/photos/985341/pexels-photo-985341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    postedBy: "user1@email.com",
  },
  {
    id: "2",
    name: "Product 2",
    price: 200,
    postedAt: date,
    description: "This is another description",
    images: [
      "https://plus.unsplash.com/premium_photo-1675799745838-c3b53794db0b?q=80&w=2372&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    postedBy: "user2@email.com",
  },
  {
    id: "3",
    name: "Product 3",
    price: 120,
    postedAt: date,
    description: "This is another description",
    images: [
      "https://images.unsplash.com/photo-1638621785018-a2858a634881?q=80&w=2376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    postedBy: "user3@email.com",
  },
  {
    id: "4",
    name: "Product 4",
    price: 12,
    postedAt: date,
    description: "This is another description",
    images: [
      "https://images.unsplash.com/photo-1502245610427-c7abdffde91b?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    postedBy: "user4@email.com",
  },
  {
    id: "5",
    name: "Product 5",
    price: 12,
    postedAt: date,
    description: "This is another description",
    images: [
      "https://plus.unsplash.com/premium_photo-1661721951340-3ac904b73145?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    postedBy: "user5@email.com",
  },
  {
    id: "6",
    name: "Product 6",
    price: 120,
    postedAt: date,
    description: "This is another description",
    images: [
      "https://images.unsplash.com/photo-1722410180644-ff76ef805092?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    postedBy: "user6@email.com",
  },
];

export default dummyProducts;
