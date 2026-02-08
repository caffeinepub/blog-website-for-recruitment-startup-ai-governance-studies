import { PageFadeIn, InViewFade } from '@/components/marketing/Motion';
import { SectionNameBox } from '@/components/marketing/SectionNameBox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Link as LinkIcon, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useGetRestEndpointStatus, useSetRestEndpointConfig, useClearRestEndpointConfig } from '../hooks/useQueries';
import { useIsCallerAdmin } from '../hooks/useQueries';
import { toast } from 'sonner';

export default function ArticlePage() {
  const { data: isAdmin, isLoading: isAdminLoading } = useIsCallerAdmin();
  const { data: endpointStatus, isLoading: statusLoading, error: statusError } = useGetRestEndpointStatus();
  const setConfigMutation = useSetRestEndpointConfig();
  const clearConfigMutation = useClearRestEndpointConfig();

  const [endpointUrl, setEndpointUrl] = useState('');
  const [apiKey, setApiKey] = useState('');

  const isConnected = endpointStatus?.configs !== null && endpointStatus?.configs !== undefined;
  const currentConfig = endpointStatus?.configs;

  const handleSave = async () => {
    if (!endpointUrl.trim()) {
      toast.error('Please enter an endpoint URL');
      return;
    }

    try {
      await setConfigMutation.mutateAsync({
        id: crypto.randomUUID(),
        endpointUrl: endpointUrl.trim(),
        apiKey: apiKey.trim() || undefined,
        enabled: true,
      });
      toast.success('REST endpoint configured successfully');
      setEndpointUrl('');
      setApiKey('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to configure endpoint');
    }
  };

  const handleDisconnect = async () => {
    try {
      await clearConfigMutation.mutateAsync();
      toast.success('REST endpoint disconnected');
    } catch (error: any) {
      toast.error(error.message || 'Failed to disconnect endpoint');
    }
  };

  const isLoading = statusLoading || isAdminLoading;
  const isMutating = setConfigMutation.isPending || clearConfigMutation.isPending;

  return (
    <PageFadeIn>
      <div className="w-full">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/assets/generated/section-article.dim_1200x800.png"
              alt="Articles"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
          </div>
          
          <div className="container relative z-10 px-4 sm:px-6 lg:px-8 text-center">
            <InViewFade>
              <SectionNameBox name="Articles" />
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                External Content Integration
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Connect your REST endpoint to display external articles
              </p>
            </InViewFade>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <InViewFade>
              <div className="max-w-3xl mx-auto">
                {isLoading ? (
                  <Card>
                    <CardContent className="flex items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </CardContent>
                  </Card>
                ) : statusError ? (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      {statusError instanceof Error ? statusError.message : 'Failed to load endpoint status'}
                    </AlertDescription>
                  </Alert>
                ) : (
                  <>
                    {/* Status Card */}
                    <Card className="mb-8">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          {isConnected ? (
                            <>
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                              REST Endpoint Connected
                            </>
                          ) : (
                            <>
                              <XCircle className="h-5 w-5 text-gray-400" />
                              No REST Endpoint Configured
                            </>
                          )}
                        </CardTitle>
                        <CardDescription>
                          {endpointStatus?.status || 'Status unavailable'}
                        </CardDescription>
                      </CardHeader>
                      {isConnected && currentConfig && (
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2">
                              <LinkIcon className="h-4 w-4 text-primary mt-0.5" />
                              <div>
                                <div className="font-medium text-gray-300">Endpoint URL</div>
                                <div className="text-gray-400 break-all">{currentConfig.endpointUrl}</div>
                              </div>
                            </div>
                            {currentConfig.apiKey && (
                              <div className="flex items-start gap-2">
                                <div className="font-medium text-gray-300">API Key</div>
                                <div className="text-gray-400">••••••••</div>
                              </div>
                            )}
                            <div className="flex items-start gap-2">
                              <div className="font-medium text-gray-300">Status</div>
                              <div className="text-gray-400">{currentConfig.enabled ? 'Enabled' : 'Disabled'}</div>
                            </div>
                          </div>
                        </CardContent>
                      )}
                    </Card>

                    {/* Configuration Card */}
                    {!isAdmin ? (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Only administrators can configure the REST endpoint. Please log in with an admin account to manage integrations.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <Card>
                        <CardHeader>
                          <CardTitle>
                            {isConnected ? 'Update Configuration' : 'Configure REST Endpoint'}
                          </CardTitle>
                          <CardDescription>
                            {isConnected
                              ? 'Update your REST endpoint configuration or disconnect the current integration'
                              : 'Enter your REST endpoint URL to connect external articles'}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="endpointUrl">Endpoint URL *</Label>
                            <Input
                              id="endpointUrl"
                              type="url"
                              placeholder="https://api.example.com/articles"
                              value={endpointUrl}
                              onChange={(e) => setEndpointUrl(e.target.value)}
                              disabled={isMutating}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="apiKey">API Key (optional)</Label>
                            <Input
                              id="apiKey"
                              type="password"
                              placeholder="Enter API key if required"
                              value={apiKey}
                              onChange={(e) => setApiKey(e.target.value)}
                              disabled={isMutating}
                            />
                          </div>
                          <div className="flex gap-3">
                            <Button
                              onClick={handleSave}
                              disabled={isMutating || !endpointUrl.trim()}
                              className="flex-1"
                            >
                              {setConfigMutation.isPending ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Saving...
                                </>
                              ) : (
                                'Save Configuration'
                              )}
                            </Button>
                            {isConnected && (
                              <Button
                                variant="destructive"
                                onClick={handleDisconnect}
                                disabled={isMutating}
                              >
                                {clearConfigMutation.isPending ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Disconnecting...
                                  </>
                                ) : (
                                  'Disconnect'
                                )}
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Placeholder for future article display */}
                    {isConnected && (
                      <Card className="mt-8">
                        <CardHeader>
                          <CardTitle>External Articles</CardTitle>
                          <CardDescription>
                            Articles from your configured REST endpoint will appear here
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center py-12 text-gray-400">
                            <p>Article fetching and display coming soon</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </>
                )}
              </div>
            </InViewFade>
          </div>
        </section>
      </div>
    </PageFadeIn>
  );
}
