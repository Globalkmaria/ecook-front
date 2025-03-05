import style from './style.module.scss';

import Chip, { ChipGroup, ChipProps } from '@/components/Chip';
import ImgCard from '@/components/ImgCard';
import { getPantryBoxLink } from '@/helpers/links';
import { dayLeftUntil, daysPassedSince } from '@/utils/time';
import { getLeftDayChipType } from '../../helper';
import Icon from '@/components/Icon';

interface PantryBox {
  key: string;
  img: string;
  buyDate: string;
  expireDate: string;
  ingredientName: string;
  productName: string;
  quantity: number;
}

interface Props {
  item: PantryBox;
}

function PantryBox({ item }: Props) {
  const title = `${item.ingredientName}${item.productName ? ` / ${item.productName}` : ''}`;
  const img = {
    src: item.img,
    alt: title,
  };
  const link = getPantryBoxLink(item.key);
  const passedDays = daysPassedSince(item.buyDate);
  const leftDays = dayLeftUntil(item.expireDate);
  const noImgContent = <NoImgContent title={title} />;
  const leftDayChipType = getLeftDayChipType(leftDays);
  return (
    <li className={style['pantry-box']}>
      <ImgCard.Container link={link} imgProps={img} noImgContent={noImgContent}>
        <ImgCard.TopOverlay>
          <span>{title}</span>
        </ImgCard.TopOverlay>

        <ImgCard.BottomOverlay>
          <div className={style['pantry-box__bottom-overlay']}>
            <ChipGroup>
              <Chip type='info'>+ {passedDays}</Chip>
              <Chip type={leftDayChipType}>- {leftDays}</Chip>
            </ChipGroup>
            <div className={style['quantity']}>
              <Icon icon='box' />
              <span>{item.quantity}</span>
            </div>
          </div>
        </ImgCard.BottomOverlay>
      </ImgCard.Container>
    </li>
  );
}

export default PantryBox;

function NoImgContent({ title }: { title: string }) {
  return (
    <div className={style['no-img-content']}>
      <span>{title}</span>
    </div>
  );
}
