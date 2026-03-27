/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  Clock, 
  Truck, 
  MapPin, 
  ChevronRight, 
  Flame, 
  Timer, 
  ShoppingBag,
  Heart,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';

// Types
interface Product {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  price: number;
  imageUrl?: string;
  isBestSeller?: boolean;
  stockLeft?: number;
  isZero?: boolean;
}

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
}

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: '2 Copos Açaí 300ml',
    description: '9 Complementos Grátis',
    originalPrice: 39.80,
    price: 19.90,
    imageUrl: '1RXU4IrIarX96DkDG7sNQfH77NOfIuFzt',
  },
  {
    id: '2',
    name: '2 Copos Açaí 500ml',
    description: '9 Complementos Grátis',
    originalPrice: 43.80,
    price: 22.90,
    imageUrl: '1-REBtIlW8ot6Tsg9SmAz3nn8vgeJP6o9',
  },
  {
    id: '3',
    name: '2 Copos Açaí 700ml',
    description: '9 Complementos Grátis. Mais que o dobro do Combo 1 por apenas R$7 a mais!',
    originalPrice: 53.80,
    price: 26.90,
    isBestSeller: true,
    stockLeft: 4,
    imageUrl: '1qn78D9_obO7X9kFU3HJS7btjO3_83cYq',
  },
  {
    id: '4',
    name: '2 Copos Açaí 1L',
    description: '9 Complementos Grátis',
    originalPrice: 75.80,
    price: 37.90,
    imageUrl: '11BgcUx3DrTfNQ2D3RKUSl8KJaPKmh7q_',
  },
  {
    id: '5',
    name: '2 Copos Açaí 300ml ZERO',
    description: '9 Complementos Grátis',
    originalPrice: 45.80,
    price: 22.90,
    isZero: true,
    imageUrl: '1RXU4IrIarX96DkDG7sNQfH77NOfIuFzt',
  },
  {
    id: '6',
    name: '2 Copos Açaí 500ml ZERO',
    description: '9 Complementos Grátis',
    originalPrice: 49.80,
    price: 25.90,
    isZero: true,
    imageUrl: '1-REBtIlW8ot6Tsg9SmAz3nn8vgeJP6o9',
  },
  {
    id: '7',
    name: '2 Copos Açaí 700ml ZERO',
    description: '9 Complementos Grátis. Mais que o dobro do Combo 1 por apenas R$7 a mais!',
    originalPrice: 59.80,
    price: 29.90,
    isBestSeller: true,
    stockLeft: 12,
    isZero: true,
    imageUrl: '1qn78D9_obO7X9kFU3HJS7btjO3_83cYq',
  },
];

const REVIEWS: Review[] = [
  { id: '1', name: 'Laysa', rating: 5, comment: 'Chegou geladinho, bem embalado e do jeito que pedi.' },
  { id: '2', name: 'Nadia', rating: 5, comment: 'Sinceramente? Melhor custo-benefício que já vi! Açaí bom, preço sensacional e entrega rápida.' },
  { id: '3', name: 'Aline', rating: 5, comment: 'Pedi pra testar e agora já viciei kkk' },
  { id: '4', name: 'Kamilly', rating: 5, comment: 'Quando vi o preço achei q ia ser pequeno, mas me enganei! Vem bem servido e a qualidade é absurda.' },
  { id: '5', name: 'Karol', rating: 5, comment: 'entregaram dentro do prazo e o açaí é delicioso! Vou pedir mais loguinhoo' },
  { id: '6', name: 'Talita', rating: 5, comment: 'Açaí cremoso, bem montado e chegou intacto. Parabéns a franquia.' },
];

