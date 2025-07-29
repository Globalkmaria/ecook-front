import { useState } from 'react';

import { joinClassNames } from '@/utils/style';

import { useAnalytics } from '@/hooks/useAnalytics';

import IconButton from '@/components/IconButton';

import style from './style.module.scss';

function CopyLinkButton() {
  const { trackRecipeShare } = useAnalytics();
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    trackRecipeShare(url, 'link');
    if (showMessage) return;
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 4000);
  };

  const joinedClassName = joinClassNames(
    style['copy-link-button'],
    showMessage ? style['copy-link-button--active'] : '',
  );

  return (
    <>
      <IconButton icon='link' onClick={handleClick} />
      {showMessage && <div className={joinedClassName}>Link copied!</div>}
    </>
  );
}

export default CopyLinkButton;
