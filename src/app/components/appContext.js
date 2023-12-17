"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function cartProductPrice(cartProduct) {
  let price = cartProduct.basePrice;
  if (cartProduct.size) {
    price = cartProduct.size.price + price;
  }
  return price;
}

const AppProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const localStorage =
    typeof window !== "undefined" ? window.localStorage : null;

  function saveCartProductsToLocalStorage(cartProducts) {
    if (localStorage) {
      localStorage.setItem("cart", JSON.stringify(cartProducts));
    }
  }

  function removeCartProducts(indexToRemove) {
    setCartProducts((previousCartProducts) => {
      const newCartProducts = previousCartProducts.filter(
        (v, index) => index !== indexToRemove
      );
      saveCartProductsToLocalStorage(newCartProducts);

      return newCartProducts;
    });
    toast.success("Product Removed");
  }

  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }

  useEffect(() => {
    if (localStorage && localStorage.getItem("cart")) {
      setCartProducts(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);

  function addToCart(productId, size = null, flavour = []) {
    const cartProducts = { ...productId, size, flavour };
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
            removeCartProducts,
            clearCart,
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
