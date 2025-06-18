import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, Eye } from "lucide-react";
import type { AnimePostWithDetails } from "@shared/schema";

export default function AdminPanel() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();

  // Redirect if not admin
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !user?.isAdmin)) {
      toast({
        title: "접근 권한이 없습니다",
        description: "관리자만 접근할 수 있는 페이지입니다.",
        variant: "destructive",
      });
      window.location.href = "/";
      return;
    }
  }, [isAuthenticated, isLoading, user, toast]);

  const { data: pendingPosts, isLoading: postsLoading } = useQuery<AnimePostWithDetails[]>({
    queryKey: ["/api/admin/pending"],
    enabled: isAuthenticated && user?.isAdmin,
  });

  const approveMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest("POST", `/api/admin/approve/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pending"] });
      toast({
        title: "승인 완료",
        description: "애니메이션이 승인되었습니다.",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "권한이 없습니다",
          description: "관리자 권한이 필요합니다.",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "오류",
        description: "승인 처리 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest("POST", `/api/admin/reject/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pending"] });
      toast({
        title: "거부 완료",
        description: "애니메이션이 거부되었습니다.",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "권한이 없습니다",
          description: "관리자 권한이 필요합니다.",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "오류",
        description: "거부 처리 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    },
  });

  if (isLoading || postsLoading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-200 rounded mb-8"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-neutral-200 rounded"></div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!isAuthenticated || !user?.isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">관리자 패널</h1>
          <p className="text-neutral-600">
            승인 대기 중인 애니메이션을 관리할 수 있습니다.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="text-yellow-500" size={24} />
                <div>
                  <p className="text-sm text-neutral-600">승인 대기</p>
                  <p className="text-2xl font-bold">{pendingPosts?.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-green-500" size={24} />
                <div>
                  <p className="text-sm text-neutral-600">승인 완료</p>
                  <p className="text-2xl font-bold">-</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <XCircle className="text-red-500" size={24} />
                <div>
                  <p className="text-sm text-neutral-600">거부됨</p>
                  <p className="text-2xl font-bold">-</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Posts */}
        <Card>
          <CardHeader>
            <CardTitle>승인 대기 중인 애니메이션</CardTitle>
          </CardHeader>
          <CardContent>
            {pendingPosts && pendingPosts.length > 0 ? (
              <div className="space-y-4">
                {pendingPosts.map((anime) => (
                  <div key={anime.id} className="border rounded-lg p-4 bg-white">
                    <div className="flex flex-col lg:flex-row gap-4">
                      {/* Image */}
                      <div className="flex-shrink-0">
                        {anime.imageUrl ? (
                          <img 
                            src={anime.imageUrl} 
                            alt={anime.title}
                            className="w-24 h-36 object-cover rounded"
                          />
                        ) : (
                          <div className="w-24 h-36 bg-gradient-to-br from-primary to-pink-500 rounded"></div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-neutral-800">{anime.title}</h3>
                            <div className="flex items-center space-x-2 text-sm text-neutral-600">
                              <span>등록자: {anime.author?.firstName || "익명"}</span>
                              {anime.year && <span>• {anime.year}</span>}
                              <span>• {anime.type}</span>
                              {anime.studio && <span>• {anime.studio}</span>}
                            </div>
                          </div>
                          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                            <Clock size={12} className="mr-1" />
                            승인 대기
                          </Badge>
                        </div>

                        <p className="text-neutral-700 text-sm mb-3 line-clamp-3">{anime.description}</p>

                        {/* Tags */}
                        {anime.tags && anime.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {anime.tags.map((tag) => (
                              <Badge key={tag.id} variant="outline" className="text-xs">
                                #{tag.name}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            onClick={() => approveMutation.mutate(anime.id)}
                            disabled={approveMutation.isPending}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle size={16} className="mr-1" />
                            승인
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => rejectMutation.mutate(anime.id)}
                            disabled={rejectMutation.isPending}
                          >
                            <XCircle size={16} className="mr-1" />
                            거부
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            asChild
                          >
                            <a href={`/anime/${anime.id}`}>
                              <Eye size={16} className="mr-1" />
                              상세 보기
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Clock className="mx-auto text-neutral-400 mb-4" size={48} />
                <p className="text-neutral-600">승인 대기 중인 애니메이션이 없습니다.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
