import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, MapPin, Heart, Clock, Ticket, Crown, ChevronRight, LogOut, Star, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeIn, Stagger } from '@/components/MotionPrimitives';
import { useShop } from '@/store/ShopContext';
import { products } from '@/data/products';

const orderTabs = [
  { key: 'pending', label: '待付款' },
  { key: 'paid', label: '待发货' },
  { key: 'shipped', label: '待收货' },
  { key: 'delivered', label: '待评价' },
  { key: 'all', label: '全部订单' },
] as const;

const statusMap: Record<string, { label: string; color: string }> = {
  pending: { label: '待付款', color: 'var(--warning)' },
  paid: { label: '待发货', color: 'var(--info)' },
  shipped: { label: '已发货', color: 'var(--primary)' },
  delivered: { label: '已签收', color: 'var(--success)' },
  reviewed: { label: '已评价', color: 'var(--muted-foreground)' },
  cancelled: { label: '已取消', color: 'var(--destructive)' },
};

export default function UserPage() {
  const { state, dispatch } = useShop();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [page, setPage] = useState<'main' | 'orders' | 'addresses' | 'favorites' | 'coupons'>('main');
  const { user, orders, favorites, addresses, coupons } = state;

  if (!user) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <User className="text-muted-foreground mx-auto" style={{ width: '4rem', height: '4rem', marginBottom: 'var(--spacing-md)' }} />
        <p style={{ fontSize: 'var(--font-size-body)', marginBottom: 'var(--spacing-md)' }}>请先登录</p>
        <Button onClick={() => dispatch({ type: 'LOGIN', user: { nickname: '数码爱好者', avatar: '', phone: '138****8888', level: 3, levelName: '黄金会员', points: 2680, couponCount: 5, orderCounts: { pending: 2, paid: 1, shipped: 3, delivered: 8 } } })} className="cursor-pointer">登录</Button>
      </div>
    </div>
  );

  const levelProgress = Math.min(100, (user.points / 5000) * 100);
  const nextLevel = user.level < 7 ? `V${user.level + 1}` : '至尊';

  if (page === 'orders') return (
    <div className="min-h-screen bg-background">
      <main className="container" style={{ paddingBlock: 'var(--spacing-lg)' }}>
        <div className="flex items-center" style={{ marginBottom: 'var(--spacing-lg)', gap: 'var(--spacing-sm)' }}>
          <button onClick={() => setPage('main')} className="text-primary cursor-pointer" style={{ fontSize: 'var(--font-size-label)' }}>返回</button>
          <h2 className="font-bold text-foreground" style={{ fontSize: 'var(--font-size-title)' }}>我的订单</h2>
        </div>
        <div className="flex" style={{ gap: '0.25rem', marginBottom: 'var(--spacing-lg)', borderBottom: '1px solid var(--border)' }}>
          {orderTabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} className="cursor-pointer font-medium" style={{ padding: '0.625rem 1rem', fontSize: 'var(--font-size-label)', color: activeTab === tab.key ? 'var(--primary)' : 'var(--muted-foreground)', borderBottom: activeTab === tab.key ? '2px solid var(--primary)' : '2px solid transparent', transition: 'all var(--duration-fast) var(--ease-default)' }}>{tab.label}</button>
          ))}
        </div>
        <Stagger style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
          {orders.filter(o => activeTab === 'all' || o.status === activeTab).map(order => (
            <FadeIn key={order.id}>
              <div className="rounded-xl" style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: 'var(--spacing-md)' }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-sm)' }}>
                  <span className="text-muted-foreground" style={{ fontSize: 'var(--font-size-small)' }}>订单号: {order.id}</span>
                  <span className="font-medium" style={{ fontSize: 'var(--font-size-small)', color: statusMap[order.status]?.color }}>{statusMap[order.status]?.label}</span>
                </div>
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center" style={{ gap: 'var(--spacing-sm)', marginBottom: '0.375rem' }}>
                    <div className="rounded-lg overflow-hidden flex-shrink-0" style={{ width: '3.5rem', height: '3.5rem', background: 'var(--muted)' }}><img src={item.product.image} alt="" className="w-full h-full object-cover" /></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground truncate" style={{ fontSize: 'var(--font-size-label)' }}>{item.product.name}</p>
                      <p className="text-muted-foreground" style={{ fontSize: 'var(--font-size-small)' }}>{item.spec} x{item.quantity}</p>
                    </div>
                    <span className="font-medium text-foreground" style={{ fontSize: 'var(--font-size-label)' }}>¥{item.price}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between" style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--spacing-sm)', marginTop: 'var(--spacing-sm)' }}>
                  <span className="text-muted-foreground" style={{ fontSize: 'var(--font-size-small)' }}>{order.createdAt}</span>
                  <div className="flex items-center" style={{ gap: '0.5rem' }}>
                    <span className="text-foreground" style={{ fontSize: 'var(--font-size-label)' }}>合计: <span className="font-bold text-theme-red">¥{order.total}</span></span>
                    {order.status === 'pending' && <Button className="cursor-pointer rounded-full" style={{ padding: '0.25rem 1rem', fontSize: 'var(--font-size-small)' }}>去付款</Button>}
                    {order.status === 'delivered' && <Button variant="outline" className="cursor-pointer rounded-full" style={{ padding: '0.25rem 1rem', fontSize: 'var(--font-size-small)' }}>评价</Button>}
                    {order.status === 'shipped' && <Button variant="outline" className="cursor-pointer rounded-full" style={{ padding: '0.25rem 1rem', fontSize: 'var(--font-size-small)' }}>查看物流</Button>}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </Stagger>
      </main>
    </div>
  );

  if (page === 'addresses') return (
    <div className="min-h-screen bg-background">
      <main className="container" style={{ paddingBlock: 'var(--spacing-lg)' }}>
        <div className="flex items-center" style={{ marginBottom: 'var(--spacing-lg)', gap: 'var(--spacing-sm)' }}>
          <button onClick={() => setPage('main')} className="text-primary cursor-pointer" style={{ fontSize: 'var(--font-size-label)' }}>返回</button>
          <h2 className="font-bold text-foreground" style={{ fontSize: 'var(--font-size-title)' }}>收货地址</h2>
        </div>
        <Stagger style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
          {addresses.map(addr => (
            <FadeIn key={addr.id}>
              <div className="rounded-xl" style={{ background: 'var(--card)', border: addr.isDefault ? '1px solid var(--primary)' : '1px solid var(--border)', padding: 'var(--spacing-md)' }}>
                <div className="flex items-center justify-between" style={{ marginBottom: '0.375rem' }}>
                  <div className="flex items-center" style={{ gap: 'var(--spacing-sm)' }}>
                    <span className="font-medium text-foreground" style={{ fontSize: 'var(--font-size-label)' }}>{addr.name}</span>
                    <span className="text-muted-foreground" style={{ fontSize: 'var(--font-size-label)' }}>{addr.phone}</span>
                    {addr.isDefault && <Badge style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', fontSize: '0.625rem' }}>默认</Badge>}
                  </div>
                  <div className="flex items-center" style={{ gap: '0.5rem' }}>
                    {!addr.isDefault && <button onClick={() => dispatch({ type: 'SET_DEFAULT_ADDRESS', id: addr.id })} className="text-primary cursor-pointer" style={{ fontSize: 'var(--font-size-small)' }}>设为默认</button>}
                    <button onClick={() => dispatch({ type: 'REMOVE_ADDRESS', id: addr.id })} className="text-destructive cursor-pointer" style={{ fontSize: 'var(--font-size-small)' }}>删除</button>
                  </div>
                </div>
                <p className="text-foreground" style={{ fontSize: 'var(--font-size-label)' }}>{addr.province}{addr.city}{addr.district} {addr.detail}</p>
              </div>
            </FadeIn>
          ))}
        </Stagger>
        <Button onClick={() => dispatch({ type: 'ADD_ADDRESS', address: { id: 'a' + Date.now(), name: '新联系人', phone: '139****9999', province: '广东省', city: '深圳市', district: '福田区', detail: '新地址详情', isDefault: false } })} className="cursor-pointer mt-4 w-full rounded-xl" variant="outline">+ 新增收货地址</Button>
      </main>
    </div>
  );

  if (page === 'favorites') return (
    <div className="min-h-screen bg-background">
      <main className="container" style={{ paddingBlock: 'var(--spacing-lg)' }}>
        <div className="flex items-center" style={{ marginBottom: 'var(--spacing-lg)', gap: 'var(--spacing-sm)' }}>
          <button onClick={() => setPage('main')} className="text-primary cursor-pointer" style={{ fontSize: 'var(--font-size-label)' }}>返回</button>
          <h2 className="font-bold text-foreground" style={{ fontSize: 'var(--font-size-title)' }}>我的收藏</h2>
        </div>
        <Stagger className="grid grid-cols-2 md:grid-cols-4" style={{ gap: 'var(--spacing-md)' }}>
          {products.filter(p => favorites.includes(p.id)).map(p => (
            <FadeIn key={p.id}>
              <Link to={`/product/${p.id}`} className="block rounded-xl overflow-hidden cursor-pointer" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                <div style={{ aspectRatio: '1', background: 'var(--muted)' }}><img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" /></div>
                <div style={{ padding: 'var(--spacing-sm)' }}>
                  <p className="text-foreground truncate" style={{ fontSize: 'var(--font-size-small)' }}>{p.name}</p>
                  <span className="font-bold text-theme-red" style={{ fontSize: 'var(--font-size-label)' }}>¥{p.price}</span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </Stagger>
        {favorites.length === 0 && <p className="text-muted-foreground text-center" style={{ padding: 'var(--spacing-3xl)' }}>还没有收藏商品</p>}
      </main>
    </div>
  );

  if (page === 'coupons') return (
    <div className="min-h-screen bg-background">
      <main className="container" style={{ paddingBlock: 'var(--spacing-lg)' }}>
        <div className="flex items-center" style={{ marginBottom: 'var(--spacing-lg)', gap: 'var(--spacing-sm)' }}>
          <button onClick={() => setPage('main')} className="text-primary cursor-pointer" style={{ fontSize: 'var(--font-size-label)' }}>返回</button>
          <h2 className="font-bold text-foreground" style={{ fontSize: 'var(--font-size-title)' }}>优惠券</h2>
        </div>
        <Stagger style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
          {coupons.map(c => (
            <FadeIn key={c.id}>
              <div className="rounded-xl flex overflow-hidden" style={{ background: 'var(--card)', border: '1px solid var(--border)', opacity: c.used ? 0.5 : 1 }}>
                <div className="flex flex-col items-center justify-center" style={{ background: c.used ? 'var(--muted)' : 'var(--primary)', padding: 'var(--spacing-md)', minWidth: '5rem' }}>
                  <span className="font-bold" style={{ fontSize: 'var(--font-size-headline)', color: c.used ? 'var(--muted-foreground)' : 'var(--primary-foreground)' }}>{c.type === 'fixed' ? `¥${c.value}` : `${c.value}折`}</span>
                  <span style={{ fontSize: 'var(--font-size-small)', color: c.used ? 'var(--muted-foreground)' : 'var(--primary-foreground)' }}>满{c.minSpend}可用</span>
                </div>
                <div className="flex-1" style={{ padding: 'var(--spacing-md)' }}>
                  <p className="font-medium text-foreground" style={{ fontSize: 'var(--font-size-label)' }}>{c.name}</p>
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--font-size-small)' }}>有效期至 {c.expiresAt}</p>
                  {!c.used && <Button onClick={() => dispatch({ type: 'USE_COUPON', id: c.id })} className="cursor-pointer mt-2 rounded-full" style={{ padding: '0.25rem 0.75rem', fontSize: 'var(--font-size-small)' }}>使用</Button>}
                  {c.used && <span className="text-muted-foreground" style={{ fontSize: 'var(--font-size-small)' }}>已使用</span>}
                </div>
              </div>
            </FadeIn>
          ))}
        </Stagger>
      </main>
    </div>
  );

  // Main Profile Page
  return (
    <div className="min-h-screen bg-background">
      <main className="container" style={{ paddingBlock: 'var(--spacing-xl)' }}>
        <FadeIn>
          {/* Profile Card */}
          <div className="rounded-2xl" style={{ background: 'linear-gradient(135deg, oklch(0.25 0.06 265) 0%, oklch(0.18 0.03 270) 100%)', padding: 'var(--spacing-xl)', marginBottom: 'var(--spacing-xl)' }}>
            <div className="flex items-center" style={{ gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
              <div className="rounded-full bg-primary flex items-center justify-center" style={{ width: '3.5rem', height: '3.5rem' }}>
                <User className="text-primary-foreground" style={{ width: '1.5rem', height: '1.5rem' }} />
              </div>
              <div>
                <p className="font-bold text-foreground" style={{ fontSize: 'var(--font-size-title)' }}>{user.nickname}</p>
                <div className="flex items-center" style={{ gap: '0.5rem' }}>
                  <Badge style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', fontSize: 'var(--font-size-small)' }}><Crown style={{ width: '0.75rem', height: '0.75rem', marginRight: '0.25rem' }} />{user.levelName}</Badge>
                  <span className="text-muted-foreground" style={{ fontSize: 'var(--font-size-small)' }}>V{user.level}</span>
                </div>
              </div>
              <button onClick={() => dispatch({ type: 'LOGOUT' })} className="ml-auto cursor-pointer text-muted-foreground hover:text-foreground" style={{ transition: 'color var(--duration-fast) var(--ease-default)' }}><LogOut style={{ width: '1.25rem', height: '1.25rem' }} /></button>
            </div>
            <div className="grid grid-cols-3" style={{ gap: 'var(--spacing-md)' }}>
              <div className="text-center"><p className="font-bold text-foreground" style={{ fontSize: 'var(--font-size-title)' }}>{user.points}</p><p className="text-muted-foreground" style={{ fontSize: 'var(--font-size-small)' }}>积分</p></div>
              <div className="text-center"><p className="font-bold text-foreground" style={{ fontSize: 'var(--font-size-title)' }}>{user.couponCount}</p><p className="text-muted-foreground" style={{ fontSize: 'var(--font-size-small)' }}>优惠券</p></div>
              <div className="text-center"><p className="font-bold text-foreground" style={{ fontSize: 'var(--font-size-title)' }}>{user.level}</p><p className="text-muted-foreground" style={{ fontSize: 'var(--font-size-small)' }}>会员等级</p></div>
            </div>
            <div className="mt-4 rounded-full overflow-hidden" style={{ background: 'var(--muted)', height: '0.375rem' }}>
              <div className="rounded-full" style={{ background: 'var(--primary)', width: `${levelProgress}%`, height: '100%', transition: 'width var(--duration-normal) var(--ease-default)' }} />
            </div>
            <p className="text-muted-foreground mt-1" style={{ fontSize: 'var(--font-size-small)' }}>距 {nextLevel} 还需 {5000 - user.points} 积分</p>
          </div>
        </FadeIn>

        {/* Order Quick Access */}
        <FadeIn>
          <div className="rounded-xl" style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-md)' }}>
              <h3 className="font-semibold text-foreground" style={{ fontSize: 'var(--font-size-label)' }}>我的订单</h3>
              <button onClick={() => setPage('orders')} className="flex items-center text-primary cursor-pointer" style={{ fontSize: 'var(--font-size-small)' }}>全部 <ChevronRight style={{ width: '0.75rem', height: '0.75rem' }} /></button>
            </div>
            <div className="grid grid-cols-4">
              {[
                { key: 'pending', icon: Package, label: '待付款', count: user.orderCounts.pending },
                { key: 'paid', icon: Edit, label: '待发货', count: user.orderCounts.paid },
                { key: 'shipped', icon: Package, label: '待收货', count: user.orderCounts.shipped },
                { key: 'delivered', icon: Star, label: '待评价', count: user.orderCounts.delivered },
              ].map(({ key, icon: Icon, label, count }) => (
                <button key={key} onClick={() => { setActiveTab(key); setPage('orders'); }} className="flex flex-col items-center cursor-pointer" style={{ gap: '0.375rem', padding: '0.5rem' }}>
                  <div className="relative"><Icon className="text-foreground" style={{ width: '1.5rem', height: '1.5rem' }} />{count > 0 && <span className="absolute -top-1 -right-1 rounded-full" style={{ background: 'var(--destructive)', color: 'white', fontSize: '0.625rem', minWidth: '1rem', height: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{count}</span>}</div>
                  <span className="text-muted-foreground" style={{ fontSize: 'var(--font-size-small)' }}>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Quick Links */}
        <FadeIn>
          <div className="rounded-xl" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
            {[
              { icon: MapPin, label: '收货地址', action: () => setPage('addresses') },
              { icon: Heart, label: '我的收藏', action: () => setPage('favorites'), extra: `${favorites.length}件` },
              { icon: Clock, label: '浏览足迹', action: () => {} },
              { icon: Ticket, label: '优惠券', action: () => setPage('coupons'), extra: `${coupons.filter(c => !c.used).length}张` },
              { icon: Crown, label: '会员中心', action: () => {} },
            ].map(({ icon: Icon, label, action, extra }, i) => (
              <button key={label} onClick={action} className="flex items-center w-full cursor-pointer" style={{ padding: 'var(--spacing-md)', borderBottom: i < 4 ? '1px solid var(--border)' : 'none', gap: 'var(--spacing-sm)' }}>
                <Icon className="text-muted-foreground" style={{ width: '1.25rem', height: '1.25rem' }} />
                <span className="flex-1 text-left text-foreground" style={{ fontSize: 'var(--font-size-label)' }}>{label}</span>
                {extra && <span className="text-muted-foreground" style={{ fontSize: 'var(--font-size-small)' }}>{extra}</span>}
                <ChevronRight className="text-muted-foreground" style={{ width: '1rem', height: '1rem' }} />
              </button>
            ))}
          </div>
        </FadeIn>
      </main>
    </div>
  );
}
