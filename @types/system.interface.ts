import User from "./user.interface";

export default interface System {
  _id: string;
  name: string;
  by: User;
  link: string;
  visible: boolean;
  created: number;
  usingJournals: boolean;
  events: Event[];
}
