import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-12 pb-8 text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Icon name="Check" size={40} className="text-green-600" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Заказ оформлен!</h1>
            <p className="text-gray-600">
              Мы отправили подтверждение на вашу почту
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Номер заказа</p>
            <p className="text-2xl font-bold">#BH-{Math.floor(Math.random() * 10000)}</p>
          </div>

          <div className="space-y-3 pt-4">
            <Button className="w-full" size="lg" onClick={() => navigate('/')}>
              Вернуться в каталог
            </Button>
            <Button variant="outline" className="w-full" onClick={() => navigate('/')}>
              Отслеживать заказ
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSuccess;
