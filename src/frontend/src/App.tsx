import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import SiteLayout from './components/layout/SiteLayout';
import HomePage from './pages/HomePage';
import ArticlesIndexPage from './pages/ArticlesIndexPage';
import AboutPage from './pages/AboutPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import NewsletterPage from './pages/NewsletterPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ArticleEditorPage from './pages/admin/ArticleEditorPage';
import AdminRouteGuard from './components/auth/AdminRouteGuard';

// Root route with layout
const rootRoute = createRootRoute({
  component: () => (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  ),
});

// Public routes - Blog structure
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const articlesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/articles',
  component: ArticlesIndexPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const newsletterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/newsletter',
  component: NewsletterPage,
});

const articleDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/articles/$slug',
  component: ArticleDetailPage,
});

// Admin routes (protected)
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: () => (
    <AdminRouteGuard>
      <AdminDashboardPage />
    </AdminRouteGuard>
  ),
});

const adminEditorNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/articles/new',
  component: () => (
    <AdminRouteGuard>
      <ArticleEditorPage />
    </AdminRouteGuard>
  ),
});

const adminEditorEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/articles/$id',
  component: () => (
    <AdminRouteGuard>
      <ArticleEditorPage />
    </AdminRouteGuard>
  ),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  articlesRoute,
  aboutRoute,
  newsletterRoute,
  articleDetailRoute,
  adminRoute,
  adminEditorNewRoute,
  adminEditorEditRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
