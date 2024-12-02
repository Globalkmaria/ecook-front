import { createStore } from 'zustand';
import { devtools } from 'zustand/middleware';

import { me } from '@/service/auth';
import { User } from '@/service/users/type';

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
    devtools((set) => {
      const getUser = async () => {
        const response = await me();
        if (response.ok)
          set({
            username: response.data.username,
            img: response.data.img,
          });
      };

      getUser();

      return {
        ...initialState,
        setUser: (user) => set(user),
        resetUser: () => set(defaultInitState),
      };
    }),
  );
};
