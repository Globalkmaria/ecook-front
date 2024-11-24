import { User } from '@/service/users/type';
import { createStore } from 'zustand';

export type UserState =
  | Omit<User, 'id'>
  | {
      username: null;
      id: null;
      img: null;
    };

export type UserActions = {
  setUser: (user: User) => void;
  resetUser: () => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  username: null,
  id: null,
  img: null,
};

export const createUserStore = (initialState: UserState = defaultInitState) => {
  return createStore<UserStore>((set) => ({
    ...initialState,
    setUser: (user) => set(user),
    resetUser: () => set(defaultInitState),
  }));
};
