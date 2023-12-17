"use client";
import React, { useContext } from "react";
import SectionHeaders from "../components/layout/SectionHeaders";
import { CartContext, cartProductPrice } from "../components/appContext";
import Image from "next/image";
import TrashIcon from "../components/icons/TrashIcon";

const CartPage = () => {
  const { cartProducts, removeCartProducts } = useContext(CartContext);
  console.log(cartProducts);

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
                    ৳ {cartProductPrice(product)}
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
        </div>
        <div>Right</div>
      </div>
    </section>
  );
};

export default CartPage;
