import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function HeroSection() {
  const { isAuthenticated } = useAuth();

  const handleCreateAnime = () => {
    if (isAuthenticated) {
      window.location.href = "/create";
    } else {
      window.location.href = "/api/login";
    }
  };

  return (
    <section className="mb-12">
      <div className="relative h-80 rounded-2xl overflow-hidden hero-gradient">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-pink-500/80"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-3xl px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              진정한 애니메이션 커뮤니티
            </h2>
            <p className="text-xl text-white/90 mb-8">
              서로를 존중하며 일본 애니메이션과 서브컬처를 사랑하는 사람들의 공간
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-neutral-100"
                onClick={handleCreateAnime}
              >
                애니메이션 등록하기
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/10"
              >
                커뮤니티 가이드
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
