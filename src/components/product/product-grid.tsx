'use client';

import { productType } from '@/constants';
import { client } from '@/sanity/lib/client';
import { Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import HomeTabbar from '../home/home-tabbar';
import NoProductsAvailable from './no-products-available';
import ProductCard from './product-card';
import { Product } from '../../../sanity.types';

type Props = {};

function ProductGrid({}: Props) {
  const [selectedTab, setSelectedTab] = useState(productType[0]?.title || '');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const query = `*[_type == 'product' && variant ==$variant] | order(name asc)`;
  const params = { variant: selectedTab.toLocaleLowerCase() };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await client.fetch(query, params);
        setProducts(await response);
      } catch (error) {
        console.log('Product fetching Error', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedTab]);

  return (
    <div className="mt-10 flex flex-col items-center">
      <HomeTabbar
        selectedTab={selectedTab}
        onTabSelect={setSelectedTab}
      />
      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10">
          <div className="flex items-center space-x-2 text-blue-600">
            <Loader2 className="animate-spin" />
            <span className="text-lg font-semibold">Product is loading...</span>
          </div>
        </div>
      ) : (
        <>
          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10 w-full">
              {products?.map((product: Product) => (
                <AnimatePresence key={product?._id}>
                  <motion.div
                    layout
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                </AnimatePresence>
              ))}
            </div>
          ) : (
            <NoProductsAvailable selectedTab={selectedTab} />
          )}
        </>
      )}
    </div>
  );
}

export default ProductGrid;
