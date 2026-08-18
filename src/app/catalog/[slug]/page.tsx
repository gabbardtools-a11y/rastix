import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Heart,
  ShoppingCart,
  Menu,
  Leaf,
  ArrowRight,
  Home,
  ChevronRight,
  MessageCircle,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const revalidate = 3600; // Cache for 1 hour

/* ─── HTML Fetching & Processing ─── */

async function fetchAgrodecorPage(slug: string) {
  const url = `https://agrodecor.ru/${slug}`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return null;
    }

    const html = await res.text();
    return html;
  } catch {
    return null;
  }
}

function extractTitle(html: string): string {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch) {
    return titleMatch[1]
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();
  }
  return "";
}

function extractMainContent(html: string): string {
  // Try to find the main content area - common patterns in agrodecor.ru
  // Try multiple selectors in order of preference
  const selectors = [
    /<main[^>]*>([\s\S]*?)<\/main>/i,
    /<div[^>]*id=["']content["'][^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]*class=["'][^"']*content[^"']*["'][^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]*id=["']page["'][^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]*class=["'][^"']*page-content[^"']*["'][^>]*>([\s\S]*?)<\/div>/i,
    /<article[^>]*>([\s\S]*?)<\/article>/i,
  ];

  for (const regex of selectors) {
    const match = html.match(regex);
    if (match && match[1].length > 200) {
      return match[1];
    }
  }

  // Fallback: extract content between <body> and </body>
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    // Remove header and footer from body content
    let content = bodyMatch[1];
    // Remove <header>...</header>
    content = content.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, "");
    // Remove <footer>...</footer>
    content = content.replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, "");
    // Remove nav elements
    content = content.replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, "");
    return content;
  }

  return "";
}

function sanitizeHtml(html: string): string {
  let sanitized = html;

  // Remove all <script> tags and their contents
  sanitized = sanitized.replace(/<script[\s\S]*?<\/script>/gi, "");

  // Remove all <style> tags and their contents (we have our own styling)
  sanitized = sanitized.replace(/<style[\s\S]*?<\/style>/gi, "");

  // Remove onclick, onload, onerror, and other event handlers
  sanitized = sanitized.replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, "");
  sanitized = sanitized.replace(/\s+on\w+\s*=\s*\S+/gi, "");

  // Remove javascript: URLs
  sanitized = sanitized.replace(/href\s*=\s*["']javascript:[^"']*["']/gi, '');

  // Replace all agrodecor.ru links with internal /catalog/ links
  // Handle href="https://agrodecor.ru/path"
  sanitized = sanitized.replace(
    /href\s*=\s*["']https?:\/\/agrodecor\.ru\/([^"']+)["']/gi,
    'href="/catalog/$1"'
  );
  // Handle href="https://agrodecor.ru" (root)
  sanitized = sanitized.replace(
    /href\s*=\s*["']https?:\/\/agrodecor\.ru["']/gi,
    'href="/catalog/shop"'
  );
  // Handle href="/path" (relative links that should become /catalog/path)
  // Only for paths that look like category/product pages, not assets
  sanitized = sanitized.replace(
    /href\s*=\s*["']\/(?!thumb\/|assets\/|static\/|images\/|favicon|logo|css\/|js\/|api\/)([^"']+)["']/gi,
    'href="/catalog/$1"'
  );

  // Remove iframe tags
  sanitized = sanitized.replace(/<iframe[\s\S]*?<\/iframe>/gi, "");
  sanitized = sanitized.replace(/<iframe[^>]*\/>/gi, "");

  // Remove noscript tags
  sanitized = sanitized.replace(/<noscript[\s\S]*?<\/noscript>/gi, "");

  return sanitized;
}

