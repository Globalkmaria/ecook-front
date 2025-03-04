import { notFound } from 'next/navigation';
import PantryBox from './PantryBox';

interface PantryBoxPageContainerProps {
  pantryBoxKey: string;
}

function PantryBoxPageContainer({ pantryBoxKey }: PantryBoxPageContainerProps) {
  if (!pantryBoxKey) notFound();

  return (
    <div>
      <PantryBox />
    </div>
  );
}

export default PantryBoxPageContainer;
