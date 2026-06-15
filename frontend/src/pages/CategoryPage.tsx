import { Link, useParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { FadeIn, Stagger, HoverLift } from '@/components/MotionPrimitives';
import { categories, products } from '@/data/products';

export default function CategoryPage() {
  const { id } = useParams();
  const category = categories.find(c => c.id === id);
  const categoryProducts = id ? products.filter(p => p.category === id) : products;

  return (
    <div className="min-h-screen bg-background">
      <main className="container" style={{ paddingBlock: 'var(--spacing-lg)' }}>
        <nav className="flex items-center text-muted-foreground" style={{ fontSize: 'var(--font-size-small)', marginBottom: 'var(--spacing-lg)', gap: '0.375rem' }}>
          <Link to="/" className="hover:text-foreground cursor-pointer">首页</Link>
          <ChevronRight style={{ width: '0.75rem', height: '0.75rem' }} />
          <span className="text-foreground">{category?.name || '全部分类'}</span>
        </nav>

        <div className="grid md:grid-cols-5" style={{ gap: 'var(--spacing-xl)' }}>
          {/* Left: Category List */}
          <div className="md:col-span-1">
            <div className="rounded-xl" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
              {categories.map(c => (
                <Link key={c.id} to={`/category/${c.id}`} className="flex items-center justify-between cursor-pointer" style={{ padding: '0.75rem var(--spacing-md)', fontSize: 'var(--font-size-label)', color: c.id === id ? 'var(--primary)' : 'var(--foreground)', background: c.id === id ? 'oklch(0.55 0.22 265 / 0.1)' : 'transparent', transition: 'all var(--duration-fast) var(--ease-default)', borderBottom: '1px solid var(--border)' }}>
                  <span>{c.name}</span>
                  <ChevronRight style={{ width: '0.75rem', height: '0.75rem' }} />
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Products */}
          <div className="md:col-span-4">
            {category && (
              <div className="flex flex-wrap" style={{ gap: '0.375rem', marginBottom: 'var(--spacing-lg)' }}>
                {category.subcategories.map(sub => (
                  <button key={sub.id} className="rounded-full cursor-pointer text-muted-foreground hover:text-foreground" style={{ background: 'var(--secondary)', padding: '0.375rem 0.875rem', fontSize: 'var(--font-size-small)', transition: 'color var(--duration-fast) var(--ease-default)' }}>{sub.name}</button>
                ))}
              </div>
            )}
            <Stagger className="grid grid-cols-2 md:grid-cols-3" style={{ gap: 'var(--spacing-lg)' }}>
              {categoryProducts.map(p => (
                <FadeIn key={p.id}><HoverLift>
                  <Link to={`/product/${p.id}`} className="block rounded-xl overflow-hidden cursor-pointer" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                    <div style={{ aspectRatio: '1', background: 'var(--muted)' }}><img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" /></div>
                    <div style={{ padding: 'var(--spacing-sm)' }}>
                      <p className="text-foreground truncate" style={{ fontSize: 'var(--font-size-label)', marginBottom: '0.25rem' }}>{p.name}</p>
                      <div className="flex items-baseline" style={{ gap: '0.375rem' }}>
                        <span className="font-bold text-theme-red" style={{ fontSize: 'var(--font-size-label)' }}>¥{p.price}</span>
                        <span className="text-muted-foreground line-through" style={{ fontSize: 'var(--font-size-small)' }}>¥{p.originalPrice}</span>
                      </div>
                    </div>
                  </Link>
                </HoverLift></FadeIn>
              ))}
            </Stagger>
            {categoryProducts.length === 0 && <p className="text-muted-foreground text-center" style={{ padding: 'var(--spacing-3xl)' }}>暂无该分类商品</p>}
          </div>
        </div>
      </main>
    </div>
  );
}
