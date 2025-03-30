import CartIcon from '@/components/cart-icon';
import Logo from '@/components/logo';
import SearchBar from '@/components/search-bar';
import { getAllCategories, getMyOrders } from '@/sanity/helpers/queries';
import { ClerkLoaded, SignedIn, SignInButton, UserButton } from '@clerk/nextjs';
import { auth, currentUser } from '@clerk/nextjs/server';
import Container from '@/components/layout/container';
import HeaderMenu from '@/components/layout/header/header-menu';
import Link from 'next/link';
import { ListOrdered } from 'lucide-react';

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
        <div className="w-auto md:w-1/3 flex items-center justify-center gap-2.5">
          {/* <MobileMenu /> */}
          <Logo>E-Shop</Logo>
        </div>
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar />
          <CartIcon />

          <ClerkLoaded>
            <SignedIn>
              <Link
                href={'/orders'}
                className="group relative"
              >
                <ListOrdered className="w-5 h-5 group-hover:text-darkColor hoverEffect" />
                <span className="absolute -top-1 -right-1 bg-darkColor text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
                  {orders?.length ? orders?.length : 0}
                </span>
              </Link>
              <UserButton />
            </SignedIn>
            {!user && (
              <SignInButton mode="modal">
                <button className="text-sm font-semibold hover:text-darkColor hoverEffect">
                  Login
                </button>
              </SignInButton>
            )}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
}
