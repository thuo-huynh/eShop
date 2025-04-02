'use client';

import EmptyCard from '@/components/cart/empty-card';
import NoAccessToCart from '@/components/cart/no-access-to-cart';
import Container from '@/components/layout/container';
import useCartStore from '@/stores/cart.store';
import { useAuth } from '@clerk/nextjs';
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
  const cartProducts = [];
  return (
    <div className="bg-gray-50 pb-52 md:pb-10">
      {isSignedIn ? (
        <Container>{cartProducts.length > 0 ? <div></div> : <EmptyCard />}</Container>
      ) : (
        <NoAccessToCart />
      )}
    </div>
  );
}
