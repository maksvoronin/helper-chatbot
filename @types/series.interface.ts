import Event from "./event.interface";
import User from "./user.interface";

export default interface Series {
  _id: string;
  name: string;
  by: User;
  link: string;
  visible: boolean;
  created: number;
  events: Event[];
}
