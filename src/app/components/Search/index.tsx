'use client';

import { useRef, useState } from 'react';

import style from './style.module.scss';

import { Dropbox, DropboxItem, DropboxWrapper } from '@/components/Dropbox';
import Icon from '@/components/Icon';

import useModal from '@/hooks/useModal';
import { useRouter } from 'next/navigation';
import { SearchParams } from '@/app/search/page';

interface Props {
  searchParamsData?: SearchParams;
}

function Search({ searchParamsData }: Props) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(searchParamsData?.q ?? '');
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>(
    searchParamsData?.type ?? SEARCH_MENU_DEFAULT,
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(e.target.value);

  const onSearch = () => {
    router.push(`/search?type=${selectedMenuItem}&q=${searchQuery}`);
  };

  const onMenuChange = (menuItem: string) => {
    setSelectedMenuItem(menuItem);
  };

  const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <section className={style['search-wrapper']}>
      <div className={style.search}>
        <input
          className={style.input}
          type='text'
          placeholder='What are you looking for?'
          value={searchQuery}
          onChange={onChange}
          onKeyDown={onEnterPress}
        />
        <SearchMenu
          onMenuChange={onMenuChange}
          selectedMenuItem={selectedMenuItem}
        />
        <button type='button' className={style.button} onClick={onSearch}>
          <Icon icon='search' />
        </button>
      </div>
    </section>
  );
}

export default Search;

interface SearchMenuProps {
  onMenuChange: (menuItem: string) => void;
  selectedMenuItem: string;
}

function SearchMenu({ onMenuChange, selectedMenuItem }: SearchMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { isOpen, onClose, onToggle } = useModal();

  const menuArrow = isOpen ? <Icon icon='up' /> : <Icon icon='down' />;

  const onClick = (value: string) => {
    onMenuChange(value);
    onClose();
  };

  return (
    <DropboxWrapper ref={ref} className={style['menu']}>
      <button type='button' className={style['menu__title']} onClick={onToggle}>
        <span>{SEARCH_MENU_ITEMS_MAP[selectedMenuItem]}</span>
        <span className={style.arrow}>{menuArrow}</span>
      </button>
      {isOpen && (
        <Dropbox containerRef={ref} onCloseModal={onClose}>
          {SEARCH_MENU_ITEMS.map((menuItem) => (
            <DropboxItem
              key={menuItem.value}
              selected={selectedMenuItem === menuItem.value}
              onClick={() => onClick(menuItem.value)}
            >
              <span>{menuItem.label}</span>
            </DropboxItem>
          ))}
        </Dropbox>
      )}
    </DropboxWrapper>
  );
}

const SEARCH_MENU_ITEMS: {
  label: string;
  value: string;
}[] = [
  { label: 'Title', value: 'name' },
  { label: 'Tag', value: 'tag' },
  { label: 'Ingredient', value: 'ingredient' },
  { label: 'Product', value: 'product' },
];

const SEARCH_MENU_ITEMS_MAP: { [key: string]: string } =
  SEARCH_MENU_ITEMS.reduce(
    (acc, item) => ({ ...acc, [item.value]: item.label }),
    {},
  );

const SEARCH_MENU_DEFAULT = SEARCH_MENU_ITEMS[0].value;