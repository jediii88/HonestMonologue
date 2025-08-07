import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Heart, 
  Eye, 
  MessageCircle, 
  Star, 
  Search, 
  Users,
  Tv,
  Crown,
} from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* 헤더 */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  혼모노
                </h1>
                <p className="text-xs text-gray-500">진정한 애니메이션 커뮤니티</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="애니메이션 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-3xl w-64"
                />
              </div>
              <Button 
                onClick={() => {
                  sessionStorage.removeItem("admin_access");
                  window.location.reload();
                }}
                className="rounded-3xl bg-gradient-to-r from-purple-600 to-blue-600"
              >
                로그아웃
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 환영 섹션 */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            애니메이션 팬들의 성지에 오신 것을 환영합니다
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            진정한 애니메이션 애호가들을 위한 종합 커뮤니티 플랫폼
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="rounded-3xl border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600">
              <CardContent className="p-6 text-white text-center">
                <Star className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">이중 평가 시스템</h3>
                <p className="opacity-90">작품성과 팬덤 지표를 구분한 정확한 평가</p>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600">
              <CardContent className="p-6 text-white text-center">
                <Users className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">활발한 커뮤니티</h3>
                <p className="opacity-90">포럼과 이미지 게시판으로 소통</p>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600">
              <CardContent className="p-6 text-white text-center">
                <Crown className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">칭호 시스템</h3>
                <p className="opacity-90">활동에 따른 15단계 칭호 획득</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 추천 애니메이션 섹션 */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">추천 애니메이션</h3>
            <Button variant="outline" className="rounded-3xl">
              더보기
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="rounded-3xl border-0 shadow-lg overflow-hidden group cursor-pointer hover:scale-105 transition-transform">
                <div className="aspect-[3/4] bg-gradient-to-br from-purple-200 to-blue-200 dark:from-purple-800 dark:to-blue-800 flex items-center justify-center">
                  <Tv className="w-8 h-8 text-purple-600 dark:text-purple-300" />
                </div>
                <CardContent className="p-3">
                  <h4 className="font-semibold text-sm truncate">애니메이션 {i}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs ml-1">9.{i}</span>
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-3 h-3 text-red-500" />
                      <span className="text-xs ml-1">{i * 100}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 커뮤니티 섹션 */}
        <section>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">커뮤니티</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="rounded-3xl border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                  <h4 className="text-xl font-semibold">자유게시판</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  애니메이션에 대한 자유로운 토론과 정보 공유
                </p>
                <Button className="rounded-3xl">게시판 바로가기</Button>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Eye className="w-6 h-6 text-purple-600" />
                  <h4 className="text-xl font-semibold">위그드라실 하임</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  이미지 중심의 소셜 게시판
                </p>
                <Button className="rounded-3xl bg-purple-600 hover:bg-purple-700">
                  하임 입장하기
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
