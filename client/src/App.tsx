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
import AuthPage from "@/pages/AuthPage";
import UnderConstruction from "@/pages/UnderConstruction";

// 공사중 모드 활성화 여부 (기본값: true, 환경변수로 비활성화 가능)
const UNDER_CONSTRUCTION = import.meta.env.VITE_UNDER_CONSTRUCTION !== 'false';
// 관리자 비밀 접속 여부 확인
const hasAdminAccess = sessionStorage.getItem("admin_access") === "true";

function Router() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-border" />
      </div>
    );
  }

  // 공사중 모드일 때는 관리자 접속이나 로그인된 사용자가 아닌 경우에만 공사중 페이지 표시
  if (UNDER_CONSTRUCTION && !hasAdminAccess && !isAuthenticated) {
    return (
      <Switch>
        <Route path="/" component={UnderConstruction} />
        <Route component={UnderConstruction} />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <Route path="/admin" component={AdminPanel} />
      <Route path="/anime/:id" component={AnimeDetail} />
      <Route path="/create" component={CreateAnime} />
      <Route path="/forums" component={Forums} />
      <Route path="/messages" component={Messages} />
      <Route path="/home" component={Home} />
      <Route path="/" component={Landing} />
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
