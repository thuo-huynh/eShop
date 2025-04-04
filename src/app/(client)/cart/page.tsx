'use client';

import EmptyCard from '@/components/cart/empty-card';
import NoAccessToCart from '@/components/cart/no-access-to-cart';
import QuantityButton from '@/components/cart/quantity-button';
import Container from '@/components/layout/container';
import Loading from '@/components/loading';
import PriceFormatter from '@/components/product/price-formatter';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { urlFor } from '@/sanity/lib/image';
import useCartStore from '@/stores/cart.store';
import { useAuth } from '@clerk/nextjs';
import { Heart, ShoppingBagIcon, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PaypalLogo from '@/../public/images/paypalLogo.png';

type Props = {};

export default function Page({}: Props) {
  const [isClient, setIsClient] = useState(false);
  const { isSignedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubtotalPrice,
    resetCart,
    getGroupedItems,
  } = useCartStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loading />;
  }

  const cartProducts = getGroupedItems();

  const handleResetCart = () => {
    const confirmed = window.confirm('Are you sure to reset your Cart?');
    if (confirmed) {
      resetCart();
      toast.success('Your cart reset successfully!');
    }
  };

  const handleDeleteProduct = (id: string) => {
    deleteCartProduct(id);
    toast.success('Product deleted successfully!');
  };

  const handleCheckout = async () => {};

  return (
    <div className="bg-gray-50 pb-52 md:pb-10">
      {isSignedIn ? (
        <Container>
          {cartProducts.length > 0 ? (
            <>
              <div className="flex items-center gap-2 py-5">
                <ShoppingBagIcon className="h-6 w-6" />
                <h1 className="text-2xl font-semibold">Shopping Cart</h1>
              </div>
              <div className="grid lg:grid-cols-3 md:gap-8">
                <div className="lg:col-span-2 rounded-lg">
                  <div className="border bg-white rounded-md">
                    {cartProducts.map(({ product }) => {
                      const itemCount = getItemCount(product?._id);
                      return (
                        <div
                          key={product?._id}
                          className="border-b p-2.5 last:border-b-0 flex items-center gap-5"
                        >
                          <div className="flex flex-1 items-center justify-between gap-2 h-36 md:h-44">
                            {product?.images && (
                              <Link
                                href={`/product/${product?.slug?.current}`}
                                className="border rounded-md p-0.5 md:p-1 mr-2 overflow-hidden group"
                              >
                                <Image
                                  src={urlFor(product?.images[0]).url()}
                                  alt="productImage"
                                  width={500}
                                  height={500}
                                  loading="lazy"
                                  className="w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 overflow-hidden hoverEffect"
                                />
                              </Link>
                            )}
                            <div className="h-full flex flex-1 items-start flex-col justify-between gap-2">
                              <div className="space-y-1.5">
                                <h2 className="font-semibold line-clamp-1">{product?.name}</h2>
                                <p className="text-sm text-lightColor font-medium">
                                  {product?.intro}
                                </p>
                                <p className="text-sm capitalize">
                                  Variant: <span className="font-semibold">{product.variant}</span>
                                </p>
                                <p className="text-sm capitalize">
                                  Status: <span className="font-semibold">{product?.status}</span>
                                </p>
                              </div>
                              <div className="text-gray-500 flex items-center gap-2">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Heart className="w-4 h-4 md:w-5 md:h-5 hover:text-green-600 hoverEffect" />
                                    </TooltipTrigger>
                                    <TooltipContent className="font-bold">
                                      Add to Favorite
                                    </TooltipContent>
                                  </Tooltip>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Trash
                                        onClick={() => handleDeleteProduct(product?._id)}
                                        className="w-4 h-4 md:w-5 md:h-5 hover:text-red-600 hoverEffect"
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent className="font-bold bg-red-600">
                                      Delete product
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                            <div className="flex flex-col items-start justify-between h-36 md:h-44 p-0.5 md:p-1">
                              <PriceFormatter
                                amount={(product?.price as number) * itemCount}
                                className="font-bold text-lg"
                              />
                              <QuantityButton product={product} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <Button
                      onClick={handleResetCart}
                      className="m-5 font-semibold"
                      variant="default"
                    >
                      Reset Cart
                    </Button>
                  </div>
                </div>
                <div className="lg:col-span-1 rounded-md">
                  <div className="w-full bg-white p-6 rounded-lg border">
                    <h2 className="text-lg font-semibold p-2">Order Summary</h2>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <PriceFormatter amount={getSubtotalPrice()} />
                      </div>
                      <div className="flex justify-between">
                        <span>Discount</span>
                        <PriceFormatter amount={getSubtotalPrice() - getTotalPrice()} />
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span>Total</span>
                        <PriceFormatter
                          amount={getTotalPrice()}
                          className="text-lg font-bold text-black"
                        />
                      </div>
                      <Button
                        disabled={loading}
                        onClick={handleCheckout}
                        className="w-full rounded-full font-semibold tracking-wide"
                        size="lg"
                      >
                        Proceed to Checkout
                      </Button>
                      <Link
                        href={'/'}
                        className="flex items-center justify-center py-2 border border-darkColor/50 rounded-full hover:border-darkColor hover:bg-darkColor/5 hoverEffect"
                      >
                        <Image
                          src={PaypalLogo}
                          alt="paypalLogo"
                          className="w-20"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <EmptyCard />
          )}
        </Container>
      ) : (
        <NoAccessToCart />
      )}
    </div>
  );
}
