import User from "./user.interface";

export default interface Application {
  _id: string;
  name: string;
  description: string;
  owner: User;
  usage: string;
  token: string;
  status: boolean;
  joinURI?: string;
}
