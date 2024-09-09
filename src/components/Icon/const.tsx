import { CiShoppingBasket, CiTextAlignJustify } from 'react-icons/ci';
import { IoIosInformationCircleOutline, IoMdRemove } from 'react-icons/io';
import { PiJarLabelLight } from 'react-icons/pi';
import { MdLabelOutline } from 'react-icons/md';
import { IoClose, IoInformationOutline } from 'react-icons/io5';
import { FaRegImage } from 'react-icons/fa6';

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
};
