import PantryBoxPageContainer from './PantryBoxContainer';

export type PantryBoxPageParams = {
  pantryBoxKey: string;
};

interface PantryBoxPageProps {
  params: Promise<PantryBoxPageParams>;
}

async function PantryBoxPage({ params }: PantryBoxPageProps) {
  const { pantryBoxKey } = await params;

  return <PantryBoxPageContainer pantryBoxKey={pantryBoxKey} />;
}

export default PantryBoxPage;
