import { StateCreator } from 'zustand';

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

const initialUserState: UserState = {
  username: null,
  img: null,
  isLoggedIn: false,
};

export const createUserSlice: StateCreator<
  UserStore,
  [['zustand/devtools', never]],
  [],
  UserStore
> = (set, get) => ({
  ...initialUserState,
  setUser: ({ username, img }: User) =>
    set(() => ({ username, img, isLoggedIn: true }), undefined, 'user/setUser'),
  resetUser: () => set(() => initialUserState, undefined, 'user/resetUser'),
});
