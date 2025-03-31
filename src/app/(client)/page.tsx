import HomeBanner from '@/components/home/home-banner';
import Container from '@/components/layout/container';
import ProductGrid from '@/components/product/product-grid';

export default function Home() {
  return (
    <div>
      <Container className="py-10">
        <HomeBanner />
        <ProductGrid />
      </Container>
    </div>
  );
}
