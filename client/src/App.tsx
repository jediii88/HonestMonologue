import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import AnimeDetail from "@/pages/AnimeDetail";
import CreateAnime from "@/pages/CreateAnime";
import AdminPanel from "@/pages/AdminPanel";
import Forums from "@/pages/Forums";
import Messages from "@/pages/Messages";
import UnderConstruction from "@/pages/UnderConstruction";

// 공사중 모드 (GitHub Pages에서는 항상 활성화)
const UNDER_CONSTRUCTION = true;
const hasAdminAccess = sessionStorage.getItem("admin_access") === "true";

function Router() {
  // GitHub Pages 환경 감지
  const isGitHubPages = window.location.hostname.includes('github.io');
  
  // GitHub Pages에서는 인증 시스템 건너뛰기
  if (isGitHubPages) {
    // 공사중 모드일 때는 관리자 접속이 아닌 경우 공사중 페이지 표시
    if (UNDER_CONSTRUCTION && !hasAdminAccess) {
      return (
        <Switch>
          <Route path="/" component={UnderConstruction} />
          <Route component={UnderConstruction} />
        </Switch>
      );
    }

    return (
      <Switch>
        <Route path="/admin" component={AdminPanel} />
        <Route path="/anime/:id" component={AnimeDetail} />
        <Route path="/create" component={CreateAnime} />
        <Route path="/forums" component={Forums} />
        <Route path="/messages" component={Messages} />
        <Route path="/" component={Landing} />
        <Route component={NotFound} />
      </Switch>
    );
  }

  // 로컬 개발 환경에서는 인증 시스템 사용
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-border" />
      </div>
    );
  }

  return (
    <Switch>
      <Route path="/admin" component={AdminPanel} />
      <Route path="/anime/:id" component={AnimeDetail} />
      <Route path="/create" component={CreateAnime} />
      <Route path="/forums" component={Forums} />
      <Route path="/messages" component={Messages} />
      {isLoading || !isAuthenticated ? (
        <Route path="/" component={Landing} />
      ) : (
        <Route path="/" component={Home} />
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
