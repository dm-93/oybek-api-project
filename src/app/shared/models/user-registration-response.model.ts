export interface UserRegistrationResponse {
    Data?: {
      UserId: number;
      Email: string;
      FirstName: string;
      LastName: string;
    },
    Success: boolean;
  }