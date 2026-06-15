import { Smartphone, Laptop, Headphones, Watch, Camera, Gamepad2 } from 'lucide-react';
import { FadeIn, Stagger, HoverLift } from '@/components/MotionPrimitives';

interface Category {
  name: string;
  icon: React.ReactNode;
  count: number;
  color: string;
}

const categories: Category[] = [
  { name: '手机', icon: <Smartphone />, count: 256, color: 'oklch(0.55 0.22 265)' },
  { name: '电脑', icon: <Laptop />, count: 189, color: 'oklch(0.6 0.2 250)' },
  { name: '耳机', icon: <Headphones />, count: 134, color: 'oklch(0.65 0.18 155)' },
  { name: '智能穿戴', icon: <Watch />, count: 98, color: 'oklch(0.78 0.16 60)' },
  { name: '摄影器材', icon: <Camera />, count: 76, color: 'oklch(0.6 0.22 25)' },
  { name: '游戏外设', icon: <Gamepad2 />, count: 112, color: 'oklch(0.6 0.18 300)' },
];

export function Categories() {
  return (
    <section id="categories" style={{ paddingBlock: 'var(--spacing-3xl)' }}>
      <div className="container">
        <FadeIn>
          <div className="text-center" style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <h2
              className="font-bold text-foreground"
              style={{ fontSize: 'var(--font-size-headline)', marginBottom: 'var(--spacing-sm)' }}
            >
              商品分类
            </h2>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--font-size-label)' }}>
              精选数码品类，总有一款适合你
            </p>
          </div>
        </FadeIn>

        <Stagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6" style={{ gap: 'var(--spacing-md)' }}>
          {categories.map((cat) => (
            <HoverLift key={cat.name}>
              <div
                className="flex flex-col items-center rounded-xl cursor-pointer transition-colors"
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  padding: 'var(--spacing-xl) var(--spacing-md)',
                  gap: 'var(--spacing-sm)',
                  transition: 'border-color var(--duration-normal) var(--ease-default), background var(--duration-normal) var(--ease-default)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = cat.color;
                  e.currentTarget.style.background = `oklch(0.18 0.03 270)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.background = 'var(--card)';
                }}
              >
                <div
                  className="flex items-center justify-center rounded-lg"
                  style={{
                    width: '3rem',
                    height: '3rem',
                    background: `${cat.color} / 0.15`,
                    color: cat.color,
                  }}
                >
                  <span style={{ width: '1.5rem', height: '1.5rem' }}>{cat.icon}</span>
                </div>
                <span
                  className="font-semibold text-foreground"
                  style={{ fontSize: 'var(--font-size-label)' }}
                >
                  {cat.name}
                </span>
                <span
                  className="text-muted-foreground"
                  style={{ fontSize: 'var(--font-size-small)' }}
                >
                  {cat.count} 件商品
                </span>
              </div>
            </HoverLift>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
