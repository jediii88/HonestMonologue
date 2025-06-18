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
import { Home, Search, Plus, Settings, LogOut, Shield } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const { user, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoginHovered, setIsLoginHovered] = useState(false);

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
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main header container */}
        <div className="flex justify-between items-center py-4 mb-3 flex-wrap">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-gray-800 tracking-wide transition-transform hover:scale-105">
              HONMONO<span className="text-pink-500 transition-transform hover:scale-125">.</span>
            </a>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8 relative">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="작품명, 캐릭터명, 성우 등으로 검색" 
                  className="w-full pl-4 pr-12 py-3 rounded-full border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-700 transition-all hover:rotate-90"
                >
                  <Search size={16} />
                </button>
              </div>
            </form>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" asChild>
                  <a href="/create">
                    <Plus size={16} className="mr-1" />
                    작품 등록
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
                    <DropdownMenuItem asChild>
                      <a href="/admin">
                        <Shield size={16} className="mr-2" />
                        관리자 패널
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut size={16} className="mr-2" />
                      로그아웃
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <div 
                  className="inline-block rounded-full px-5 py-2 cursor-pointer font-medium transition-all duration-300"
                  onMouseEnter={() => {
                    console.log('마우스 진입!');
                    setIsLoginHovered(true);
                  }}
                  onMouseLeave={() => {
                    console.log('마우스 벗어남!');
                    setIsLoginHovered(false);
                  }}
                  onClick={handleLogin}
                  style={{
                    backgroundColor: isLoginHovered ? '#facc15' : '#f3f4f6',
                    color: isLoginHovered ? 'white' : '#374151'
                  }}
                >
                  로그인 (hover: {isLoginHovered ? 'YES' : 'NO'})
                </div>
                <Button 
                  className="bg-gray-800 text-white hover:bg-gray-700 rounded-full px-5"
                  onClick={handleLogin}
                >
                  신규 등록
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="border-t border-gray-200">
          <nav className="flex">
            <a href="/" className="px-5 py-4 text-gray-700 hover:text-gray-900 font-medium border-b-2 border-transparent hover:border-gray-600 transition-colors">
              홈
            </a>
            <a href="#" className="px-5 py-4 text-gray-700 hover:text-gray-900 font-medium border-b-2 border-transparent hover:border-gray-600 transition-colors">
              애니메이션
            </a>
            <a href="#" className="px-5 py-4 text-gray-700 hover:text-gray-900 font-medium border-b-2 border-transparent hover:border-gray-600 transition-colors">
              건담
            </a>
            <a href="#" className="px-5 py-4 text-gray-700 hover:text-gray-900 font-medium border-b-2 border-transparent hover:border-gray-600 transition-colors">
              VRChat
            </a>
            <a href="#" className="px-5 py-4 text-gray-700 hover:text-gray-900 font-medium border-b-2 border-transparent hover:border-gray-600 transition-colors">
              일본여행
            </a>
            <a href="#" className="px-5 py-4 text-gray-700 hover:text-gray-900 font-medium border-b-2 border-transparent hover:border-gray-600 transition-colors">
              행사정보
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
