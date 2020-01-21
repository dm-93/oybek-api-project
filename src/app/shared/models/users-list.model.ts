import { PageInfo } from './page-info.model';


export interface UsersListModel<T> {
  Data?: T[];
  PageInfo: PageInfo;
}