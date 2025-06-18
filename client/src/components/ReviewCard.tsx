import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ThumbsUp, Flag, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { ReviewWithAuthor } from "@shared/schema";

interface ReviewCardProps {
  review: ReviewWithAuthor;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [showFullContent, setShowFullContent] = useState(false);
  
  const isOwner = isAuthenticated && user?.id === review.authorId;
  const shouldTruncate = review.content.length > 300;
  const displayContent = shouldTruncate && !showFullContent 
    ? review.content.slice(0, 300) + "..."
    : review.content;

  const deleteReviewMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("DELETE", `/api/reviews/${review.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/anime", review.animePostId, "reviews"] });
      queryClient.invalidateQueries({ queryKey: ["/api/anime", review.animePostId] });
      toast({
        title: "리뷰 삭제 완료",
        description: "리뷰가 성공적으로 삭제되었습니다.",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "권한이 없습니다",
          description: "본인의 리뷰만 삭제할 수 있습니다.",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "오류",
        description: "리뷰 삭제 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    },
  });

  const handleDelete = () => {
    if (window.confirm("정말로 이 리뷰를 삭제하시겠습니까?")) {
      deleteReviewMutation.mutate();
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "";
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} size={16} className="fill-current text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" size={16} className="fill-current text-yellow-400 opacity-50" />
      );
    }

    for (let i = stars.length; i < 5; i++) {
      stars.push(
        <Star key={i} size={16} className="text-neutral-300" />
      );
    }

    return stars;
  };

  return (
    <Card className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={review.author?.profileImageUrl || ""} />
              <AvatarFallback className="bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300">
                {review.author?.firstName?.[0] || review.author?.email?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">
                  {review.author?.firstName || "익명 사용자"}
                </h4>
                {review.title && (
                  <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                    {review.title}
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center space-x-1">
                  {renderStars(parseFloat(review.rating))}
                  <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 ml-1">
                    {parseFloat(review.rating).toFixed(1)}
                  </span>
                </div>
                <span className="text-xs text-neutral-500">
                  {formatDate(review.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {isOwner && (
              <>
                <Button variant="ghost" size="sm" className="p-1 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200">
                  <Edit size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-1 text-neutral-500 hover:text-red-600 dark:text-neutral-400 dark:hover:text-red-400"
                  onClick={handleDelete}
                  disabled={deleteReviewMutation.isPending}
                >
                  <Trash2 size={16} />
                </Button>
              </>
            )}
            <Button variant="ghost" size="sm" className="p-1 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200">
              <Flag size={16} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="mb-4">
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap">
            {displayContent}
          </p>
          {shouldTruncate && (
            <Button 
              variant="link" 
              className="p-0 h-auto text-primary hover:text-primary/80 mt-2"
              onClick={() => setShowFullContent(!showFullContent)}
            >
              {showFullContent ? "접기" : "더 보기"}
            </Button>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary p-2"
            >
              <ThumbsUp size={16} className="mr-1" />
              도움됨
            </Button>
          </div>
          
          <div className="text-xs text-neutral-500">
            {review.updatedAt && review.updatedAt !== review.createdAt && (
              <span>수정됨 • {formatDate(review.updatedAt)}</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
