export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  picture: string;
  shippingPoint?: number;
  provider?: string;
}
