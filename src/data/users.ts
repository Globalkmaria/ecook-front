export interface User {
  id: string;
  username: string;
  youtube?: string;
  instagram?: string;
  img?: string;
  posts?: string[];
  comments?: string[];
}

export const users = {
  1: {
    id: '1',
    username: 'John Doe',
    img: '/user/user1.png',
    youtube: 'https://www.youtube.com/',
    instagram: 'https://www.instagram.com/',
    posts: ['1'],
    comments: ['1'],
  },
  2: {
    id: '2',
    username: 'Maria Smith',
    img: '/user/user2.png',
    youtube: 'https://www.youtube.com/',
    instagram: 'https://www.instagram.com/',
    posts: ['2'],
    comments: ['2'],
  },
  3: {
    id: '3',
    username: 'Sarah Johnson',
    img: '/user/user3.png',
    youtube: 'https://www.youtube.com/',
    instagram: 'https://www.instagram.com/',
    posts: ['3', '4', '5'],
    comments: ['3', '4', '5'],
  },
  4: {
    id: '4',
    username: 'Jessica Brown',
    img: '/user/user4.png',
    youtube: 'https://www.youtube.com/',
    instagram: 'https://www.instagram.com/',
    posts: ['6'],
    comments: ['6'],
  },
  5: {
    id: '5',
    username: 'Michael Wilson',
    img: '/user/user5.png',
    youtube: 'https://www.youtube.com/',
    instagram: 'https://www.instagram.com/',
    posts: ['7'],
    comments: ['7'],
  },
  6: {
    id: '6',
    username: 'Laura Miller',
  },
};
