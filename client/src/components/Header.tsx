import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DoorClosed, Search, Plus, Settings, LogOut, Shield } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const { user, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // TODO: Implement search functionality
      console.log("Searching for:", searchQuery);
    }
  };

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <header className="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <DoorClosed className="text-white text-sm" size={16} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-neutral-800">혼모노</h1>
                <p className="text-xs text-neutral-500 -mt-1">Honest Monologue</p>
              </div>
            </a>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="태그로 검색하세요... #액션 #로맨스 #스튜디오지브리" 
                  className="w-full pl-10 pr-4 py-2"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={16} />
              </div>
            </form>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-neutral-600 hover:text-primary transition-colors">홈</a>
            <a href="#" className="text-neutral-600 hover:text-primary transition-colors">애니메이션</a>
            <a href="#" className="text-neutral-600 hover:text-primary transition-colors">리뷰</a>
            <a href="#" className="text-neutral-600 hover:text-primary transition-colors">이벤트</a>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" asChild>
                  <a href="/create">
                    <Plus size={16} className="mr-1" />
                    등록
                  </a>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user?.profileImageUrl || ""} />
                      <AvatarFallback>
                        {user?.firstName?.[0] || user?.email?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Settings size={16} className="mr-2" />
                      설정
                    </DropdownMenuItem>
                    {user?.isAdmin && (
                      <DropdownMenuItem asChild>
                        <a href="/admin">
                          <Shield size={16} className="mr-2" />
                          관리자 패널
                        </a>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut size={16} className="mr-2" />
                      로그아웃
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button onClick={handleLogin} className="bg-primary hover:bg-primary/90">
                로그인
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
