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

// 공사중 페이지 컴포넌트
function UnderConstruction() {
  const handleLogoClick = () => {
    const code = prompt("관리자 코드를 입력하세요:");
    if (code === "혼모노2025") {
      sessionStorage.setItem("admin_access", "true");
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div onClick={handleLogoClick} className="cursor-pointer">
          <h1 className="text-5xl font-bold text-purple-600 mb-4">혼모노</h1>
          <p className="text-xl text-gray-600">HONMONO</p>
          <p className="text-sm text-gray-500">진정한 애니메이션 커뮤니티</p>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">🚧 페이지를 준비중입니다</h2>
          <p className="text-lg text-gray-600">2025년 8월 공식 출시 예정입니다.</p>
          <p className="text-sm text-gray-500 mt-4">honmono.co.kr</p>
        </div>
      </div>
    </div>
  );
}

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
