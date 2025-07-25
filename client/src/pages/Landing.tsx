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
import { useState, useEffect } from "react";
import HonmonoLogo from "@assets/Honmono_Logo_1750227308214.png";
import HonmonoTextLogo from "@assets/Honmono_Text_Logo_1750227308215.png";
import testImage from "@assets/image_1750233446528.png";

export default function Landing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDay, setActiveDay] = useState("전체");
  const [displayText, setDisplayText] = useState("Honest Monologue");
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationStyle, setAnimationStyle] = useState(3);

  const getAnimationClass = () => {
    return '';
  };

  const getAnimationStyle = () => {
    return 'none';
  };

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

  // 다양한 타이핑 애니메이션 스타일
  useEffect(() => {
    const startText = "Honmono";
    const endText = "Honest Monologue";
    
    const animateStyle1 = () => {
      // 기본 지우고 쓰기 스타일
      setIsAnimating(true);
      
      for (let i = startText.length; i >= 0; i--) {
        setTimeout(() => {
          setDisplayText(startText.substring(0, i));
        }, (startText.length - i) * 100);
      }
      
      for (let i = 0; i <= endText.length; i++) {
        setTimeout(() => {
          setDisplayText(endText.substring(0, i));
          if (i === endText.length) {
            setTimeout(() => {
              setIsAnimating(false);
              setTimeout(() => {
                animateStyle3();
              }, 3000);
            }, 2000);
          }
        }, startText.length * 100 + 300 + i * 100);
      }
    };

    const animateStyle2 = () => {
      // 글자별 페이드 스타일
      setIsAnimating(true);
      const chars = startText.split('');
      
      // 글자들을 하나씩 페이드 아웃
      chars.forEach((_, index) => {
        setTimeout(() => {
          const newText = chars.map((char, i) => i <= index ? '' : char).join('');
          setDisplayText(newText);
        }, index * 150);
      });
      
      // 새 글자들 타이핑
      setTimeout(() => {
        for (let i = 0; i <= endText.length; i++) {
          setTimeout(() => {
            setDisplayText(endText.substring(0, i));
            if (i === endText.length) {
              setTimeout(() => {
                setIsAnimating(false);
                setTimeout(() => {
                  animateStyle3();
                }, 3000);
              }, 2000);
            }
          }, i * 120);
        }
      }, chars.length * 150 + 500);
    };

    const animateStyle3 = () => {
      // 부드러운 변환 스타일
      setIsAnimating(true);
      setDisplayText(startText);
      
      // 간단하고 우아한 변환
      setTimeout(() => {
        // 한 글자씩 페이드 아웃
        let fadeIndex = startText.length;
        const fadeOut = setInterval(() => {
          if (fadeIndex > 0) {
            setDisplayText(startText.substring(0, fadeIndex - 1));
            fadeIndex--;
          } else {
            clearInterval(fadeOut);
            
            // 새 텍스트 페이드 인
            setTimeout(() => {
              let typeIndex = 0;
              const typeIn = setInterval(() => {
                if (typeIndex <= endText.length) {
                  setDisplayText(endText.substring(0, typeIndex));
                  typeIndex++;
                } else {
                  clearInterval(typeIn);
                  setTimeout(() => {
                    setIsAnimating(false);
                    setTimeout(() => {
                      animateStyle3();
                    }, 3000);
                  }, 2000);
                }
              }, 100);
            }, 300);
          }
        }, 120);
      }, 500);
    };

    const animateStyle4 = () => {
      // 타이핑 머신 스타일
      setIsAnimating(true);
      setDisplayText('');
      
      // 먼저 지우기
      let deleteIndex = startText.length;
      const deleteInterval = setInterval(() => {
        if (deleteIndex > 0) {
          setDisplayText(startText.substring(0, deleteIndex));
          deleteIndex--;
        } else {
          clearInterval(deleteInterval);
          
          // 새로운 텍스트 타이핑
          let typeIndex = 0;
          const typeInterval = setInterval(() => {
            if (typeIndex <= endText.length) {
              setDisplayText(endText.substring(0, typeIndex));
              typeIndex++;
            } else {
              clearInterval(typeInterval);
              setTimeout(() => {
                setIsAnimating(false);
                setTimeout(() => {
                  animateStyle4();
                }, 3000);
              }, 2000);
            }
          }, 100);
        }
      }, 80);
    };

    const animateStyle5 = () => {
      // 3D 모프 변환 스타일
      setIsAnimating(true);
      setDisplayText(startText);
      
      setTimeout(() => {
        setDisplayText(endText);
        setTimeout(() => {
          setIsAnimating(false);
          setTimeout(() => {
            animateStyle5();
          }, 3000);
        }, 2000);
      }, 1000);
    };

    const animationFunctions = [animateStyle1, animateStyle2, animateStyle3, animateStyle4, animateStyle5];
    const timer = setTimeout(() => {
      animationFunctions[animationStyle - 1]();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [animationStyle]);

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
              <button 
                className="login-btn-final"
                onClick={handleLogin}
              >
                로그인
              </button>
              <button 
                className="signup-btn-final"
                onClick={handleLogin}
              >
                신규 등록
              </button>
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

      {/* Hero Banner - 멋진 애니메이션 효과 */}
      <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-500 text-white py-16 relative overflow-hidden">
        {/* 배경 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
        
        {/* 별같은 파티클 효과 */}
        <div className="absolute inset-0 opacity-30">
          {/* 큰 별들 */}
          {[...Array(5)].map((_, i) => (
            <div
              key={`star-large-${i}`}
              className="absolute star-large"
              style={{
                left: `${20 + (i * 18)}%`,
                top: `${25 + (i % 3) * 25}%`,
                animation: `starTwinkle ${4 + i}s ease-in-out infinite`,
                animationDelay: `${i * 1.5}s`
              }}
            />
          ))}
          
          {/* 중간 별들 */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`star-medium-${i}`}
              className="absolute star-medium"
              style={{
                left: `${15 + (i * 12)}%`,
                top: `${20 + (i % 4) * 20}%`,
                animation: `starFloat ${3 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.8}s`
              }}
            />
          ))}
          
          {/* 작은 별들 */}
          {[...Array(12)].map((_, i) => (
            <div
              key={`star-small-${i}`}
              className="absolute star-small"
              style={{
                left: `${10 + (i * 8)}%`,
                top: `${15 + (i % 5) * 15}%`,
                animation: `starSparkle ${2 + i * 0.3}s ease-in-out infinite`,
                animationDelay: `${i * 0.4}s`
              }}
            />
          ))}
          
          {/* 반짝이는 점들 */}
          {[...Array(15)].map((_, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute w-0.5 h-0.5 bg-white"
              style={{
                left: `${5 + (i * 6.5)}%`,
                top: `${10 + (i % 7) * 12}%`,
                animation: `sparkle ${1.5 + i * 0.2}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
                borderRadius: '50%',
                boxShadow: '0 0 3px rgba(255,255,255,0.8)'
              }}
            />
          ))}
        </div>
        
        {/* 떠다니는 도형들 - 멋진 애니메이션 */}
        <div className="absolute inset-0 opacity-20">
          {/* 큰 회전하는 원 */}
          <div className="absolute w-40 h-40 rounded-full border-2 border-white/30 -top-20 -left-20" style={{animation: 'slowSpin 40s linear infinite'}}></div>
          <div className="absolute w-32 h-32 rounded-full border border-white/40 -top-16 -left-16" style={{animation: 'slowSpin 35s linear infinite reverse'}}></div>
          
          {/* 오른쪽 상단 도형들 */}
          <div className="absolute w-28 h-28 rounded-full border-2 border-white/25 top-10 -right-14" style={{animation: 'floatRotate 30s ease-in-out infinite'}}></div>
          <div className="absolute w-20 h-20 border border-white/35 transform rotate-45 top-20 right-10" style={{animation: 'slowFloat 25s ease-in-out infinite', animationDelay: '3s'}}></div>
          
          {/* 하단 도형들 */}
          <div className="absolute w-24 h-24 rounded-full border border-white/30 bottom-20 left-1/3" style={{animation: 'bounceFloat 28s ease-in-out infinite', animationDelay: '5s'}}></div>
          <div className="absolute w-16 h-16 border-2 border-white/40 transform rotate-12 bottom-32 right-1/4" style={{animation: 'floatRotate 22s ease-in-out infinite', animationDelay: '7s'}}></div>
          
          {/* 중간 영역 도형들 */}
          <div className="absolute w-12 h-12 rounded-full border border-white/45 top-1/3 left-1/5" style={{animation: 'slowFloat 18s ease-in-out infinite', animationDelay: '2s'}}></div>
          <div className="absolute w-18 h-18 border border-white/35 transform rotate-45 top-2/3 right-1/3" style={{animation: 'pulseFloat 20s ease-in-out infinite', animationDelay: '4s'}}></div>
          
          {/* 작은 떠다니는 원들 */}
          <div className="absolute w-8 h-8 rounded-full border border-white/50 top-1/4 right-1/5" style={{animation: 'fastFloat 15s ease-in-out infinite', animationDelay: '1s'}}></div>
          <div className="absolute w-6 h-6 rounded-full border border-white/60 bottom-1/3 left-1/2" style={{animation: 'fastFloat 12s ease-in-out infinite', animationDelay: '6s'}}></div>
        </div>
        
        {/* 추가 시각 효과 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-60 h-60 rounded-full bg-gradient-to-r from-white/20 to-transparent top-0 left-0" style={{animation: 'slowFloat 45s ease-in-out infinite'}}></div>
          <div className="absolute w-80 h-80 rounded-full bg-gradient-to-l from-white/15 to-transparent bottom-0 right-0" style={{animation: 'slowFloat 50s ease-in-out infinite', animationDelay: '10s'}}></div>
        </div>
        
        {/* 부드러운 웨이브 */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg className="w-[120%] h-16 -ml-[10%]" viewBox="0 0 1400 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
              </linearGradient>
            </defs>
            <path d="M0,60 Q350,120 700,60 T1400,60 L1400,120 L0,120 Z" fill="url(#wave-gradient)">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="-100 0;100 0;-100 0"
                dur="15s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl font-bold mb-3">
            순수한 열정이 모이는 곳
          </h1>
          <div className="mb-6 h-8 flex items-center justify-center">
            <span className="text-2xl font-medium text-white/90 italic">
              {displayText}
            </span>
          </div>
          

          
          {/* Search Bar in Hero */}
          <div className="max-w-lg mx-auto mb-6">
            <div className="relative">
              <Input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="작품명, 캐릭터명, 성우 등으로 검색" 
                className="w-full pl-4 pr-12 py-3 bg-white/90 backdrop-blur-sm border-white/50 rounded-full text-gray-700 placeholder-gray-500 focus:bg-white focus:border-white text-lg shadow-lg transition-all duration-300 focus:shadow-2xl focus:scale-105"
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-yellow-500 hover:bg-yellow-600 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-12 active:scale-95"
              >
                <Search size={20} className="text-white" />
              </button>
            </div>
          </div>
          
          {/* Popular Keywords */}
          <div className="flex flex-wrap justify-center gap-3">
            {['하이큐', '체인소맨', '원피스', '귀멸의칼날', '건담'].map((keyword, index) => (
              <button
                key={keyword}
                className="px-4 py-2 bg-white/20 text-white rounded-full text-sm hover:bg-white/30 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-110 hover:-translate-y-1 active:scale-95 transform hover:shadow-lg"
                onClick={() => setSearchQuery(keyword)}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
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
            <Plus size={20} className="text-yellow-500 hover:text-yellow-600 cursor-pointer transition-all duration-300 transform hover:scale-125 hover:rotate-90 active:scale-110" />
          </div>
          
          {/* Weekday Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {weekdays.map((day) => (
              <button 
                key={day}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 hover:-translate-y-1 ${
                  activeDay === day 
                    ? 'bg-yellow-500 text-white font-medium shadow-lg shadow-yellow-500/30 scale-105' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-md'
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
              <div key={index} className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 active:scale-95">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-2 shadow-lg group-hover:shadow-2xl transition-all duration-500 relative ring-0 group-hover:ring-4 group-hover:ring-yellow-500/30">
                  {index === 0 ? (
                    <img src={testImage} alt="테스트 이미지" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full bg-gray-300 transition-all duration-500 group-hover:bg-gray-200"></div>
                  )}
                  
                  {/* 그라데이션 오버레이 - 위아래만 어둡게 (임시 숨김) */}
                  {/* <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/60 to-transparent"></div> */}
                  
                  {/* 요일 태그 */}
                  <div className="absolute top-3 left-4 z-10 transform transition-all duration-300 group-hover:scale-110">
                    <span className="text-white text-xs font-bold drop-shadow-lg group-hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">{anime.day}</span>
                  </div>
                  
                  {/* NEW 태그 */}
                  {anime.isNew && (
                    <div className="absolute top-2 right-2 z-10 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                      <span className="text-white text-xs font-bold px-2 py-1 rounded-full bg-red-500 shadow-lg">NEW</span>
                    </div>
                  )}
                  
                  {/* 제목 */}
                  <div className="absolute bottom-2 left-2 right-2 z-10 transform transition-all duration-300 group-hover:scale-105">
                    <h3 className="text-white text-xs font-bold text-center drop-shadow-lg group-hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">{anime.title}</h3>
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