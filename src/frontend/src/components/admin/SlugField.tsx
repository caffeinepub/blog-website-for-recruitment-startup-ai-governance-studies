import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface SlugFieldProps {
  value: string;
  onChange: (value: string) => void;
  existingSlugs: string[];
  currentSlug?: string;
  disabled?: boolean;
  onValidationChange?: (isValid: boolean) => void;
}

export default function SlugField({ 
  value, 
  onChange, 
  existingSlugs, 
  currentSlug, 
  disabled,
  onValidationChange 
}: SlugFieldProps) {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setError(null);
      onValidationChange?.(false);
      return;
    }

    // Check URL-safe format
    const urlSafeRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!urlSafeRegex.test(value)) {
      setError('Slug must be lowercase letters, numbers, and hyphens only');
      onValidationChange?.(false);
      return;
    }

    // Check uniqueness (exclude current slug in edit mode)
    const slugsToCheck = currentSlug 
      ? existingSlugs.filter(slug => slug !== currentSlug)
      : existingSlugs;
    
    if (slugsToCheck.includes(value)) {
      setError('This slug is already in use');
      onValidationChange?.(false);
      return;
    }

    setError(null);
    onValidationChange?.(true);
  }, [value, existingSlugs, currentSlug, onValidationChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    onChange(newValue);
  };

  const isValid = value && !error;

  return (
    <div className="space-y-2">
      <Label htmlFor="slug">
        Slug {disabled && <span className="text-muted-foreground">(cannot be changed)</span>}
      </Label>
      <div className="relative">
        <Input
          id="slug"
          value={value}
          onChange={handleChange}
          placeholder="article-slug-here"
          disabled={disabled}
          className={error ? 'border-destructive' : isValid ? 'border-green-500' : ''}
        />
        {value && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {error ? (
              <AlertCircle className="h-5 w-5 text-destructive" />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            )}
          </div>
        )}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {!error && value && (
        <p className="text-sm text-muted-foreground">URL: /articles/{value}</p>
      )}
    </div>
  );
}
