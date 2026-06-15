import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatedRoutes } from "@/components/AnimatedRoutes";
import { PageTransition } from "@/components/PageTransition";
import { Header } from "@/components/shop/Header";
import { ShopProvider } from "@/store/ShopContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import SearchPage from "./pages/SearchPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import UserPage from "./pages/UserPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60 * 1000, gcTime: 5 * 60 * 1000, retry: 1, refetchOnWindowFocus: false, refetchOnReconnect: false },
    mutations: { retry: 1 },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <ShopProvider>
            <Header />
            <AnimatedRoutes>
              <Route path="/" data-genie-title="首页" data-genie-key="Home" element={<PageTransition transition="slide-up"><Index /></PageTransition>} />
              <Route path="/product/:id" data-genie-title="商品详情" data-genie-key="ProductDetail" element={<PageTransition transition="fade"><ProductDetail /></PageTransition>} />
              <Route path="/search" data-genie-title="搜索" data-genie-key="Search" element={<PageTransition transition="fade"><SearchPage /></PageTransition>} />
              <Route path="/category/:id?" data-genie-title="分类" data-genie-key="Category" element={<PageTransition transition="fade"><CategoryPage /></PageTransition>} />
              <Route path="/cart" data-genie-title="购物车" data-genie-key="Cart" element={<PageTransition transition="fade"><CartPage /></PageTransition>} />
              <Route path="/user" data-genie-title="用户中心" data-genie-key="User" element={<PageTransition transition="fade"><UserPage /></PageTransition>} />
              <Route path="*" data-genie-key="NotFound" data-genie-title="Not Found" element={<PageTransition transition="fade"><NotFound /></PageTransition>} />
            </AnimatedRoutes>
          </ShopProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
