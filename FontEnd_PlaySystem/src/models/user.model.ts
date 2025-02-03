export interface UserInfo {
  token: string;
  user: {
    id: string;
    userName: string;
    image: string;
    role:
      | "ADMINISTRATOR"
      | "CLIENT"
      | "PRODUCTION"
      | "LOGISTICS"
      | "PACKAGING"
      | "DELIVERY";
  };
}
