import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Search, Shield, Truck, RotateCcw, Headphones, Flame, Sparkles, Star, ChevronRight as ArrowRight, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeIn, Stagger, HoverLift } from '@/components/MotionPrimitives';
import { banners, categories, products, brands, hotSearches } from '@/data/products';
import { useShop } from '@/store/ShopContext';

export function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const next = useCallback(() => setCurrent(c => (c + 1) % banners.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + banners.length) % banners.length), []);
  useEffect(() => { const t = setInterval(next, 5000); return () => clearInterval(t); }, [next]);
  const slide = banners[current];
  return (
    <section className="relative overflow-hidden" style={{ height: 'clamp(360px, 55vh, 560px)' }}>
      <div className="absolute inset-0" style={{ background: slide.gradient, transition: 'background 0.8s var(--ease-default)' }} />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute rounded-full" style={{ width: 500, height: 500, background: 'oklch(0.55 0.22 265 / 0.15)', top: -100, right: -100, filter: 'blur(80px)' }} />
        <div className="absolute rounded-full" style={{ width: 300, height: 300, background: 'oklch(0.6 0.2 250 / 0.1)', bottom: -50, left: '10%', filter: 'blur(60px)' }} />
      </div>
      <div className="container relative flex items-center" style={{ height: '100%' }}>
        <FadeIn key={slide.id} variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } } }}>
          <div className="max-w-xl" style={{ paddingBlock: 'var(--spacing-3xl)' }}>
            <span className="inline-block rounded-full bg-primary/20 text-primary font-semibold" style={{ fontSize: 'var(--font-size-small)', padding: '0.25rem 0.75rem', marginBottom: 'var(--spacing-md)' }}>{slide.subtitle}</span>
            <h1 className="font-bold text-foreground" style={{ fontSize: 'var(--font-size-display)', lineHeight: 1.1, marginBottom: 'var(--spacing-md)', letterSpacing: 'var(--letter-spacing-tight)' }}>{slide.title}</h1>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--font-size-body)', marginBottom: 'var(--spacing-xl)', lineHeight: 'var(--line-height)' }}>{slide.description}</p>
            <div className="flex items-center" style={{ gap: 'var(--spacing-md)' }}>
              <Button className="glow-primary cursor-pointer font-semibold" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', padding: '0.75rem 2rem' }}>{slide.cta}</Button>
              <Button variant="outline" className="cursor-pointer" style={{ borderColor: 'var(--border)', color: 'var(--foreground)', padding: '0.75rem 2rem' }}>了解更多</Button>
            </div>
          </div>
        </FadeIn>
      </div>
      <div className="absolute right-4 bottom-1/2 translate-y-1/2 hidden md:flex flex-col" style={{ gap: 'var(--spacing-sm)' }}>
        <Button variant="outline" size="icon" className="rounded-full cursor-pointer" style={{ background: 'oklch(0.18 0.025 270 / 0.6)', borderColor: 'var(--border)', color: 'var(--foreground)' }} onClick={prev}><ChevronLeft style={{ width: '1rem', height: '1rem' }} /></Button>
        <Button variant="outline" size="icon" className="rounded-full cursor-pointer" style={{ background: 'oklch(0.18 0.025 270 / 0.6)', borderColor: 'var(--border)', color: 'var(--foreground)' }} onClick={next}><ChevronRight style={{ width: '1rem', height: '1rem' }} /></Button>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex" style={{ gap: 'var(--spacing-xs)' }}>
        {banners.map((_, i) => (<button key={i} onClick={() => setCurrent(i)} className="rounded-full transition-all cursor-pointer" style={{ width: i === current ? '2rem' : '0.5rem', height: '0.5rem', background: i === current ? 'var(--primary)' : 'oklch(0.5 0.02 270 / 0.5)', transition: 'all var(--duration-normal) var(--ease-default)' }} />))}
      </div>
    </section>
  );
}

