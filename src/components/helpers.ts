export const getListCheckboxInitialState = <T>(items: readonly T[]) =>
  items.reduce(
    (acc, item, i) => {
      acc[i] = false;
      return acc;
    },
    {} as Record<string, boolean>,
  );
