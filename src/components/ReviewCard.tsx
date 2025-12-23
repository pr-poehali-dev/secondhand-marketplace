import { useState } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ReviewCardProps {
  author: string;
  rating: number;
  comment: string;
  date: string;
  product?: string;
  reply?: {
    text: string;
    date: string;
  };
  isOwnProfile?: boolean;
}

export default function ReviewCard({ author, rating, comment, date, product, reply, isOwnProfile = false }: ReviewCardProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
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
      
      {reply && (
        <div className="mt-4 ml-6 pl-4 border-l-2 border-primary bg-gray-50 p-3 rounded">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Store" size={16} className="text-primary" />
            <p className="text-sm font-medium text-primary">Ответ продавца</p>
            <span className="text-xs text-gray-500">{reply.date}</span>
          </div>
          <p className="text-sm text-gray-700">{reply.text}</p>
        </div>
      )}
      
      {isOwnProfile && !reply && (
        <div className="mt-3">
          {!showReplyForm ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowReplyForm(true)}
            >
              <Icon name="MessageSquare" size={16} className="mr-2" />
              Ответить
            </Button>
          ) : (
            <div className="space-y-2">
              <Textarea
                placeholder="Напишите ответ..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={3}
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    setShowReplyForm(false);
                    setReplyText('');
                  }}
                >
                  Отправить
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowReplyForm(false);
                    setReplyText('');
                  }}
                >
                  Отмена
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}