import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';
import LoginButton from './LoginButton';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';

interface AccessDeniedScreenProps {
  message?: string;
}

export default function AccessDeniedScreen({
  message = 'Access Denied',
}: AccessDeniedScreenProps) {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-destructive/10 p-6">
            <ShieldAlert className="h-12 w-12 text-destructive" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground">{message}</p>
        </div>
        <div className="flex flex-col gap-3">
          {!isAuthenticated && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Admin authentication required
              </p>
              <LoginButton />
            </div>
          )}
          <Link to="/">
            <Button variant="outline" className="w-full">Return to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
