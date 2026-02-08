import { Link } from '@tanstack/react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';

export default function AddArticleCard() {
  return (
    <Link to="/admin/articles/new">
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-dashed border-2 hover:border-primary">
        <CardContent className="flex flex-col items-center justify-center min-h-[280px] space-y-4">
          <div className="rounded-full bg-primary/10 p-4">
            <Plus className="h-8 w-8 text-primary" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-lg">Add New Article</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Create a new article
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
