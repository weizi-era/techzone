import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn, Stagger } from '@/components/MotionPrimitives';
import { useCart, useShop } from '@/store/ShopContext';

export default function CartPage() {
  const { cart, selectedItems, total, dispatch } = useCart();
  const { state } = useShop();
  const allSelected = cart.length > 0 && cart.every(i => i.selected);

  const availableCoupons = state.coupons.filter(c => !c.used && c.minSpend <= total);
  const bestCoupon = availableCoupons.sort((a, b) => {
    const aVal = a.type === 'fixed' ? a.value : total * a.value / 100;
    const bVal = b.type === 'fixed' ? b.value : total * b.value / 100;
    return bVal - aVal;
  })[0];
  const discount = bestCoupon ? (bestCoupon.type === 'fixed' ? bestCoupon.value : total * bestCoupon.value / 100) : 0;
  const finalTotal = total - discount;

  const shortfall = 1000 - total;
  const canReachDiscount = shortfall > 0 && shortfall <= 500;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="text-muted-foreground mx-auto" style={{ width: '4rem', height: '4rem', marginBottom: 'var(--spacing-md)' }} />
          <p className="text-muted-foreground" style={{ fontSize: 'var(--font-size-body)', marginBottom: 'var(--spacing-md)' }}>购物车是空的</p>
          <Link to="/"><Button className="cursor-pointer">去逛逛</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container" style={{ paddingBlock: 'var(--spacing-xl)' }}>
        <h1 className="font-bold text-foreground" style={{ fontSize: 'var(--font-size-headline)', marginBottom: 'var(--spacing-xl)' }}>购物车</h1>

        {/* Coupon Tip */}
        {canReachDiscount && (
          <FadeIn>
            <div className="flex items-center rounded-xl" style={{ background: 'oklch(0.2 0.04 25 / 0.3)', padding: 'var(--spacing-sm) var(--spacing-md)', marginBottom: 'var(--spacing-md)', gap: '0.5rem' }}>
              <Tag className="text-theme-gold" style={{ width: '1rem', height: '1rem' }} />
              <span className="text-foreground" style={{ fontSize: 'var(--font-size-small)' }}>再买¥{shortfall.toFixed(0)}可享满1000减200优惠，<Link to="/" className="text-primary cursor-pointer">去凑单 <ArrowRight style={{ width: '0.75rem', height: '0.75rem', display: 'inline' }} /></Link></span>
            </div>
          </FadeIn>
        )}

        <div className="grid md:grid-cols-3" style={{ gap: 'var(--spacing-xl)' }}>
          {/* Cart Items */}
          <div className="md:col-span-2">
            <Stagger style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
              {cart.map(item => (
                <FadeIn key={`${item.product.id}-${item.selectedSpec}`}>
                  <div className="rounded-xl flex items-center" style={{ background: 'var(--card)', padding: 'var(--spacing-md)', border: '1px solid var(--border)', gap: 'var(--spacing-md)' }}>
                    <input type="checkbox" checked={item.selected} onChange={() => dispatch({ type: 'TOGGLE_CART_SELECT', productId: item.product.id, spec: item.selectedSpec })} className="cursor-pointer" style={{ width: '1.125rem', height: '1.125rem', accentColor: 'var(--primary)' }} />
                    <Link to={`/product/${item.product.id}`} className="rounded-lg overflow-hidden flex-shrink-0" style={{ width: '5rem', height: '5rem', background: 'var(--muted)' }}>
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.product.id}`} className="font-medium text-foreground truncate block" style={{ fontSize: 'var(--font-size-label)' }}>{item.product.name}</Link>
                      <p className="text-muted-foreground" style={{ fontSize: 'var(--font-size-small)' }}>{item.selectedSpec}</p>
                      <div className="flex items-center justify-between" style={{ marginTop: '0.5rem' }}>
                        <span className="font-bold text-theme-red" style={{ fontSize: 'var(--font-size-label)' }}>¥{item.product.price}</span>
                        <div className="flex items-center rounded-lg" style={{ border: '1px solid var(--border)' }}>
                          <button onClick={() => dispatch({ type: 'UPDATE_CART_QTY', productId: item.product.id, spec: item.selectedSpec, quantity: item.quantity - 1 })} className="cursor-pointer px-2 py-1"><Minus style={{ width: '0.75rem', height: '0.75rem' }} /></button>
                          <span className="text-foreground font-medium" style={{ padding: '0 0.5rem', fontSize: 'var(--font-size-small)', minWidth: '1.5rem', textAlign: 'center' }}>{item.quantity}</span>
                          <button onClick={() => dispatch({ type: 'UPDATE_CART_QTY', productId: item.product.id, spec: item.selectedSpec, quantity: item.quantity + 1 })} className="cursor-pointer px-2 py-1"><Plus style={{ width: '0.75rem', height: '0.75rem' }} /></button>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', productId: item.product.id, spec: item.selectedSpec })} className="cursor-pointer text-muted-foreground hover:text-destructive" style={{ transition: 'color var(--duration-fast) var(--ease-default)' }}><Trash2 style={{ width: '1rem', height: '1rem' }} /></button>
                  </div>
                </FadeIn>
              ))}
            </Stagger>
          </div>

          {/* Summary */}
          <div>
            <div className="rounded-xl sticky top-20" style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: 'var(--spacing-lg)' }}>
              <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-md)' }}>
                <label className="flex items-center cursor-pointer" style={{ gap: '0.5rem', fontSize: 'var(--font-size-label)' }}>
                  <input type="checkbox" checked={allSelected} onChange={() => dispatch({ type: 'SELECT_ALL_CART', selected: !allSelected })} style={{ accentColor: 'var(--primary)' }} /> 全选
                </label>
                <span className="text-muted-foreground" style={{ fontSize: 'var(--font-size-small)' }}>已选 {selectedItems.length} 件</span>
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                <div className="flex justify-between" style={{ marginBottom: '0.5rem' }}>
                  <span className="text-muted-foreground" style={{ fontSize: 'var(--font-size-label)' }}>商品合计</span>
                  <span className="text-foreground" style={{ fontSize: 'var(--font-size-label)' }}>¥{total.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between" style={{ marginBottom: '0.5rem' }}>
                    <span className="text-muted-foreground" style={{ fontSize: 'var(--font-size-label)' }}>优惠券</span>
                    <span className="text-theme-green" style={{ fontSize: 'var(--font-size-label)' }}>-¥{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between" style={{ marginBottom: '0.5rem' }}>
                  <span className="text-muted-foreground" style={{ fontSize: 'var(--font-size-label)' }}>运费</span>
                  <span className="text-theme-green" style={{ fontSize: 'var(--font-size-label)' }}>免运费</span>
                </div>
              </div>
              <div className="flex justify-between items-baseline" style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
                <span className="font-semibold text-foreground" style={{ fontSize: 'var(--font-size-label)' }}>应付总额</span>
                <span className="font-bold text-theme-red" style={{ fontSize: 'var(--font-size-headline)' }}>¥{finalTotal.toFixed(2)}</span>
              </div>
              <Button className="w-full cursor-pointer font-semibold rounded-xl" style={{ background: 'var(--destructive)', color: 'white', padding: '0.875rem', fontSize: 'var(--font-size-label)' }} disabled={selectedItems.length === 0}>
                去结算 ({selectedItems.length})
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
