import { HeroBanner, Categories, FlashSale, BrandZone, ServiceGuarantee, NewUserZone, Marquee, RecommendForYou } from '@/components/shop/HeroBanner';
import { Footer } from '@/components/shop/Footer';

const Index = () => (
  <div className="min-h-screen bg-background">
    <main>
      <HeroBanner />
      <Marquee />
      <Categories />
      <ServiceGuarantee />
      <FlashSale />
      <NewUserZone />
      <BrandZone />
      <RecommendForYou />
    </main>
    <Footer />
  </div>
);

export default Index;
