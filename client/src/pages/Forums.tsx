import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { Plus, Users, MessageCircle, Pin, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertForumSchema, type ForumWithDetails } from "@shared/schema";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Forums() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const { data: forums = [], isLoading } = useQuery({
    queryKey: ["/api/forums"],
  });

  const createForumMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("/api/forums", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/forums"] });
      setIsCreateDialogOpen(false);
      toast({
        title: "포럼 생성됨",
        description: "새로운 포럼이 성공적으로 생성되었습니다.",
      });
    },
    onError: (error) => {
      toast({
        title: "오류",
        description: "포럼 생성에 실패했습니다.",
        variant: "destructive",
      });
    },
  });

  const form = useForm({
    resolver: zodResolver(insertForumSchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      isPrivate: false,
    },
  });

  const onSubmit = (data: any) => {
    createForumMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-20 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            포럼
          </h1>
          <p className="text-gray-600 mt-2">애니메이션과 문화에 대해 토론해보세요</p>
        </div>
        
        {isAuthenticated && (
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                포럼 만들기
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>새 포럼 생성</DialogTitle>
                <DialogDescription>
                  새로운 토론 포럼을 만들어보세요.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>포럼 이름</FormLabel>
                        <FormControl>
                          <Input placeholder="포럼 이름을 입력하세요" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>설명</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="포럼에 대한 설명을 입력하세요" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>이미지 URL (선택사항)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isPrivate"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>비공개 포럼</FormLabel>
                          <div className="text-sm text-gray-500">
                            초대받은 사용자만 참여할 수 있습니다
                          </div>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsCreateDialogOpen(false)}
                    >
                      취소
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={createForumMutation.isPending}
                      className="bg-yellow-500 hover:bg-yellow-600"
                    >
                      생성
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* 포럼 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forums.map((forum: ForumWithDetails) => (
          <Link key={forum.id} href={`/forums/${forum.id}`}>
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-2 hover:border-yellow-300">
              {forum.imageUrl && (
                <div className="h-32 overflow-hidden rounded-t-lg">
                  <img 
                    src={forum.imageUrl} 
                    alt={forum.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg group-hover:text-yellow-600 transition-colors">
                    {forum.name}
                  </CardTitle>
                  <div className="flex items-center space-x-1">
                    {forum.isPrivate && (
                      <Badge variant="secondary">
                        <Lock className="w-3 h-3 mr-1" />
                        비공개
                      </Badge>
                    )}
                  </div>
                </div>
                <CardDescription className="text-sm">
                  {forum.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {forum.postCount}개 글
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {forum.memberCount}명
                    </div>
                  </div>
                  {forum.userRole && (
                    <Badge variant="outline" className="text-xs">
                      {forum.userRole === "admin" ? "관리자" : "멤버"}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {forums.length === 0 && (
        <div className="text-center py-12">
          <MessageCircle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            아직 포럼이 없습니다
          </h3>
          <p className="text-gray-500 mb-4">
            첫 번째 포럼을 만들어서 토론을 시작해보세요!
          </p>
          {isAuthenticated && (
            <Button 
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-yellow-500 hover:bg-yellow-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              포럼 만들기
            </Button>
          )}
        </div>
      )}
    </div>
  );
}