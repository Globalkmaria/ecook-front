'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import style from './style.module.scss';

import useModal from '@/hooks/useModal';

import { getSearchURL } from '@/helpers/link';

import { Dropbox, DropboxItem, DropboxWrapper } from '@/components/Dropbox';
import Icon from '@/components/Icon';
import { SEARCH_MENU_ITEMS, SEARCH_MENU_ITEMS_MAP } from '@/const/searchMenu';

import { getSearchMenuItem, getSearchQuery } from './helper';

function SearchContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    getSearchQuery(searchParams.get('q')),
  );
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>(
    getSearchMenuItem(searchParams.get('type')),
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(e.target.value);

  const onSearch = () => {
    if (!searchQuery.trim()) return;

    router.push(getSearchURL(selectedMenuItem, searchQuery));
  };

  const onMenuChange = (menuItem: string) => setSelectedMenuItem(menuItem);

  const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch();
  };

  const initSearchStates = () => {
    setSearchQuery(getSearchQuery(searchParams.get('q')));
    setSelectedMenuItem(getSearchMenuItem(searchParams.get('type')));
  };

  useEffect(() => {
    initSearchStates();
  }, [searchParams]);

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

export default SearchContainer;

interface SearchMenuProps {
  onMenuChange: (menuItem: string) => void;
  selectedMenuItem: string;
}

function SearchMenu({ onMenuChange, selectedMenuItem }: SearchMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { isOpen, onClose, onToggle } = useModal();

  const menuArrow = isOpen ? <Icon icon='up' /> : <Icon icon='down' />;

  const onMenuItemSelect = (value: string) => {
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
              onClick={() => onMenuItemSelect(menuItem.value)}
            >
              <span>{menuItem.label}</span>
            </DropboxItem>
          ))}
        </Dropbox>
      )}
    </DropboxWrapper>
  );
}
