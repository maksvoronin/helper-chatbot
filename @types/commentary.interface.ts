import Decision from "./decision.interface";
import User from "./user.interface";

export default interface Commentary {
  _id: string;
  text: string;
  user: User;
  comment: Decision;
}
