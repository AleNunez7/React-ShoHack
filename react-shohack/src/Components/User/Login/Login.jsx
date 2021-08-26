import React from "react";
import Navbar from "../../Home/Navbar/Navbar";
import Footer from "../../Home/Footer/Footer";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const closeAfter7 = () =>
    toast.dark(
      "Contraseña incorrecta, por favor vuelva a ingresar",
      { position: toast.POSITION.BOTTOM_RIGHT },
      { autoClose: 4000 }
    );
  const dispatch = useDispatch();
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handlePassword = (ev) => {
    setPassword(String(ev.target.value));
  };
  const handleUsername = (ev) => {
    setUsername(ev.target.value);
  };

  const handleLogin = async (ev) => {
    ev.preventDefault();
    const response = await axios({
      method: "POST",
      url: "http://localhost:8000/tokens",
      data: { username, password },
    });
    response.data.user.token = await response.data.token;
    if (response.data.user.token) {
      dispatch({ type: "ADD_USER", payload: response.data.user });
      history.push("/productos");
    } else {
      closeAfter7();
      <ToastContainer bottom-right autoClose={4000} />;
    }
  };
  return (
    <>
      <Navbar />
      <div className="container d-flex justify-content-center my-3">
        <div className="border p-3 w-50">
          <p className="fw-bold fs-4 text-center">INGRESAR</p>
          <form onSubmit={handleLogin}>
            <label className="mt-3 fw-bold" htmlFor="">
              Usuario
            </label>
            <input
              type="text"
              className="form-control mt-2"
              name="username"
              value={username}
              onChange={handleUsername}
              placeholder="Ingrese su usuario"
            />
            <label className="mt-3 fw-bold" htmlFor="">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control mt-2"
              name="password"
              value={password}
              onChange={handlePassword}
              placeholder="Ingrese su contraseña"
            />
            <div className="text-center">
              <button type="submit" className="btn btn-dark text-white mt-3 ">
                Aceptar
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
