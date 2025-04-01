import CategoryProducts from '@/components/category/category-products';
import Container from '@/components/layout/container';
import Title from '@/components/title';
import { getAllCategories } from '@/sanity/helpers/queries';
import { notFound } from 'next/navigation';
import React from 'react';
import { Category } from '../../../../../sanity.types';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const categories = await getAllCategories();
  const category = categories.find((category: Category) => {
    return category.slug?.current === slug;
  });
  if (!category) {
    return notFound();
  }
  return (
    <Container className="py-10">
      {' '}
      <Title className="text-xl">
        Products by Category:{' '}
        <span className="font-bold text-green-600 capitalize tracking-wide">{slug && slug}</span>
      </Title>
      <CategoryProducts
        categories={categories}
        slug={slug}
      />
    </Container>
  );
}
