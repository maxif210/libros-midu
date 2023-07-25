const GetBooks = ({ books, booksFiltered, favorites, setFavorites }) => {
  const handleFavorite = (book) => {
    // Verificar si el libro ya existe en la lista de favoritos
    const isBookInFavorites = favorites.some(
      (favBook) => favBook.title === book.title
    );

    // Si el libro no existe en la lista, entonces lo agregamos
    if (!isBookInFavorites) {
      setFavorites((prevFavorites) => [...prevFavorites, book]);
    }
  };

  return (
    <>
      {booksFiltered.length > 0
        ? booksFiltered.map(({ book }) => (
            <div
              key={Math.random(book.ISBN + Date.now())}
              className="cardContainer"
            >
              <img src={book.cover} alt={book.title} />
              <button
                className="cardButton"
                onClick={() => handleFavorite(book)}
              >
                {favorites.some((favBook) => favBook.title === book.title)
                  ? "Libro ya añadido"
                  : "Añadir Libro +"}
              </button>
            </div>
          ))
        : books.map(({ book }) => (
            <div
              key={Math.random(book.ISBN + Date.now())}
              className="cardContainer"
            >
              <img src={book.cover} alt={book.title} />
              <button
                className="cardButton"
                onClick={() => handleFavorite(book)}
              >
                {favorites.some((favBook) => favBook.title === book.title)
                  ? "Libro ya añadido"
                  : "Añadir Libro +"}
              </button>
            </div>
          ))}
    </>
  );
};

export default GetBooks;
