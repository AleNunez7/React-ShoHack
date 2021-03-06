import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Item from "./Item";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ShoppingCart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const history = useHistory();
  let total = 0;

  const handleOrder = async (ev) => {
    try {
      ev.preventDefault();
      await axios({
        method: "POST",
        url: process.env.REACT_APP_API + "/order/success",
        data: { cart, user, total },
      });
      dispatch({ type: "RESET_CART" });
      history.push("/success");
    } catch (error) {
      alert("Intentelo nuevamente");
    }
  };

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-sm-7">
          {cart.length === 0 ? (
            <p></p>
          ) : (
            cart.map((item) => {
              total = total + item.price * item.quantity;
              return <Item item={item} />;
            })
          )}
        </div>
        {cart.length === 0 ? (
          <div className="text-center mt-5">
            <p className="fw-bold fs-3">No hay productos en el carrito 🛒</p>
            <Link
              to={"/productos"}
              className="p-2  text-white text-decoration-none btn btn-dark"
            >
              Volver a productos
            </Link>
          </div>
        ) : (
          <div className="col-sm-5">
            <div className="p-3 w-100 h-50 ">
              <p className="text-start">ORDEN DE COMPRA</p>
              <hr />
              <div className="d-flex fw-bold my-2 justify-content-between ">
                <div>Cantidad</div>
                <div>Nombre</div>
                <div>Precio</div>
              </div>
              {cart.map((item) => {
                return (
                  <>
                    <div className="d-flex justify-content-between">
                      <div>{item.quantity}</div>
                      <div>{item.name}</div>
                      <div>$ {item.price * item.quantity}</div>
                    </div>
                  </>
                );
              })}
              <div className=" mt-5 d-flex justify-content-between ">
                <p className="fw-bold fs-4">Total</p>
                <p className="fw-bold fs-4 ms-auto">$ {total}</p>
              </div>
              <p className="text-start mt-5">MÉTODO DE PAGO</p>
              <hr />
              <div className="row mt-3">
                <div className="col ">
                  <div className="form-check ">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      checked
                    />
                    <img
                      className="imgBuyOption"
                      src="/img/Paypal.png"
                      alt="logo de paypal"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-check ">
                    <input
                      className="form-check-input "
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      checked
                    />
                    <img
                      className="imgBuyOption"
                      src="/img/mercadopago.png"
                      alt="logo de mercado pago"
                    />
                  </div>
                </div>
              </div>

              <div className="text-center mt-5">
                <Link
                  className="p-1 w-50 text-white text-decoration-none btn btn-dark rounded"
                  onClick={handleOrder}
                >
                  FINALIZAR COMPRA
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer bottom-right autoClose={4000} />
    </div>
  );
}

export default ShoppingCart;
