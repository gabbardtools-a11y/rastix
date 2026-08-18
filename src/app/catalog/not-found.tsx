import Link from "next/link";
import {
  Leaf,
  ArrowRight,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CatalogNotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50/30 to-white">
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center py-20">
          <div className="w-24 h-24 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-6">
            <Leaf className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-3">
            Страница не найдена
          </h1>
          <p className="text-green-600 max-w-md mx-auto mb-8">
            К сожалению, запрашиваемая страница не существует или была перемещена.
            Попробуйте перейти в каталог или на главную страницу.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/catalog/shop">
              <Button
                className="rounded-xl gap-2"
                style={{
                  background: "linear-gradient(135deg, #b8860b, #daa520)",
                  color: "#fff",
                  textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                  boxShadow: "0 0 12px rgba(218,165,32,0.35)",
                }}
              >
                Перейти в каталог
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                className="border-green-300 text-green-700 hover:bg-green-50 rounded-xl gap-2"
              >
                <Home className="w-4 h-4" />
                На главную
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
