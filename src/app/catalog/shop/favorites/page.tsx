import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Heart,
  ShoppingCart,
  Leaf,
  ArrowRight,
  Home,
  ChevronRight,
  MessageCircle,
  Instagram,
  Construction,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

/* ─── Header ─── */
function CatalogHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-white/20 shadow-sm">
      <div className="bg-green-800/85 backdrop-blur-lg text-green-50 text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-wrap">
            <a href="tel:+79018887385" className="flex items-center gap-1.5 hover:text-green-200 transition-colors">
              <Phone className="w-3.5 h-3.5" />+7 (901) 888-73-85
            </a>
            <a href="mailto:rassadim@ya.ru" className="flex items-center gap-1.5 hover:text-green-200 transition-colors hidden sm:flex">
              <Mail className="w-3.5 h-3.5" />rassadim@ya.ru
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />Пн-Пт 9:00-18:00</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /><span className="hidden md:inline">Владимирская обл., д. Лизуново, Лесная ул., 31</span><span className="md:hidden">Лизуново</span></span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <img src="/logo.png" alt="У Захара" className="h-12 w-12 rounded-xl object-cover" style={{ filter: "drop-shadow(0 0 4px rgba(218, 165, 32, 0.4))" }} />
          <div className="hidden sm:block">
            <div className="text-xl font-bold leading-tight" style={{ color: "#b8860b", textShadow: "0 0 4px rgba(218, 165, 32, 0.3)" }}>У Захара</div>
            <div className="text-xs text-green-600 leading-tight">Рассада, саженцы, посадки</div>
          </div>
        </Link>
        <div className="flex-1 max-w-xl hidden md:block">
          <div className="relative">
            <Input type="text" placeholder="Поиск по каталогу..." className="w-full pl-10 pr-4 py-2.5 bg-green-50/50 border-green-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/catalog/shop/favorites">
            <Button variant="ghost" size="icon" className="hover:bg-amber-50" style={{ color: "#b8860b" }}>
              <Heart className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/catalog/shop/cart">
            <Button variant="ghost" size="icon" className="hover:bg-amber-50 relative" style={{ color: "#b8860b" }}>
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/catalog/shop" className="hidden sm:block">
            <Button className="rounded-xl gap-2" style={{ background: "linear-gradient(135deg, #b8860b, #daa520)", color: "#fff", boxShadow: "0 0 12px rgba(218,165,32,0.35)" }}>
              <ShoppingCart className="w-4 h-4" />В магазин
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ─── Footer ─── */
function CatalogFooter() {
  return (
    <footer className="bg-green-950 text-green-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="У Захара" className="h-8 w-8 rounded-lg object-cover" />
            <span className="text-sm" style={{ color: "#daa520" }}>У Захара</span>
          </div>
          <p className="text-xs text-green-400">У Захара &copy; 2009 — 2026</p>
          <div className="flex gap-3">
            <a href="https://vk.com/agrodecor" className="w-8 h-8 rounded-lg bg-green-800 hover:bg-green-700 flex items-center justify-center transition-colors"><MessageCircle className="w-3.5 h-3.5" /></a>
            <a href="https://instagram.com/agrodecor" className="w-8 h-8 rounded-lg bg-green-800 hover:bg-green-700 flex items-center justify-center transition-colors"><Instagram className="w-3.5 h-3.5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function FavoritesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CatalogHeader />
      <main className="flex-1 bg-gradient-to-b from-green-50/30 to-white">
        {/* Breadcrumb */}
        <nav className="max-w-7xl mx-auto px-4 py-3" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-sm text-green-600 flex-wrap">
            <li><Link href="/" className="flex items-center gap-1 hover:text-green-800 transition-colors"><Home className="w-3.5 h-3.5" />Главная</Link></li>
            <li><ChevronRight className="w-3.5 h-3.5 text-green-400" /></li>
            <li><Link href="/catalog/shop" className="hover:text-green-800 transition-colors">Магазин</Link></li>
            <li><ChevronRight className="w-3.5 h-3.5 text-green-400" /></li>
            <li className="text-green-900 font-medium">Избранное</li>
          </ol>
        </nav>

        <div className="max-w-7xl mx-auto px-4 pb-16">
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-6">
              <Construction className="w-10 h-10 text-green-600" />
            </div>
            <Badge className="border-green-300 text-green-700 mb-4" variant="outline">
              <Heart className="w-3.5 h-3.5 mr-1" />
              Избранное
            </Badge>
            <h1 className="text-2xl md:text-3xl font-bold text-green-900 mb-3">
              Раздел в разработке
            </h1>
            <p className="text-green-600 max-w-md mx-auto mb-8">
              Раздел избранного скоро будет доступен. А пока вы можете перейти в каталог и выбрать растения.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/catalog/shop">
                <Button className="rounded-xl gap-2" style={{ background: "linear-gradient(135deg, #b8860b, #daa520)", color: "#fff", textShadow: "0 1px 2px rgba(0,0,0,0.3)", boxShadow: "0 0 12px rgba(218,165,32,0.35)" }}>
                  Перейти в каталог
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50 rounded-xl gap-2">
                  На главную
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <CatalogFooter />
    </div>
  );
}
