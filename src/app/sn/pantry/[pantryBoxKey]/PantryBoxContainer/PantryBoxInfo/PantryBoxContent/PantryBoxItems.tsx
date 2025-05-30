'use client';

import { getSign } from '@/utils/number';
import { dayLeftUntil, daysPassedSince, formateDate } from '@/utils/time';

import Button from '@/components/Button';
import Chip from '@/components/Chip';
import IconButton from '@/components/IconButton';
import { Input } from '@/components/Input';

import QuantityInput from '@/app/components/common/QuantityInput';
import { getLeftDayChipType } from '@/app/sn/pantry/helper';

import { PantryBoxContentProps } from '.';
import style from './style.module.scss';

export interface PantryBoxItemsProps {
  items: PantryBoxContentProps['pantryBox']['items'];
  onAddItem: () => void;
  onDelete: ItemProps['onDelete'];
  onChange: ItemProps['onChange'];
}

function PantryBoxItems({
  items,
  onAddItem,
  onDelete,
  onChange,
}: PantryBoxItemsProps) {
  return (
    <div className={style['pantry-box-items']}>
      <Button onClick={onAddItem} className={style['add-button']}>
        Add new item
      </Button>
      <ul className={style['items']}>
        {items.map((item) => (
          <Item
            key={item.key}
            item={item}
            onDelete={onDelete}
            onChange={onChange}
          />
        ))}
      </ul>
    </div>
  );
}

export default PantryBoxItems;

type ItemType = PantryBoxItemsProps['items'][number];

type FieldName = keyof ItemType;

interface ItemProps {
  item: ItemType;
  onDelete: (itemKey: string) => void;
  onChange: ({
    pantryBoxItemKey,
    fieldName,
    fieldValue,
  }: {
    pantryBoxItemKey: string;
    fieldName: FieldName;
    fieldValue: ItemType[FieldName];
  }) => void;
}

function Item({ item, onDelete, onChange }: ItemProps) {
  const formatBuyDate = formateDate(item.buyDate);
  const daysPassed = daysPassedSince(formatBuyDate);
  const daysPassedSign = getSign(daysPassed);
  const daysPassedAbs = Math.abs(daysPassed);

  const formatExpireDate = formateDate(item.expireDate);
  const daysLeft = dayLeftUntil(formatExpireDate);
  const leftDayChipType = getLeftDayChipType(daysLeft);
  const daysLeftSign = getSign(daysLeft * -1);
  const daysLeftAbs = Math.abs(daysLeft);

  const onChangeQuantity = (quantity: number) =>
    onChange({
      pantryBoxItemKey: item.key,
      fieldName: 'quantity',
      fieldValue: quantity,
    });

  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as FieldName;
    onChange({
      pantryBoxItemKey: item.key,
      fieldName: name,
      fieldValue: e.target.value,
    });
  };

  return (
    <li key={item.key} className={style['item']}>
      <div className={style['box']}>
        <span className={style['box__title']}>Buy Date</span>
        <Input
          name='buyDate'
          type='date'
          value={formatBuyDate}
          onChange={onDateChange}
        />
        <Chip type='info'>
          {daysPassedSign} {daysPassedAbs}
        </Chip>
      </div>
      <div className={style['box']}>
        <span className={style['box__title']}>Expire Date</span>
        <Input
          name='expireDate'
          type='date'
          value={formatExpireDate}
          onChange={onDateChange}
        />
        <Chip type={leftDayChipType}>
          {daysLeftSign} {daysLeftAbs}
        </Chip>
      </div>

      <div className={style['item__quantity']}>
        <div className={style['box']}>
          <span className={style['box__title']}>Quantity</span>
          <QuantityInput quantity={item.quantity} onChange={onChangeQuantity} />
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