/* ─── Header Component (same style as main page) ─── */
function CatalogHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-white/20 shadow-sm">
      {/* Top bar */}
      <div className="bg-green-800/85 backdrop-blur-lg text-green-50 text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href="tel:+79018887385"
              className="flex items-center gap-1.5 hover:text-green-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              +7 (901) 888-73-85
            </a>
            <a
              href="mailto:rassadim@ya.ru"
              className="flex items-center gap-1.5 hover:text-green-200 transition-colors hidden sm:flex"
            >
              <Mail className="w-3.5 h-3.5" />
              rassadim@ya.ru
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Пн-Пт 9:00-18:00
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Владимирская обл., д. Лизуново, Лесная ул., 31</span>
              <span className="md:hidden">Лизуново</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <img
            src="/logo.png"
            alt="У Захара"
            className="h-12 w-12 rounded-xl object-cover"
            style={{ filter: "drop-shadow(0 0 4px rgba(218, 165, 32, 0.4))" }}
          />
          <div className="hidden sm:block">
            <div
              className="text-xl font-bold leading-tight"
              style={{ color: "#b8860b", textShadow: "0 0 4px rgba(218, 165, 32, 0.3)" }}
            >
              У Захара
            </div>
            <div className="text-xs text-green-600 leading-tight">
              Рассада, саженцы, посадки
            </div>
          </div>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-xl hidden md:block">
          <div className="relative">
            <Input
              type="text"
              placeholder="Поиск по каталогу..."
              className="w-full pl-10 pr-4 py-2.5 bg-green-50/50 border-green-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link href="/catalog/shop/favorites">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-amber-50"
              style={{ color: "#b8860b", textShadow: "0 0 4px rgba(218, 165, 32, 0.3)" }}
            >
              <Heart className="w-5 h-5" style={{ filter: "drop-shadow(0 0 3px rgba(218, 165, 32, 0.4))" }} />
            </Button>
          </Link>
          <Link href="/catalog/shop/cart">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-amber-50 relative"
              style={{ color: "#b8860b", textShadow: "0 0 4px rgba(218, 165, 32, 0.3)" }}
            >
              <ShoppingCart className="w-5 h-5" style={{ filter: "drop-shadow(0 0 3px rgba(218, 165, 32, 0.4))" }} />
            </Button>
          </Link>
          <Link href="/catalog/shop" className="hidden sm:block">
            <Button
              className="rounded-xl gap-2"
              style={{
                background: "linear-gradient(135deg, #b8860b, #daa520)",
                color: "#fff",
                textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                boxShadow: "0 0 12px rgba(218,165,32,0.35)",
              }}
            >
              <ShoppingCart className="w-4 h-4" />
              В магазин
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ─── Footer Component (same style as main page) ─── */
function CatalogFooter() {
  return (
    <footer className="bg-green-950 text-green-100">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="У Захара"
                className="h-12 w-12 rounded-xl object-cover"
                style={{ filter: "drop-shadow(0 0 5px rgba(218, 165, 32, 0.5))" }}
              />
              <div>
                <div
                  className="text-xl font-bold"
                  style={{ color: "#daa520", textShadow: "0 0 5px rgba(218, 165, 32, 0.35)" }}
                >
                  У Захара
                </div>
                <div className="text-xs text-green-400">Рассада, саженцы, посадки</div>
              </div>
            </div>
            <p className="text-green-300 text-sm leading-relaxed mb-4">
              Интернет-магазин саженцев и растений с доставкой по Струнино, Александрову, Сергиеву
              Посаду и окрестностям. Собственный питомник в Москве. Опыт работы более 10 лет.
            </p>
            <div className="flex gap-3">
              <a
                href="https://vk.com/agrodecor"
                className="w-9 h-9 rounded-lg bg-green-800 hover:bg-green-700 flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/agrodecor"
                className="w-9 h-9 rounded-lg bg-green-800 hover:bg-green-700 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Catalog */}
          <div>
            <h3 className="font-semibold text-white mb-4">Каталог</h3>
            <ul className="space-y-2">
              {[
                "Хризантема мультифлора",
                "Рассада овощей",
                "Рассада цветов",
                "Многолетние цветы",
                "Пионы",
                "Саженцы Роз",
                "Гортензии",
                "Клематисы",
                "Хвойные саженцы",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/catalog/shop"
                    className="text-sm text-green-300 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-semibold text-white mb-4">Информация</h3>
            <ul className="space-y-2">
              {[
                "О компании",
                "Доставка и оплата",
                "Оптовикам",
                "Гарантии",
                "Отзывы",
                "Акции",
                "Контакты",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/catalog/shop"
                    className="text-sm text-green-300 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-semibold text-white mb-4">Контакты</h3>
            <div className="space-y-3">
              <a
                href="tel:+79018887385"
                className="flex items-center gap-2 text-sm text-green-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 shrink-0" />
                +7 (901) 888-73-85
              </a>
              <a
                href="mailto:rassadim@ya.ru"
                className="flex items-center gap-2 text-sm text-green-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 shrink-0" />
                rassadim@ya.ru
              </a>
              <div className="flex items-start gap-2 text-sm text-green-300">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                601605, Владимирская обл., Александровский р-н, д. Лизуново, Лесная ул., 31
              </div>
              <div className="flex items-center gap-2 text-sm text-green-300">
                <Clock className="w-4 h-4 shrink-0" />
                Пн-Пт 9:00-18:00
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-green-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-green-400">
            У Захара &copy; 2009 — 2026. Продажа саженцев в интернет-магазине.
          </p>
          <div className="flex gap-4">
            <Link
              href="/catalog/politika-konfidencialnosti"
              className="text-xs text-green-400 hover:text-green-200 transition-colors"
            >
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Breadcrumb ─── */
function Breadcrumb({ slug, title }: { slug: string; title: string }) {
  const displayName = title || decodeURIComponent(slug);
  return (
    <nav className="max-w-7xl mx-auto px-4 py-3" aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5 text-sm text-green-600 flex-wrap">
        <li>
          <Link href="/" className="flex items-center gap-1 hover:text-green-800 transition-colors">
            <Home className="w-3.5 h-3.5" />
            Главная
          </Link>
        </li>
        <li>
          <ChevronRight className="w-3.5 h-3.5 text-green-400" />
        </li>
        <li>
          <Link href="/catalog/shop" className="hover:text-green-800 transition-colors">
            Каталог
          </Link>
        </li>
        <li>
          <ChevronRight className="w-3.5 h-3.5 text-green-400" />
        </li>
        <li className="text-green-900 font-medium truncate max-w-xs">{displayName}</li>
      </ol>
    </nav>
  );
}

/* ─── Page Component ─── */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const html = await fetchAgrodecorPage(slug);
  const title = html ? extractTitle(html) : "";

  return {
    title: title ? `${title} — У Захара` : "Каталог — У Захара",
    description: "Рассада, саженцы, посадки от производителя. Доставка по Струнино, Александрову, Сергиеву Посаду и окрестностям.",
  };
}

export default async function CatalogSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const html = await fetchAgrodecorPage(slug);

  if (!html) {
    notFound();
  }

  const title = extractTitle(html);
  const rawContent = extractMainContent(html);
  const sanitizedContent = sanitizeHtml(rawContent);

  return (
    <div className="min-h-screen flex flex-col">
      <CatalogHeader />
      <main className="flex-1 bg-gradient-to-b from-green-50/30 to-white">
        <Breadcrumb slug={slug} title={title} />

        {/* Title bar */}
        <div className="max-w-7xl mx-auto px-4 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <Badge className="border-green-300 text-green-700" variant="outline">
              <Leaf className="w-3.5 h-3.5 mr-1" />
              Каталог
            </Badge>
          </div>
          {title && (
            <h1 className="text-2xl md:text-3xl font-bold text-green-900 mb-2">
              {title.replace(/— У Захара.*$/, "").replace(/У Захара.*$/, "").trim() || decodeURIComponent(slug)}
            </h1>
          )}
        </div>

        {/* Content area */}
        <div className="max-w-7xl mx-auto px-4 pb-16">
          {sanitizedContent ? (
            <div
              className="agrodecor-content bg-white rounded-2xl shadow-sm border border-green-100 p-6 md:p-8"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          ) : (
            <div className="text-center py-20">
              <Leaf className="w-16 h-16 text-green-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-green-800 mb-2">
                Контент загружается...
              </h2>
              <p className="text-green-600 mb-6">
                Попробуйте обновить страницу или вернитесь позже
              </p>
              <Link href="/catalog/shop">
                <Button className="rounded-xl gap-2" style={{ background: "linear-gradient(135deg, #b8860b, #daa520)", color: "#fff", textShadow: "0 1px 2px rgba(0,0,0,0.3)", boxShadow: "0 0 12px rgba(218,165,32,0.35)" }}>
                  Перейти в каталог
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <CatalogFooter />
    </div>
  );
}
