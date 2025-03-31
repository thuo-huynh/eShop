import { cn } from '@/lib/utils';
import { Product } from '../../../sanity.types';
import { Button } from '../ui/button';

type Props = {
  product: Product;
  className?: string;
};

const AddToCartButton = ({ product, className }: Props) => {
  return (
    <div className="w-full h-12 flex items-center">
      <Button
        className={cn(
          'w-full bg-transparent text-darkColor shadow-none border border-darkColor/30 font-semibold tracking-wide hover:text-white hoverEffect',
          className,
        )}
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default AddToCartButton;
