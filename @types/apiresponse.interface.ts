export default interface APIResponse<T = {}> {
  status: "error" | "ok";
  message: string;
  data: T;
}
