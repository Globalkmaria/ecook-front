import style from './style.module.scss';

import { PantryBoxPageParams } from '@/app/sn/pantry/[pantryBoxKey]/page';
import PantryBoxPageContainer from '@/app/sn/pantry/[pantryBoxKey]/PantryBoxContainer';

import { PageModalWrapper } from '@/components/Modal';

interface Props {
  params: Promise<PantryBoxPageParams>;
}

async function PantryBoxPage({ params }: Props) {
  const { pantryBoxKey } = await params;

  return (
    <PageModalWrapper>
      <div className={style.container}>
        <PantryBoxPageContainer pantryBoxKey={pantryBoxKey} />
      </div>
    </PageModalWrapper>
  );
}

export default PantryBoxPage;
