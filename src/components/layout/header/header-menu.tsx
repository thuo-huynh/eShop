import { usePathname } from 'next/navigation';
import React from 'react';
import { CATEGORIES_QUERYResult } from "@/sanity.types";
type Props = {
  categories: CATEGORIES_QUERYResult[];
};

export default function HeaderMenu({ categories }: Props) {
  const pathname = usePathname();
  return <div>HeaderMenu</div>;
}
