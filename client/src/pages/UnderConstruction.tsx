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

  const handleSecretAccess = () => {
    if (secretCode.trim() === "혼모노2025") {
      sessionStorage.setItem("admin_access", "true");
      window.location.reload();
    } else {
      alert("잘못된 코드입니다.");
      setSecretCode("");
    }
  };

  const handleLogoClick = () => {
    setShowSecretInput(!showSecretInput);
  };

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
