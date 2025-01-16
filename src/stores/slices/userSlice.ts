import { StateCreator } from 'zustand';

type UserState = {
  user: {
    username: string | null;
    img: string | null;
    isLoggedIn: boolean;
  };
};

type UserAction = {
  setUser: ({ username, img }: User) => void;
  resetUser: () => void;
};

type User = Pick<UserState['user'], 'username' | 'img'>;

export type UserStore = UserState & UserAction;

const initialUserState: UserState = {
  user: {
    username: null,
    img: null,
    isLoggedIn: false,
  },
};

export const createUserSlice: StateCreator<
  UserStore,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  UserStore
> = (set, get) => ({
  ...initialUserState,
  setUser: ({ username, img }: User) =>
    set(
      (state) => {
        state.user = { username, img, isLoggedIn: true };
      },
      undefined,
      'user/setUser',
    ),
  resetUser: () =>
    set(
      (state) => {
        state.user = { ...initialUserState.user };
      },
      undefined,
      'user/resetUser',
    ),
});
