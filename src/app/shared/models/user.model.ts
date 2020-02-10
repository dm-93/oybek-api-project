export interface UserModel {
    Email: string;
    FirstName: string;
    LastName: string;
    Role?: string;
    UserId: number;
  }

  export interface UserExtendedModel extends UserModel {
    Password: string;
  }