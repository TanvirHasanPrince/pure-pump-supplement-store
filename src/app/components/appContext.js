"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

const AppProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const localStorage =
    typeof window !== "undefined" ? window.localStorage : null;

  function saveCartProductsToLocalStorage(cartProducts) {
    if (localStorage) {
      localStorage.setItem("cart", JSON.stringify(cartProducts));
    }
  }

  useEffect(() => {
    if (localStorage && localStorage.getItem("cart")) {
      setCartProducts(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);

  function addToCart(productId, size = null, extras = []) {
    const cartProducts = { ...productId, size, extras };
    setCartProducts((previousProducts) => {
      const newProducts = [...previousProducts, cartProducts];
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
  }

  return (
    <div>
      <SessionProvider>
        <CartContext.Provider
          value={{
            cartProducts,
            setCartProducts,
            addToCart,
          }}
        >
          {children}
        </CartContext.Provider>
      </SessionProvider>
      ;
    </div>
  );
};

export default AppProvider;
