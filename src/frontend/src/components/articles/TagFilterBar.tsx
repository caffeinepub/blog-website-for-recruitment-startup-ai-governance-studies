import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface TagFilterBarProps {
  tags: string[];
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
}

export default function TagFilterBar({ tags, selectedTag, onSelectTag }: TagFilterBarProps) {
  // Highlight main topics
  const mainTopics = ['Recruitment', 'Attrition', 'AI Ethics'];
  
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Filter by topic:</span>
        {selectedTag && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSelectTag(null)}
            className="h-6 px-2"
          >
            Clear
            <X className="ml-1 h-3 w-3" />
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isMainTopic = mainTopics.includes(tag);
          const isSelected = selectedTag === tag;
          
          return (
            <Badge
              key={tag}
              variant={isSelected ? 'default' : 'outline'}
              className={`cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors ${
                isMainTopic && !isSelected ? 'border-primary/60 font-semibold' : ''
              }`}
              onClick={() => onSelectTag(isSelected ? null : tag)}
            >
              {tag}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
