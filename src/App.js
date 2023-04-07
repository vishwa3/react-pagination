import { useCallback, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const getProducts = useCallback(async () => {
    const { data } = await axios.get(
      "https://dummyjson.com/products?limit=100"
    );
    setProducts(data.products);
    console.log("dhata", data);
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);
  const getPageNumbers = useCallback(() => {
    const pageNumbers = Number.isInteger(products.length / 10)
      ? products.length / 10
      : parseInt(products.length / 10) + 1;
    return pageNumbers;
  }, [products.length]);

  return (
    <div className="App">
      <div className="products">
        {products.slice(page * 10 - 10, page * 10).map((product) => {
          return (
            <div className="product" key={product.id}>
              <img src={product.images[0]} alt={product.title} />
              <b>{product.title}</b>
            </div>
          );
        })}
      </div>
      {products.length > 10 && (
        <div className="pagination">
          {page !== 1 && <span onClick={() => setPage(page - 1)}>◀</span>}
          {Array(getPageNumbers())
            .fill()
            .map((_, i) => i + 1)
            .map((item, i) => (
              <span
                className={page === item ? "pagination_selected" : ""}
                onClick={() => setPage(item)}
                key={i}
              >
                {item}
              </span>
            ))}
          {page !== 10 && <span onClick={() => setPage(page + 1)}>▶</span>}
        </div>
      )}
    </div>
  );
}

export default App;
