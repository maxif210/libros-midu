export const getPages = (books) => {
  const pages = [];
  books.forEach(({ book }) => {
    pages.push(book.pages);
  });
  const minValue = Math.min(...pages);
  const maxValue = Math.max(...pages);
  return { minValue, maxValue };
};
