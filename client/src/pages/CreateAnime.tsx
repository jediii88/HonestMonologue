import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import type { Tag } from "@shared/schema";

export default function CreateAnime() {
  const { isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");
  const [studio, setStudio] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const { data: availableTags } = useQuery<Tag[]>({
    queryKey: ["/api/tags"],
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "로그인이 필요합니다",
        description: "애니메이션을 등록하려면 로그인해주세요.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const createAnimeMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/anime", {
        title,
        description,
        imageUrl: imageUrl || undefined,
        year: year ? parseInt(year) : undefined,
        type,
        studio: studio || undefined,
        tags: selectedTags,
      });
    },
    onSuccess: () => {
      toast({
        title: "애니메이션 등록 완료",
        description: "관리자 승인 후 게시됩니다.",
      });
      // Reset form
      setTitle("");
      setDescription("");
      setImageUrl("");
      setYear("");
      setType("");
      setStudio("");
      setSelectedTags([]);
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "로그인이 필요합니다",
          description: "애니메이션을 등록하려면 로그인해주세요.",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "오류",
        description: "애니메이션 등록 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createAnimeMutation.mutate();
  };

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag.trim() && !selectedTags.includes(newTag.trim())) {
      setSelectedTags([...selectedTags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const handleTagSelect = (tagName: string) => {
    if (!selectedTags.includes(tagName)) {
      setSelectedTags([...selectedTags, tagName]);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-200 rounded mb-8"></div>
            <div className="space-y-6">
              <div className="h-64 bg-neutral-200 rounded"></div>
              <div className="h-32 bg-neutral-200 rounded"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">애니메이션 등록</h1>
          <p className="text-neutral-600">
            새로운 애니메이션 정보를 등록해주세요. 관리자의 승인 후 게시됩니다.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>애니메이션 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <Label htmlFor="title">제목 *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="애니메이션 제목을 입력하세요"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">설명 *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="애니메이션에 대한 설명을 입력하세요"
                  rows={6}
                  required
                />
              </div>

              {/* Image URL */}
              <div>
                <Label htmlFor="imageUrl">이미지 URL</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
                {imageUrl && (
                  <div className="mt-2">
                    <img
                      src={imageUrl}
                      alt="미리보기"
                      className="w-32 h-48 object-cover rounded border"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Year */}
                <div>
                  <Label htmlFor="year">제작년도</Label>
                  <Input
                    id="year"
                    type="number"
                    min="1950"
                    max="2030"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="2024"
                  />
                </div>

                {/* Type */}
                <div>
                  <Label htmlFor="type">형태 *</Label>
                  <Select value={type} onValueChange={setType} required>
                    <SelectTrigger>
                      <SelectValue placeholder="선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TV">TV 시리즈</SelectItem>
                      <SelectItem value="Movie">영화</SelectItem>
                      <SelectItem value="OVA">OVA</SelectItem>
                      <SelectItem value="ONA">ONA</SelectItem>
                      <SelectItem value="Special">스페셜</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Studio */}
                <div>
                  <Label htmlFor="studio">제작사</Label>
                  <Input
                    id="studio"
                    value={studio}
                    onChange={(e) => setStudio(e.target.value)}
                    placeholder="제작사명"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <Label>태그</Label>
                <div className="space-y-3">
                  {/* Add new tag */}
                  <form onSubmit={handleAddTag} className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="새 태그 추가"
                      className="flex-1"
                    />
                    <Button type="submit" variant="outline" size="sm">
                      <Plus size={16} />
                    </Button>
                  </form>

                  {/* Available tags */}
                  {availableTags && availableTags.length > 0 && (
                    <div>
                      <p className="text-sm text-neutral-600 mb-2">기존 태그에서 선택:</p>
                      <div className="flex flex-wrap gap-2">
                        {availableTags.map((tag) => (
                          <Button
                            key={tag.id}
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleTagSelect(tag.name)}
                            disabled={selectedTags.includes(tag.name)}
                            className="text-xs"
                          >
                            #{tag.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Selected tags */}
                  {selectedTags.length > 0 && (
                    <div>
                      <p className="text-sm text-neutral-600 mb-2">선택된 태그:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedTags.map((tag) => (
                          <Badge key={tag} variant="outline" className="flex items-center gap-1">
                            #{tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="text-neutral-500 hover:text-neutral-700"
                            >
                              <X size={12} />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <Button 
                  type="submit" 
                  disabled={createAnimeMutation.isPending}
                  className="w-full"
                >
                  {createAnimeMutation.isPending ? "등록 중..." : "애니메이션 등록"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
