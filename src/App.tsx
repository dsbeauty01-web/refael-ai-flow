import { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import RouteEffects from "@/components/site/RouteEffects";
import Index from "./pages/Index";

// Home loads with the bundle; every other page is its own chunk.
const LiveSelling = lazy(() => import("./pages/LiveSelling"));
const Landing = lazy(() => import("./pages/Landing"));
const Maya = lazy(() => import("./pages/Maya"));
const Voices = lazy(() => import("./pages/Voices"));
const Legal = lazy(() => import("./pages/Legal"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

/** Old URL -> new page, keeping any ?lang/utm and #hash the visitor arrived with. */
function Moved({ to, lang }: { to: string; lang?: string }) {
  const { search, hash } = useLocation();
  const params = new URLSearchParams(search);
  if (lang && !params.has('lang')) params.set('lang', lang);
  const qs = params.toString();
  return <Navigate to={`${to}${qs ? `?${qs}` : ''}${hash}`} replace />;
}

const Blank = () => <div className="min-h-screen bg-paper" aria-busy="true" />;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <RouteEffects />
          <Suspense fallback={<Blank />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/live-selling" element={<LiveSelling />} />
              <Route path="/live-avatar" element={<Maya />} />
              <Route path="/customer-service" element={<Landing />} />
              <Route path="/ai-avatar" element={<Landing />} />
              <Route path="/brand-character" element={<Landing />} />
              <Route path="/voices" element={<Voices />} />
              <Route path="/legal/:slug" element={<Legal />} />

              {/* moved pages */}
              <Route path="/maya" element={<Moved to="/live-avatar" />} />
              <Route path="/maya-en" element={<Moved to="/live-selling" lang="en" />} />
              <Route path="/maya-th" element={<Moved to="/live-selling" lang="th" />} />
              <Route path="/ai-live-host" element={<Moved to="/live-selling" />} />
              <Route path="/ai-avatar-business" element={<Moved to="/ai-avatar" />} />
              <Route path="/ai-brand-character" element={<Moved to="/brand-character" />} />
              <Route path="/privacy" element={<Moved to="/legal/privacy" />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
