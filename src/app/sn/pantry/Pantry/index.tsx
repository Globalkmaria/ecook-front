import style from './style.module.scss';

import PantryBox from './PantryBox';

const PANTRY_BOX = {
  key: '1',
  img: '/img/bg1.png',
  buyDate: '2025-03-01',
  expireDate: '2025-03-10',
  ingredientName: 'Delicious Onion Allium Cepa',
  productName: 'Delicious Product',
  quantity: 1,
} as const;

function Pantry() {
  const array = Array.from({ length: 10 }, (_, i) => i);

  return (
    <ul className={style['pantry']}>
      {array.map((_, i) => (
        <PantryBox key={i} item={PANTRY_BOX} />
      ))}
    </ul>
  );
}

export default Pantry;
