import { CiShoppingBasket, CiTextAlignJustify } from 'react-icons/ci';
import {
  IoIosMore,
  IoIosInformationCircleOutline,
  IoMdRemove,
  IoMdAdd,
} from 'react-icons/io';
import { PiJarLabelLight, PiTagSimpleFill, PiJar } from 'react-icons/pi';
import { MdLabelOutline, MdGridOn, MdOutlineEdit } from 'react-icons/md';
import { IoClose, IoInformationOutline, IoSearch } from 'react-icons/io5';
import { FaRegImage, FaRegTrashCan } from 'react-icons/fa6';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import { RxReset } from 'react-icons/rx';

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
] as const;

export type IconButtonType = (typeof ICON_NAMES)[number];

export const ICONS: {
  [key in IconButtonType]: JSX.Element;
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
};

export const ICON_TITLES: { [key in IconButtonType]: string } = {
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
};
