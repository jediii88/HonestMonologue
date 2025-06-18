import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FilterSection from "@/components/FilterSection";
import AnimeCard from "@/components/AnimeCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { useState } from "react";
import type { AnimePostWithDetails } from "@shared/schema";

export default function Home() {
  const { user } = useAuth();
  const [currentFilter, setCurrentFilter] = useState("approved");
  const [sortBy, setSortBy] = useState("newest");

  const { data: animePosts, isLoading } = useQuery<AnimePostWithDetails[]>({
    queryKey: ["/api/anime", { status: currentFilter }],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="w-full h-64 bg-neutral-200"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-neutral-200 rounded mb-2"></div>
                  <div className="h-3 bg-neutral-200 rounded w-2/3 mb-3"></div>
                  <div className="flex gap-1 mb-3">
                    <div className="h-5 bg-neutral-200 rounded w-12"></div>
                    <div className="h-5 bg-neutral-200 rounded w-12"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-neutral-200 rounded w-16"></div>
                    <div className="h-3 bg-neutral-200 rounded w-12"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroSection />

        {/* Event Banner */}
        <section className="mb-8">
          <Card className="event-gradient border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Star className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800">2024 겨울 애니메이션 평가 이벤트</h3>
                    <p className="text-neutral-600">올해의 최고 애니메이션을 선정해보세요! 참여자 전원 특별 뱃지 지급</p>
                  </div>
                </div>
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                  참여하기
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <FilterSection 
          currentFilter={currentFilter}
          onFilterChange={setCurrentFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Content Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {animePosts && animePosts.length > 0 ? (
            animePosts.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-neutral-600 mb-4">아직 게시된 애니메이션이 없습니다.</p>
              <Button asChild>
                <a href="/create">첫 번째 애니메이션 등록하기</a>
              </Button>
            </div>
          )}
        </section>

        {/* Load More */}
        {animePosts && animePosts.length > 0 && (
          <section className="text-center py-12">
            <Button className="bg-primary hover:bg-primary/90">
              더 많은 애니메이션 보기
            </Button>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
