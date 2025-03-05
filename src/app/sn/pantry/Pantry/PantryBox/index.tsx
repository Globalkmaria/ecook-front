import style from './style.module.scss';

import Chip, { ChipGroup } from '@/components/Chip';
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

interface PantryBoxProps {
  item: PantryBox;
}

export interface PantryBoxesProps {
  items: PantryBox[];
}

function PantryBoxes({ items }: PantryBoxesProps) {
  return (
    <ul className={style['pantry-boxes']}>
      {items.map((item) => (
        <PantryBox key={item.key} item={item} />
      ))}
    </ul>
  );
}

export default PantryBoxes;

function PantryBox({ item }: PantryBoxProps) {
  const title = `${item.ingredientName}${item.productName ? ` / ${item.productName}` : ''}`;
  const img = {
    src: item.img,
    alt: title,
  };
  const link = getPantryBoxLink(item.key);
  const noImgContent = <NoImgContent title={title} />;
  const passedDays = daysPassedSince(item.buyDate);
  const leftDays = dayLeftUntil(item.expireDate);
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

function NoImgContent({ title }: { title: string }) {
  return (
    <div className={style['no-img-content']}>
      <span>{title}</span>
    </div>
  );
}
