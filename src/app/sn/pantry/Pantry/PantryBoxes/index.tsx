import { getSign } from '@/utils/number';
import { dayLeftUntil, daysPassedSince } from '@/utils/time';

import { getPantryBoxLink } from '@/helpers/links';

import Chip, { ChipGroup } from '@/components/Chip';
import Icon from '@/components/Icon';
import ImgCard from '@/components/ImgCard';

import style from './style.module.scss';
import { getLeftDayChipType } from '../../helper';

interface PantryBoxData {
  key: string;
  img?: string | null;
  buyDate: string;
  expireDate: string;
  ingredientName: string;
  productName?: string | null;
  quantity: number;
}

interface PantryBoxProps {
  item: PantryBoxData;
}

export interface PantryBoxesProps {
  items: PantryBoxData[];
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
    src: item.img || '',
    alt: title,
  };
  const link = getPantryBoxLink(item.key);
  const noImgContent = <NoImgContent title={title} />;

  const daysPassed = daysPassedSince(item.buyDate);
  const daysPassedSign = getSign(daysPassed);
  const daysPassedAbs = Math.abs(daysPassed);

  const daysLeft = dayLeftUntil(item.expireDate);
  const leftDayChipType = getLeftDayChipType(daysLeft);
  const daysLeftSign = getSign(daysLeft * -1);
  const daysLeftAbs = Math.abs(daysLeft);

  return (
    <li className={style['pantry-box']}>
      <ImgCard.Container link={link} imgProps={img} noImgContent={noImgContent}>
        <ImgCard.TopOverlay>
          <span>{title}</span>
        </ImgCard.TopOverlay>

        <ImgCard.BottomOverlay>
          <div className={style['pantry-box__bottom-overlay']}>
            <ChipGroup>
              <Chip type='info'>
                {daysPassedSign} {daysPassedAbs}
              </Chip>
              <Chip type={leftDayChipType}>
                {daysLeftSign} {daysLeftAbs}
              </Chip>
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
