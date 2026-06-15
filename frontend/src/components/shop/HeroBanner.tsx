import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/MotionPrimitives';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  gradient: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Galaxy S25 Ultra',
    subtitle: '旗舰新品首发',
    description: '钛金属机身 | 2亿像素 | Galaxy AI 全新体验',
    cta: '立即抢购',
    gradient: 'linear-gradient(135deg, oklch(0.2 0.04 270) 0%, oklch(0.35 0.15 265) 50%, oklch(0.55 0.22 265) 100%)',
  },
  {
    id: 2,
    title: '限时特惠',
    subtitle: '数码狂欢节',
    description: '精选数码产品低至5折 | 满1000减200 | 限量秒杀',
    cta: '查看优惠',
    gradient: 'linear-gradient(135deg, oklch(0.25 0.06 25) 0%, oklch(0.45 0.18 25) 50%, oklch(0.6 0.22 25) 100%)',
  },
  {
    id: 3,
    title: '会员专享',
    subtitle: '尊享特权',
    description: '新人立减50元 | 专属折扣 | 免费配送 | 延长保修',
    cta: '开通会员',
    gradient: 'linear-gradient(135deg, oklch(0.2 0.04 155) 0%, oklch(0.35 0.12 155) 50%, oklch(0.55 0.18 155) 100%)',
  },
];

export function HeroBanner() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden" style={{ height: 'clamp(400px, 60vh, 600px)' }}>
      {/* Background */}
      <div
        className="absolute inset-0 transition-all"
        style={{
          background: slide.gradient,
          transition: 'background 0.8s var(--ease-default)',
        }}
      />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            width: '500px',
            height: '500px',
            background: 'oklch(0.55 0.22 265 / 0.15)',
            top: '-100px',
            right: '-100px',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '300px',
            height: '300px',
            background: 'oklch(0.6 0.2 250 / 0.1)',
            bottom: '-50px',
            left: '10%',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* Content */}
      <div className="container relative flex items-center" style={{ height: '100%' }}>
        <FadeIn key={slide.id} variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } } }}>
          <div className="max-w-xl" style={{ paddingBlock: 'var(--spacing-3xl)' }}>
            <span
              className="inline-block rounded-full bg-primary/20 text-primary font-semibold"
              style={{
                fontSize: 'var(--font-size-small)',
                padding: '0.25rem 0.75rem',
                marginBottom: 'var(--spacing-md)',
              }}
            >
              {slide.subtitle}
            </span>
            <h1
              className="font-bold text-foreground"
              style={{
                fontSize: 'var(--font-size-display)',
                lineHeight: 1.1,
                marginBottom: 'var(--spacing-md)',
                letterSpacing: 'var(--letter-spacing-tight)',
              }}
            >
              {slide.title}
            </h1>
            <p
              className="text-muted-foreground"
              style={{
                fontSize: 'var(--font-size-body)',
                marginBottom: 'var(--spacing-xl)',
                lineHeight: 'var(--line-height)',
              }}
            >
              {slide.description}
            </p>
            <div className="flex items-center" style={{ gap: 'var(--spacing-md)' }}>
              <Button
                className="glow-primary cursor-pointer font-semibold"
                style={{
                  background: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  padding: '0.75rem 2rem',
                  fontSize: 'var(--font-size-label)',
                }}
              >
                {slide.cta}
              </Button>
              <Button
                variant="outline"
                className="cursor-pointer"
                style={{
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)',
                  padding: '0.75rem 2rem',
                  fontSize: 'var(--font-size-label)',
                }}
              >
                了解更多
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Navigation arrows */}
      <div className="absolute right-4 bottom-1/2 translate-y-1/2 hidden md:flex flex-col" style={{ gap: 'var(--spacing-sm)' }}>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full cursor-pointer"
          style={{ background: 'oklch(0.18 0.025 270 / 0.6)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
          onClick={prev}
        >
          <ChevronLeft style={{ width: '1rem', height: '1rem' }} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full cursor-pointer"
          style={{ background: 'oklch(0.18 0.025 270 / 0.6)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
          onClick={next}
        >
          <ChevronRight style={{ width: '1rem', height: '1rem' }} />
        </Button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex" style={{ gap: 'var(--spacing-xs)' }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="rounded-full transition-all cursor-pointer"
            style={{
              width: i === current ? '2rem' : '0.5rem',
              height: '0.5rem',
              background: i === current ? 'var(--primary)' : 'oklch(0.5 0.02 270 / 0.5)',
              transition: 'all var(--duration-normal) var(--ease-default)',
            }}
          />
        ))}
      </div>
    </section>
  );
}
