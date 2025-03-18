import { getAllCategories, getMyOrders } from '@/sanity/helpers/queries';
import { auth, currentUser } from '@clerk/nextjs/server';
import Container from '../container';
import HeaderMenu from './header-menu';
type Props = {};

export default async function Header({}: Props) {
  const user = await currentUser();
  const { userId } = await auth();
  const categories = await getAllCategories();
  let orders = null;
  if (userId) {
    orders = await getMyOrders(userId);
  }
  return (
    <header className="border-b border-b-gray-400 py-5 sticky top-0 z-50 bg-white">
      <Container className="flex items-center justify-between gap-7 text-lightColor">
        <HeaderMenu categories={categories} />
      </Container>
    </header>
  );
}
