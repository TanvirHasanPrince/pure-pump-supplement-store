import Image from 'next/image';
import React from 'react';
import TrashIcon from '../../components/icons/TrashIcon'
import { cartProductPrice } from '../appContext';

const CartProduct = ({ product, onRemove }) => {
  return (
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
        <span> $ {cartProductPrice(product)}</span>
      </div>
      <div className="ml-2">
        {!!onRemove && (
          <button
            type="button"
            onClick={() => onRemove(product._id)}
            className="bg-primary text-white px-2 py-2 rounded-md"
          >
            <TrashIcon></TrashIcon>
          </button>
        )}
      </div>
    </div>
  );
};

export default CartProduct;