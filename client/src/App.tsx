import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import NotFound from "@/pages/not-found";
import UnderConstruction from "@/pages/UnderConstruction";

// GitHub Pages 전용 간소화된 App
const UNDER_CONSTRUCTION = true;

function App() {
  // sessionStorage 접근을 안전하게 처리
  let hasAdminAccess = false;
  try {
    hasAdminAccess = sessionStorage.getItem("admin_access") === "true";
  } catch (e) {
    // sessionStorage가 없는 환경에서는 false
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen">
        {UNDER_CONSTRUCTION && !hasAdminAccess ? (
          <UnderConstruction />
        ) : (
          <Switch>
            <Route path="/" component={() => <div>메인 페이지</div>} />
            <Route component={NotFound} />
          </Switch>
        )}
      </div>
    </QueryClientProvider>
  );
}

export default App;
