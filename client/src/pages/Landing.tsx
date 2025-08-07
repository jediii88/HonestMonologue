import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Crown, Star, Users, BookOpen, Heart, Sparkles } from "lucide-react";

export default function Landing() {
  const { isAuthenticated, loginMutation, registerMutation } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nickname: "",
  });

  if (isAuthenticated) {
    window.location.href = "/";
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      loginMutation.mutate({
        email: formData.email,
        password: formData.password,
      });
    } else {
      registerMutation.mutate({
        email: formData.email,
        password: formData.password,
        nickname: formData.nickname,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* 왼쪽: 로그인/회원가입 폼 */}
        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl flex items-center justify-center">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                혼모노
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                진정한 애니메이션 커뮤니티
              </p>
            </div>

            <Card className="rounded-3xl border-0 shadow-xl bg-white/90 dark:bg-gray-800/90">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">
                  {isLogin ? "로그인" : "회원가입"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="이메일"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="rounded-xl"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="password"
                      placeholder="비밀번호"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="rounded-xl"
                      required
                    />
                  </div>
                  {!isLogin && (
                    <div>
                      <Input
                        type="text"
                        placeholder="닉네임"
                        value={formData.nickname}
                        onChange={(e) =>
                          setFormData({ ...formData, nickname: e.target.value })
                        }
                        className="rounded-xl"
                      />
                    </div>
                  )}
                  <Button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    disabled={loginMutation.isPending || registerMutation.isPending}
                  >
                    {isLogin ? "로그인" : "회원가입"}
                  </Button>
                </form>

                <div className="mt-4 text-center">
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400"
                  >
                    {isLogin
                      ? "계정이 없으신가요? 회원가입"
                      : "이미 계정이 있으신가요? 로그인"}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 오른쪽: 소개 섹션 */}
        <div className="flex items-center justify-center p-8 bg-gradient-to-br from-purple-600 to-blue-600">
          <div className="text-center text-white space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold">
                애니메이션 팬들의 성지
              </h2>
              <p className="text-xl opacity-90">
                진정한 애니메이션 애호가들을 위한 종합 커뮤니티
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-12">
              <div className="bg-white/10 rounded-3xl p-6 backdrop-blur">
                <Star className="w-8 h-8 mb-3 mx-auto" />
                <h3 className="font-semibold mb-2">이중 평가 시스템</h3>
                <p className="text-sm opacity-75">
                  작품성과 팬덤 지표를 구분한 정확한 평가
                </p>
              </div>
              <div className="bg-white/10 rounded-3xl p-6 backdrop-blur">
                <Users className="w-8 h-8 mb-3 mx-auto" />
                <h3 className="font-semibold mb-2">활발한 커뮤니티</h3>
                <p className="text-sm opacity-75">
                  포럼과 이미지 게시판으로 소통
                </p>
              </div>
              <div className="bg-white/10 rounded-3xl p-6 backdrop-blur">
                <BookOpen className="w-8 h-8 mb-3 mx-auto" />
                <h3 className="font-semibold mb-2">종합 데이터베이스</h3>
                <p className="text-sm opacity-75">
                  애니메이션 정보와 리뷰 통합 관리
                </p>
              </div>
              <div className="bg-white/10 rounded-3xl p-6 backdrop-blur">
                <Heart className="w-8 h-8 mb-3 mx-auto" />
                <h3 className="font-semibold mb-2">칭호 시스템</h3>
                <p className="text-sm opacity-75">
                  활동에 따른 15단계 칭호 획득
                </p>
              </div>
            </div>

            <div className="bg-white/10 rounded-3xl p-6 backdrop-blur">
              <Sparkles className="w-6 h-6 mb-2 mx-auto" />
              <p className="text-sm">
                2025년 8월 정식 오픈 예정
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
