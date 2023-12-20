"use client";
import React, { useContext, useEffect, useState } from "react";
import SectionHeaders from "../components/layout/SectionHeaders";
import { CartContext, cartProductPrice } from "../components/appContext";
import AddressInput from "../components/layout/AddressInput";
import useProfile from "../components/useProfile";
import toast from "react-hot-toast";
import CartProduct from "../components/layout/CartProduct";

const CartPage = () => {
  const { cartProducts, removeCartProducts } = useContext(CartContext);
  const [address, setAddress] = useState([]);
  const { data: profileData } = useProfile();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("cancelled=1")) {
        toast.error("Payment Failed");
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.city) {
      const { phone, houseAddress, city, postCode, country } = profileData;
      const addressFromProfile = {
        phone,
        houseAddress,
        city,
        postCode,
        country,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  let subTotal = 0;
  for (const p of cartProducts) {
    subTotal += cartProductPrice(p);
  }

  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }

  async function proceedToCheckOut(ev) {
    ev.preventDefault();

    // Show loading toast
    toast.loading("Redirecting to payment, please wait...", {
      autoClose: false,
      hideProgressBar: true,
    });

    try {
      // Address and cart products
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      });

      if (response.ok) {
        const link = await response.json();
        // Hide loading toast
        toast.dismiss();
        // Redirect to the checkout page
        window.location = link;
      } else {
        // Hide loading toast
        toast.dismiss();
        // Show error toast
        toast.error("Failed to process checkout. Please try again.");
      }
    } catch (error) {
      // Hide loading toast
      toast.dismiss();
      // Show error toast for unexpected errors
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Error during checkout:", error);
    }
  }

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader={"Cart"}></SectionHeaders>
        <p className="mt-4"> Your Shopping cart is empty 😔</p>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="text-center ">
        <SectionHeaders mainHeader={"CART"}></SectionHeaders>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        <div>
          {cartProducts?.length === 0 && (
            <div>No products in your shopping cart</div>
          )}

          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <CartProduct
                key={index}
                product={product}
                onRemove={() => removeCartProducts(product._id)}
              ></CartProduct>
            ))}
          <div className="py-4 flex items-center justify-end text-primary font-bold">
            <div className="text-gray-500 ">
              Subtotal: <br />
              Delivery Fee:
              <br />
              Total:
            </div>
            <div className=" font-semibold pl-2 text-right">
              ${subTotal} <br />$50 <br></br> ${subTotal + 50}
            </div>
          </div>
        </div>

        <div className="bg-gray-200 p-4 rounded-lg">
          <SectionHeaders subHeader={"Checkout"}></SectionHeaders>
          <form onSubmit={proceedToCheckOut}>
            <AddressInput
              addressProps={address}
              setAddressProp={handleAddressChange}
            ></AddressInput>
            <button type="submit">Pay ${subTotal + 50}</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
