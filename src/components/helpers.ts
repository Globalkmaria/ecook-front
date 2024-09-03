export const getListCheckboxInitialState = (items: readonly string[]) =>
  items.reduce(
    (acc, item) => {
      acc[item] = false;
      return acc;
    },
    {} as Record<string, boolean>,
  );
