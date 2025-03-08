import style from './style.module.scss';

import Icon from '@/components/Icon';

interface QuantityProps {
  quantity: number;
  onChange: (quantity: number) => void;
}

function QuantityInput({ quantity, onChange }: QuantityProps) {
  const LeftButton = quantity <= 1 ? RemoveButton : MinusButton;
  return (
    <div className={style['quantity']}>
      <LeftButton quantity={quantity} onChange={onChange} />
      {quantity}
      <PlusButton quantity={quantity} onChange={onChange} />
    </div>
  );
}

export default QuantityInput;

function RemoveButton({ onChange }: QuantityProps) {
  const onClick = () => {
    onChange(0);
  };

  return (
    <button onClick={onClick} type='button'>
      <Icon icon='trash' />
    </button>
  );
}
function MinusButton({ quantity, onChange }: QuantityProps) {
  const onClick = () => {
    onChange(quantity - 1);
  };

  return (
    <button onClick={onClick} type='button'>
      <Icon icon='remove' />
    </button>
  );
}

function PlusButton({ quantity, onChange }: QuantityProps) {
  const onClick = () => {
    onChange(quantity + 1);
  };

  return (
    <button onClick={onClick} type='button'>
      <Icon icon='add' />
    </button>
  );
}
