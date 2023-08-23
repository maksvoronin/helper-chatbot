import Event from "./event.interface";
import User from "./user.interface";

export default interface Background {
  _id: string;
  title: string;
  visible: boolean;
  type: "image" | "color";
  content: string;
  author: User;
  events: Event[];
}
