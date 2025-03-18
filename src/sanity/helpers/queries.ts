import { defineQuery } from 'next-sanity';

import { sanityFetch } from '../lib/live';

export const getMyOrders = async (userId: string) => {
  if (!userId) {
    throw new Error('User ID is required');
  }
  const MY_ORDERS_QUERY =
    defineQuery(`*[_type == 'order' && clerkUserId == $userId] | order(orderData desc){
      ...,products[]{
        ...,product->
      }
    }`);

  try {
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId },
    });
    return orders?.data || [];
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};

export const getAllCategories = async () => {
  const CATEGORIES_QUERY = defineQuery(`*[_type=="category"] | order(name asc)`);
  try {
    const categories = await sanityFetch({
      query: CATEGORIES_QUERY,
    });
    return categories.data || [];
  } catch (error) {
    console.error('Error fetching all categories');

    return [];
  }
};
