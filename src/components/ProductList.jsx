import { useState } from "react";
import useFetchProducts from "../utils/useFetchProducts.js";
import ProductItem from "./ProductItem";
import Error from "../components/Error.jsx";

// Product list
function ProductList() {
  const { products, error } = useFetchProducts();
  const [search, setSearch] = useState("");

  if (error) {
    return <Error message={error} />;
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="welcome">
        <h1>Welcome to ShoppyGlobe!</h1>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <h2 style={{ margin: "20px" }}>Our Products</h2>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <ProductItem key={product._id} data={product} />
        ))}
      </div>
    </>
  );
}

export default ProductList;
