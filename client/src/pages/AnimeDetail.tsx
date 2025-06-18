import { useParams } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReviewCard from "@/components/ReviewCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Eye, MessageCircle, Star, Calendar, Film } from "lucide-react";
import { useState } from "react";
import type { AnimePostWithDetails, ReviewWithAuthor } from "@shared/schema";

export default function AnimeDetail() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  const { data: anime, isLoading } = useQuery<AnimePostWithDetails>({
    queryKey: ["/api/anime", id],
    enabled: !!id,
  });

  const { data: reviews } = useQuery<ReviewWithAuthor[]>({
    queryKey: ["/api/anime", id, "reviews"],
    enabled: !!id,
  });

  const favoriteMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", `/api/anime/${id}/favorite`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/anime", id] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "로그인이 필요합니다",
          description: "즐겨찾기를 추가하려면 로그인해주세요.",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "오류",
        description: "즐겨찾기 처리 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    },
  });

  const reviewMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", `/api/anime/${id}/reviews`, {
        title: reviewTitle,
        content: reviewContent,
        rating: reviewRating.toString(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/anime", id, "reviews"] });
      queryClient.invalidateQueries({ queryKey: ["/api/anime", id] });
      setShowReviewForm(false);
      setReviewTitle("");
      setReviewContent("");
      setReviewRating(5);
      toast({
        title: "리뷰 등록 완료",
        description: "리뷰가 성공적으로 등록되었습니다.",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "로그인이 필요합니다",
          description: "리뷰를 작성하려면 로그인해주세요.",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "오류",
        description: "리뷰 등록 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="w-full h-80 bg-neutral-200 rounded-2xl mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-8 bg-neutral-200 rounded mb-4"></div>
                <div className="h-4 bg-neutral-200 rounded mb-2"></div>
                <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
              </div>
              <div>
                <div className="h-64 bg-neutral-200 rounded"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-neutral-800 mb-4">애니메이션을 찾을 수 없습니다</h1>
            <Button asChild>
              <a href="/">홈으로 돌아가기</a>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const handleFavorite = () => {
    if (!isAuthenticated) {
      toast({
        title: "로그인이 필요합니다",
        description: "즐겨찾기를 추가하려면 로그인해주세요.",
        variant: "destructive",
      });
      return;
    }
    favoriteMutation.mutate();
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast({
        title: "로그인이 필요합니다",
        description: "리뷰를 작성하려면 로그인해주세요.",
        variant: "destructive",
      });
      return;
    }
    reviewMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Image */}
        <section className="relative h-80 rounded-2xl overflow-hidden mb-8">
          {anime.imageUrl ? (
            <img src={anime.imageUrl} alt={anime.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary to-pink-500"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center space-x-2 mb-2">
              <Badge className={anime.status === "approved" ? "bg-green-500" : "bg-yellow-500"}>
                {anime.status === "approved" ? "승인완료" : "승인대기"}
              </Badge>
              <Badge variant="secondary" className="bg-black/50 text-white">{anime.type}</Badge>
              {anime.year && <Badge variant="secondary" className="bg-black/50 text-white">{anime.year}</Badge>}
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{anime.title}</h1>
            <div className="flex items-center space-x-4 text-white">
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < Math.floor(anime.averageRating) ? "fill-current" : ""} 
                    />
                  ))}
                </div>
                <span className="font-medium">{anime.averageRating.toFixed(1)}</span>
                <span className="text-white/80">({anime.reviewCount})</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye size={16} />
                <span>{anime.viewCount}</span>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>작품 소개</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-700 leading-relaxed">{anime.description}</p>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>리뷰 ({reviews?.length || 0})</CardTitle>
                {isAuthenticated && (
                  <Button 
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    variant={showReviewForm ? "outline" : "default"}
                  >
                    {showReviewForm ? "취소" : "리뷰 작성"}
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Review Form */}
                {showReviewForm && (
                  <form onSubmit={handleReviewSubmit} className="space-y-4 p-4 border rounded-lg bg-neutral-50">
                    <div>
                      <Label htmlFor="reviewTitle">리뷰 제목</Label>
                      <Input
                        id="reviewTitle"
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                        placeholder="리뷰 제목을 입력하세요"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="reviewRating">평점</Label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="range"
                          id="reviewRating"
                          min="1"
                          max="5"
                          step="0.1"
                          value={reviewRating}
                          onChange={(e) => setReviewRating(parseFloat(e.target.value))}
                          className="flex-1"
                        />
                        <span className="font-medium w-8">{reviewRating}</span>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="reviewContent">리뷰 내용</Label>
                      <Textarea
                        id="reviewContent"
                        value={reviewContent}
                        onChange={(e) => setReviewContent(e.target.value)}
                        placeholder="리뷰 내용을 입력하세요"
                        rows={4}
                        required
                      />
                    </div>
                    <Button type="submit" disabled={reviewMutation.isPending}>
                      {reviewMutation.isPending ? "등록 중..." : "리뷰 등록"}
                    </Button>
                  </form>
                )}

                {/* Reviews List */}
                {reviews && reviews.length > 0 ? (
                  reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))
                ) : (
                  <p className="text-neutral-600 text-center py-8">
                    아직 리뷰가 없습니다. 첫 번째 리뷰를 작성해보세요!
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <Button 
                  onClick={handleFavorite}
                  disabled={favoriteMutation.isPending}
                  className="w-full"
                  variant={anime.isFavorited ? "default" : "outline"}
                >
                  <Heart className={`mr-2 ${anime.isFavorited ? "fill-current" : ""}`} size={16} />
                  {anime.isFavorited ? "즐겨찾기 해제" : "즐겨찾기 추가"}
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="mr-2" size={16} />
                  공유하기
                </Button>
              </CardContent>
            </Card>

            {/* Details */}
            <Card>
              <CardHeader>
                <CardTitle>작품 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {anime.year && (
                  <div className="flex items-center space-x-2">
                    <Calendar className="text-neutral-500" size={16} />
                    <span className="text-sm text-neutral-600">제작년도</span>
                    <span className="text-sm font-medium">{anime.year}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Film className="text-neutral-500" size={16} />
                  <span className="text-sm text-neutral-600">형태</span>
                  <span className="text-sm font-medium">{anime.type}</span>
                </div>
                {anime.studio && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-neutral-600">제작사</span>
                    <span className="text-sm font-medium">{anime.studio}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-neutral-600">등록자</span>
                  <span className="text-sm font-medium">{anime.author?.firstName || "익명"}</span>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            {anime.tags && anime.tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>태그</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {anime.tags.map((tag) => (
                      <Badge key={tag.id} variant="outline" style={{ color: tag.color }}>
                        #{tag.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
