import { DoorClosed } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-neutral-300 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <DoorClosed className="text-white text-sm" size={16} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">혼모노</h3>
                <p className="text-xs text-neutral-400">Honest Monologue</p>
              </div>
            </div>
            <p className="text-sm text-neutral-400">
              진정한 애니메이션과 서브컬처를 사랑하는 사람들의 커뮤니티
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">커뮤니티</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition-colors">애니메이션</a></li>
              <li><a href="#" className="hover:text-white transition-colors">리뷰</a></li>
              <li><a href="#" className="hover:text-white transition-colors">랭킹</a></li>
              <li><a href="#" className="hover:text-white transition-colors">이벤트</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">정보</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">사용 가이드</a></li>
              <li><a href="#" className="hover:text-white transition-colors">커뮤니티 규칙</a></li>
              <li><a href="#" className="hover:text-white transition-colors">개인정보처리방침</a></li>
              <li><a href="#" className="hover:text-white transition-colors">서비스 약관</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">연락처</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">고객센터</a></li>
              <li><a href="#" className="hover:text-white transition-colors">제휴 문의</a></li>
              <li><a href="#" className="hover:text-white transition-colors">버그 신고</a></li>
              <li><a href="#" className="hover:text-white transition-colors">건의사항</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 mt-8 pt-8 text-center text-sm text-neutral-400">
          <p>&copy; 2024 혼모노 (Honest Monologue). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
