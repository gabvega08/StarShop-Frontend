export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
  token: string;
}