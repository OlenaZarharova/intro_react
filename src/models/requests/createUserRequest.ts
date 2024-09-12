import User from "../user";

export default interface CreateUserRequest extends User {
  password: string;
  confirmPassword: string;
}
