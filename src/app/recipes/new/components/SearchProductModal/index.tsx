import IngredientInformationHeader from '@/app/recipes/[recipeId]/components/IngredientInformation/IngredientInformationHeader';
import style from './style.module.scss';

import { ProductInfo } from '@/app/recipes/[recipeId]/components/Product';
import Button from '@/components/Button';
import ImageUploader from '@/components/imageUploader';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { IngredientProduct, INGREDIENTS } from '@/data/ingredients';

import useModal from '@/hooks/useModal';
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  ReactNode,
  useState,
} from 'react';
import Image from 'next/image';
import Icon from '@/components/Icon';
import { Ingredient } from '../Ingredients';
import { getRandomId } from '@/utils/generateId';

interface Props {
  control: ReturnType<typeof useModal>;
  onSelectProduct: (product: IngredientProduct) => void;
  selectedIngredient: Ingredient;
}

const NEW_PRODUCT_ID = 'new';

function SearchProductModal({
  control,
  onSelectProduct,
  selectedIngredient,
}: Props) {
  const [newProduct, setNewProduct] = useState<IngredientProduct>({
    id: getRandomId(),
    ingredientId: selectedIngredient.id,
    name: selectedIngredient.name,
    brand: '',
    img: '',
    purchasedFrom: '',
  });
  const [searchInput, setSearchInput] = useState(selectedIngredient.name);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<string | null>();
  const imgState = useState<string | null>(null);

  const products = INGREDIENTS['1'].products;

  const handleSearch = () => {
    setSearchTerm(searchInput);
  };

  const handleInputKeydown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') handleConfirm();
  };

  const handleSearchInputChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setSearchInput(e.target.value);

  const onProductClick = (productId: string) =>
    setSelectedProduct((prev) => (prev === productId ? null : productId));

  const handleConfirm = () => {
    if (searchTerm === '' || selectedProduct === null) {
      control.onClose();
      return;
    }

    onSelectProduct();
    control.onClose();
  };

  return (
    <Modal backgroundType='light' onClose={control.onClose} isOpen={true}>
      <div className={style.wrapper}>
        <div className={style.container}>
          <h2 className={style.title}>Select product</h2>
          <div className={style.search}>
            <Input
              id='search'
              name='search'
              placeholder='Search product'
              value={searchInput}
              onChange={handleSearchInputChange}
              onKeyDown={handleInputKeydown}
            />
            <Button variant='secondary' onClick={handleSearch}>
              Search
            </Button>
          </div>
          <IngredientInformationHeader />

          <ul className={style.list}>
            <ProductContainer
              selectedProduct={selectedProduct}
              id={NEW_PRODUCT_ID}
              onClick={onProductClick}
            >
              <NewProduct />
            </ProductContainer>
            {products.map((product) => (
              <ProductContainer
                selectedProduct={selectedProduct}
                id={product.id}
                onClick={onProductClick}
                key={product.id}
              >
                <Product item={product} />
              </ProductContainer>
            ))}
          </ul>

          <Button className={style['confirm-button']} onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default SearchProductModal;

interface ProductContainerProps {
  children: ReactNode;
  id: string;
  selectedProduct: string | null;
  onClick: (productId: string) => void;
}

function ProductContainer({
  children,
  id,
  selectedProduct,
  onClick,
}: ProductContainerProps) {
  const handleChange: ChangeEventHandler<HTMLInputElement> = () => onClick(id);

  return (
    <li className={style['product-container']} onClick={() => onClick(id)}>
      <input
        className={style.checkbox}
        type='checkbox'
        id={id}
        checked={selectedProduct === id}
        onChange={handleChange}
      />
      {children}
    </li>
  );
}

interface NewProductProps {}
function NewProduct() {
  return (
    <div className={style['new-product']}>
      <h3>New Product</h3>
      <div className={style['img-uploader']}>
        <ImageUploader imgValue={} onChange={} />
      </div>
      <Input placeholder='Product name' name='name' />
      <Input placeholder='Product brand' name='brand' />
      <Input placeholder='Purchased from' name='purchasedFrom' />
    </div>
  );
}

function Product({ item }: { item: IngredientProduct }) {
  const img = item.img || '/ingredient/default.png';

  return (
    <div className={style.product}>
      <div className={style['img-box']}>
        {item.img ? (
          <Image src={img} alt={item.name} fill />
        ) : (
          <Icon icon='img' className={style['img-icon']} />
        )}
      </div>

      <div className={style['product__info']}>
        <ProductInfo item={item} />
      </div>
    </div>
  );
}
