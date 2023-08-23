import Event from "./event.interface";

export default interface Road {
  _id: string;
  name: string;
  link: string;
  visible: boolean;
  created: number;
  events: Event[];
}
