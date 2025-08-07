import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Crown, Hammer, Heart, Star, Sparkles } from "lucide-react";

export default function UnderConstruction() {
  const [, setLocation] = useLocation();
  const [secretCode, setSecretCode] = useState("");
  const [showSecretInput, setShowSecretInput] = useState(false);
  const [showAdminView, setShowAdminView] = useState(false);

const handleSecretAccess = () => {
  if (secretCode.trim() === "혼모노2025") {
    sessionStorage.setItem("admin_access", "true");
    // 페이지 새로고침하여 완전한 사이트 로드
    window.location.reload();
  } else {
    alert("잘못된 코드입니다.");
    setSecretCode("");
  }
};

  const handleLogoClick = () => {
    setShowSecretInput(!showSecretInput);
  };

  // 관리자 뷰
  if (showAdminView) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  혼모노 관리자 페이지
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  환영합니다, 관리자님
                </p>
              </div>
              <Button 
                onClick={() => {
                  sessionStorage.removeItem("admin_access");
                  setShowAdminView(false);
                }}
                className="rounded-xl"
              >
                로그아웃
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="rounded-3xl border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600">
                <CardContent className="p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">개발 현황</h3>
                  <p className="opacity-90">전체 사이트 90% 완성</p>
                  <p className="opacity-90 mt-2">2025년 8월 정식 오픈 예정</p>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600">
                <CardContent className="p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">주요 기능</h3>
                  <ul className="space-y-1 opacity-90">
                    <li>• 애니메이션 데이터베이스</li>
                    <li>• 커뮤니티 포럼</li>
                    <li>• 칭호 시스템</li>
                    <li>• 이중 평가 시스템</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600">
                <CardContent className="p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">데이터베이스</h3>
                  <p className="opacity-90">27개 테이블 구축 완료</p>
                  <p className="opacity-90 mt-2">PostgreSQL + Drizzle ORM</p>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600">
                <CardContent className="p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">기술 스택</h3>
                  <p className="opacity-90">React + TypeScript</p>
                  <p className="opacity-90">Express + Node.js</p>
                  <p className="opacity-90 mt-2">Tailwind CSS</p>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-0 shadow-lg bg-gradient-to-br from-pink-500 to-pink-600">
                <CardContent className="p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">도메인</h3>
                  <p className="opacity-90">honmono.co.kr</p>
                  <p className="opacity-90 mt-2">준비 완료</p>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-0 shadow-lg bg-gradient-to-br from-indigo-500 to-indigo-600">
                <CardContent className="p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">문의</h3>
                  <p className="opacity-90">admin@honmono.co.kr</p>
                  <p className="opacity-90 mt-2">개발팀 연락처</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-700 rounded-3xl">
              <h3 className="text-lg font-semibold mb-3">개발 노트</h3>
              <p className="text-gray-700 dark:text-gray-300">
                혼모노는 진정한 애니메이션 애호가들을 위한 종합 커뮤니티 플랫폼입니다.
                현재 핵심 기능 개발이 완료되었으며, 사용자 테스트 및 최적화 작업을 진행 중입니다.
                GitHub Pages를 통한 프리뷰 배포가 완료되었으며, 정식 서비스는 2025년 8월에 시작됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div 
          className="cursor-pointer transition-transform hover:scale-105"
          onClick={handleLogoClick}
        >
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl flex items-center justify-center">
            <Crown className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            혼모노
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
            HONMONO
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            진정한 애니메이션 커뮤니티
          </p>
        </div>

        <Card className="rounded-3xl backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center justify-center mb-4">
              <Hammer className="w-8 h-8 text-orange-500 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                사이트 준비중
              </h2>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              혼모노가 더욱 완벽한 모습으로 여러분을 맞이하기 위해 준비하고 있습니다.
            </p>
            
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl p-4">
              <div className="flex items-center justify-center mb-2">
                <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-purple-800 dark:text-purple-200 font-medium">
                  오픈 예정: 2025년 8월 중
                </span>
              </div>
              <p className="text-sm text-purple-600 dark:text-purple-300">
                진정한 애니메이션 애호가들의 성지가 될 혼모노를 기대해주세요!
              </p>
            </div>
          </CardContent>
        </Card>

        {showSecretInput && (
          <Card className="rounded-3xl bg-gray-900/90 backdrop-blur-sm border border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-white font-medium mb-4 text-center">관리자 접속</h3>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="비밀 코드 입력"
                  value={secretCode}
                  onChange={(e) => setSecretCode(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSecretAccess()}
                  className="rounded-xl bg-gray-800 border-gray-600 text-white"
                />
                <Button 
                  onClick={handleSecretAccess}
                  className="rounded-xl bg-purple-600 hover:bg-purple-700"
                >
                  입장
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <p className="text-sm text-gray-400 dark:text-gray-500">
          © 2025 HONMONO. All rights reserved.
        </p>
      </div>
    </div>
  );
}
