import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function CardImage() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const response = await axios({
        method: "get",
        url: process.env.REACT_APP_API,
      });
      setProducts(response.data.products);
    };
    getProducts();
  }, []);

  return (
    <div className="container">
      <div className="row text-center fw-bold">
        {products.map((product) => {
          return (
            <div key={product._id} className="col-sm-4">
              <Link
                to={`/producto/${product._id}`}
                className="text-decoration-none"
                style={{ color: "black" }}
              >
                <img
                  className="img-fluid h-50"
                  src={process.env.REACT_APP_IMG_URL + product.imageName}
                  alt="Champion Vans"
                />
                <div className="mt-3">
                  <p className="fs-4">{product.name}</p>
                  <p className="fs-3">$ {product.price}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CardImage;
