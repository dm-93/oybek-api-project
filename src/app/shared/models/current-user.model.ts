import { UserModel } from './user.model';

export interface CurrentUser {
    Data?: UserModel;
    Success: boolean;
  }