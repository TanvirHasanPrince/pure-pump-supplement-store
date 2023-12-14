"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useState } from "react";

export const CartContext = createContext({});

const AppProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

  function addToCart(productId, size = null, extras = []) {
    const cartProducts = { ...productId, size, extras };
    setCartProducts((previousProducts) => {
      const newProducts = [...previousProducts, cartProducts];
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
