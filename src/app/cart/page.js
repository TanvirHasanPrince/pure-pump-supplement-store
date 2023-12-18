"use client";
import React, { useContext, useEffect, useState } from "react";
import SectionHeaders from "../components/layout/SectionHeaders";
import { CartContext, cartProductPrice } from "../components/appContext";
import Image from "next/image";
import TrashIcon from "../components/icons/TrashIcon";
import AddressInput from "../components/layout/AddressInput";
import useProfile from "../components/useProfile";

const CartPage = () => {
  const { cartProducts, removeCartProducts } = useContext(CartContext);
  const [address, setAddress] = useState([]);
  const { data: profileData } = useProfile();

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
    //Address and cart products
    const response = await fetch("/api/checkout", {
      method: "POST",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address,
        cartProducts,
      }),
    });
    const link = await response.json();
    window.location = link;
  }

  return (
    <section className="mt-8">
      <div className="text-center ">
        <SectionHeaders mainHeader={"CART"}></SectionHeaders>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-8">
        <div>
          {cartProducts?.length === 0 && (
            <div>No products in your shopping cart</div>
          )}

          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <>
                <div className="flex items-center gap-4 mb-2 border-b py-2">
                  <div className="w-24">
                    <Image
                      src={product.image}
                      width={240}
                      height={240}
                      alt="product_imagee"
                    ></Image>
                  </div>

                  <div className="grow" key={product._id}>
                    <h3 className="text-primary font-bold">{product.name}</h3>
                    <div className="text-sm text-gray-500">
                      {product.size && (
                        <div>
                          Size: <span>{product.size.name}</span>
                        </div>
                      )}
                    </div>

                    <div className="text-sm text-gray-500">
                      {product.flavour && (
                        <div>
                          Flavour: <span>{product.flavour.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-lg text-primary font-semibold">
                    <span> ৳ {cartProductPrice(product)}</span>
                  </div>
                  <div className="ml-2">
                    <button
                      type="button"
                      onClick={() => removeCartProducts(index)}
                      className="bg-primary text-white px-2 py-2 rounded-md"
                    >
                      <TrashIcon></TrashIcon>
                    </button>
                  </div>
                </div>
              </>
            ))}
          <div className="py-4 flex items-center justify-end text-primary font-bold">
            <div className="text-gray-500 ">
              Subtotal: <br />
              Delivery Fee:
              <br />
              Total:
            </div>
            <div className="text-lg font-semibold pl-2 text-right">
              ৳ {subTotal} <br />৳ 50 <br></br> {subTotal + 50}
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
            <button type="submit">Pay {subTotal + 50}</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
