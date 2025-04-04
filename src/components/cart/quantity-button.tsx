import React from 'react';
import { Button } from '../ui/button';
import { Minus, Plus } from 'lucide-react';
import useCartStore from '@/stores/cart.store';
import { Product } from '../../../sanity.types';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

type Props = {
  product: Product;
  className?: string;
};

function QuantityButton({ product, className }: Props) {
  const { addItem, getItemCount, removeItem } = useCartStore();
  const itemCount = getItemCount(product?._id);
  const isOutOfStock = product?.stock === 0;

  const handleRemoveProduct = () => {
    removeItem(product?._id);
    if (itemCount > 1) {
      toast.success('Quantity Decreased successfully!');
    } else {
      toast.success(`${product?.name?.substring(0, 12)} removed successfully!`);
    }
  };
  const handleAddProduct = () => {
    addItem(product);
    toast.success(`${product?.name?.substring(0, 12)} added successfully!`);
  };
  return (
    <div className={cn('flex items-center gap-1 text-base pb-1', className)}>
      <Button
        onClick={handleRemoveProduct}
        disabled={itemCount === 0 || isOutOfStock}
        variant="outline"
        size="icon"
        className="w-6 h-6"
      >
        <Minus />
      </Button>
      <span className="font-semibold w-8 text-center text-darkColor">{itemCount}</span>
      <Button
        onClick={handleAddProduct}
        variant="outline"
        size="icon"
        className="w-6 h-6"
      >
        <Plus />
      </Button>
    </div>
  );
}

export default QuantityButton;
