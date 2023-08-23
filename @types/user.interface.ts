import Application from "./application.interface";
import Background from "./background.interface";
import Comment from "./comment.interface";
import Decision from "./decision.interface";
import Road from "./road.interface";
import System from "./system.interface";

export default interface User {
  _id: string;
  name: string;
  surname: string;
  email: string;
  permissions: number;
  isActivated: boolean;
  avatar: string;
  likedDecisions: Decision[];
  subscribedSystems: System[];
  subscribedComments: Comment[];
  createdSystems: System[];
  createdComments: Comment[];
  createdDecisions: Decision[];
  phone: string;
  background: Background;
  created: number;
  road: Road;
  work: string;
  rating: number;
  createdapps: Application[];
}
