import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import UnderConstruction from "@/pages/UnderConstruction";

function Router() {
  // GitHub Pages에서는 항상 공사중 페이지부터 시작
  const isGitHubPages = window.location.hostname.includes('github.io');
  const hasAdminAccess = sessionStorage.getItem("admin_access") === "true";
  
  if (isGitHubPages) {
    // 관리자 접속이 있으면 완전한 사이트, 없으면 공사중 페이지
    if (hasAdminAccess) {
      return (
        <Switch>
          <Route path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route path="/" component={UnderConstruction} />
          <Route component={UnderConstruction} />
        </Switch>
      );
    }
  }

  // 로컬 개발 환경에서는 인증 시스템 사용
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
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
