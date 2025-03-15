'use client';

import { useEffect, useRef, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { getSearchLink } from '@/helpers/links';

import useModal from '@/hooks/useModal';

import { Dropbox, DropboxItem, DropboxWrapper } from '@/components/Dropbox';
import Icon from '@/components/Icon';

import {
  SEARCH_MENU_ITEMS,
  SEARCH_MENU_ITEMS_MAP,
  SearchMenuValue,
} from '@/const/searchMenu';

import { getSearchMenuItem, getSearchQuery } from './helper';
import style from './style.module.scss';

function SearchContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    getSearchQuery(searchParams.get('q')),
  );
  const [selectedMenuItem, setSelectedMenuItem] = useState<SearchMenuValue>(
    getSearchMenuItem(searchParams.get('type')),
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(e.target.value);

  const onSearch = () => {
    if (!searchQuery.trim()) return;

    router.push(getSearchLink(selectedMenuItem, searchQuery));
  };

  const onMenuChange = (menuItem: SearchMenuValue) =>
    setSelectedMenuItem(menuItem);

  const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch();
  };

  const initSearchStates = () => {
    setSearchQuery(getSearchQuery(searchParams.get('q')));
    setSelectedMenuItem(getSearchMenuItem(searchParams.get('type')));
  };

  useEffect(() => {
    initSearchStates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  onMenuChange: (menuItem: SearchMenuValue) => void;
  selectedMenuItem: string;
}

function SearchMenu({ onMenuChange, selectedMenuItem }: SearchMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { isOpen, onClose, onToggle } = useModal();

  const menuArrow = isOpen ? <Icon icon='up' /> : <Icon icon='down' />;

  const onMenuItemSelect = (value: SearchMenuValue) => {
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
        <Dropbox
          containerRef={ref}
          onCloseModal={onClose}
          onMouseLeave={onClose}
        >
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
