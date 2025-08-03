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
import AnimeDetailPage from "@/pages/AnimeDetailPage";
import CreateAnime from "@/pages/CreateAnime";
import AnimeInfoHub from "@/pages/AnimeInfoHub";
import AnimeBrowsePage from "@/pages/AnimeBrowsePage";
import AdminPanel from "@/pages/AdminPanel";
import AdminAuthPage from "@/pages/AdminAuthPage";
import TestValidationPage from "@/pages/TestValidationPage";
import ValidationDashboard from "@/pages/ValidationDashboard";
import ProfilePage from "@/pages/ProfilePage";
import TitleNotificationPage from "@/pages/TitleNotificationPage";
import Forums from "@/pages/Forums";
import Messages from "@/pages/Messages";
import AuthPage from "@/pages/AuthPage";
import HongemPage from "@/pages/HongemPage";
import ForumListPage from "@/pages/ForumListPage";
import ForumDetailPage from "@/pages/ForumDetailPage";
import ForumPostPage from "@/pages/ForumPostPage";
import StudiosPage from "@/pages/StudiosPage";
import PeoplePage from "@/pages/PeoplePage";
import PersonRegisterPage from "@/pages/PersonRegisterPage";
import PersonDetailPage from "@/pages/PersonDetailPage";
import CharactersPage from "@/pages/CharactersPage";
import CharacterRegisterPage from "@/pages/CharacterRegisterPage";
import CharacterDetailPage from "@/pages/CharacterDetailPage";
import EpisodePage from "@/pages/EpisodePage";
import TopRatedAnimePage from "@/pages/TopRatedAnimePage";
import LatestAnimePage from "@/pages/LatestAnimePage";
import EditAnime from "@/pages/EditAnime";
import ScreenshotManagement from "@/pages/ScreenshotManagement";
import StudioRegisterPage from "@/pages/StudioRegisterPageNew";
import StudioDetailPage from "@/pages/StudioDetailPageNew";
import AboutPage from "@/pages/AboutPage";
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
      <Route path="/admin-auth" component={AdminAuthPage} />
      <Route path="/admin" component={AdminPanel} />
      <Route path="/test-validation" component={TestValidationPage} />
      <Route path="/validation-dashboard" component={ValidationDashboard} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/anime/:id" component={AnimeInfoHub} />
      <Route path="/anime/:id/edit" component={EditAnime} />
      <Route path="/anime/:id/screenshots" component={ScreenshotManagement} />
      <Route path="/episodes/:id" component={EpisodePage} />
      <Route path="/create" component={CreateAnime} />
      <Route path="/anime" component={AnimeBrowsePage} />
      <Route path="/browse" component={AnimeBrowsePage} />
      <Route path="/top-rated" component={TopRatedAnimePage} />
      <Route path="/latest" component={LatestAnimePage} />
      <Route path="/hongem" component={HongemPage} />
      <Route path="/forums" component={ForumListPage} />
      <Route path="/forums/:id" component={ForumDetailPage} />
      <Route path="/forum-posts/:id" component={ForumPostPage} />
      <Route path="/messages" component={Messages} />
      <Route path="/studios" component={StudiosPage} />
      <Route path="/studios/register" component={StudioRegisterPage} />
      <Route path="/studios/:id" component={StudioDetailPage} />
      <Route path="/people" component={PeoplePage} />
      <Route path="/people/register" component={PersonRegisterPage} />
      <Route path="/people/:id" component={PersonDetailPage} />
      <Route path="/characters" component={CharactersPage} />
      <Route path="/characters/register" component={CharacterRegisterPage} />
      <Route path="/characters/:id" component={CharacterDetailPage} />
      <Route path="/about" component={AboutPage} />
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
          <TitleNotificationPage />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
export default App;
