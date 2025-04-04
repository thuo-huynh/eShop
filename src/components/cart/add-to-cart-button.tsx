'use client';

import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';
import { Product } from '../../../sanity.types';
import { Button } from '../ui/button';
import useCartStore from '@/stores/cart.store';
import QuantityButton from './quantity-button';
import PriceFormatter from '../product/price-formatter';

type Props = {
  product: Product;
  className?: string;
};

const AddToCartButton = ({ product, className }: Props) => {
  const { addItem, getItemCount } = useCartStore();
  const itemCount = getItemCount(product?._id);
  const isOutOfStock = product?.stock === 0;

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product?.name?.substring(0, 12)}... added successfully!`);
  };

  return (
    <div className="w-full h-12 flex items-center">
      {itemCount ? (
        <div className="w-full text-sm">
          <div className="flex item-center justify-between">
            <span className="text-xs text-muted-foreground">Quantity</span>
            <QuantityButton product={product} />
          </div>
          <div className="flex item-center justify-between border-t pt-1">
            <span className="text-xs font-semibold">Subtotal</span>
            <PriceFormatter amount={product?.price ? product?.price * itemCount : 0} />
          </div>
        </div>
      ) : (
        <Button
          onClick={handleAddToCart}
          className={cn(
            'w-full bg-transparent text-darkColor shadow-none border border-darkColor/30 font-semibold tracking-wide hover:text-white hoverEffect',
            className,
          )}
        >
          Add to Cart
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;
