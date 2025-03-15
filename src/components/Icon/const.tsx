import { BiCabinet } from 'react-icons/bi';
import { CiShoppingBasket, CiTextAlignJustify } from 'react-icons/ci';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import {
  FaRegImage,
  FaRegTrashCan,
  FaBookmark,
  FaRegBookmark,
} from 'react-icons/fa6';
import { GoInbox } from 'react-icons/go';
import {
  IoIosMore,
  IoIosInformationCircleOutline,
  IoMdRemove,
  IoMdAdd,
} from 'react-icons/io';
import { IoClose, IoInformationOutline, IoSearch } from 'react-icons/io5';
import { MdLabelOutline, MdGridOn, MdOutlineEdit } from 'react-icons/md';
import {
  PiBookBookmarkBold,
  PiJarLabelLight,
  PiTagSimpleFill,
  PiJar,
  PiShoppingCartBold,
} from 'react-icons/pi';
import { RxReset } from 'react-icons/rx';

// eslint-disable-next-line  @typescript-eslint/no-unused-vars
const ICON_NAMES = [
  'basket',
  'info',
  'infoOutline',
  'text',
  'product',
  'label',
  'close',
  'img',
  'remove',
  'labelFill',
  'jar',
  'grid',
  'more',
  'trash',
  'edit',
  'reset',
  'up',
  'down',
  'search',
  'add',
  'bookmarkOutline',
  'bookmarkFill',
  'book',
  'cart',
  'cabinet',
  'box',
] as const;

export type IconType = (typeof ICON_NAMES)[number];

export const ICONS: {
  [key in IconType]: JSX.Element;
} = {
  basket: <CiShoppingBasket />,
  infoOutline: <IoIosInformationCircleOutline />,
  info: <IoInformationOutline />,
  text: <CiTextAlignJustify />,
  product: <PiJarLabelLight />,
  label: <MdLabelOutline />,
  close: <IoClose />,
  img: <FaRegImage />,
  remove: <IoMdRemove />,
  labelFill: <PiTagSimpleFill />,
  jar: <PiJar />,
  grid: <MdGridOn />,
  more: <IoIosMore />,
  trash: <FaRegTrashCan />,
  edit: <MdOutlineEdit />,
  reset: <RxReset />,
  up: <FaAngleUp />,
  down: <FaAngleDown />,
  search: <IoSearch />,
  add: <IoMdAdd />,
  bookmarkOutline: <FaRegBookmark />,
  bookmarkFill: <FaBookmark />,
  book: <PiBookBookmarkBold />,
  cart: <PiShoppingCartBold />,
  cabinet: <BiCabinet />,
  box: <GoInbox />,
};

export const ICON_TITLES: { [key in IconType]: string } = {
  basket: 'basket',
  infoOutline: 'information',
  info: 'information',
  text: 'text',
  product: 'product',
  label: 'label',
  close: 'close',
  img: 'image',
  remove: 'remove',
  labelFill: 'label',
  jar: 'jar',
  grid: 'grid',
  more: 'more',
  trash: 'trash',
  edit: 'edit',
  reset: 'reset',
  up: 'up',
  down: 'down',
  search: 'search',
  add: 'add',
  bookmarkOutline: 'save item',
  bookmarkFill: 'saved item',
  book: 'book',
  cart: 'cart',
  cabinet: 'cabinet',
  box: 'box',
};
