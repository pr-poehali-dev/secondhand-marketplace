import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface ReviewCardProps {
  author: string;
  rating: number;
  comment: string;
  date: string;
  product?: string;
}

export default function ReviewCard({ author, rating, comment, date, product }: ReviewCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <Icon name="User" size={20} className="text-gray-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{author}</p>
            <p className="text-sm text-gray-500">{date}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Icon
              key={i}
              name="Star"
              size={16}
              className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
            />
          ))}
        </div>
      </div>
      {product && (
        <p className="text-sm text-gray-600 mb-2">Товар: {product}</p>
      )}
      <p className="text-gray-700">{comment}</p>
    </Card>
  );
}
