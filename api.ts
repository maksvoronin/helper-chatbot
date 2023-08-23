import axios from "axios";
import { APIResponse, Comment, System } from "./@types";

export const getSystems = async (): Promise<System[]> => {
  const response = (await axios.get<APIResponse<System[]>>(
    `https://helper.voronin.xyz/api/dev/${process.env.HELPER_TOKEN}/system/all`
  ));
  if (response.data.status === "error")
    throw new Error("Some error: " + response.data.message);
  return response.data.data as System[];
};

export const getComments = async (system_id: string): Promise<Comment[]> => {
  const response = await axios.get<APIResponse<Comment[]>>(
    `https://helper.voronin.xyz/api/dev/${process.env.HELPER_TOKEN}/comment/system?id=${system_id}`
  );
  if (response.data.status === "error")
    throw new Error("Some error: " + response.data.message);
  return response.data.data as Comment[];
};
