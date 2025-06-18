import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Eye, MessageCircle, Star } from "lucide-react";
import type { AnimePostWithDetails } from "@shared/schema";

interface AnimeCardProps {
  anime: AnimePostWithDetails;
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const favoriteMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", `/api/anime/${anime.id}/favorite`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/anime"] });
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

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
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

  const getStatusBadge = () => {
    switch (anime.status) {
      case "approved":
        return <Badge className="bg-green-500 text-white">승인완료</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500 text-white">승인대기</Badge>;
      case "rejected":
        return <Badge className="bg-red-500 text-white">거부됨</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="anime-card overflow-hidden cursor-pointer" onClick={() => window.location.href = `/anime/${anime.id}`}>
      <div className="relative">
        {anime.imageUrl ? (
          <img 
            src={anime.imageUrl} 
            alt={anime.title}
            className="w-full h-64 object-cover"
          />
        ) : (
          <div className="w-full h-64 bg-gradient-to-br from-primary to-pink-500"></div>
        )}
        
        <div className="absolute top-3 left-3">
          {getStatusBadge()}
        </div>
        
        <div className="absolute top-3 right-3 flex space-x-1">
          <Badge variant="secondary" className="bg-black/50 text-white">{anime.type}</Badge>
          {anime.year && <Badge variant="secondary" className="bg-black/50 text-white">{anime.year}</Badge>}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex items-center space-x-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={14} 
                  className={i < Math.floor(anime.averageRating) ? "fill-current" : ""} 
                />
              ))}
            </div>
            <span className="text-white text-sm font-medium">{anime.averageRating.toFixed(1)}</span>
            <span className="text-white/80 text-xs">({anime.reviewCount})</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-neutral-800 text-lg group-hover:text-primary transition-colors">
            {anime.title}
          </h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1"
            onClick={handleFavorite}
            disabled={favoriteMutation.isPending}
          >
            <Heart 
              className={`${anime.isFavorited ? "fill-current text-red-500" : "text-neutral-400 hover:text-red-500"} transition-colors`} 
              size={16} 
            />
          </Button>
        </div>
        
        <p className="text-neutral-600 text-sm mb-3 line-clamp-2">
          {anime.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {anime.tags?.slice(0, 3).map((tag) => (
            <Badge key={tag.id} variant="outline" style={{ color: tag.color }}>
              #{tag.name}
            </Badge>
          ))}
          {anime.tags && anime.tags.length > 3 && (
            <Badge variant="outline" className="text-neutral-500">
              +{anime.tags.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={anime.author?.profileImageUrl || ""} />
              <AvatarFallback className="text-xs">
                {anime.author?.firstName?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
            <span className="text-neutral-600 text-sm">
              {anime.author?.firstName || "익명"}
            </span>
          </div>
          <div className="flex items-center space-x-3 text-neutral-500 text-sm">
            <span className="flex items-center space-x-1">
              <MessageCircle size={14} />
              <span>{anime.reviewCount}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Eye size={14} />
              <span>{anime.viewCount}</span>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
