import Address from "./address";

export default interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
}
