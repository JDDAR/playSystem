export interface UserInfo {
  token: string;
  user: {
    id: string;
    userName: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
    identificationNumber: string;
    image: string;
    role: string;
    documentType: string;
  };
}
