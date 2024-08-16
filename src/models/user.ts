import Address from "./address";

export default interface User {
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
}
