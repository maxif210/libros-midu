import { useEffect, useState } from "react";
import dataBooks from "../books.json";
import "./App.scss";
import { getUniqueGenres } from "./utils/getGenres";
import { getPages } from "./utils/getPages";
import GetBooks from "./components/GetBooks";

function App() {
  const [books] = useState(dataBooks.library);
  const [inputPage, setInputPage] = useState();
  const [selectValue, setSelectValue] = useState();
  const { minValue, maxValue } = getPages(books);
  const [hasResults, setHasResults] = useState(true);
  const [favorites, setFavorites] = useState([]);

  // Función de filtrado que aplica todos los filtros en secuencia
  const applyFilters = () => {
    let filteredBooks = [...books]; // Crear una copia de los libros para no modificar el estado original

    if (inputPage !== undefined) {
      filteredBooks = filteredBooks.filter(
        ({ book }) => book.pages >= inputPage
      );
    }

    if (selectValue !== undefined) {
      filteredBooks = filteredBooks.filter(
        ({ book }) => book.genre === selectValue
      );
    }

    return filteredBooks;
  };

  // Obtener los libros filtrados cuando cambian los filtros
  const booksFiltered = applyFilters();

  // Verificar si hay resultados en los libros filtrados
  useEffect(() => {
    setHasResults(booksFiltered.length > 0);
  }, [booksFiltered]);

  const uniqueGenres = getUniqueGenres(books);
  console.log(favorites);
  return (
    <main className="main">
      <div className="textsContainer">
        <h1>6 libros disponibles</h1>
        <h3>2 en la lista de lectura</h3>
      </div>
      <div className="filtersContainer">
        <div className="filterPerPages">
          <h2>Filtrar por páginas</h2>
          <div className="inputContainer">
            <div className="labels">
              <label htmlFor="range">{minValue}</label>
              <label htmlFor="range">{maxValue}</label>
            </div>
            <input
              type="range"
              name="range"
              id=""
              max={maxValue}
              min={minValue}
              onChange={(e) => setInputPage(e.target.value)}
            />
          </div>
        </div>
        <div className="filterPerGenres">
          <h2>Filtrar por género</h2>
          <select
            onClick={(e) => setSelectValue(e.target.value)}
            defaultValue=""
          >
            {uniqueGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>
      <section className="gridContainer">
        {!hasResults ? (
          <p>No se encontraron resultados.</p>
        ) : (
          <GetBooks
            books={books}
            booksFiltered={booksFiltered}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        )}
      </section>
    </main>
  );
}

export default App;
