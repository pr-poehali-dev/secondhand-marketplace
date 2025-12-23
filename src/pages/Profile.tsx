import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import ReviewCard from '@/components/ReviewCard';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Order {
  id: number;
  date: string;
  items: { title: string; price: number; image: string }[];
  total: number;
  status: 'Доставлен' | 'В пути' | 'Обрабатывается';
}

interface Sale {
  id: number;
  title: string;
  price: number;
  image: string;
  date: string;
  buyer: string;
  status: 'Продан' | 'Активен';
}

interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
  product?: string;
  reply?: {
    text: string;
    date: string;
  };
}

const Profile = () => {
  const navigate = useNavigate();
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  const userInfo = {
    name: 'Александр Иванов',
    email: 'alex.ivanov@example.com',
    phone: '+7 (999) 123-45-67',
    avatar: '',
    rating: 4.8,
    reviewsCount: 24,
    salesCount: 15,
  };

  const orders: Order[] = [
    {
      id: 1,
      date: '15 декабря 2024',
      items: [
        { title: 'Винтажная джинсовая куртка', price: 2500, image: 'https://cdn.poehali.dev/projects/ad90520d-12cd-4a65-bc96-0421d33b0025/files/b0549371-c7c2-4dde-a079-2ac2ccce25f3.jpg' },
        { title: 'Настенные часы', price: 1800, image: 'https://cdn.poehali.dev/projects/ad90520d-12cd-4a65-bc96-0421d33b0025/files/b0549371-c7c2-4dde-a079-2ac2ccce25f3.jpg' },
      ],
      total: 4300,
      status: 'Доставлен',
    },
    {
      id: 2,
      date: '10 декабря 2024',
      items: [
        { title: 'Беспроводные наушники', price: 3200, image: 'https://cdn.poehali.dev/projects/ad90520d-12cd-4a65-bc96-0421d33b0025/files/b0549371-c7c2-4dde-a079-2ac2ccce25f3.jpg' },
      ],
      total: 3200,
      status: 'В пути',
    },
    {
      id: 3,
      date: '5 декабря 2024',
      items: [
        { title: 'Кроссовки Nike', price: 5000, image: 'https://cdn.poehali.dev/projects/ad90520d-12cd-4a65-bc96-0421d33b0025/files/b0549371-c7c2-4dde-a079-2ac2ccce25f3.jpg' },
      ],
      total: 5000,
      status: 'Доставлен',
    },
  ];

  const reviews: Review[] = [
    {
      id: 1,
      author: 'Мария Кузнецова',
      rating: 5,
      comment: 'Отличный продавец! Товар доставлен быстро, всё как на фото. Очень довольна покупкой, рекомендую!',
      date: '18 декабря 2024',
      product: 'Скандинавский стул',
      reply: {
        text: 'Спасибо за отзыв! Рад, что вам понравилось. Приходите ещё!',
        date: '19 декабря 2024',
      },
    },
    {
      id: 2,
      author: 'Дмитрий Петров',
      rating: 5,
      comment: 'Всё отлично, продавец приятный в общении. Вещь в идеальном состоянии.',
      date: '10 декабря 2024',
      product: 'Свитшот оверсайз',
    },
    {
      id: 3,
      author: 'Елена Соколова',
      rating: 4,
      comment: 'Хороший продавец, но доставка заняла немного больше времени, чем ожидалось. В остальном всё хорошо.',
      date: '3 декабря 2024',
      reply: {
        text: 'Приношу извинения за задержку! Постараюсь улучшить сроки доставки.',
        date: '4 декабря 2024',
      },
    },
    {
      id: 4,
      author: 'Андрей Новиков',
      rating: 5,
      comment: 'Супер! Быстрая сделка, качественный товар. Буду покупать ещё.',
      date: '28 ноября 2024',
    },
  ];

  const sales: Sale[] = [
    {
      id: 1,
      title: 'Скандинавский стул',
      price: 4500,
      image: 'https://cdn.poehali.dev/projects/ad90520d-12cd-4a65-bc96-0421d33b0025/files/b0549371-c7c2-4dde-a079-2ac2ccce25f3.jpg',
      date: '12 декабря 2024',
      buyer: 'Мария К.',
      status: 'Продан',
    },
    {
      id: 2,
      title: 'Свитшот оверсайз',
      price: 1200,
      image: 'https://cdn.poehali.dev/projects/ad90520d-12cd-4a65-bc96-0421d33b0025/files/b0549371-c7c2-4dde-a079-2ac2ccce25f3.jpg',
      date: '8 декабря 2024',
      buyer: 'Дмитрий П.',
      status: 'Продан',
    },
    {
      id: 3,
      title: 'Умная колонка',
      price: 2800,
      image: 'https://cdn.poehali.dev/projects/ad90520d-12cd-4a65-bc96-0421d33b0025/files/b0549371-c7c2-4dde-a079-2ac2ccce25f3.jpg',
      date: '1 декабря 2024',
      buyer: '',
      status: 'Активен',
    },
  ];

  const getRatingCount = (rating: number) => {
    return reviews.filter(review => review.rating === rating).length;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Доставлен':
      case 'Продан':
        return 'bg-green-100 text-green-800';
      case 'В пути':
        return 'bg-blue-100 text-blue-800';
      case 'Обрабатывается':
        return 'bg-yellow-100 text-yellow-800';
      case 'Активен':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>
              ХламМаркет
            </h1>
            <nav className="hidden md:flex gap-6">
              <button onClick={() => navigate('/')} className="text-gray-600 hover:text-gray-900">
                Главная
              </button>
              <button className="text-gray-900 font-medium">Профиль</button>
            </nav>
          </div>
          <Button onClick={() => navigate('/add-product')}>
            <Icon name="Plus" size={20} className="mr-2" />
            Разместить товар
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <Avatar className="w-24 h-24">
                <AvatarImage src={userInfo.avatar} />
                <AvatarFallback className="text-2xl bg-primary text-white">
                  {userInfo.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2">{userInfo.name}</h2>
                <div className="flex items-center gap-4 mb-4 text-gray-600">
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={20} className="text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{userInfo.rating}</span>
                    <span className="text-sm">({userInfo.reviewsCount} отзывов)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="ShoppingBag" size={20} />
                    <span>{userInfo.salesCount} продаж</span>
                  </div>
                </div>
                
                <div className="space-y-2 text-gray-700">
                  <div className="flex items-center gap-2">
                    <Icon name="Mail" size={18} />
                    <span>{userInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Phone" size={18} />
                    <span>{userInfo.phone}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button variant="outline">
                  <Icon name="Settings" size={20} className="mr-2" />
                  Редактировать профиль
                </Button>
                <Button>
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  Написать продавцу
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="purchases" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="purchases">Мои покупки</TabsTrigger>
            <TabsTrigger value="sales">Мои продажи</TabsTrigger>
            <TabsTrigger value="reviews">Отзывы</TabsTrigger>
          </TabsList>

          <TabsContent value="purchases" className="space-y-4">
            {orders.map(order => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Заказ #{order.id}</CardTitle>
                    <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Icon name="Calendar" size={16} />
                    <span>{order.date}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{item.title}</p>
                          <p className="text-gray-600">{item.price} ₽</p>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-lg font-bold">Итого:</span>
                      <span className="text-lg font-bold">{order.total} ₽</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="sales" className="space-y-4">
            {sales.map(sale => (
              <Card key={sale.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={sale.image}
                      alt={sale.title}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{sale.title}</h3>
                          <p className="text-2xl font-bold text-primary mt-1">{sale.price} ₽</p>
                        </div>
                        <Badge className={getStatusColor(sale.status)}>{sale.status}</Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-4">
                        <div className="flex items-center gap-1">
                          <Icon name="Calendar" size={16} />
                          <span>{sale.date}</span>
                        </div>
                        {sale.buyer && (
                          <div className="flex items-center gap-1">
                            <Icon name="User" size={16} />
                            <span>Покупатель: {sale.buyer}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle>Отзывы о продавце</CardTitle>
                      <CardDescription>Что говорят покупатели</CardDescription>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Icon name="Plus" size={20} className="mr-2" />
                        Оставить отзыв
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Оставить отзыв</DialogTitle>
                        <DialogDescription>
                          Поделитесь своим опытом покупки у этого продавца
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Оценка</label>
                          <div className="flex gap-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                                className="transition-transform hover:scale-110"
                              >
                                <Icon
                                  name="Star"
                                  size={32}
                                  className={i < newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Ваш отзыв</label>
                          <Textarea
                            placeholder="Расскажите о своём опыте покупки..."
                            value={newReview.comment}
                            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                            rows={4}
                          />
                        </div>
                        <Button
                          className="w-full"
                          onClick={() => {
                            setIsDialogOpen(false);
                            setNewReview({ rating: 5, comment: '' });
                          }}
                        >
                          Отправить отзыв
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Распределение оценок</span>
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={20} className="text-yellow-500 fill-yellow-500" />
                        <span className="font-bold text-lg">{userInfo.rating}</span>
                        <span className="text-gray-600">из 5</span>
                      </div>
                    </div>
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const count = getRatingCount(rating);
                      const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                      return (
                        <div key={rating} className="flex items-center gap-3">
                          <button
                            onClick={() => setRatingFilter(rating)}
                            className="flex items-center gap-1 text-sm font-medium w-12 hover:text-primary transition-colors"
                          >
                            {rating}
                            <Icon name="Star" size={14} className="fill-yellow-400 text-yellow-400" />
                          </button>
                          <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-yellow-400 transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-sm text-gray-600">Фильтр:</span>
                    <div className="flex gap-1 flex-wrap">
                      <Button
                        variant={ratingFilter === null ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setRatingFilter(null)}
                      >
                        Все ({reviews.length})
                      </Button>
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const count = getRatingCount(rating);
                        return (
                          <Button
                            key={rating}
                            variant={ratingFilter === rating ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setRatingFilter(rating)}
                            className="gap-1"
                            disabled={count === 0}
                          >
                            {rating}
                            <Icon name="Star" size={14} className="fill-current" />
                            ({count})
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {reviews
                  .filter(review => ratingFilter === null || review.rating === ratingFilter)
                  .map(review => (
                    <ReviewCard key={review.id} {...review} isOwnProfile={true} />
                  ))}
                {reviews.filter(review => ratingFilter === null || review.rating === ratingFilter).length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Icon name="Search" size={48} className="mx-auto mb-2 opacity-50" />
                    <p>Нет отзывов с выбранным рейтингом</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;