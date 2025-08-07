import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <div className="text-8xl font-bold text-purple-600">404</div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <Link href="/">
          <Button className="rounded-xl bg-gradient-to-r from-purple-600 to-blue-600">
            <Home className="w-4 h-4 mr-2" />
            홈으로 돌아가기
          </Button>
        </Link>
      </div>
    </div>
  );
}
