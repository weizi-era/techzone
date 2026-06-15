import { useState, useEffect } from 'react';
import { Clock, Flame, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeIn, Stagger, HoverLift } from '@/components/MotionPrimitives';

interface DealProduct {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: string;
  image: string;
  sold: number;
  total: number;
}

const dealProducts: DealProduct[] = [
  { id: 1, name: 'AirPods Max', price: 3299, originalPrice: 4399, discount: '7.5折', image: 'https://picsum.photos/seed/airpodsmax/300/300', sold: 78, total: 100 },
  { id: 2, name: 'Nintendo Switch 2', price: 2599, originalPrice: 2999, discount: '8.7折', image: 'https://picsum.photos/seed/switch2/300/300', sold: 156, total: 200 },
  { id: 3, name: 'Dyson V15 吸尘器', price: 3699, originalPrice: 4990, discount: '7.4折', image: 'https://picsum.photos/seed/dysonv15/300/300', sold: 45, total: 80 },
  { id: 4, name: 'Sony A7M4 相机', price: 13999, originalPrice: 16999, discount: '8.2折', image: 'https://picsum.photos/seed/sonya7m4/300/300', sold: 32, total: 50 },
];

function CountdownTimer() {
  const [time, setTime] = useState({ hours: 5, minutes: 23, seconds: 47 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds -= 1;
        if (seconds < 0) {
          seconds = 59;
          minutes -= 1;
        }
        if (minutes < 0) {
          minutes = 59;
          hours -= 1;
        }
        if (hours < 0) {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="flex items-center" style={{ gap: '0.375rem' }}>
      {([pad(time.hours), pad(time.minutes), pad(time.seconds)]).map((val, i) => (
        <div key={i} className="flex items-center" style={{ gap: '0.25rem' }}>
          <span
            className="font-bold rounded-md text-foreground"
            style={{
              background: 'oklch(0.55 0.22 265 / 0.2)',
              fontSize: 'var(--font-size-title)',
              padding: '0.25rem 0.5rem',
              fontFamily: 'monospace',
            }}
          >
            {val}
          </span>
          {i < 2 && <span className="text-primary font-bold" style={{ fontSize: 'var(--font-size-title)' }}>:</span>}
        </div>
      ))}
    </div>
  );
}

export function Promotion() {
  return (
    <section id="promotion" style={{ paddingBlock: 'var(--spacing-3xl)' }}>
      <div className="container">
        {/* Flash Sale */}
        <FadeIn>
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, oklch(0.2 0.04 25) 0%, oklch(0.28 0.06 270) 100%)',
              border: '1px solid var(--border)',
              padding: 'var(--spacing-2xl)',
              marginBottom: 'var(--spacing-2xl)',
            }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between" style={{ gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-xl)' }}>
              <div className="flex items-center" style={{ gap: 'var(--spacing-md)' }}>
                <div className="flex items-center" style={{ gap: 'var(--spacing-sm)' }}>
                  <Flame className="text-destructive" style={{ width: '1.5rem', height: '1.5rem' }} />
                  <h2
                    className="font-bold text-foreground"
                    style={{ fontSize: 'var(--font-size-headline)' }}
                  >
                    限时秒杀
                  </h2>
                </div>
                <CountdownTimer />
              </div>
              <div className="flex items-center" style={{ gap: 'var(--spacing-xs)' }}>
                <Clock className="text-muted-foreground" style={{ width: '1rem', height: '1rem' }} />
                <span className="text-muted-foreground" style={{ fontSize: 'var(--font-size-small)' }}>
                  距活动结束
                </span>
              </div>
            </div>

            <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 'var(--spacing-md)' }}>
              {dealProducts.map((product) => (
                <HoverLift key={product.id}>
                  <div
                    className="flex flex-col rounded-xl overflow-hidden cursor-pointer"
                    style={{
                      background: 'var(--card)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <div className="relative" style={{ aspectRatio: '1', background: 'oklch(0.22 0.03 270)' }}>
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        style={{ opacity: 0.9 }}
                      />
                      <Badge
                        className="absolute cursor-default"
                        style={{
                          top: 'var(--spacing-xs)',
                          right: 'var(--spacing-xs)',
                          background: 'var(--destructive)',
                          color: 'white',
                          fontSize: 'var(--font-size-small)',
                          padding: '0.15rem 0.4rem',
                        }}
                      >
                        {product.discount}
                      </Badge>
                    </div>
                    <div className="flex flex-col" style={{ padding: 'var(--spacing-sm)', gap: '0.375rem' }}>
                      <span
                        className="font-semibold text-foreground truncate"
                        style={{ fontSize: 'var(--font-size-label)' }}
                      >
                        {product.name}
                      </span>
                      <div className="flex items-baseline" style={{ gap: 'var(--spacing-xs)' }}>
                        <span className="font-bold" style={{ color: 'var(--theme-red)', fontSize: 'var(--font-size-body)' }}>
                          ¥{product.price.toLocaleString()}
                        </span>
                        <span className="line-through text-muted-foreground" style={{ fontSize: 'var(--font-size-small)' }}>
                          ¥{product.originalPrice.toLocaleString()}
                        </span>
                      </div>
                      {/* Progress bar */}
                      <div className="relative w-full rounded-full" style={{ height: '0.375rem', background: 'oklch(0.28 0.03 270)' }}>
                        <div
                          className="absolute top-0 left-0 h-full rounded-full"
                          style={{
                            width: `${(product.sold / product.total) * 100}%`,
                            background: 'linear-gradient(90deg, var(--primary), oklch(0.6 0.2 265))',
                          }}
                        />
                      </div>
                      <span className="text-muted-foreground" style={{ fontSize: '0.625rem' }}>
                        已抢 {product.sold}/{product.total}
                      </span>
                    </div>
                  </div>
                </HoverLift>
              ))}
            </Stagger>
          </div>
        </FadeIn>

        {/* Featured Deals */}
        <FadeIn>
          <div className="flex items-end justify-between" style={{ marginBottom: 'var(--spacing-xl)' }}>
            <div>
              <h2
                className="font-bold text-foreground"
                style={{ fontSize: 'var(--font-size-headline)', marginBottom: 'var(--spacing-xs)' }}
              >
                爆款推荐
              </h2>
              <p className="text-muted-foreground" style={{ fontSize: 'var(--font-size-label)' }}>
                编辑精选，为你推荐超值好物
              </p>
            </div>
            <a
              href="#"
              className="flex items-center text-primary cursor-pointer hover:underline"
              style={{ gap: '0.25rem', fontSize: 'var(--font-size-label)' }}
            >
              查看更多 <ArrowRight style={{ width: '0.875rem', height: '0.875rem' }} />
            </a>
          </div>
        </FadeIn>

        <Stagger className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 'var(--spacing-lg)' }}>
          {[
            {
              title: '笔记本专场',
              desc: 'MacBook / ThinkPad / XPS 全场优惠',
              gradient: 'linear-gradient(135deg, oklch(0.25 0.06 265) 0%, oklch(0.4 0.15 265) 100%)',
              cta: '立即选购',
            },
            {
              title: '音频设备',
              desc: '降噪耳机 / 蓝牙音箱 / Hi-Fi 优选',
              gradient: 'linear-gradient(135deg, oklch(0.25 0.06 155) 0%, oklch(0.4 0.12 155) 100%)',
              cta: '探索好物',
            },
          ].map((deal) => (
            <HoverLift key={deal.title}>
              <div
                className="relative rounded-xl overflow-hidden cursor-pointer"
                style={{
                  background: deal.gradient,
                  padding: 'var(--spacing-2xl)',
                  border: '1px solid var(--border)',
                  minHeight: '180px',
                }}
              >
                <div className="relative flex flex-col justify-between" style={{ height: '100%' }}>
                  <div>
                    <h3
                      className="font-bold text-foreground"
                      style={{ fontSize: 'var(--font-size-title)', marginBottom: 'var(--spacing-xs)' }}
                    >
                      {deal.title}
                    </h3>
                    <p className="text-muted-foreground" style={{ fontSize: 'var(--font-size-label)' }}>
                      {deal.desc}
                    </p>
                  </div>
                  <Button
                    className="self-start cursor-pointer"
                    style={{
                      background: 'oklch(1 0 0 / 0.15)',
                      color: 'var(--foreground)',
                      borderColor: 'oklch(1 0 0 / 0.3)',
                      marginTop: 'var(--spacing-lg)',
                      fontSize: 'var(--font-size-small)',
                    }}
                    variant="outline"
                    size="sm"
                  >
                    {deal.cta}
                  </Button>
                </div>
              </div>
            </HoverLift>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
