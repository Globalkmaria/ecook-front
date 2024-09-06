export const getListCheckboxInitialState = (items: readonly string[]) =>
  items.reduce(
    (acc, item, i) => {
      acc[i] = false;
      return acc;
    },
    {} as Record<string, boolean>,
  );
