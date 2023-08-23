import Commentary from "./commentary.interface";
import User from "./user.interface";

export default interface Decision {
  _id: string;
  content: string;
  by: User;
  link: string;
  visible: boolean;
  created: number;
  comment: Comment;
  file?: string;
  events: Event[];
  comments: Commentary[];
}
