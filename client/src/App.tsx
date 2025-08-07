import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import UnderConstruction from "@/pages/UnderConstruction";

function Router() {
  const hasAdminAccess = sessionStorage.getItem("admin_access") === "true";
  
  // 관리자 접속이 있으면 홈 페이지, 없으면 공사중 페이지
  if (hasAdminAccess) {
    return (
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    );
  }
  
  return (
    <Switch>
      <Route path="/" component={UnderConstruction} />
      <Route component={UnderConstruction} />
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
