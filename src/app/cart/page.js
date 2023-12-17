"use client";
import React, { useContext, useState } from "react";
import SectionHeaders from "../components/layout/SectionHeaders";
import { CartContext, cartProductPrice } from "../components/appContext";
import Image from "next/image";
import TrashIcon from "../components/icons/TrashIcon";
import AddressInput from "../components/layout/AddressInput";
import useProfile from "../components/useProfile";

const CartPage = () => {
  const { cartProducts, removeCartProducts } = useContext(CartContext);
  const [addrss, setAddress] = useState([]);
  const {data:profileData} = useProfile()
  console.log(profileData);

  let total = 0;
  for (const p of cartProducts) {
    total += cartProductPrice(p);
  }

  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }

  return (
    <section className="mt-8">
      <div className="text-center ">
        <SectionHeaders mainHeader={"CART"}></SectionHeaders>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
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
          <div className="py-4 text-right pr-16 text-primary font-bold">
            <span className="text-gray-500 "> Subtotal:</span>
            <span className="text-lg font-semibold pl-2"> ৳ {total}</span>
          </div>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg">
          <SectionHeaders  subHeader={"Checkout"}></SectionHeaders>
          <form>
            <AddressInput
              addressProps={{ addrss }}
              setAddressProp={handleAddressChange}
            ></AddressInput>
            <button type="submit">Pay {total}</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
