import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowUpDown, X, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeIn, Stagger, HoverLift } from '@/components/MotionPrimitives';
import { products, categories, hotSearches } from '@/data/products';

type SortBy = 'default' | 'sales' | 'price-asc' | 'price-desc' | 'rating';

export default function SearchPage() {
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') || '');
  const [sortBy, setSortBy] = useState<SortBy>('default');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 99999]);
  const [showFilter, setShowFilter] = useState(false);

  const filtered = useMemo(() => {
    let result = products;
    if (query) result = result.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.brand.toLowerCase().includes(query.toLowerCase()) || p.tags.some(t => t.includes(query)));
    if (selectedCategory !== 'all') result = result.filter(p => p.category === selectedCategory);
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (sortBy) {
      case 'sales': result.sort((a, b) => b.sales - a.sales); break;
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
    }
    return result;
  }, [query, sortBy, selectedCategory, priceRange]);

  const sortOptions: { key: SortBy; label: string }[] = [
    { key: 'default', label: '综合' }, { key: 'sales', label: '销量' },
    { key: 'price-asc', label: '价格↑' }, { key: 'price-desc', label: '价格↓' }, { key: 'rating', label: '评分' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="container" style={{ paddingBlock: 'var(--spacing-lg)' }}>
        {/* Search Bar */}
        <div className="flex items-center" style={{ gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-lg)' }}>
          <div className="flex items-center flex-1 rounded-full" style={{ background: 'var(--secondary)', border: '1px solid var(--border)' }}>
            <Search className="text-muted-foreground" style={{ width: '1rem', height: '1rem', marginLeft: '0.75rem' }} />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="搜索数码好物..." className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none" style={{ padding: '0.5rem 0.75rem', fontSize: 'var(--font-size-label)' }} />
            {query && <button onClick={() => setQuery('')} className="cursor-pointer mr-2"><X className="text-muted-foreground" style={{ width: '0.875rem', height: '0.875rem' }} /></button>}
          </div>
          <Button variant="outline" onClick={() => setShowFilter(!showFilter)} className="cursor-pointer rounded-full"><SlidersHorizontal style={{ width: '1rem', height: '1rem' }} /></Button>
        </div>

        {/* Hot Searches */}
        {!query && (
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <div className="flex items-center" style={{ gap: '0.375rem', marginBottom: '0.5rem' }}>
              <Clock className="text-theme-red" style={{ width: '0.875rem', height: '0.875rem' }} />
              <span className="font-medium text-foreground" style={{ fontSize: 'var(--font-size-label)' }}>热搜榜</span>
            </div>
            <div className="flex flex-wrap" style={{ gap: '0.375rem' }}>
              {hotSearches.map((h, i) => (
                <button key={h} onClick={() => setQuery(h)} className="rounded-full cursor-pointer text-muted-foreground hover:text-foreground" style={{ background: 'var(--secondary)', padding: '0.375rem 0.875rem', fontSize: 'var(--font-size-small)', transition: 'color var(--duration-fast) var(--ease-default)' }}>
                  <span className={`font-bold ${i < 3 ? 'text-theme-red' : ''}`}>{i + 1}.</span> {h}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Filter Panel */}
        {showFilter && (
          <FadeIn>
            <div className="rounded-xl" style={{ background: 'var(--card)', padding: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)', border: '1px solid var(--border)' }}>
              <div style={{ marginBottom: 'var(--spacing-sm)' }}>
                <p className="font-medium text-foreground" style={{ fontSize: 'var(--font-size-label)', marginBottom: '0.375rem' }}>分类</p>
                <div className="flex flex-wrap" style={{ gap: '0.375rem' }}>
                  <button onClick={() => setSelectedCategory('all')} className="rounded-full cursor-pointer" style={{ padding: '0.25rem 0.75rem', fontSize: 'var(--font-size-small)', background: selectedCategory === 'all' ? 'var(--primary)' : 'var(--secondary)', color: selectedCategory === 'all' ? 'var(--primary-foreground)' : 'var(--foreground)', transition: 'all var(--duration-fast) var(--ease-default)' }}>全部</button>
                  {categories.map(c => (
                    <button key={c.id} onClick={() => setSelectedCategory(c.id)} className="rounded-full cursor-pointer" style={{ padding: '0.25rem 0.75rem', fontSize: 'var(--font-size-small)', background: selectedCategory === c.id ? 'var(--primary)' : 'var(--secondary)', color: selectedCategory === c.id ? 'var(--primary-foreground)' : 'var(--foreground)', transition: 'all var(--duration-fast) var(--ease-default)' }}>{c.name}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-medium text-foreground" style={{ fontSize: 'var(--font-size-label)', marginBottom: '0.375rem' }}>价格区间</p>
                <div className="flex flex-wrap" style={{ gap: '0.375rem' }}>
                  {[[0, 99999], [0, 500], [500, 2000], [2000, 5000], [5000, 99999]].map(([min, max]) => (
                    <button key={`${min}-${max}`} onClick={() => setPriceRange([min, max])} className="rounded-full cursor-pointer" style={{ padding: '0.25rem 0.75rem', fontSize: 'var(--font-size-small)', background: priceRange[0] === min && priceRange[1] === max ? 'var(--primary)' : 'var(--secondary)', color: priceRange[0] === min && priceRange[1] === max ? 'var(--primary-foreground)' : 'var(--foreground)', transition: 'all var(--duration-fast) var(--ease-default)' }}>
                      {max === 99999 ? (min === 0 ? '全部' : `${min}+`) : `${min}-${max}`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        )}

        {/* Sort Bar */}
        <div className="flex items-center" style={{ gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-lg)', borderBottom: '1px solid var(--border)', paddingBottom: 'var(--spacing-sm)' }}>
          <ArrowUpDown className="text-muted-foreground" style={{ width: '0.875rem', height: '0.875rem' }} />
          {sortOptions.map(opt => (
            <button key={opt.key} onClick={() => setSortBy(opt.key)} className="cursor-pointer font-medium" style={{ padding: '0.375rem 0.75rem', fontSize: 'var(--font-size-label)', color: sortBy === opt.key ? 'var(--primary)' : 'var(--muted-foreground)', transition: 'color var(--duration-fast) var(--ease-default)' }}>{opt.label}</button>
          ))}
          <span className="ml-auto text-muted-foreground" style={{ fontSize: 'var(--font-size-small)' }}>共 {filtered.length} 件</span>
        </div>

        {/* Results */}
        {filtered.length > 0 ? (
          <Stagger className="grid grid-cols-2 md:grid-cols-4" style={{ gap: 'var(--spacing-lg)' }}>
            {filtered.map(p => (
              <FadeIn key={p.id}><HoverLift>
                <Link to={`/product/${p.id}`} className="block rounded-xl overflow-hidden cursor-pointer" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                  <div className="relative" style={{ aspectRatio: '1', background: 'var(--muted)' }}>
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                    {p.isHot && <Badge className="absolute top-2 left-2" style={{ background: 'var(--destructive)', color: 'white', fontSize: 'var(--font-size-small)' }}>热销</Badge>}
                  </div>
                  <div style={{ padding: 'var(--spacing-sm)' }}>
                    <p className="text-foreground truncate" style={{ fontSize: 'var(--font-size-label)', marginBottom: '0.25rem' }}>{p.name}</p>
                    <div className="flex items-center" style={{ gap: '0.25rem', marginBottom: '0.25rem' }}>
                      {p.tags.slice(0, 2).map(t => <span key={t} className="rounded text-primary" style={{ fontSize: '0.625rem', padding: '0.1rem 0.3rem', background: 'oklch(0.55 0.22 265 / 0.15)' }}>{t}</span>)}
                    </div>
                    <div className="flex items-baseline" style={{ gap: '0.375rem' }}>
                      <span className="font-bold text-theme-red" style={{ fontSize: 'var(--font-size-label)' }}>¥{p.price}</span>
                      {p.originalPrice > p.price && <span className="text-muted-foreground line-through" style={{ fontSize: 'var(--font-size-small)' }}>¥{p.originalPrice}</span>}
                    </div>
                    <span className="text-muted-foreground" style={{ fontSize: '0.625rem' }}>{p.sales > 10000 ? `${(p.sales / 10000).toFixed(1)}万` : p.sales}人付款</span>
                  </div>
                </Link>
              </HoverLift></FadeIn>
            ))}
          </Stagger>
        ) : (
          <div className="text-center" style={{ padding: 'var(--spacing-3xl)' }}>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--font-size-body)' }}>没有找到相关商品</p>
            <Button variant="outline" onClick={() => { setQuery(''); setSelectedCategory('all'); setPriceRange([0, 99999]); }} className="cursor-pointer mt-4">清除筛选</Button>
          </div>
        )}
      </main>
    </div>
  );
}
