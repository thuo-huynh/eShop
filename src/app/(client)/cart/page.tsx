'use client';

import EmptyCard from '@/components/cart/empty-card';
import NoAccessToCart from '@/components/cart/no-access-to-cart';
import Container from '@/components/layout/container';
import useCartStore from '@/stores/cart.store';
import { useAuth } from '@clerk/nextjs';
import { ShoppingBagIcon } from 'lucide-react';
import React from 'react';

type Props = {};

export default function Page({}: Props) {
  const { isSignedIn } = useAuth();
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubtotalPrice,
    resetCart,
    getGroupedItems,
  } = useCartStore();
  const cartProducts = ['1'];
  return (
    <div className="bg-gray-50 pb-52 md:pb-10">
      {isSignedIn ? (
        <Container>
          {cartProducts.length > 0 ? (
            <>
              <div className="flex item-center gap-2 py-5">
                <ShoppingBagIcon className="h-6 w-6" />
                <h1 className="text-2xl font-semibold">Shopping Cart</h1>
              </div>
              <div className="grid lg:grid-cols-3 md:gap-8">
                <div className="lg:col-span-2 rounded-md"></div>
                <div className="lg:col-span-1 rounded-md"></div>
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
