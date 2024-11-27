import { User } from '@/service/users/type';
import { createStore } from 'zustand';
import { devtools } from 'zustand/middleware';

export type UserState =
  | User
  | {
      username: null;
      img: null;
    };

export type UserActions = {
  setUser: (user: User) => void;
  resetUser: () => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  username: null,
  img: null,
};

export const createUserStore = (initialState: UserState = defaultInitState) => {
  return createStore<UserStore>()(
    devtools((set) => ({
      ...initialState,
      setUser: (user) => set(user),
      resetUser: () => set(defaultInitState),
    })),
  );
};
