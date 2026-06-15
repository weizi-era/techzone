import { ShoppingCart, Fire, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Stagger, HoverLift } from '@/components/MotionPrimitives';
import { FadeIn } from '@/components/MotionPrimitives';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  tag?: 'hot' | 'new' | 'sale';
  image: string;
  rating: number;
}

const tagConfig = {
  hot: { label: '热销', icon: <Fire style={{ width: '0.75rem', height: '0.75rem' }} />, variant: 'destructive' as const },
  new: { label: '新品', icon: <Sparkles style={{ width: '0.75rem', height: '0.75rem' }} />, variant: 'default' as const },
  sale: { label: '折扣', icon: <TrendingUp style={{ width: '0.75rem', height: '0.75rem' }} />, variant: 'secondary' as const },
};

const products: Product[] = [
  { id: 1, name: 'iPhone 16 Pro Max', price: 9999, originalPrice: 10999, tag: 'hot', image: 'https://picsum.photos/seed/iphone16/400/400', rating: 4.9 },
  { id: 2, name: 'MacBook Pro M4 14"', price: 14999, tag: 'new', image: 'https://picsum.photos/seed/macbookpro/400/400', rating: 4.8 },
  { id: 3, name: 'AirPods Pro 3', price: 1899, originalPrice: 2299, tag: 'sale', image: 'https://picsum.photos/seed/airpods3/400/400', rating: 4.7 },
  { id: 4, name: 'Samsung Galaxy S25', price: 6999, tag: 'new', image: 'https://picsum.photos/seed/galaxys25/400/400', rating: 4.6 },
  { id: 5, name: 'Sony WH-1000XM6', price: 2699, originalPrice: 2999, tag: 'sale', image: 'https://picsum.photos/seed/sonyxm6/400/400', rating: 4.8 },
  { id: 6, name: 'iPad Pro M4 13"', price: 10999, tag: 'hot', image: 'https://picsum.photos/seed/ipadpro/400/400', rating: 4.9 },
  { id: 7, name: 'Apple Watch Ultra 3', price: 5999, tag: 'new', image: 'https://picsum.photos/seed/watchultra/400/400', rating: 4.7 },
  { id: 8, name: 'DJI Mini 5 Pro', price: 4788, originalPrice: 5288, tag: 'sale', image: 'https://picsum.photos/seed/djimini5/400/400', rating: 4.5 },
];

function ProductCard({ product }: { product: Product }) {
  const tagInfo = product.tag ? tagConfig[product.tag] : null;

  return (
    <HoverLift>
      <div
        className="flex flex-col rounded-xl overflow-hidden cursor-pointer"
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          transition: 'border-color var(--duration-normal) var(--ease-default), box-shadow var(--duration-normal) var(--ease-default)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--primary)';
          e.currentTarget.style.boxShadow = 'var(--ds-shadow-lg)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* Image */}
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio: '1',
            background: 'oklch(0.22 0.03 270)',
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover"
            style={{ opacity: 0.9, transition: 'transform var(--duration-slow) var(--ease-default)' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          />
          {tagInfo && (
            <Badge
              className="absolute flex items-center cursor-default"
              style={{
                top: 'var(--spacing-sm)',
                left: 'var(--spacing-sm)',
                gap: '0.25rem',
                fontSize: 'var(--font-size-small)',
                padding: '0.2rem 0.5rem',
              }}
            >
              {tagInfo.icon}
              {tagInfo.label}
            </Badge>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col" style={{ padding: 'var(--spacing-md)', gap: 'var(--spacing-xs)' }}>
          <h3
            className="font-semibold text-foreground truncate"
            style={{ fontSize: 'var(--font-size-label)' }}
          >
            {product.name}
          </h3>

          <div className="flex items-center" style={{ gap: '0.25rem' }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                style={{
                  color: i < Math.floor(product.rating) ? 'var(--theme-gold)' : 'var(--border)',
                  fontSize: 'var(--font-size-small)',
                }}
              >
                ★
              </span>
            ))}
            <span className="text-muted-foreground" style={{ fontSize: 'var(--font-size-small)', marginLeft: '0.25rem' }}>
              {product.rating}
            </span>
          </div>

          <div className="flex items-baseline" style={{ gap: 'var(--spacing-xs)' }}>
            <span
              className="font-bold"
              style={{ color: 'var(--theme-red)', fontSize: 'var(--font-size-title)' }}
            >
              ¥{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span
                className="line-through text-muted-foreground"
                style={{ fontSize: 'var(--font-size-small)' }}
              >
                ¥{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <Button
            className="mt-auto cursor-pointer flex items-center"
            style={{
              background: 'var(--primary)',
              color: 'var(--primary-foreground)',
              gap: '0.375rem',
              fontSize: 'var(--font-size-small)',
              marginTop: 'var(--spacing-xs)',
            }}
            size="sm"
          >
            <ShoppingCart style={{ width: '0.875rem', height: '0.875rem' }} />
            加入购物车
          </Button>
        </div>
      </div>
    </HoverLift>
  );
}

export function HotProducts() {
  return (
    <section id="hot-products" style={{ paddingBlock: 'var(--spacing-3xl)' }}>
      <div className="container">
        <FadeIn>
          <div className="flex items-end justify-between" style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <div>
              <h2
                className="font-bold text-foreground"
                style={{ fontSize: 'var(--font-size-headline)', marginBottom: 'var(--spacing-xs)' }}
              >
                热门商品
              </h2>
              <p className="text-muted-foreground" style={{ fontSize: 'var(--font-size-label)' }}>
                精选热销数码好物，品质之选
              </p>
            </div>
            <a
              href="#"
              className="text-primary hover:underline cursor-pointer"
              style={{ fontSize: 'var(--font-size-label)' }}
            >
              查看全部 →
            </a>
          </div>
        </FadeIn>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 'var(--spacing-lg)' }}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
