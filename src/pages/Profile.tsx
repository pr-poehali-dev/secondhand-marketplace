import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

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

const Profile = () => {
  const navigate = useNavigate();
  
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

              <Button variant="outline">
                <Icon name="Settings" size={20} className="mr-2" />
                Редактировать профиль
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="purchases" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="purchases">Мои покупки</TabsTrigger>
            <TabsTrigger value="sales">Мои продажи</TabsTrigger>
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
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
