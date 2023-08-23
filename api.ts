import { APIResponse, Comment, System } from "./@types";

export const getSystems = async (): Promise<System[]> => {
  const response = await fetch(`https://helper.voronin.xyz/api/dev/${process.env.HELPER_TOKEN}/system/all`).then(r => r.json()) as APIResponse<System[]>;
  if(response.status === "error") throw new Error("Some error: " + response.message);
  return response.data as System[];
}

export const getComments = async (system_id: string): Promise<Comment[]> => {
  const response = await fetch(`https://helper.voronin.xyz/api/dev/${process.env.HELPER_TOKEN}/comment/system?id=${system_id}`).then(r => r.json()) as APIResponse<Comment[]>;
  if(response.status === "error") throw new Error("Some error: " + response.message);
  return response.data as Comment[];
}