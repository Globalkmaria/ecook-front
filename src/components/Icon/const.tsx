import { CiShoppingBasket, CiTextAlignJustify } from 'react-icons/ci';
import {
  IoIosMore,
  IoIosInformationCircleOutline,
  IoMdRemove,
} from 'react-icons/io';
import { PiJarLabelLight, PiTagSimpleFill, PiJar } from 'react-icons/pi';
import { MdLabelOutline, MdGridOn } from 'react-icons/md';
import { IoClose, IoInformationOutline } from 'react-icons/io5';
import { FaRegImage, FaRegTrashCan } from 'react-icons/fa6';

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
};
