import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye, MessageCircle, Star, Search, Home } from "lucide-react";
import { useState } from "react";

export default function Landing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showKeywords, setShowKeywords] = useState(false);

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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
                    onFocus={() => setShowKeywords(true)}
                    onBlur={() => setTimeout(() => setShowKeywords(false), 200)}
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
              
              {/* Search Keywords */}
              {showKeywords && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-50">
                  <div className="flex flex-wrap gap-2">
                    {['하이큐', '체인소맨', '원피스', '귀멸의칼날', '소드아트온라인', '블루락', '애니음악', '성우정보'].map((keyword) => (
                      <button
                        key={keyword}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                        onClick={() => setSearchQuery(keyword)}
                      >
                        {keyword}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full px-5"
                onClick={handleLogin}
              >
                로그인
              </Button>
              <Button 
                className="bg-gray-800 text-white hover:bg-gray-700 rounded-full px-5 relative overflow-hidden"
                onClick={handleLogin}
              >
                신규 등록
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <div className="border-t border-gray-200">
            <nav className="flex">
              <a href="/" className="px-5 py-4 text-gray-700 hover:text-gray-900 font-medium border-b-2 border-transparent hover:border-gray-600 transition-colors">
                홈
              </a>
              <a href="#" className="px-5 py-4 text-gray-700 hover:text-gray-900 font-medium border-b-2 border-gray-600 transition-colors">
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

      {/* Hero Banner with Search */}
      <div className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 text-white py-8 mb-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-2 animate-pulse">서브컬처 애호가들의 진정성 있는 공간</h1>
          <p className="text-lg mb-6">애니메이션, 건담, VR, 일본여행까지 - 모든 덕후 문화가 여기에</p>
          
          {/* Main Search */}
          <div className="max-w-2xl mx-auto relative">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="작품명, 캐릭터명, 성우명으로 검색하세요" 
                  className="w-full pl-4 pr-12 py-4 rounded-full border-0 text-gray-800 bg-white shadow-lg text-lg"
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700 transition-all hover:rotate-90"
                >
                  <Search size={18} />
                </button>
              </div>
            </form>
            
            {/* Popular Keywords */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {['하이큐', '체인소맨', '원피스', '귀멸의칼날', '소드아트온라인', '블루락', '애니음악', '성우정보'].map((keyword) => (
                <button
                  key={keyword}
                  className="px-4 py-2 bg-white/20 text-white rounded-full text-sm hover:bg-white/30 transition-colors backdrop-blur-sm"
                  onClick={() => setSearchQuery(keyword)}
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Category Banner */}
        <div className="bg-gray-50 py-6 mb-6 rounded-lg">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">애니메이션</h1>
            <p className="text-gray-600">분기별 애니메이션 리뷰, 캐릭터 인기 투표, 음악/OST/성우 정보까지</p>
          </div>
        </div>

        {/* Sub Menu */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <a href="#" className="py-3 px-1 border-b-2 border-gray-600 text-gray-800 font-medium">전체글</a>
            <a href="#" className="py-3 px-1 border-b-2 border-transparent text-gray-600 hover:text-gray-800 transition-colors">작품리뷰</a>
            <a href="#" className="py-3 px-1 border-b-2 border-transparent text-gray-600 hover:text-gray-800 transition-colors">게시판</a>
            <a href="#" className="py-3 px-1 border-b-2 border-transparent text-gray-600 hover:text-gray-800 transition-colors">캐릭터</a>
            <a href="#" className="py-3 px-1 border-b-2 border-transparent text-gray-600 hover:text-gray-800 transition-colors">음악/OST</a>
            <a href="#" className="py-3 px-1 border-b-2 border-transparent text-gray-600 hover:text-gray-800 transition-colors">성우</a>
            <a href="#" className="py-3 px-1 border-b-2 border-transparent text-gray-600 hover:text-gray-800 transition-colors">제작사</a>
            <a href="#" className="py-3 px-1 border-b-2 border-transparent text-pink-500 hover:text-pink-600 transition-colors">세부검색</a>
          </nav>
        </div>

        {/* Currently Airing Section */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 border-l-4 border-gray-600 pl-3">현재 방영중인 애니메이션</h2>
            <a href="#" className="text-gray-600 hover:text-gray-800 text-sm transition-colors">더보기</a>
          </div>
          
          {/* Weekday Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button className="px-4 py-2 bg-gray-800 text-white rounded-full text-sm">전체</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors">월요일</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors">화요일</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors">수요일</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors">목요일</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors">금요일</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors">토요일</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors">일요일</button>
          </div>

          {/* Anime Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { title: "마법소녀 카피캣", day: "월", isNew: true },
              { title: "빌런 입학하기", day: "화", isNew: false },
              { title: "소드 아트 온라인: 유니탈 링", day: "수", isNew: true },
              { title: "도쿄 리벤저스: 결말편", day: "수", isNew: false },
              { title: "블루 록 2기", day: "목", isNew: false },
              { title: "하이큐!! 최종시즌", day: "금", isNew: true },
              { title: "체인소 맨 2부", day: "토", isNew: false },
              { title: "귀멸의 칼날: 무한성", day: "토", isNew: false },
              { title: "원피스 리마스터", day: "일", isNew: false },
              { title: "나의 히어로 아카데미아 외전", day: "월", isNew: false },
              { title: "내 눈에만 보이는 헌터길드", day: "화", isNew: true },
              { title: "불꽃 소방대", day: "수", isNew: false },
            ].map((anime, index) => (
              <Card key={index} className="group cursor-pointer hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                {anime.isNew && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">신</div>
                )}
                <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full z-10">{anime.day}</div>
                <div className="aspect-[3/4] bg-gray-200 bg-cover bg-center" style={{
                  backgroundImage: `url('https://via.placeholder.com/300x400/4A5568/FFFFFF?text=${encodeURIComponent(anime.title)}')`
                }}></div>
                <CardContent className="p-2">
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2">{anime.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Popular Reviews */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 border-l-4 border-gray-600 pl-3">인기 애니메이션 리뷰</h2>
              <a href="#" className="text-gray-600 hover:text-gray-800 text-sm transition-colors">더보기</a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                "하이큐!! 최종시즌 1화 - 결전의 서막",
                "체인소 맨 2부 - 전작과 비교 분석", 
                "소드 아트 온라인: 유니탈 링 세계관"
              ].map((title, index) => (
                <Card key={index} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                  <div className="aspect-[3/4] bg-gray-200 bg-cover bg-center" style={{
                    backgroundImage: `url('https://via.placeholder.com/300x400/4A5568/FFFFFF?text=${encodeURIComponent(title.split(' ')[0])}')`
                  }}></div>
                  <CardContent className="p-3">
                    <h3 className="text-sm font-medium text-gray-800 line-clamp-2">{title}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Anime OST */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 border-l-4 border-gray-600 pl-3">애니메이션 OST 소개</h2>
              <a href="#" className="text-gray-600 hover:text-gray-800 text-sm transition-colors">더보기</a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "2025년 2분기 애니 OP/ED 모음",
                "하이큐!! 시리즈 전체 명곡 정리"
              ].map((title, index) => (
                <Card key={index} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                  <div className="aspect-[3/4] bg-gray-200 bg-cover bg-center" style={{
                    backgroundImage: `url('https://via.placeholder.com/300x400/4A5568/FFFFFF?text=${encodeURIComponent(title.split(' ')[0])}')`
                  }}></div>
                  <CardContent className="p-3">
                    <h3 className="text-sm font-medium text-gray-800 line-clamp-2">{title}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Rankings Section */}
        <section className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 border-l-4 border-gray-600 pl-3">역대 애니메이션 순위</h2>
            <a href="#" className="text-gray-600 hover:text-gray-800 text-sm transition-colors">더보기</a>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">HONMONO 회원 투표 기준 (최근 6개월)</h3>
            <div className="space-y-4">
              {[
                { rank: 1, title: "진격의 거인: 파이널 시즌", studio: "MAPPA", year: "2024년", genre: "액션/판타지", score: "9.8" },
                { rank: 2, title: "하이큐!!: 최종시즌", studio: "Production I.G", year: "2025년", genre: "스포츠", score: "9.7" },
                { rank: 3, title: "귀멸의 칼날: 무한성", studio: "ufotable", year: "2025년", genre: "액션/판타지", score: "9.6" },
                { rank: 4, title: "체인소 맨 2부", studio: "MAPPA", year: "2025년", genre: "액션/공포", score: "9.5" },
                { rank: 5, title: "블루 록 2기", studio: "8bit", year: "2024년", genre: "스포츠", score: "9.4" }
              ].map((anime) => (
                <div key={anime.rank} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      anime.rank <= 3 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 'bg-gray-400'
                    }`}>
                      {anime.rank}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{anime.title}</h4>
                      <p className="text-sm text-gray-600">{anime.studio} · {anime.year} · {anime.genre}</p>
                    </div>
                  </div>
                  <div className="text-xl font-bold text-gray-800">{anime.score}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-12">
          <Button onClick={handleLogin} size="lg" className="bg-gray-800 hover:bg-gray-700 text-white">
            로그인하여 더 많은 콘텐츠 보기
          </Button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12 mt-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center">
                  <Home className="text-white text-sm" size={16} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">HONMONO</h3>
                  <p className="text-xs text-gray-400">Honest Monologue</p>
                </div>
              </div>
              <p className="text-sm text-gray-400">
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
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 HONMONO (Honest Monologue). All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}