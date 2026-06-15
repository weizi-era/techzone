import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, Star, Truck, Shield, RotateCcw, ChevronRight, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeIn, Stagger, HoverLift } from '@/components/MotionPrimitives';
import { products } from '@/data/products';
import { useShop, useCart } from '@/store/ShopContext';

const specOptions: Record<string, { label: string; options: string[] }> = {
  phone: { label: '版本', options: ['128GB', '256GB', '512GB', '1TB'] },
  computer: { label: '配置', options: ['16GB+512GB', '32GB+1TB', '48GB+2TB'] },
  headphone: { label: '颜色', options: ['白色', '黑色', '星光色'] },
  wearable: { label: '尺寸', options: ['41mm', '45mm', '49mm'] },
  camera: { label: '套装', options: ['单机身', '含镜头套装', '专业套装'] },
  gaming: { label: '版本', options: ['标准版', '限定版'] },
  storage: { label: '容量', options: ['512GB', '1TB', '2TB', '4TB'] },
  accessory: { label: '规格', options: ['标准版', '套装版'] },
};

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { dispatch } = useShop();
  const { totalCount } = useCart();
  const [currentImg, setCurrentImg] = useState(0);
  const [selectedSpec, setSelectedSpec] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'detail' | 'reviews' | 'specs'>('detail');

  if (!product) return <div className="container" style={{ padding: 'var(--spacing-3xl)', textAlign: 'center' }}><p className="text-muted-foreground">商品不存在</p><Link to="/" className="text-primary">返回首页</Link></div>;

  const specs = specOptions[product.category] || { label: '规格', options: ['标准版'] };
  const currentSpec = selectedSpec || specs.options[0];
  const similarProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const reviews = [
    { user: '数码达人', rating: 5, content: '非常满意，做工精致，性能强劲，物超所值！', date: '2026-06-10', hasImage: true },
    { user: '科技爱好者', rating: 4, content: '整体不错，运行流畅，性价比很高，推荐入手。', date: '2026-06-08', hasImage: false },
    { user: '极客玩家', rating: 5, content: '质感一流，超出预期，下次还会回购。', date: '2026-06-05', hasImage: true },
  ];

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', product, spec: currentSpec, quantity });
    dispatch({ type: 'ADD_HISTORY', productId: product.id });
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container" style={{ paddingBlock: 'var(--spacing-xl)' }}>
        {/* Breadcrumb */}
        <nav className="flex items-center text-muted-foreground" style={{ fontSize: 'var(--font-size-small)', marginBottom: 'var(--spacing-lg)', gap: '0.375rem' }}>
          <Link to="/" className="hover:text-foreground cursor-pointer">首页</Link>
          <ChevronRight style={{ width: '0.75rem', height: '0.75rem' }} />
          <Link to={`/category/${product.category}`} className="hover:text-foreground cursor-pointer">{product.brand}</Link>
          <ChevronRight style={{ width: '0.75rem', height: '0.75rem' }} />
          <span className="text-foreground">{product.name}</span>
        </nav>

        <FadeIn>
          <div className="grid md:grid-cols-2" style={{ gap: 'var(--spacing-2xl)', marginBottom: 'var(--spacing-2xl)' }}>
            {/* Image Gallery */}
            <div>
              <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '1', background: 'var(--muted)', marginBottom: 'var(--spacing-sm)' }}>
                <img src={product.images[currentImg] || product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex" style={{ gap: 'var(--spacing-sm)' }}>
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setCurrentImg(i)} className="rounded-lg overflow-hidden cursor-pointer" style={{ width: '4rem', height: '4rem', border: i === currentImg ? '2px solid var(--primary)' : '2px solid var(--border)', transition: 'border-color var(--duration-fast) var(--ease-default)' }}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="font-bold text-foreground" style={{ fontSize: 'var(--font-size-headline)', marginBottom: 'var(--spacing-sm)' }}>{product.name}</h1>
              <div className="flex items-center flex-wrap" style={{ gap: '0.375rem', marginBottom: 'var(--spacing-md)' }}>
                {product.tags.map(t => <Badge key={t} style={{ background: 'oklch(0.55 0.22 265 / 0.15)', color: 'var(--primary)', fontSize: 'var(--font-size-small)' }}>{t}</Badge>)}
              </div>
              <div className="rounded-xl" style={{ background: 'oklch(0.2 0.04 25 / 0.3)', padding: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
                <div className="flex items-baseline" style={{ gap: 'var(--spacing-sm)' }}>
                  <span className="font-bold text-theme-red" style={{ fontSize: 'var(--font-size-headline)' }}>¥{product.price}</span>
                  <span className="text-muted-foreground line-through" style={{ fontSize: 'var(--font-size-label)' }}>¥{product.originalPrice}</span>
                  <Badge style={{ background: 'var(--destructive)', color: 'white', fontSize: 'var(--font-size-small)' }}>省{product.originalPrice - product.price}元</Badge>
                </div>
                <p className="text-muted-foreground" style={{ fontSize: 'var(--font-size-small)', marginTop: '0.25rem' }}>含税价格 | 会员再享9.5折</p>
              </div>

              {/* Spec Selection */}
              <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <p className="font-medium text-foreground" style={{ fontSize: 'var(--font-size-label)', marginBottom: '0.5rem' }}>{specs.label}</p>
                <div className="flex flex-wrap" style={{ gap: '0.5rem' }}>
                  {specs.options.map(opt => (
                    <button key={opt} onClick={() => setSelectedSpec(opt)} className="rounded-lg cursor-pointer font-medium" style={{ padding: '0.5rem 1rem', fontSize: 'var(--font-size-label)', border: currentSpec === opt ? '2px solid var(--primary)' : '1px solid var(--border)', background: currentSpec === opt ? 'oklch(0.55 0.22 265 / 0.1)' : 'var(--card)', color: currentSpec === opt ? 'var(--primary)' : 'var(--foreground)', transition: 'all var(--duration-fast) var(--ease-default)' }}>{opt}</button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center" style={{ gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-xl)' }}>
                <span className="font-medium text-foreground" style={{ fontSize: 'var(--font-size-label)' }}>数量</span>
                <div className="flex items-center rounded-lg" style={{ border: '1px solid var(--border)' }}>
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="cursor-pointer px-3 py-1.5"><Minus style={{ width: '0.875rem', height: '0.875rem' }} /></button>
                  <span className="text-foreground font-medium" style={{ padding: '0 0.75rem', fontSize: 'var(--font-size-label)', minWidth: '2rem', textAlign: 'center' }}>{quantity}</span>
                  <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} className="cursor-pointer px-3 py-1.5"><Plus style={{ width: '0.875rem', height: '0.875rem' }} /></button>
                </div>
                <span className="text-muted-foreground" style={{ fontSize: 'var(--font-size-small)' }}>库存 {product.stock} 件</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center" style={{ gap: 'var(--spacing-md)' }}>
                <Button onClick={handleAddToCart} className="flex-1 cursor-pointer font-semibold rounded-xl" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', padding: '0.875rem', fontSize: 'var(--font-size-label)' }}>
                  <ShoppingCart style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} /> 加入购物车
                </Button>
                <Button className="flex-1 cursor-pointer font-semibold rounded-xl glow-primary" style={{ background: 'var(--destructive)', color: 'white', padding: '0.875rem', fontSize: 'var(--font-size-label)' }}>立即购买</Button>
                <button onClick={() => dispatch({ type: 'TOGGLE_FAVORITE', productId: product.id })} className="cursor-pointer p-3 rounded-xl" style={{ border: '1px solid var(--border)' }}>
                  <Heart style={{ width: '1.25rem', height: '1.25rem', color: 'var(--muted-foreground)' }} />
                </button>
              </div>

              {/* Service Tags */}
              <div className="flex items-center flex-wrap" style={{ gap: 'var(--spacing-md)', marginTop: 'var(--spacing-lg)' }}>
                {[{ Icon: Truck, text: '极速配送' }, { Icon: Shield, text: '正品保障' }, { Icon: RotateCcw, text: '7天退换' }].map(({ Icon, text }) => (
                  <div key={text} className="flex items-center text-muted-foreground" style={{ gap: '0.25rem', fontSize: 'var(--font-size-small)' }}>
                    <Icon style={{ width: '0.875rem', height: '0.875rem' }} /> {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Tabs */}
        <div className="flex" style={{ borderBottom: '1px solid var(--border)', marginBottom: 'var(--spacing-xl)' }}>
          {(['detail', 'reviews', 'specs'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className="cursor-pointer font-medium" style={{ padding: 'var(--spacing-md) var(--spacing-xl)', fontSize: 'var(--font-size-label)', color: activeTab === tab ? 'var(--primary)' : 'var(--muted-foreground)', borderBottom: activeTab === tab ? '2px solid var(--primary)' : '2px solid transparent', transition: 'all var(--duration-fast) var(--ease-default)' }}>
              {tab === 'detail' ? '商品详情' : tab === 'reviews' ? `用户评价 (${product.reviewCount})` : '规格参数'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'detail' && (
          <FadeIn><div className="rounded-xl" style={{ background: 'var(--card)', padding: 'var(--spacing-xl)' }}>
            <p className="text-foreground" style={{ fontSize: 'var(--font-size-body)', lineHeight: 'var(--line-height)' }}>{product.description}</p>
            <div style={{ marginTop: 'var(--spacing-lg)' }}>
              {product.images.map((img, i) => <div key={i} className="rounded-lg overflow-hidden" style={{ marginBottom: 'var(--spacing-sm)' }}><img src={img} alt="" className="w-full" loading="lazy" /></div>)}
            </div>
          </div></FadeIn>
        )}

        {activeTab === 'reviews' && (
          <Stagger style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            <div className="flex items-center" style={{ gap: 'var(--spacing-xl)', marginBottom: 'var(--spacing-md)' }}>
              <div className="text-center"><p className="font-bold text-theme-red" style={{ fontSize: 'var(--font-size-headline)' }}>{product.rating}</p><p className="text-muted-foreground" style={{ fontSize: 'var(--font-size-small)' }}>综合评分</p></div>
              <div className="text-center"><p className="font-bold text-foreground" style={{ fontSize: 'var(--font-size-headline)' }}>{product.reviewCount}</p><p className="text-muted-foreground" style={{ fontSize: 'var(--font-size-small)' }}>评价总数</p></div>
              <div className="text-center"><p className="font-bold text-foreground" style={{ fontSize: 'var(--font-size-headline)' }}>98%</p><p className="text-muted-foreground" style={{ fontSize: 'var(--font-size-small)' }}>好评率</p></div>
            </div>
            {reviews.map((r, i) => (
              <FadeIn key={i}><div className="rounded-xl" style={{ background: 'var(--card)', padding: 'var(--spacing-md)', border: '1px solid var(--border)' }}>
                <div className="flex items-center justify-between" style={{ marginBottom: '0.5rem' }}>
                  <div className="flex items-center" style={{ gap: '0.5rem' }}>
                    <div className="rounded-full bg-primary flex items-center justify-center" style={{ width: '2rem', height: '2rem' }}><span className="text-primary-foreground font-bold" style={{ fontSize: 'var(--font-size-small)' }}>{r.user[0]}</span></div>
                    <span className="font-medium text-foreground" style={{ fontSize: 'var(--font-size-label)' }}>{r.user}</span>
                  </div>
                  <div className="flex items-center">{Array.from({ length: 5 }).map((_, si) => <Star key={si} className={si < r.rating ? 'text-theme-gold' : 'text-muted'} style={{ width: '0.75rem', height: '0.75rem', fill: si < r.rating ? 'currentColor' : 'none' }} />)}</div>
                </div>
                <p className="text-foreground" style={{ fontSize: 'var(--font-size-label)', lineHeight: 'var(--line-height)' }}>{r.content}</p>
                <p className="text-muted-foreground" style={{ fontSize: 'var(--font-size-small)', marginTop: '0.375rem' }}>{r.date}</p>
              </div></FadeIn>
            ))}
          </Stagger>
        )}

        {activeTab === 'specs' && (
          <FadeIn><div className="rounded-xl" style={{ background: 'var(--card)', padding: 'var(--spacing-xl)' }}>
            <table className="w-full" style={{ fontSize: 'var(--font-size-label)' }}>
              <tbody>{Object.entries(product.specs).map(([k, v]) => (
                <tr key={k} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td className="text-muted-foreground" style={{ padding: '0.75rem', width: '8rem' }}>{k}</td>
                  <td className="text-foreground" style={{ padding: '0.75rem' }}>{v}</td>
                </tr>
              ))}</tbody>
            </table>
          </div></FadeIn>
        )}

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <section style={{ marginTop: 'var(--spacing-2xl)' }}>
            <h3 className="font-bold text-foreground" style={{ fontSize: 'var(--font-size-title)', marginBottom: 'var(--spacing-lg)' }}>相似推荐</h3>
            <Stagger className="grid grid-cols-2 md:grid-cols-4" style={{ gap: 'var(--spacing-md)' }}>
              {similarProducts.map(p => (
                <FadeIn key={p.id}><HoverLift>
                  <Link to={`/product/${p.id}`} className="block rounded-xl overflow-hidden cursor-pointer" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                    <div style={{ aspectRatio: '1', background: 'var(--muted)' }}><img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" /></div>
                    <div style={{ padding: 'var(--spacing-sm)' }}>
                      <p className="text-foreground truncate" style={{ fontSize: 'var(--font-size-small)', marginBottom: '0.25rem' }}>{p.name}</p>
                      <span className="font-bold text-theme-red" style={{ fontSize: 'var(--font-size-label)' }}>¥{p.price}</span>
                    </div>
                  </Link>
                </HoverLift></FadeIn>
              ))}
            </Stagger>
          </section>
        )}
      </main>
    </div>
  );
}
