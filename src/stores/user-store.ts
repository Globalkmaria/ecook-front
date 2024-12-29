import { createStore } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type UserState = {
  username: string | null;
  img: string | null;
  isLoggedIn: boolean;
};

export type UserAction = {
  setUser: ({ username, img }: User) => void;
  resetUser: () => void;
};

type User = Pick<UserState, 'username' | 'img'>;

export type UserStore = UserState & UserAction;

const initialState: UserState = {
  username: null,
  img: null,
  isLoggedIn: false,
};

export const createUserStore = (initState: UserState = initialState) =>
  createStore<UserStore>()(
    persist(
      devtools((set) => ({
        ...initState,
        setUser: ({ username, img }: User) =>
          set(
            (state) => ({ ...state, username, img, isLoggedIn: true }),
            undefined,
            'user/setUser',
          ),
        resetUser: () => set(() => initialState, undefined, 'user/resetUser'),
      })),
      { name: 'userStore' },
    ),
  );
