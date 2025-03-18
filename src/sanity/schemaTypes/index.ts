import { type SchemaTypeDefinition } from 'sanity';

import { orderType } from './orderType';
import { productType } from './productType';
import { categoryType } from './categoryType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, productType, orderType],
};
