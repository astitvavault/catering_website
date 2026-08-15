import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import HomePage from './pages/index';
import NotFoundPage from './pages/_404';

const AboutPage = lazy(() => import('./pages/about'));
const ServicesPage = lazy(() => import('./pages/services'));
const MenuPage = lazy(() => import('./pages/menu'));
const EventsPage = lazy(() => import('./pages/events'));
const GalleryPage = lazy(() => import('./pages/gallery'));
const ContactPage = lazy(() => import('./pages/contact'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/services',
    element: <ServicesPage />,
  },
  {
    path: '/menu',
    element: <MenuPage />,
  },
  {
    path: '/events',
    element: <EventsPage />,
  },
  {
    path: '/gallery',
    element: <GalleryPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export type Path = '/' | '/about' | '/services' | '/menu' | '/events' | '/gallery' | '/contact';
export type Params = Record<string, string | undefined>;
