import { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: '首页', href: '#' },
  { label: '手机', href: '#categories' },
  { label: '电脑', href: '#hot-products' },
  { label: '耳机', href: '#promotion' },
  { label: '智能穿戴', href: '#' },
  { label: '游戏外设', href: '#' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all"
      style={{
        transition: 'var(--duration-normal) var(--ease-default)',
        background: scrolled ? 'oklch(0.13 0.02 270 / 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <div className="container flex items-center justify-between" style={{ height: '4rem' }}>
        {/* Logo */}
        <a href="#" className="flex items-center" style={{ gap: 'var(--spacing-sm)' }}>
          <div
            className="flex items-center justify-center rounded-lg bg-primary"
            style={{ width: '2rem', height: '2rem' }}
          >
            <Zap className="text-primary-foreground" style={{ width: '1.1rem', height: '1.1rem' }} />
          </div>
          <span
            className="font-bold text-primary"
            style={{ fontSize: 'var(--font-size-title)', letterSpacing: 'var(--letter-spacing-tight)' }}
          >
            TechZone
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center" style={{ gap: 'var(--spacing-lg)' }}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              style={{
                fontSize: 'var(--font-size-label)',
                transition: 'color var(--duration-fast) var(--ease-default)',
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Search + Actions */}
        <div className="flex items-center" style={{ gap: 'var(--spacing-md)' }}>
          {/* Search */}
          <div
            className="hidden sm:flex items-center rounded-lg border transition-all"
            style={{
              borderColor: searchFocused ? 'var(--primary)' : 'var(--border)',
              background: 'var(--input)',
              paddingLeft: 'var(--spacing-sm)',
              paddingRight: 'var(--spacing-sm)',
              gap: 'var(--spacing-xs)',
              transition: 'border-color var(--duration-fast) var(--ease-default)',
              width: searchFocused ? '280px' : '200px',
            }}
          >
            <Search className="text-muted-foreground" style={{ width: '1rem', height: '1rem', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="搜索数码产品..."
              className="bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              style={{ fontSize: 'var(--font-size-label)', width: '100%', padding: '0.4rem 0' }}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>

          {/* Cart */}
          <Button variant="ghost" size="icon" className="relative cursor-pointer">
            <ShoppingCart className="text-foreground" style={{ width: '1.25rem', height: '1.25rem' }} />
            <span
              className="absolute flex items-center justify-center rounded-full bg-destructive text-white font-bold"
              style={{ top: '2px', right: '2px', width: '1rem', height: '1rem', fontSize: '0.625rem' }}
            >
              3
            </span>
          </Button>

          {/* User */}
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <User className="text-foreground" style={{ width: '1.25rem', height: '1.25rem' }} />
          </Button>

          {/* Mobile menu */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X style={{ width: '1.25rem', height: '1.25rem' }} /> : <Menu style={{ width: '1.25rem', height: '1.25rem' }} />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          <nav className="container flex flex-col" style={{ paddingBlock: 'var(--spacing-md)', gap: 'var(--spacing-sm)' }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-foreground cursor-pointer"
                style={{ fontSize: 'var(--font-size-label)', paddingBlock: 'var(--spacing-xs)' }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
