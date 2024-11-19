'use client';

import { useRef, useState } from 'react';

import style from './style.module.scss';

import { Dropbox, DropboxItem, DropboxWrapper } from '@/components/Dropbox';
import Icon from '@/components/Icon';

import useModal from '@/hooks/useModal';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(e.target.value);

  const onSearch = () => {
    // Replace with actual search logic
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
        />
        <SearchMenu />
        <button type='button' className={style.button} onClick={onSearch}>
          <Icon icon='search' />
        </button>
      </div>
    </section>
  );
}

export default Search;

function SearchMenu() {
  const ref = useRef<HTMLDivElement>(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(
    SEARCH_MENU_DEFAULT,
  );
  const { isOpen, onClose, onToggle } = useModal();

  const menuArrow = isOpen ? <Icon icon='up' /> : <Icon icon='down' />;

  const onClick = (menuItem: string) => {
    setSelectedMenuItem(menuItem);
    onClose();
  };

  return (
    <DropboxWrapper ref={ref} className={style['menu']}>
      <button type='button' className={style['menu__title']} onClick={onToggle}>
        <span>{selectedMenuItem}</span>
        <span className={style.arrow}>{menuArrow}</span>
      </button>
      {isOpen && (
        <Dropbox containerRef={ref} onCloseModal={onClose}>
          {SEARCH_MENU_ITEMS.map((menuItem) => (
            <DropboxItem
              key={menuItem}
              selected={selectedMenuItem === menuItem}
              onClick={() => onClick(menuItem)}
            >
              <span>{menuItem}</span>
            </DropboxItem>
          ))}
        </Dropbox>
      )}
    </DropboxWrapper>
  );
}

const SEARCH_MENU_ITEMS = ['Title', 'Tag', 'Ingredient', 'Product'];
const SEARCH_MENU_DEFAULT = 'Title';
