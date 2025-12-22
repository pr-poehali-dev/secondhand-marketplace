import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  text: string;
}

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: Number(id),
    title: 'Винтажная джинсовая куртка',
    price: 2500,
    category: 'Одежда',
    condition: 'Отличное',
    description:
      'Стильная винтажная джинсовая куртка в отличном состоянии. Подойдет для повседневной носки и создания модных образов. Размер M, подходит на 44-46 размер. Материал: 100% хлопок.',
    images: [
      'https://cdn.poehali.dev/projects/ad90520d-12cd-4a65-bc96-0421d33b0025/files/b0549371-c7c2-4dde-a079-2ac2ccce25f3.jpg',
      'https://cdn.poehali.dev/projects/ad90520d-12cd-4a65-bc96-0421d33b0025/files/b0549371-c7c2-4dde-a079-2ac2ccce25f3.jpg',
      'https://cdn.poehali.dev/projects/ad90520d-12cd-4a65-bc96-0421d33b0025/files/b0549371-c7c2-4dde-a079-2ac2ccce25f3.jpg',
    ],
    seller: {
      name: 'Анна К.',
      rating: 4.8,
      reviewsCount: 23,
    },
    specifications: [
      { label: 'Размер', value: 'M' },
      { label: 'Материал', value: '100% хлопок' },
      { label: 'Цвет', value: 'Синий' },
      { label: 'Бренд', value: 'Levi\'s' },
    ],
  };

  const reviews: Review[] = [
    {
      id: 1,
      author: 'Мария С.',
      rating: 5,
      date: '15 дек 2024',
      text: 'Отличная куртка! Пришла быстро, состояние как на фото. Продавец общительный, всё объяснил.',
    },
    {
      id: 2,
      author: 'Дмитрий П.',
      rating: 5,
      date: '10 дек 2024',
      text: 'Качество супер, размер подошёл идеально. Рекомендую!',
    },
    {
      id: 3,
      author: 'Елена В.',
      rating: 4,
      date: '5 дек 2024',
      text: 'Хорошая вещь, небольшие следы носки, но в целом отличное состояние за свою цену.',
    },
  ];

  const [selectedImage, setSelectedImage] = useState(0);

  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад в каталог
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <Badge className="mb-3">{product.category}</Badge>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={20} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{averageRating.toFixed(1)}</span>
                </div>
                <span className="text-gray-500">({reviews.length} отзывов)</span>
              </div>
              <p className="text-5xl font-bold text-gray-900">{product.price} ₽</p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-3">Состояние</h3>
              <Badge variant="secondary" className="text-base px-4 py-2">
                {product.condition}
              </Badge>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Описание</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Характеристики</h3>
              <div className="space-y-2">
                {product.specifications.map((spec, idx) => (
                  <div key={idx} className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">{spec.label}</span>
                    <span className="font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary text-white">
                  {product.seller.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">{product.seller.name}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Icon name="Star" size={14} className="fill-yellow-400 text-yellow-400" />
                  <span>
                    {product.seller.rating} ({product.seller.reviewsCount} отзывов)
                  </span>
                </div>
              </div>
              <Button variant="outline">Написать</Button>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Icon name="Minus" size={18} />
                </Button>
                <span className="px-4 font-medium">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  <Icon name="Plus" size={18} />
                </Button>
              </div>
              <Button className="flex-1" size="lg">
                <Icon name="ShoppingCart" size={20} className="mr-2" />
                Добавить в корзину
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Отзывы покупателей</h2>

          <div className="grid gap-6">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-gray-200">
                        {review.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold">{review.author}</p>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={16}
                            className={
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }
                          />
                        ))}
                      </div>
                      <p className="text-gray-600">{review.text}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
