// Importamos useMemo para optimizar cálculos que dependen del carrito
import { useMemo } from "react";

// Componente Header que recibe funciones y estado del carrito como props
export default function Header({
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
}) {
  // useMemo para saber si el carrito está vacío
  const isEmpty = useMemo(() => cart.length === 0, [cart]);

  // useMemo para calcular el total a pagar del carrito (precio * cantidad)
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );

  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          
          {/* Logo */}
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img
                className="img-fluid"
                src="/img/logo.svg"
                alt="imagen logo"
              />
            </a>
          </div>

          {/* Contenedor del carrito */}
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              {/* Ícono del carrito */}
              <img
                className="img-fluid"
                src="/img/carrito.png"
                alt="imagen carrito"
              />

              {/* Contenido del carrito (se muestra al hacer hover en el ícono) */}
              <div id="carrito" className="bg-white p-3">
                {isEmpty ? (
                  // Si el carrito está vacío
                  <p className="text-center">El carrito esta vacio</p>
                ) : (
                  <>
                    {/* Tabla con los productos del carrito */}
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((guitar) => (
                          <tr key={guitar.id}>
                            <td>
                              <img
                                className="img-fluid"
                                src={`./img/${guitar.image}.jpg`}
                                alt="imagen guitarra"
                              />
                            </td>
                            <td>{guitar.name}</td>
                            <td className="fw-bold">${guitar.price}</td>
                            <td className="flex align-items-start gap-4">
                              {/* Botón para disminuir cantidad */}
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => decreaseQuantity(guitar.id)}
                              >
                                -
                              </button>

                              {/* Cantidad actual */}
                              {guitar.quantity}

                              {/* Botón para aumentar cantidad */}
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => increaseQuantity(guitar.id)}
                              >
                                +
                              </button>
                            </td>

                            {/* Botón para eliminar producto */}
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() => removeFromCart(guitar.id)}
                                type="button"
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Total a pagar */}
                    <p className="text-end">
                      Total pagar: <span className="fw-bold">${cartTotal}</span>
                    </p>
                  </>
                )}

                {/* Botón para vaciar el carrito completo */}
                <button className="btn btn-dark w-100 mt-3 p-2" onClick={clearCart}>
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
