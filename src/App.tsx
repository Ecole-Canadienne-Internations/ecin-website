import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const Cycles = lazy(() => import("./pages/Cycles"));
const Prepas = lazy(() => import("./pages/Prepas"));
const Programmes = lazy(() => import("./pages/Programmes"));
const Admissions = lazy(() => import("./pages/Admissions"));
const Alumni = lazy(() => import("./pages/Alumni"));
const EcinEnBref = lazy(() => import("./pages/EcinEnBref"));
const Blog = lazy(() => import("./pages/Blog"));
const Login = lazy(() => import("./pages/Login"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ecin-en-bref" element={<EcinEnBref />} />
            <Route path="/cycles/:cycle" element={<Cycles />} />
            <Route path="/prepas/:prepa" element={<Prepas />} />
            <Route path="/programmes/:programme" element={<Programmes />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/alumni" element={<Alumni />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
