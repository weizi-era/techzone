import { HeroBanner } from '@/components/shop/HeroBanner';
import { Categories } from '@/components/shop/Categories';
import { HotProducts } from '@/components/shop/HotProducts';
import { Promotion } from '@/components/shop/Promotion';
import { Footer } from '@/components/shop/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroBanner />
        <Categories />
        <HotProducts />
        <Promotion />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
