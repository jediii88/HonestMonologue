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
  Bot
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
            <div className="flex items-center">
              <img 
                src={HonmonoLogo} 
                alt="HONMONO Logo" 
                className="w-8 h-8 mr-1"
              />
              <img 
                src={HonmonoTextLogo} 
                alt="HONMONO" 
                className="h-6"
              />
            </div>

            {/* Search Bar - 스크린샷과 동일한 스타일 */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="작품명, 캐릭터명, 성우 등으로 검색" 
                  className="w-full pl-4 pr-10 py-2 bg-gray-100 border-gray-200 rounded-full text-sm focus:bg-white focus:border-yellow-500"
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1"
                >
                  <Search size={16} className="text-gray-400" />
                </button>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                className="text-gray-600 hover:text-gray-800 text-sm"
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
              일본여행
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
          <h1 className="text-4xl font-bold mb-4">서브컬처의 진정성을 찾아서</h1>
          <p className="text-xl mb-8 opacity-90">애니메이션, 건담, VRChat, 일본여행까지 - 모든 덕후의 성지</p>
          
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
            <a href="#" className="text-yellow-600 hover:text-yellow-700 text-sm">더보기</a>
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
                {anime.isNew && (
                  <div className="absolute top-1 left-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10 font-medium">NEW</div>
                )}
                <div className="absolute top-1 right-1 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full z-10 font-medium">{anime.day}</div>
                <div className="aspect-[3/4] rounded-lg overflow-hidden mb-2 group-hover:shadow-lg transition-all duration-200 group-hover:scale-105">
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-700 text-xs font-medium text-center px-1">{anime.title}</span>
                  </div>
                </div>
                <h3 className="text-xs text-gray-800 font-medium text-center truncate">{anime.title}</h3>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2">

            {/* 2열 레이아웃 - 인기 게시글과 실시간 트렌드 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* 인기 게시글 */}
              <section>
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-bold text-gray-800 border-l-4 border-yellow-500 pl-3">인기 게시글</h2>
                  <a href="#" className="text-yellow-600 hover:text-yellow-700 text-sm">더보기</a>
                </div>
                <Card className="p-4 card-hover cursor-pointer bg-black">
                  <div className="aspect-video bg-black rounded flex items-center justify-center mb-3">
                    <span className="text-white text-sm">2025년 겨울 신작 애니메이션 완전 정리</span>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded font-medium">애니메이션</span>
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
              </section>

              {/* 실시간 트렌드 */}
              <section>
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-bold text-gray-800 border-l-4 border-yellow-500 pl-3">실시간 트렌드</h2>
                </div>
                <Card className="p-4 card-hover cursor-pointer">
                  <div className="aspect-video bg-gray-200 rounded flex items-center justify-center mb-3">
                    <span className="text-gray-600 text-sm">VR 헤드셋</span>
                  </div>
                  <div>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded font-medium">VRCHAT</span>
                    <h3 className="font-semibold text-gray-800 text-sm mt-2 mb-1">신규 월드 '아니메 카페' 체험기</h3>
                    <p className="text-xs text-gray-600 mb-2">애니메이션 테마의 새로운 소셜 월드를 미리 체험해볼 수 있습니다...</p>
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
              </section>
            </div>

            {/* 최신 리뷰 */}
            <section className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-gray-800 border-l-4 border-yellow-500 pl-3">최신 리뷰</h2>
                <a href="#" className="text-yellow-600 hover:text-yellow-700 text-sm">더보기</a>
              </div>

              <div className="space-y-3">
                <Card className="p-4 card-hover cursor-pointer">
                  <div className="flex gap-4">
                    <div className="w-16 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs font-medium text-center">하이큐</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-medium">리뷰</span>
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

                <Card className="p-4 card-hover cursor-pointer">
                  <div className="flex gap-4">
                    <div className="w-16 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs font-medium text-center">건담</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded font-medium">건담</span>
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
              </div>
            </section>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="lg:col-span-1">
            {/* 실시간 트렌드 */}
            <Card className="mb-4">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-800 mb-3 border-l-4 border-yellow-500 pl-3">실시간 트렌드</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded transition-colors cursor-pointer">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-800">하이큐 최종시즌</h4>
                      <div className="flex items-center gap-1 text-xs text-orange-500">
                        <span>🔥</span>
                        <span className="font-medium">HOT</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded transition-colors cursor-pointer">
                    <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-800">체인소맨 2부</h4>
                      <div className="flex items-center gap-1 text-xs text-blue-500">
                        <span>⬆️</span>
                        <span className="font-medium">UP</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded transition-colors cursor-pointer">
                    <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-800">RG 뉴건담</h4>
                      <div className="flex items-center gap-1 text-xs text-yellow-500">
                        <span>✨</span>
                        <span className="font-medium">NEW</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded transition-colors cursor-pointer">
                    <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-800">VRChat 신월드</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded transition-colors cursor-pointer">
                    <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-bold">5</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-800">도쿄 애니 투어</h4>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 다가오는 행사 */}
            <Card className="mb-4">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-800 mb-3 border-l-4 border-yellow-500 pl-3">다가오는 행사</h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-blue-400 pl-3">
                    <h4 className="font-medium text-sm">코믹마켓 102</h4>
                    <p className="text-xs text-gray-600">2025년 8월 12-14일</p>
                    <p className="text-xs text-gray-500">도쿄 빅사이트</p>
                  </div>
                  <div className="border-l-4 border-green-400 pl-3">
                    <h4 className="font-medium text-sm">AnimeJapan 2025</h4>
                    <p className="text-xs text-gray-600">2025년 3월 23-26일</p>
                    <p className="text-xs text-gray-500">도쿄 빅사이트</p>
                  </div>
                  <div className="border-l-4 border-red-400 pl-3">
                    <h4 className="font-medium text-sm">건프라 EXPO</h4>
                    <p className="text-xs text-gray-600">2025년 7월 15-17일</p>
                    <p className="text-xs text-gray-500">오다이바</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 커뮤니티 현황 */}
            <Card>
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white p-4 rounded-t-lg">
                  <h3 className="font-semibold mb-3">커뮤니티 현황</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center">
                      <div className="text-xl font-bold">12,458</div>
                      <div className="text-xs opacity-90">총 회원</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold">1,892</div>
                      <div className="text-xs opacity-90">오늘 활동</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold">45,612</div>
                      <div className="text-xs opacity-90">총 게시글</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold">156</div>
                      <div className="text-xs opacity-90">신규 리뷰</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
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
                <li><a href="#" className="hover:text-yellow-600 transition-colors">일본여행</a></li>
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