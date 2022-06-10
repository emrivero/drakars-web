export interface UserData {
  name: string;
  lastName: string;
  dni: string;
  email: string;
  phone: string;
  onlinePay: boolean;
  paymentType?: "visa" | "paypal";
  comments?: string;
}
