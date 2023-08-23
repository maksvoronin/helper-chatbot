import Event from "./event.interface";
import System from "./system.interface";
import User from "./user.interface";

export default interface Comment {
  _id: string;
  content: string;
  by: User;
  link: string;
  visible: boolean;
  created: number;
  system: System;
  series: Series;
  decisions: Decision[];
  file?: string;
  events: Event[];
}