export function Categories() {
  const iconMap: Record<string, string> = { Smartphone: '📱', Laptop: '💻', Headphones: '🎧', Watch: '⌚', Camera: '📷', Gamepad2: '🎮', HardDrive: '💾', Cable: '🔌' };
  return (
    <section className="container" style={{ paddingBlock: 'var(--spacing-2xl)' }}>
      <Stagger className="grid grid-cols-4 md:grid-cols-8" style={{ gap: 'var(--spacing-md)' }}>
        {categories.map(cat => (
          <FadeIn key={cat.id}>
            <Link to={`/category/${cat.id}`} className="flex flex-col items-center cursor-pointer group" style={{ gap: '0.5rem', padding: 'var(--spacing-sm)' }}>
              <div className="flex items-center justify-center rounded-xl transition-colors" style={{ width: '3.5rem', height: '3.5rem', background: 'var(--secondary)', transition: 'background var(--duration-normal) var(--ease-default)' }}>
                <span style={{ fontSize: '1.5rem' }}>{iconMap[cat.icon] || '📦'}</span>
              </div>
              <span className="text-muted-foreground group-hover:text-foreground transition-colors" style={{ fontSize: 'var(--font-size-small)', transition: 'color var(--duration-fast) var(--ease-default)' }}>{cat.name}</span>
            </Link>
          </FadeIn>
        ))}
      </Stagger>
    </section>
  );
}

