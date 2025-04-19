// Importamos hooks y componentes necesarios
import { useState, useEffect } from "react";
import Header from "./components/Headers"; // Componente del encabezado con el carrito
import Guitar from "./components/Guitar"; // Componente que renderiza cada guitarra
import { db } from "./data/db"; // Datos simulados de guitarras

function App() {
  // Función para obtener el carrito desde localStorage si ya hay uno guardado
  const initalCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  // Estado que contiene los productos disponibles
  const [data] = useState(db);

  // Estado del carrito, inicializado desde localStorage
  const [cart, setCart] = useState(initalCart);

  // Límites de cantidad por producto en el carrito
  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  // Cada vez que cambia el carrito, lo guardamos en localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Función para agregar un producto al carrito
  function addToCart(item) {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);

    if (itemExists >= 0) {
      // Si ya existe, aumentamos la cantidad si no supera el límite
      if (cart[itemExists].quantity >= MAX_ITEMS) return;

      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
    } else {
      // Si no existe, lo agregamos con cantidad inicial 1
      item.quantity = 1;
      setCart([...cart, item]);
    }
  }

  // Elimina un producto del carrito por ID
  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  // Incrementa la cantidad de un producto en el carrito
  function increaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  // Disminuye la cantidad de un producto en el carrito
  function decreaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  // Vacía completamente el carrito
  function clearCart() {
    setCart([]);
  }

  // Render del componente principal
  return (
    <>
      {/* Encabezado con el carrito y acciones del carrito */}
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />

      {/* Sección principal de productos */}
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      {/* Footer del sitio */}
      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
