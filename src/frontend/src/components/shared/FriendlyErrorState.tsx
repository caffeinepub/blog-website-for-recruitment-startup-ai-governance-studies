import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface FriendlyErrorStateProps {
  title?: string;
  message: string;
  technicalDetails?: string;
  onRetry?: () => void;
  retryLabel?: string;
  variant?: 'default' | 'destructive';
}

export default function FriendlyErrorState({
  title = 'Something went wrong',
  message,
  technicalDetails,
  onRetry,
  retryLabel = 'Retry',
  variant = 'destructive',
}: FriendlyErrorStateProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Alert variant={variant} className="border-border">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle className="text-foreground">{title}</AlertTitle>
      <AlertDescription className="space-y-3">
        <p className="text-muted-foreground">{message}</p>
        
        <div className="flex items-center gap-3">
          {onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="interactive-element"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              {retryLabel}
            </Button>
          )}
          
          {technicalDetails && (
            <Collapsible open={showDetails} onOpenChange={setShowDetails}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="text-xs">
                  {showDetails ? (
                    <>
                      <ChevronUp className="h-3 w-3 mr-1" />
                      Hide details
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-3 w-3 mr-1" />
                      Show technical details
                    </>
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3">
                <div className="rounded-md bg-muted p-3 text-xs font-mono text-muted-foreground overflow-x-auto">
                  {technicalDetails}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
}