export default function App() {
  const [timeLeft, setTimeLeft] = useState({ minutes: 48, seconds: 45 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { minutes: prev.minutes - 1, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDF7FF] font-sans text-[#2D1B33]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#4B0082] rounded-full flex items-center justify-center text-white font-bold text-xl">
              S
            </div>
            <span className="font-bold text-xl tracking-tight text-[#4B0082]">Sua Açaiteria Aqui</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-medium">
            <a href="#promocoes" className="hover:text-[#4B0082] transition-colors">Promoções</a>
            <a href="#cardapio" className="hover:text-[#4B0082] transition-colors">Cardápio</a>
            <a href="#avaliacoes" className="hover:text-[#4B0082] transition-colors">Avaliações</a>
            <button className="bg-[#4B0082] text-white px-6 py-2 rounded-full hover:bg-[#3A0066] transition-all shadow-lg shadow-purple-200">
              Pedir Agora
            </button>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-20 px-4 md:hidden"
          >
            <div className="flex flex-col gap-6 text-xl font-semibold text-center">
              <a href="#promocoes" onClick={() => setIsMenuOpen(false)}>Promoções</a>
              <a href="#cardapio" onClick={() => setIsMenuOpen(false)}>Cardápio</a>
              <a href="#avaliacoes" onClick={() => setIsMenuOpen(false)}>Avaliações</a>
              <button className="bg-[#4B0082] text-white py-4 rounded-2xl">Pedir Agora</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative pt-8 pb-16 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold mb-6">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                ABERTO AGORA
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-[#4B0082] leading-tight mb-6">
                Pague 1, <br />
                <span className="text-[#9333EA]">Leve 2! 💜</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-md">
                Entrega Grátis para Niterói! Aproveite nossa promoção com preços irresistíveis igual nosso Açaí.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white p-3 rounded-2xl shadow-sm border border-purple-50">
                  <Star className="text-yellow-400 fill-yellow-400 w-5 h-5" />
                  <span className="font-bold">4.8</span>
                  <span className="text-gray-400 text-sm">(136 avaliações)</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-3 rounded-2xl shadow-sm border border-purple-50">
                  <Clock className="text-purple-500 w-5 h-5" />
                  <span className="font-semibold">30-50 min</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-3 rounded-2xl shadow-sm border border-purple-50">
                  <Truck className="text-green-500 w-5 h-5" />
                  <span className="font-semibold">Grátis</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button className="bg-[#4B0082] text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-2 hover:scale-105 transition-transform shadow-xl shadow-purple-200">
                  Ver Promoções <ChevronRight w-5 h-5 />
                </button>
                <div className="text-sm text-gray-500">
                  Pedido Mínimo <br />
                  <span className="font-bold text-[#4B0082]">R$ 10,00</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://drive.google.com/thumbnail?id=1bsGt2Rg2iAij0Tj4KgSmJO2Xqoddi78e&sz=w1000" 
                  alt="Açaí do Centro" 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Floating badges */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 -right-6 z-20 bg-yellow-400 text-[#4B0082] p-6 rounded-3xl shadow-xl font-black text-center rotate-12"
              >
                <div className="text-sm uppercase">A partir de</div>
                <div className="text-3xl">R$ 19,90</div>
              </motion.div>
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-6 -left-6 z-20 bg-white p-4 rounded-3xl shadow-xl flex items-center gap-3 border border-purple-100"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                  <Heart className="text-purple-600 fill-purple-600" />
                </div>
                <div>
                  <div className="font-bold text-sm">Mais Vendido</div>
                  <div className="text-xs text-gray-500">Combo 700ml</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Countdown Banner */}
      <div className="bg-[#4B0082] text-white py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="flex items-center gap-3 text-xl font-bold">
            <Timer className="w-8 h-8 text-yellow-400" />
            A PROMOÇÃO VAI ACABAR EM:
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="bg-white/10 backdrop-blur-md w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black">
                {timeLeft.minutes.toString().padStart(2, '0')}
              </div>
              <span className="text-[10px] mt-1 font-bold uppercase opacity-60">Minutos</span>
            </div>
            <div className="text-3xl font-black pt-3">:</div>
            <div className="flex flex-col items-center">
              <div className="bg-white/10 backdrop-blur-md w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black">
                {timeLeft.seconds.toString().padStart(2, '0')}
              </div>
              <span className="text-[10px] mt-1 font-bold uppercase opacity-60">Segundos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <section id="cardapio" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-black text-[#4B0082] mb-4">Pague 1, Leve 2 💜</h2>
              <p className="text-gray-500 font-medium">Escolha seu combo favorito e aproveite!</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-[#4B0082] text-white px-6 py-2 rounded-full font-bold">Tradicional</button>
              <button className="bg-white text-gray-500 border border-gray-200 px-6 py-2 rounded-full font-bold hover:border-purple-300 transition-colors">Zero Açúcar</button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map((product) => (
              <motion.div 
                key={product.id}
                whileHover={{ y: -10 }}
                className={`bg-white rounded-[2.5rem] overflow-hidden border border-purple-50 shadow-sm hover:shadow-xl transition-all relative ${product.isBestSeller ? 'ring-2 ring-purple-500' : ''}`}
              >
                {product.isBestSeller && (
                  <div className="absolute top-4 left-4 z-10 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-black flex items-center gap-1">
                    <Flame className="w-3 h-3" /> MAIS VENDIDO
                  </div>
                )}
                
                <div className="aspect-square bg-purple-50 relative overflow-hidden">
                  <img 
                    src={product.imageUrl ? `https://drive.google.com/thumbnail?id=${product.imageUrl}&sz=w800` : `https://picsum.photos/seed/${product.id}/500/500`} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {product.isZero && (
                    <div className="absolute bottom-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-[10px] font-black">
                      ZERO AÇÚCAR
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="font-black text-xl mb-2 leading-tight">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-2">{product.description}</p>
                  
                  {product.stockLeft && (
                    <div className="flex items-center gap-2 text-orange-600 text-xs font-bold mb-4">
                      <Flame className="w-4 h-4" /> Apenas {product.stockLeft} combos com esse preço!
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <div className="text-gray-400 text-sm line-through">R$ {product.originalPrice.toFixed(2)}</div>
                      <div className="text-2xl font-black text-[#4B0082]">R$ {product.price.toFixed(2)}</div>
                    </div>
                    <button className="w-12 h-12 bg-[#4B0082] text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-purple-100">
                      <ShoppingBag className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="avaliacoes" className="py-24 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#4B0082] mb-4">O que dizem nossos clientes 💜</h2>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="text-yellow-400 fill-yellow-400" />
              <span className="text-2xl font-black">4.8</span>
              <span className="text-gray-400">/ 5.0</span>
            </div>
            <p className="text-gray-500">Mais de 1.000 avaliações de clientes satisfeitos</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((review) => (
              <div key={review.id} className="bg-[#FDF7FF] p-8 rounded-[2rem] border border-purple-50">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6 leading-relaxed">"{review.comment}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center font-bold text-purple-700">
                    {review.name[0]}
                  </div>
                  <div className="font-bold">{review.name}</div>
                  <CheckCircle2 className="w-4 h-4 text-blue-500 ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Location */}
      <footer className="bg-[#2D1B33] text-white pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#4B0082] font-bold text-xl">
                  S
                </div>
                <span className="font-bold text-2xl tracking-tight">Sua Açaiteria Aqui</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-8">
                Açaí tradicional, cremoso e gelado. O melhor custo-benefício da região com entrega rápida e promoções imperdíveis.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <Heart className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-xl mb-8">Onde Estamos</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-purple-400 shrink-0" />
                  <span>No coração de Petrópolis 💜</span>
                </li>
                <li className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-purple-400 shrink-0" />
                  <span>Entrega rápida no Centro de Niterói</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-purple-400 shrink-0" />
                  <span>Segunda a Domingo: 11h às 23h</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xl mb-8">Novidades</h4>
              <p className="text-gray-400 mb-6">Fique por dentro das nossas inaugurações e promoções relâmpago.</p>
              <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-2 border border-white/10">
                <CheckCircle2 className="text-green-400 w-5 h-5" />
                <span className="text-sm">Inauguração em Petrópolis 18/12</span>
              </div>
            </div>
          </div>

          <div className="pt-12 border-top border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-gray-500 text-sm">
            <p>© 2026 Sua Açaiteria Aqui. Todos os direitos reservados.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button (Mobile) */}
      <div className="fixed bottom-6 right-6 md:hidden z-50">
        <button className="bg-[#4B0082] text-white p-5 rounded-full shadow-2xl shadow-purple-500 animate-bounce">
          <ShoppingBag className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
