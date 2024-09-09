import { ChangeEventHandler, memo, useState } from 'react';

import style from './style.module.scss';

import { Input } from '@/components/Input';
import useModal from '@/hooks/useModal';
import { Modal2 } from '@/components/Modal';
import Button, { ButtonProps } from '@/components/Button';

import { RemoveButton } from './buttons';

export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  productId: string | null;
}

interface Props {
  ingredients: Ingredient[];
  onRemove: (id: string) => void;
  onChange: (id: string, fieldName: string, value: string) => void;
}

function Ingredients({
  ingredients,
  onRemove,
  onChange,
}: Props): React.ReactElement<Props> | null {
  return (
    <ul className={style.ingredients}>
      {ingredients.map((item) => (
        <Ingredient
          onChange={onChange}
          onRemove={onRemove}
          key={item.id}
          item={item}
        />
      ))}
    </ul>
  );
}

export default memo(Ingredients);

interface IngredientProps {
  item: Ingredient;
  onRemove: (id: string) => void;
  onChange: (id: string, fieldName: string, value: string) => void;
}

interface Product {
  id: string;
  name: string;
}

function Ingredient({ item, onRemove, onChange }: IngredientProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const control = useModal();

  const productButtonType: ButtonProps['variant'] = product
    ? 'success'
    : 'secondary';
  const productButtonTitle = product ? 'Product selected' : 'Select product';

  const handleValueChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    onChange(item.id, e.target.name, e.target.value);

  const handleProductSelect = (product: Product) => {
    onChange(item.id, 'productId', product.id);
    setProduct(product);
  };

  return (
    <li className={style.ingredient}>
      <div className={style['ingredient__inputs']}>
        <Input
          onChange={handleValueChange}
          className={style['ingredient__quantity']}
          placeholder='Quantity...'
          type='text'
          id='quantity'
          name='quantity'
          value={item.quantity}
        />
        <Input
          onChange={handleValueChange}
          className={style['ingredient__name']}
          placeholder='Ingredient name'
          type='text'
          id='name'
          name='name'
          value={item.name}
        />
      </div>
      <div className={style['ingredient__buttons']}>
        <Button variant={productButtonType} onClick={control.onOpen}>
          {productButtonTitle}
        </Button>
        <RemoveButton onClick={() => onRemove(item.id)} />
      </div>

      {control.isOpen && (
        <ProductModal onProductSelect={handleProductSelect} control={control} />
      )}
    </li>
  );
}

interface ProductModalProps {
  control: ReturnType<typeof useModal>;
  onProductSelect: (product: Product) => void;
}
function ProductModal({ control }: ProductModalProps) {
  return <Modal2 onClose={control.onClose}>hello</Modal2>;
}