function FlashSale() {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 34, seconds: 56 });
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(p => {
      let { hours, minutes, seconds } = p;
      seconds--;
      if (seconds < 0) { seconds = 59; minutes--; }
      if (minutes < 0) { minutes = 59; hours--; }
      if (hours < 0) { hours = 0; minutes = 0; seconds = 0; }
      return { hours, minutes, seconds };
    }), 1000);
    return () => clearInterval(timer);
  }, []);
  const flashProducts = products.filter(p => p.isFlashSale);
  if (!flashProducts.length) return null;
  return (
    <section className="container" style={{ paddingBlock: 'var(--spacing-lg)' }}>
      <div className="rounded-2xl" style={{ background: 'oklch(0.2 0.04 25 / 0.4)', padding: 'var(--spacing-xl)' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-lg)' }}>
          <div className="flex items-center" style={{ gap: 'var(--spacing-md)' }}>
            <Flame className="text-theme-red" style={{ width: '1.5rem', height: '1.5rem' }} />
            <h2 className="font-bold text-foreground" style={{ fontSize: 'var(--font-size-title)' }}>限时秒杀</h2>
            <div className="flex items-center" style={{ gap: '0.25rem' }}>
              {[timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((v, i) => (
                <span key={i} className="flex items-center">
                  <span className="rounded font-mono font-bold text-foreground" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', padding: '0.2rem 0.4rem', fontSize: 'var(--font-size-label)', minWidth: '1.8rem', textAlign: 'center' }}>{String(v).padStart(2, '0')}</span>
                  {i < 2 && <span className="text-primary font-bold" style={{ marginInline: '0.15rem' }}>:</span>}
                </span>
              ))}
            </div>
          </div>
          <Link to="/search?q=秒杀" className="flex items-center text-primary cursor-pointer" style={{ fontSize: 'var(--font-size-small)' }}>更多 <ArrowRight style={{ width: '0.875rem', height: '0.875rem' }} /></Link>
        </div>
        <div className="flex overflow-x-auto" style={{ gap: 'var(--spacing-md)' }}>
          {flashProducts.map(p => (
            <Link key={p.id} to={`/product/${p.id}`} className="min-w-[160px] flex-shrink-0 rounded-xl p-3 cursor-pointer" style={{ background: 'var(--card)' }}>
              <div className="rounded-lg overflow-hidden" style={{ aspectRatio: '1', background: 'var(--muted)', marginBottom: '0.5rem' }}>
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <p className="font-medium text-foreground truncate" style={{ fontSize: 'var(--font-size-small)' }}>{p.name}</p>
              <div className="flex items-center" style={{ gap: '0.375rem' }}>
                <span className="font-bold text-theme-red" style={{ fontSize: 'var(--font-size-label)' }}>¥{p.price}</span>
                <span className="text-muted-foreground line-through" style={{ fontSize: 'var(--font-size-small)' }}>¥{p.originalPrice}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandZone() {
  return (
    <section className="container" style={{ paddingBlock: 'var(--spacing-lg)' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-lg)' }}>
        <h2 className="font-bold text-foreground" style={{ fontSize: 'var(--font-size-title)' }}>品牌专区</h2>
        <Link to="/search" className="flex items-center text-primary cursor-pointer" style={{ fontSize: 'var(--font-size-small)' }}>查看全部 <ArrowRight style={{ width: '0.875rem', height: '0.875rem' }} /></Link>
      </div>
      <Stagger className="grid grid-cols-5 md:grid-cols-10" style={{ gap: 'var(--spacing-sm)' }}>
        {brands.map(b => (
          <FadeIn key={b.id}>
            <div className="flex items-center justify-center rounded-lg cursor-pointer transition-colors" style={{ background: 'var(--card)', padding: 'var(--spacing-sm)', height: '3.5rem', border: '1px solid var(--border)', transition: 'border-color var(--duration-fast) var(--ease-default)' }}>
              <span className="font-semibold text-muted-foreground" style={{ fontSize: 'var(--font-size-small)' }}>{b.name}</span>
            </div>
          </FadeIn>
        ))}
      </Stagger>
    </section>
  );
}

function ServiceGuarantee() {
  const items = [
    { icon: Shield, label: '正品保障', desc: '假一赔十' },
    { icon: Truck, label: '极速配送', desc: '当日/次日达' },
    { icon: RotateCcw, label: '7天退换', desc: '无理由退货' },
    { icon: Headphones, label: '24h客服', desc: '随时在线' },
  ];
  return (
    <section className="container" style={{ paddingBlock: 'var(--spacing-md)' }}>
      <Stagger className="grid grid-cols-2 md:grid-cols-4" style={{ gap: 'var(--spacing-md)' }}>
        {items.map(item => (
          <FadeIn key={item.label}>
            <div className="flex items-center rounded-xl" style={{ background: 'var(--card)', padding: 'var(--spacing-md)', gap: 'var(--spacing-sm)', border: '1px solid var(--border)' }}>
              <item.icon className="text-primary" style={{ width: '1.25rem', height: '1.25rem', flexShrink: 0 }} />
              <div>
                <p className="font-semibold text-foreground" style={{ fontSize: 'var(--font-size-label)' }}>{item.label}</p>
                <p className="text-muted-foreground" style={{ fontSize: 'var(--font-size-small)' }}>{item.desc}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </Stagger>
    </section>
  );
}

function NewUserZone() {
  return (
    <section className="container" style={{ paddingBlock: 'var(--spacing-lg)' }}>
      <div className="rounded-2xl" style={{ background: 'linear-gradient(135deg, oklch(0.35 0.12 155) 0%, oklch(0.25 0.06 265) 100%)', padding: 'var(--spacing-xl)' }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center" style={{ gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-xs)' }}>
              <Sparkles className="text-theme-gold" style={{ width: '1.25rem', height: '1.25rem' }} />
              <h3 className="font-bold text-foreground" style={{ fontSize: 'var(--font-size-title)' }}>新人专享</h3>
            </div>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--font-size-label)' }}>首单立减50元 | 专属折扣 | 免费配送</p>
          </div>
          <Button className="glow-accent cursor-pointer font-semibold" style={{ background: 'var(--accent)', color: 'var(--accent-foreground)', padding: '0.6rem 1.5rem' }}>立即领取</Button>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const msgs = ['618大促正在进行中，精选数码低至5折', '新品 Galaxy S25 Ultra 限量首发', '会员日特惠：全场9折起', '免费配送门槛降至99元'];
  return (
    <div className="container" style={{ paddingBlock: 'var(--spacing-xs)' }}>
      <div className="flex items-center rounded-lg overflow-hidden" style={{ background: 'var(--card)', padding: '0.5rem var(--spacing-md)', gap: 'var(--spacing-sm)' }}>
        <Megaphone className="text-theme-gold flex-shrink-0" style={{ width: '0.875rem', height: '0.875rem' }} />
        <div className="overflow-hidden flex-1">
          <div className="whitespace-nowrap" style={{ animation: 'marquee 20s linear infinite' }}>
            {msgs.map((m, i) => <span key={i} className="text-muted-foreground" style={{ fontSize: 'var(--font-size-small)', marginRight: '3rem' }}>{m}</span>)}
          </div>
        </div>
      </div>
      <style>{`@keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }`}</style>
    </div>
  );
}

function RecommendForYou() {
  const { dispatch } = useShop();
  const recommendProducts = [...products].sort(() => Math.random() - 0.5);
  return (
    <section className="container" style={{ paddingBlock: 'var(--spacing-2xl)' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <div className="flex items-center" style={{ gap: 'var(--spacing-sm)' }}>
          <Star className="text-theme-gold" style={{ width: '1.25rem', height: '1.25rem' }} />
          <h2 className="font-bold text-foreground" style={{ fontSize: 'var(--font-size-title)' }}>猜你喜欢</h2>
        </div>
      </div>
      <Stagger className="grid grid-cols-2 md:grid-cols-4" style={{ gap: 'var(--spacing-lg)' }}>
        {recommendProducts.map(p => (
          <FadeIn key={p.id}>
            <HoverLift>
              <Link to={`/product/${p.id}`} className="block rounded-xl overflow-hidden cursor-pointer" style={{ background: 'var(--card)', border: '1px solid var(--border)', transition: 'border-color var(--duration-fast) var(--ease-default)' }} onClick={() => dispatch({ type: 'ADD_HISTORY', productId: p.id })}>
                <div className="relative" style={{ aspectRatio: '1', background: 'var(--muted)' }}>
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                  {p.isHot && <Badge className="absolute top-2 left-2" style={{ background: 'var(--destructive)', color: 'white', fontSize: 'var(--font-size-small)' }}>热销</Badge>}
                  {p.isNew && <Badge className="absolute top-2 left-2" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', fontSize: 'var(--font-size-small)', left: p.isHot ? '3rem' : '0.5rem' }}>新品</Badge>}
                </div>
                <div style={{ padding: 'var(--spacing-sm)' }}>
                  <p className="font-medium text-foreground truncate" style={{ fontSize: 'var(--font-size-label)', marginBottom: '0.25rem' }}>{p.name}</p>
                  <div className="flex items-center" style={{ gap: '0.25rem', marginBottom: '0.25rem' }}>
                    {p.tags.slice(0, 2).map(t => <span key={t} className="rounded text-primary" style={{ fontSize: '0.625rem', padding: '0.1rem 0.3rem', background: 'oklch(0.55 0.22 265 / 0.15)' }}>{t}</span>)}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline" style={{ gap: '0.375rem' }}>
                      <span className="font-bold text-theme-red" style={{ fontSize: 'var(--font-size-body)' }}>¥{p.price}</span>
                      {p.originalPrice > p.price && <span className="text-muted-foreground line-through" style={{ fontSize: 'var(--font-size-small)' }}>¥{p.originalPrice}</span>}
                    </div>
                    <span className="text-muted-foreground" style={{ fontSize: '0.625rem' }}>{p.sales > 10000 ? `${(p.sales / 10000).toFixed(1)}万` : p.sales}人付款</span>
                  </div>
                </div>
              </Link>
            </HoverLift>
          </FadeIn>
        ))}
      </Stagger>
    </section>
  );
}

export { FlashSale, BrandZone, ServiceGuarantee, NewUserZone, Marquee, RecommendForYou };
