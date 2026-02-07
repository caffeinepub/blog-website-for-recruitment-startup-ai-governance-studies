import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import SiteLayout from './components/layout/SiteLayout';
import RecruitmentPage from './pages/RecruitmentPage';
import AttritionPage from './pages/AttritionPage';
import InvariantPage from './pages/InvariantPage';
import ArticlesIndexPage from './pages/ArticlesIndexPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import AboutPage from './pages/AboutPage';
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

// Public routes - new 3-page structure
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: RecruitmentPage,
});

const recruitmentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/recruitment',
  component: RecruitmentPage,
});

const attritionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/attrition',
  component: AttritionPage,
});

const invariantRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/invariant',
  component: InvariantPage,
});

// Legacy public routes (still accessible)
const articlesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/articles',
  component: ArticlesIndexPage,
});

const articleDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/articles/$slug',
  component: ArticleDetailPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
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
  indexRoute,
  recruitmentRoute,
  attritionRoute,
  invariantRoute,
  articlesRoute,
  articleDetailRoute,
  aboutRoute,
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
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
