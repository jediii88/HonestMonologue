import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Heart, 
  Eye, 
  MessageCircle, 
  Star, 
  Search, 
  Home,
  Play,
  Users,
  Gamepad2,
  Plane,
  Calendar,
  Tv,
  Zap,
  Info,
  Bot,
  Plus
} from "lucide-react";
import { useState } from "react";
import HonmonoLogo from "@assets/Honmono_Logo_1750227308214.png";
import HonmonoTextLogo from "@assets/Honmono_Text_Logo_1750227308215.png";

export default function Landing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDay, setActiveDay] = useState("전체");

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  const weekdays = ["전체", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
      {/* Header - 정확히 스크린샷과 동일하게 */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          {/* Main header */}
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
            <button 
              onClick={() => window.location.href = '/'}
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <img 
                src={HonmonoLogo} 
                alt="HONMONO Logo" 
                className="w-12 h-12 mr-2"
              />
              <img 
                src={HonmonoTextLogo} 
                alt="HONMONO" 
                className="h-8"
              />
            </button>



            {/* User Actions */}
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                className="text-gray-600 hover:text-gray-800 text-sm rounded-full focus:ring-2 focus:ring-yellow-500/50 focus:ring-offset-2"
                onClick={handleLogin}
              >
                로그인
              </Button>
              <Button 
                className="bg-gray-800 text-white hover:bg-gray-700 rounded-full px-4 py-2 text-sm"
                onClick={handleLogin}
              >
                신규 등록
              </Button>
            </div>
          </div>

          {/* Navigation - 아이콘은 컬러, 텍스트는 검정색 */}
          <nav className="flex border-t border-gray-200">
            <a href="/" className="px-4 py-3 text-gray-800 hover:text-gray-900 font-medium flex items-center gap-2 text-sm border-b-2 border-transparent hover:border-orange-500 transition-colors">
              <Home size={16} className="text-orange-500" />
              홈
            </a>
            <a href="#" className="px-4 py-3 text-gray-800 font-medium flex items-center gap-2 text-sm border-b-2 border-blue-600">
              <Tv size={16} className="text-blue-600" />
              애니메이션
            </a>
            <a href="#" className="px-4 py-3 text-gray-800 hover:text-gray-900 font-medium flex items-center gap-2 text-sm border-b-2 border-transparent hover:border-red-500 transition-colors">
              <Bot size={16} className="text-red-600" />
              건담
            </a>
            <a href="#" className="px-4 py-3 text-gray-800 hover:text-gray-900 font-medium flex items-center gap-2 text-sm border-b-2 border-transparent hover:border-purple-500 transition-colors">
              <Gamepad2 size={16} className="text-purple-600" />
              VRChat
            </a>
            <a href="#" className="px-4 py-3 text-gray-800 hover:text-gray-900 font-medium flex items-center gap-2 text-sm border-b-2 border-transparent hover:border-pink-500 transition-colors">
              <Plane size={16} className="text-pink-600" />
              성지순례
            </a>
            <a href="#" className="px-4 py-3 text-gray-800 hover:text-gray-900 font-medium flex items-center gap-2 text-sm border-b-2 border-transparent hover:border-green-500 transition-colors">
              <Info size={16} className="text-green-600" />
              행사정보
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Banner - 노란색 그라데이션 */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-16 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-32 h-32 rounded-full border-2 border-white -top-16 -left-16 animate-pulse"></div>
          <div className="absolute w-24 h-24 rounded-full border border-white top-1/2 -right-12 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute w-16 h-16 rounded-full border border-white bottom-10 left-1/4 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl font-bold mb-2">서브컬처의 진정성을 찾아서</h1>
          <div className="mb-4">
            <span className="text-lg font-medium text-white/80">HONMONO</span>
            <span className="text-sm text-white/60 ml-2">- Honest Monologue</span>
          </div>
          <p className="text-xl mb-8 opacity-90">애니메이션, 건담, VRChat까지 - 모든 덕후의 성지</p>
          
          {/* Search Bar in Hero */}
          <div className="max-w-lg mx-auto mb-6">
            <div className="relative">
              <Input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="작품명, 캐릭터명, 성우 등으로 검색" 
                className="w-full pl-4 pr-12 py-3 bg-white/90 backdrop-blur-sm border-white/50 rounded-full text-gray-700 placeholder-gray-500 focus:bg-white focus:border-white text-lg shadow-lg"
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-yellow-500 hover:bg-yellow-600 rounded-full transition-colors"
              >
                <Search size={20} className="text-white" />
              </button>
            </div>
          </div>
          
          {/* Popular Keywords */}
          <div className="flex flex-wrap justify-center gap-3">
            {['하이큐', '체인소맨', '원피스', '귀멸의칼날', '건담'].map((keyword) => (
              <button
                key={keyword}
                className="px-4 py-2 bg-white/20 text-white rounded-full text-sm hover:bg-white/30 transition-all duration-200 backdrop-blur-sm border border-white/20 hover:scale-105"
                onClick={() => setSearchQuery(keyword)}
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* 요일별 인기 애니메이션 - 전체 폭 */}
        <section className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold text-gray-800 border-l-4 border-yellow-500 pl-3">요일별 인기 애니메이션</h2>
            <Plus size={20} className="text-yellow-500 hover:text-yellow-600 cursor-pointer transition-colors" />
          </div>
          
          {/* Weekday Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {weekdays.map((day) => (
              <button 
                key={day}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  activeDay === day 
                    ? 'bg-yellow-500 text-white font-medium' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setActiveDay(day)}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Anime Grid - 7개 애니메이션 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
            {[
              { title: "마법소녀 카피캣", isNew: true, day: "월" },
              { title: "빌런 입학하기", isNew: true, day: "화" },
              { title: "소드 아트 온라인", isNew: false, day: "수" },
              { title: "블루 록 2기", isNew: false, day: "목" },
              { title: "하이큐!! 최종시즌", isNew: true, day: "금" },
              { title: "체인소 맨 2부", isNew: false, day: "토" },
              { title: "진격의 거인 완결편", isNew: true, day: "일" },
            ].map((anime, index) => (
              <div key={index} className="relative group cursor-pointer">
                <div className="absolute top-1 left-1 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full z-10 font-medium">{anime.day}</div>
                {anime.isNew && (
                  <div className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10 font-medium">NEW</div>
                )}
                <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-2 group-hover:shadow-lg transition-all duration-200 group-hover:scale-105 relative">
                  <div className="w-full h-full bg-gray-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2">
                    <h3 className="text-xs font-medium text-center truncate">{anime.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2">

            {/* 인기 게시글 - 2개 게시글 */}
            <section className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-gray-800 border-l-4 border-yellow-500 pl-3">인기 게시글</h2>
                <Plus size={20} className="text-yellow-500 hover:text-yellow-600 cursor-pointer transition-colors" />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 첫 번째 게시글 */}
                <Card className="p-4 card-hover cursor-pointer bg-black rounded-2xl">
                  <div className="aspect-video bg-black rounded-xl flex items-center justify-center mb-3">
                    <span className="text-white text-sm">2025년 겨울 신작 애니메이션 완전 정리</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl">
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-medium">애니메이션</span>
                    <h3 className="font-semibold text-gray-800 text-sm mt-2 mb-1">2025년 겨울 신작 애니메이션 완전 정리</h3>
                    <p className="text-xs text-gray-600 mb-2">이번 시즌 주목해야 할 신작들을 가격대별로 정리해봤습니다...</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>3시간 전</span>
                      <div className="flex gap-2">
                        <span className="flex items-center gap-1">
                          <Eye size={10} />
                          1,234
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle size={10} />
                          89
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* 두 번째 게시글 */}
                <Card className="p-4 card-hover cursor-pointer bg-black rounded-2xl">
                  <div className="aspect-video bg-black rounded-xl flex items-center justify-center mb-3">
                    <span className="text-white text-sm">최신 건담 프라모델 리뷰</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl">
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full font-medium">건담</span>
                    <h3 className="font-semibold text-gray-800 text-sm mt-2 mb-1">RG 뉴건담 조립 완전 가이드</h3>
                    <p className="text-xs text-gray-600 mb-2">초보자도 쉽게 따라할 수 있는 상세한 조립 과정을 소개합니다...</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>5시간 전</span>
                      <div className="flex gap-2">
                        <span className="flex items-center gap-1">
                          <Eye size={10} />
                          892
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle size={10} />
                          67
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </section>

            {/* 최신 리뷰 */}
            <section className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-gray-800 border-l-4 border-yellow-500 pl-3">
                  최신 리뷰 
                  <span className="text-sm font-normal text-yellow-600 ml-2">진솔한 후기</span>
                </h2>
                <Plus size={20} className="text-yellow-500 hover:text-yellow-600 cursor-pointer transition-colors" />
              </div>

              <div className="space-y-3">
                <Card className="p-4 card-hover cursor-pointer rounded-2xl">
                  <div className="flex gap-4">
                    <div className="w-16 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs font-medium text-center">하이큐</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">리뷰</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} className={`${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                          <span className="text-sm text-gray-600 ml-1 font-medium">4.5/5</span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-1">하이큐!! 최종시즌 1화 - 완벽한 마무리의 시작</h3>
                      <p className="text-sm text-gray-600 mb-2">오랜 기다림 끝에 돌아온 하이큐의 마지막 여정. 첫 화부터 깊은 감동을 안겨준다...</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span className="font-medium">애니덕후</span>
                        <div className="flex gap-3">
                          <span>2시간 전</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 card-hover cursor-pointer rounded-2xl">
                  <div className="flex gap-4">
                    <div className="w-16 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs font-medium text-center">건담</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">건담</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} className={`${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                          <span className="text-sm text-gray-600 ml-1 font-medium">4.0/5</span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-1">RG 뉴건담 조립 후기 - 디테일의 완성</h3>
                      <p className="text-sm text-gray-600 mb-2">RG 라인의 절정이라 불리는 뉴건담을 드디어 완성했습니다...</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span className="font-medium">건담스타</span>
                        <div className="flex gap-3">
                          <span>4시간 전</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 card-hover cursor-pointer rounded-2xl">
                  <div className="flex gap-4">
                    <div className="w-16 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs font-medium text-center">VR</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">VRChat</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} className={`${i < 3 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                          <span className="text-sm text-gray-600 ml-1 font-medium">3.8/5</span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-1">새로운 애니메이션 월드 체험기</h3>
                      <p className="text-sm text-gray-600 mb-2">최근 출시된 스튜디오 지브리 테마 월드를 직접 체험해봤습니다...</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span className="font-medium">VR매니아</span>
                        <div className="flex gap-3">
                          <span>6시간 전</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </section>

            {/* 추천 컬렉션 */}
            <section className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-gray-800 border-l-4 border-yellow-500 pl-3">추천 컬렉션</h2>
                <Plus size={20} className="text-yellow-500 hover:text-yellow-600 cursor-pointer transition-colors" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4 card-hover cursor-pointer rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                      <Tv size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-800">2025년 겨울 신작</h3>
                      <p className="text-xs text-blue-600">15개 작품</p>
                    </div>
                  </div>
                  <p className="text-sm text-blue-700">이번 시즌 놓치면 안 될 화제작들을 모았습니다</p>
                </Card>

                <Card className="p-4 card-hover cursor-pointer rounded-2xl bg-gradient-to-br from-red-50 to-red-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
                      <Bot size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-red-800">초보자 건담 가이드</h3>
                      <p className="text-xs text-red-600">8개 모델</p>
                    </div>
                  </div>
                  <p className="text-sm text-red-700">건담 조립 입문자를 위한 추천 키트</p>
                </Card>
              </div>
            </section>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="lg:col-span-1">
            {/* 실시간 트렌드 */}
            <Card className="mb-4 rounded-2xl">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-800 border-l-4 border-yellow-500 pl-3">실시간 트렌드</h3>
                  <Plus size={16} className="text-yellow-500 hover:text-yellow-600 cursor-pointer transition-colors" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
                    <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-800">하이큐 최종시즌</h4>
                      <div className="flex items-center gap-1 text-xs">
                        <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-medium">HOT</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
                    <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-800">체인소맨 2부</h4>
                      <div className="flex items-center gap-1 text-xs">
                        <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-medium">UP</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
                    <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-800">RG 뉴건담</h4>
                      <div className="flex items-center gap-1 text-xs">
                        <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-medium">NEW</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
                    <div className="w-7 h-7 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-800">VRChat 신월드</h4>
                      <div className="flex items-center gap-1 text-xs">
                        <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full font-medium">TREND</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
                    <div className="w-7 h-7 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">5</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-800">도쿄 애니 투어</h4>
                      <div className="flex items-center gap-1 text-xs">
                        <span className="bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full font-medium">TRAVEL</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>



            {/* 다가오는 행사 */}
            <Card className="rounded-2xl">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-800 border-l-4 border-yellow-500 pl-3">다가오는 행사</h3>
                  <Plus size={16} className="text-yellow-500 hover:text-yellow-600 cursor-pointer transition-colors" />
                </div>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-xl border-l-4 border-blue-400">
                    <h4 className="font-medium text-sm text-blue-800">코믹마켓 102</h4>
                    <p className="text-xs text-blue-600">2025년 8월 12-14일</p>
                    <p className="text-xs text-blue-500">도쿄 빅사이트</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-xl border-l-4 border-green-400">
                    <h4 className="font-medium text-sm text-green-800">AnimeJapan 2025</h4>
                    <p className="text-xs text-green-600">2025년 3월 23-26일</p>
                    <p className="text-xs text-green-500">도쿄 빅사이트</p>
                  </div>
                  <div className="bg-gradient-to-r from-red-50 to-red-100 p-3 rounded-xl border-l-4 border-red-400">
                    <h4 className="font-medium text-sm text-red-800">건프라 EXPO</h4>
                    <p className="text-xs text-red-600">2025년 7월 15-17일</p>
                    <p className="text-xs text-red-500">오다이바</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 커뮤니티 현황 - 전체 폭 */}
        <Card className="mt-8 rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">커뮤니티 현황</h3>
                <Plus size={24} className="text-white/80 hover:text-white cursor-pointer transition-colors" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">12,458</div>
                  <div className="text-sm opacity-90">총 회원</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">1,892</div>
                  <div className="text-sm opacity-90">오늘 활동</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">45,612</div>
                  <div className="text-sm opacity-90">총 게시글</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">156</div>
                  <div className="text-sm opacity-90">신규 리뷰</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="flex items-center mb-3">
                <img 
                  src={HonmonoLogo} 
                  alt="HONMONO Logo" 
                  className="w-6 h-6 mr-1"
                />
                <img 
                  src={HonmonoTextLogo} 
                  alt="HONMONO" 
                  className="h-4"
                />
              </div>
              <p className="text-xs text-yellow-600 font-medium mb-1">
                Honest Monologue
              </p>
              <p className="text-sm text-gray-600">
                서브컬처 애호가들의 진정성 있는 공간
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">카테고리</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li><a href="#" className="hover:text-yellow-600 transition-colors">애니메이션</a></li>
                <li><a href="#" className="hover:text-yellow-600 transition-colors">건담</a></li>
                <li><a href="#" className="hover:text-yellow-600 transition-colors">VRChat</a></li>
                <li><a href="#" className="hover:text-yellow-600 transition-colors">성지순례</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">커뮤니티</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li><a href="#" className="hover:text-yellow-600 transition-colors">공지사항</a></li>
                <li><a href="#" className="hover:text-yellow-600 transition-colors">자유게시판</a></li>
                <li><a href="#" className="hover:text-yellow-600 transition-colors">리뷰</a></li>
                <li><a href="#" className="hover:text-yellow-600 transition-colors">Q&A</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">문의</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>이메일: contact@honmono.kr</li>
                <li>디스코드: HONMONO 서버</li>
                <li>인스타그램: @honmono_kr</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-300 mt-6 pt-6 text-center text-sm text-gray-500">
            <p>&copy; 2025 HONMONO. 모든 권리 보유.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}