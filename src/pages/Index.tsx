import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  condition: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Все', 'Одежда', 'Электроника', 'Мебель', 'Спорт', 'Книги', 'Декор'];

  const products: Product[] = [
    { id: 1, title: 'Винтажная джинсовая куртка', price: 2500, category: 'Одежда', image: 'https://cdn.poehali.dev/projects/ad90520d-12cd-4a65-bc96-0421d33b0025/files/b0549371-c7c2-4dde-a079-2ac2ccce25f3.jpg', condition: 'Отличное' },
    { id: 2, title: 'Беспроводные наушники', price: 3200, category: 'Электроника', image: 'https://cdn.poehali.dev/projects/ad90520d-12cd-4a65-bc96-0421d33b0025/files/b0549371-c7c2-4dde-a079-2ac2ccce25f3.jpg', condition: 'Как новое' },
    { id: 3, title: 'Скандинавский стул', price: 4500, category: 'Мебель', image: 'https://cdn.poehali.dev/projects/ad90520d-12cd-4a65-bc96-0421d33b0025/files/b0549371-c7c2-4dde-a079-2ac2ccce25f3.jpg', condition: 'Хорошее' },
    { id: 4, title: 'Кроссовки Nike', price: 5000, category: 'Спорт', image: 'https://cdn.poehali.dev/projects/ad90520d-12cd-4a65-bc96-0421d33b0025/files/b0549371-c7c2-4dde-a079-2ac2ccce25f3.jpg', condition: 'Отличное' },
    { id: 5, title: 'Классика литературы (набор)', price: 1500, category: 'Книги', image: 'https://cdn.poehali.dev/projects/ad90520d-12cd-4a65-bc96-0421d33b0025/files/b0549371-c7c2-4dde-a079-2ac2ccce25f3.jpg', condition: 'Хорошее' },
    { id: 6, title: 'Настенные часы', price: 1800, category: 'Декор', image: 'https://cdn.poehali.dev/projects/ad90520d-12cd-4a65-bc96-0421d33b0025/files/b0549371-c7c2-4dde-a079-2ac2ccce25f3.jpg', condition: 'Как новое' },
    { id: 7, title: 'Свитшот оверсайз', price: 1200, category: 'Одежда', image: 'https://cdn.poehali.dev/projects/ad90520d-12cd-4a65-bc96-0421d33b0025/files/b0549371-c7c2-4dde-a079-2ac2ccce25f3.jpg', condition: 'Отличное' },
    { id: 8, title: 'Умная колонка', price: 2800, category: 'Электроника', image: 'https://cdn.poehali.dev/projects/ad90520d-12cd-4a65-bc96-0421d33b0025/files/b0549371-c7c2-4dde-a079-2ac2ccce25f3.jpg', condition: 'Как новое' },
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Все' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prev =>
        prev.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-semibold text-gray-900">Барахолка</h1>
            <nav className="hidden md:flex gap-6">
              <a href="#home" className="text-gray-600 hover:text-gray-900 transition-colors">Главная</a>
              <a href="#catalog" className="text-gray-600 hover:text-gray-900 transition-colors">Каталог</a>
            </nav>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <Icon name="ShoppingBag" size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">Корзина пуста</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                      {cart.map(item => (
                        <div key={item.id} className="flex gap-4 pb-4 border-b">
                          <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm mb-1">{item.title}</h4>
                            <p className="text-gray-900 font-semibold mb-2">{item.price} ₽</p>
                            <div className="flex items-center gap-2">
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-7 w-7"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Icon name="Minus" size={14} />
                              </Button>
                              <span className="w-8 text-center text-sm">{item.quantity}</span>
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-7 w-7"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Icon name="Plus" size={14} />
                              </Button>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Icon name="X" size={18} />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 space-y-4">
                      <div className="flex justify-between items-center text-lg font-semibold">
                        <span>Итого:</span>
                        <span>{cartTotal} ₽</span>
                      </div>
                      <Button className="w-full" size="lg">
                        Перейти к оплате
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section id="home" className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-5xl font-bold text-gray-900 leading-tight">
            Продавай и покупай <br />вещи легко
          </h2>
          <p className="text-xl text-gray-600">
            Маркетплейс для продажи всего, что тебе больше не нужно
          </p>
          <Button size="lg" className="text-lg px-8">
            Начать продавать
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Быстро', 'Безопасно', 'Выгодно', 'Просто'].map((feature, idx) => (
            <Card key={idx} className="border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <p className="font-medium text-gray-900">{feature}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="catalog" className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold mb-8">Каталог</h3>
        
        <div className="mb-8">
          <div className="relative max-w-md">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Поиск товаров..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="group cursor-pointer border-gray-200 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 right-3 bg-white text-gray-900">
                    {product.condition}
                  </Badge>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                    <h4 className="font-semibold text-gray-900 mb-2">{product.title}</h4>
                    <p className="text-2xl font-bold text-gray-900">{product.price} ₽</p>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => addToCart(product)}
                  >
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    В корзину
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Package" size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">Товары не найдены</p>
          </div>
        )}
      </section>

      <footer className="border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-500">
            <p>© 2024 Барахолка. Продавай и покупай с удовольствием</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
