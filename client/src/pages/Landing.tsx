import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye, MessageCircle, Star, Search, DoorClosed } from "lucide-react";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <DoorClosed className="text-white text-sm" size={16} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-neutral-800">혼모노</h1>
                  <p className="text-xs text-neutral-500 -mt-1">Honest Monologue</p>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="태그로 검색하세요... #액션 #로맨스 #스튜디오지브리" 
                  className="w-full pl-10 pr-4 py-2"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={16} />
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-neutral-600 hover:text-primary transition-colors">홈</a>
              <a href="#" className="text-neutral-600 hover:text-primary transition-colors">애니메이션</a>
              <a href="#" className="text-neutral-600 hover:text-primary transition-colors">리뷰</a>
              <a href="#" className="text-neutral-600 hover:text-primary transition-colors">이벤트</a>
              <Button onClick={handleLogin} className="bg-primary hover:bg-primary/90">
                로그인
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="relative h-80 rounded-2xl overflow-hidden hero-gradient">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-pink-500/80"></div>
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <div className="max-w-3xl px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  진정한 애니메이션 커뮤니티
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  서로를 존중하며 일본 애니메이션과 서브컬처를 사랑하는 사람들의 공간
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={handleLogin} size="lg" className="bg-white text-primary hover:bg-neutral-100">
                    애니메이션 등록하기
                  </Button>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                    커뮤니티 가이드
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Event Banner */}
        <section className="mb-8">
          <Card className="event-gradient border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Star className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800">2024 겨울 애니메이션 평가 이벤트</h3>
                    <p className="text-neutral-600">올해의 최고 애니메이션을 선정해보세요! 참여자 전원 특별 뱃지 지급</p>
                  </div>
                </div>
                <Button onClick={handleLogin} className="bg-yellow-500 hover:bg-yellow-600 text-white">
                  참여하기
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Filter Section */}
        <section className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="default" className="bg-primary text-white">전체</Badge>
              <Badge variant="secondary">신작</Badge>
              <Badge variant="secondary">인기작</Badge>
              <Badge variant="secondary">리뷰 많은 순</Badge>
              <Badge variant="secondary">최근 업데이트</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-neutral-600">정렬:</span>
              <select className="border border-neutral-300 rounded-lg px-3 py-1 text-sm">
                <option>최신순</option>
                <option>평점순</option>
                <option>리뷰순</option>
                <option>조회순</option>
              </select>
            </div>
          </div>
        </section>

        {/* Sample Anime Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Sample Card 1 */}
          <Card className="anime-card overflow-hidden">
            <div className="relative">
              <div className="w-full h-64 bg-gradient-to-br from-blue-500 to-purple-600"></div>
              <div className="absolute top-3 left-3">
                <Badge className="bg-green-500 text-white">승인완료</Badge>
              </div>
              <div className="absolute top-3 right-3 flex space-x-1">
                <Badge variant="secondary" className="bg-black/50 text-white">TV</Badge>
                <Badge variant="secondary" className="bg-black/50 text-white">2024</Badge>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <div className="flex items-center space-x-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-current" />
                    ))}
                  </div>
                  <span className="text-white text-sm font-medium">4.8</span>
                  <span className="text-white/80 text-xs">(1,234)</span>
                </div>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-neutral-800 text-lg">SPY×FAMILY</h3>
                <Button variant="ghost" size="sm" className="p-1">
                  <Heart className="text-neutral-400" size={16} />
                </Button>
              </div>
              
              <p className="text-neutral-600 text-sm mb-3 line-clamp-2">
                스파이, 살인자, 그리고 초능력자가 만나 이루는 특별한 가족의 이야기
              </p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                <Badge variant="outline" className="text-primary">액션</Badge>
                <Badge variant="outline" className="text-primary">코미디</Badge>
                <Badge variant="outline" className="text-primary">일상</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-neutral-300 rounded-full"></div>
                  <span className="text-neutral-600 text-sm">애니덕후</span>
                </div>
                <div className="flex items-center space-x-3 text-neutral-500 text-sm">
                  <span className="flex items-center space-x-1">
                    <MessageCircle size={14} />
                    <span>156</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Eye size={14} />
                    <span>2.3k</span>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* More sample cards with different gradients */}
          {[
            { title: "체인소 맨", color: "from-red-500 to-orange-600" },
            { title: "이웃집 토토로", color: "from-green-400 to-blue-500" },
            { title: "바이올렛 에버가든", color: "from-purple-400 to-pink-500" },
            { title: "귀멸의 칼날", color: "from-orange-500 to-red-600" },
            { title: "공각기동대", color: "from-gray-600 to-blue-700" },
          ].map((anime, index) => (
            <Card key={index} className="anime-card overflow-hidden">
              <div className="relative">
                <div className={`w-full h-64 bg-gradient-to-br ${anime.color}`}></div>
                <div className="absolute top-3 left-3">
                  <Badge className="bg-green-500 text-white">승인완료</Badge>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-current" />
                      ))}
                    </div>
                    <span className="text-white text-sm font-medium">4.{Math.floor(Math.random() * 9)}</span>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-neutral-800 text-lg">{anime.title}</h3>
                  <Button variant="ghost" size="sm" className="p-1">
                    <Heart className="text-neutral-400" size={16} />
                  </Button>
                </div>
                
                <p className="text-neutral-600 text-sm mb-3 line-clamp-2">
                  멋진 애니메이션의 감동적인 스토리가 여러분을 기다리고 있습니다.
                </p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  <Badge variant="outline" className="text-primary">액션</Badge>
                  <Badge variant="outline" className="text-primary">드라마</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-neutral-300 rounded-full"></div>
                    <span className="text-neutral-600 text-sm">사용자{index + 1}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-neutral-500 text-sm">
                    <span className="flex items-center space-x-1">
                      <MessageCircle size={14} />
                      <span>{Math.floor(Math.random() * 500)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Eye size={14} />
                      <span>{Math.floor(Math.random() * 10)}k</span>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Call to Action */}
        <section className="text-center py-12">
          <Button onClick={handleLogin} size="lg" className="bg-primary hover:bg-primary/90">
            더 많은 애니메이션 보기
          </Button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-800 text-neutral-300 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <DoorClosed className="text-white text-sm" size={16} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">혼모노</h3>
                  <p className="text-xs text-neutral-400">Honest Monologue</p>
                </div>
              </div>
              <p className="text-sm text-neutral-400">
                진정한 애니메이션과 서브컬처를 사랑하는 사람들의 커뮤니티
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">커뮤니티</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">애니메이션</a></li>
                <li><a href="#" className="hover:text-white transition-colors">리뷰</a></li>
                <li><a href="#" className="hover:text-white transition-colors">랭킹</a></li>
                <li><a href="#" className="hover:text-white transition-colors">이벤트</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">정보</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">사용 가이드</a></li>
                <li><a href="#" className="hover:text-white transition-colors">커뮤니티 규칙</a></li>
                <li><a href="#" className="hover:text-white transition-colors">개인정보처리방침</a></li>
                <li><a href="#" className="hover:text-white transition-colors">서비스 약관</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">연락처</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">고객센터</a></li>
                <li><a href="#" className="hover:text-white transition-colors">제휴 문의</a></li>
                <li><a href="#" className="hover:text-white transition-colors">버그 신고</a></li>
                <li><a href="#" className="hover:text-white transition-colors">건의사항</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-neutral-700 mt-8 pt-8 text-center text-sm text-neutral-400">
            <p>&copy; 2024 혼모노 (Honest Monologue). All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
