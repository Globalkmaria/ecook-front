'use client';

import style from './style.module.scss';

import QuantityInput from '@/app/components/common/QuantityInput';
import Button from '@/components/Button';
import IconButton from '@/components/IconButton';
import { Input } from '@/components/Input';
import {
  dayLeftUntil,
  daysPassedSince,
  getDateAfterToday,
  getToday,
} from '@/utils/time';
import { getLeftDayChipType } from '../../helper';
import Chip from '@/components/Chip';
import { PantryBox } from '.';

interface PantryBoxItemsProps {
  items: PantryBox['items'];
  setItems: React.Dispatch<
    React.SetStateAction<
      {
        key: string;
        buyDate: string;
        expireDate: string;
        quantity: number;
      }[]
    >
  >;
}

function PantryBoxItems({ items, setItems }: PantryBoxItemsProps) {
  const onAdd = () =>
    setItems((prev) => [
      ...prev,
      {
        key: `${prev.length + 1}`,
        buyDate: getToday(),
        expireDate: getDateAfterToday(7),
        quantity: 1,
      },
    ]);

  return (
    <div className={style['pantry-box-items']}>
      <Button onClick={onAdd} className={style['add-button']}>
        Add new item
      </Button>
      <ul className={style['items']}>
        {items.map((item) => (
          <Item key={item.key} item={item} setItems={setItems} />
        ))}
      </ul>
    </div>
  );
}

export default PantryBoxItems;

interface ItemProps {
  item: PantryBox['items'][number];
  setItems: React.Dispatch<
    React.SetStateAction<
      {
        key: string;
        buyDate: string;
        expireDate: string;
        quantity: number;
      }[]
    >
  >;
}

function Item({ item, setItems }: ItemProps) {
  const daysPassed = daysPassedSince(item.buyDate);
  const daysLeft = dayLeftUntil(item.expireDate);
  const leftDayChipType = getLeftDayChipType(daysLeft);

  const onChange = (quantity: number) =>
    setItems((prev) =>
      prev.map((prevItem) =>
        prevItem.key === item.key ? { ...prevItem, quantity } : prevItem,
      ),
    );

  const onDelete = (key: string) =>
    setItems((prev) => prev.filter((i) => i.key !== key));

  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setItems((prev) =>
      prev.map((prevItem) =>
        prevItem.key === item.key
          ? { ...prevItem, [e.target.name]: e.target.value }
          : prevItem,
      ),
    );

  return (
    <li key={item.key} className={style['item']}>
      <div className={style['box']}>
        <span className={style['box__title']}>Buy Date</span>
        <Input
          name='buyDate'
          type='date'
          value={item.buyDate}
          onChange={onDateChange}
        />
        <Chip type='info'>+ {daysPassed}</Chip>
      </div>
      <div className={style['box']}>
        <span className={style['box__title']}>Expire Date</span>
        <Input
          name='expireDate'
          type='date'
          value={item.expireDate}
          onChange={onDateChange}
        />
        <Chip type={leftDayChipType}>- {daysLeft}</Chip>
      </div>

      <div className={style['item__quantity']}>
        <div className={style['box']}>
          <span className={style['box__title']}>Quantity</span>
          <QuantityInput quantity={item.quantity} onChange={onChange} />
        </div>
        <IconButton
          icon='trash'
          className={style['delete-button']}
          onClick={() => onDelete(item.key)}
        >
          Delete
        </IconButton>
      </div>
    </li>
  );
}
