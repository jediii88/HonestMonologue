import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimeCard from "@/components/AnimeCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { AnimePostWithDetails } from "@shared/schema";

// --- 이 페이지에서만 사용할 요일별 필터 컴포넌트 ---
const WeekdayFilter = ({ activeDay, onDayChange }: { activeDay: string, onDayChange: (day: string) => void }) => {
  const weekdays = ["전체", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];
  
  return (
    <div className="flex flex-wrap gap-2 mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
      {weekdays.map((day) => (
        <button 
          key={day}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
            activeDay === day 
              ? 'bg-gray-800 text-white shadow-md' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => onDayChange(day)}
        >
          {day}
        </button>
      ))}
    </div>
  );
};

// --- 메인 Home 컴포넌트 ---
export default function Home() {
  const { user } = useAuth();
  const [activeDay, setActiveDay] = useState("전체"); 

  // 지금은 API가 아닌, 임시 '가짜 데이터'를 사용합니다.
  const { data: animePosts, isLoading } = useQuery<AnimePostWithDetails[]>({
    queryKey: ["fakeAnimeData", activeDay], // activeDay가 바뀔 때마다 쿼리가 재실행되는 것처럼 흉내
    queryFn: async () => {
      // 여기에 나중에 실제 API 요청이 들어갑니다.
      // 지금은 프로토타입처럼 보이도록 가짜 데이터를 만듭니다.
      const fakeData = [
        { id: 1, title: '하이큐!! 최종시즌', imageUrl: 'https://via.placeholder.com/400x533', day: '금요일', author: { firstName: 'Admin' }, averageRating: 0, reviewCount: 0, viewCount: 0, isFavorited: false, type: 'TV', tags: [] },
        { id: 2, title: '소드 아트 온라인: 유니탈 링', imageUrl: 'https://via.placeholder.com/400x533', day: '수요일', author: { firstName: 'Admin' }, averageRating: 0, reviewCount: 0, viewCount: 0, isFavorited: false, type: 'TV', tags: [] },
        { id: 3, title: '체인소 맨 2부', imageUrl: 'https://via.placeholder.com/400x533', day: '토요일', author: { firstName: 'Admin' }, averageRating: 0, reviewCount: 0, viewCount: 0, isFavorited: false, type: 'TV', tags: [] },
        { id: 4, title: '마법소녀 카피캣', imageUrl: 'https://via.placeholder.com/400x533', day: '월요일', author: { firstName: 'Admin' }, averageRating: 0, reviewCount: 0, viewCount: 0, isFavorited: false, type: 'TV', tags: [] },
        { id: 5, title: '블루 록 2기', imageUrl: 'https://via.placeholder.com/400x533', day: '목요일', author: { firstName: 'Admin' }, averageRating: 0, reviewCount: 0, viewCount: 0, isFavorited: false, type: 'TV', tags: [] },
      ];
      if (activeDay === '전체') return fakeData;
      // @ts-ignore
      return fakeData.filter(anime => anime.day === activeDay);
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="text-center py-12 px-4 mb-8 bg-gray-800 text-white rounded-xl shadow-lg">
          <h1 className="text-4xl font-black mb-2">애니메이션</h1>
          <p className="text-lg text-gray-300">분기별 애니메이션 리뷰, 캐릭터 인기 투표, 음악/OST/성우 정보까지</p>
        </div>

        <div className="flex justify-center space-x-4 mb-8 pb-2 border-b overflow-x-auto">
          {['전체글', '작품리뷰', '게시판', '캐릭터', '음악/OST', '성우', '제작사'].map(menu => (
            <a key={menu} href="#" className="text-gray-600 hover:text-gray-900 font-medium pb-2 border-b-2 border-transparent hover:border-gray-800 transition-all whitespace-nowrap px-2">
              {menu}
            </a>
          ))}
        </div>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">요일별 방영작</h2>
            <Button variant="link">더보기</Button>
          </div>
          <WeekdayFilter activeDay={activeDay} onDayChange={setActiveDay} />
        </section>
        
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {animePosts && animePosts.length > 0 ? (
            animePosts.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-neutral-600">선택된 요일에 방영하는 작품이 없습니다.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
