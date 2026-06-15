import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Zap, X, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/store/ShopContext';
import { hotSearches, searchSuggestions } from '@/data/products';

export function Header() {
  const [query, setQuery] = useState('');
  const [showSuggest, setShowSuggest] = useState(false);
  const [history, setHistory] = useState<string[]>(() => { try { return JSON.parse(localStorage.getItem('searchHistory') || '[]'); } catch { return []; } });
  const { totalCount } = useCart();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = query.length > 0
    ? Object.entries(searchSuggestions).find(([k]) => query.toLowerCase().startsWith(k))?.[1] || []
    : [];

  const doSearch = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    const newHistory = [trimmed, ...history.filter(h => h !== trimmed)].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    setShowSuggest(false);
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const clearHistory = () => { setHistory([]); localStorage.removeItem('searchHistory'); };

  return (
    <header className="sticky top-0 z-50" style={{ background: 'oklch(0.13 0.02 270 / 0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)' }}>
      <div className="container flex items-center" style={{ height: '3.5rem', gap: 'var(--spacing-lg)' }}>
        {/* Logo */}
        <Link to="/" className="flex items-center flex-shrink-0 cursor-pointer" style={{ gap: '0.5rem' }}>
          <div className="flex items-center justify-center rounded-lg bg-primary" style={{ width: '1.75rem', height: '1.75rem' }}>
            <Zap className="text-primary-foreground" style={{ width: '1rem', height: '1rem' }} />
          </div>
          <span className="font-bold text-foreground hidden sm:inline" style={{ fontSize: 'var(--font-size-title)' }}>TechZone</span>
        </Link>

        {/* Search */}
        <div className="flex-1 relative max-w-2xl">
          <div className="flex items-center rounded-full" style={{ background: 'var(--secondary)', border: '1px solid var(--border)' }}>
            <Search className="text-muted-foreground flex-shrink-0" style={{ width: '1rem', height: '1rem', marginLeft: '0.75rem' }} />
            <input
              ref={inputRef}
              value={query}
              onChange={e => { setQuery(e.target.value); setShowSuggest(true); }}
              onFocus={() => setShowSuggest(true)}
              onKeyDown={e => e.key === 'Enter' && doSearch(query)}
              placeholder="搜索数码好物..."
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none"
              style={{ padding: '0.5rem 0.75rem', fontSize: 'var(--font-size-label)' }}
            />
            {query && <button onClick={() => { setQuery(''); inputRef.current?.focus(); }} className="cursor-pointer mr-2"><X className="text-muted-foreground" style={{ width: '0.875rem', height: '0.875rem' }} /></button>}
            <Button className="rounded-full cursor-pointer" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', padding: '0.4rem 1.2rem', fontSize: 'var(--font-size-small)', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} onClick={() => doSearch(query)}>搜索</Button>
          </div>

          {/* Suggestions Dropdown */}
          {showSuggest && (
            <div className="absolute top-full left-0 right-0 mt-1 rounded-xl shadow-xl z-50" style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: 'var(--spacing-md)' }}>
              {suggestions.length > 0 && (
                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                  <p className="text-muted-foreground font-medium" style={{ fontSize: 'var(--font-size-small)', marginBottom: '0.375rem' }}>搜索建议</p>
                  {suggestions.map(s => (
                    <button key={s} onClick={() => { setQuery(s); doSearch(s); }} className="block w-full text-left text-foreground hover:text-primary cursor-pointer rounded" style={{ padding: '0.375rem 0.5rem', fontSize: 'var(--font-size-label)', transition: 'color var(--duration-fast) var(--ease-default)' }}>{s}</button>
                  ))}
                </div>
              )}
              {history.length > 0 && (
                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: '0.375rem' }}>
                    <p className="text-muted-foreground font-medium" style={{ fontSize: 'var(--font-size-small)' }}>搜索历史</p>
                    <button onClick={clearHistory} className="text-muted-foreground hover:text-foreground cursor-pointer" style={{ fontSize: 'var(--font-size-small)' }}>清除</button>
                  </div>
                  <div className="flex flex-wrap" style={{ gap: '0.375rem' }}>
                    {history.map(h => (
                      <button key={h} onClick={() => { setQuery(h); doSearch(h); }} className="rounded-full text-muted-foreground hover:text-foreground cursor-pointer" style={{ background: 'var(--secondary)', padding: '0.25rem 0.75rem', fontSize: 'var(--font-size-small)', transition: 'color var(--duration-fast) var(--ease-default)' }}>{h}</button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <div className="flex items-center" style={{ gap: '0.375rem', marginBottom: '0.375rem' }}>
                  <Clock className="text-theme-red" style={{ width: '0.75rem', height: '0.75rem' }} />
                  <p className="text-muted-foreground font-medium" style={{ fontSize: 'var(--font-size-small)' }}>热搜榜</p>
                </div>
                {hotSearches.map((h, i) => (
                  <button key={h} onClick={() => { setQuery(h); doSearch(h); }} className="flex items-center w-full text-left cursor-pointer rounded" style={{ padding: '0.375rem 0.5rem', fontSize: 'var(--font-size-label)' }}>
                    <span className={`font-bold flex-shrink-0 ${i < 3 ? 'text-theme-red' : 'text-muted-foreground'}`} style={{ width: '1.25rem', fontSize: 'var(--font-size-small)' }}>{i + 1}</span>
                    <span className="text-foreground hover:text-primary" style={{ transition: 'color var(--duration-fast) var(--ease-default)' }}>{h}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center" style={{ gap: 'var(--spacing-md)' }}>
          <Link to="/cart" className="relative cursor-pointer">
            <ShoppingCart className="text-foreground" style={{ width: '1.25rem', height: '1.25rem' }} />
            {totalCount > 0 && <span className="absolute -top-1.5 -right-1.5 rounded-full text-primary-foreground font-bold" style={{ background: 'var(--destructive)', fontSize: '0.625rem', minWidth: '1rem', height: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{totalCount > 99 ? '99+' : totalCount}</span>}
          </Link>
          <Link to="/user" className="cursor-pointer"><User className="text-foreground" style={{ width: '1.25rem', height: '1.25rem' }} /></Link>
        </div>
      </div>
    </header>
  );
}
