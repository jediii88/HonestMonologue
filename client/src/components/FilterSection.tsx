import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterSectionProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function FilterSection({ 
  currentFilter, 
  onFilterChange, 
  sortBy, 
  onSortChange 
}: FilterSectionProps) {
  const filters = [
    { value: "approved", label: "전체" },
    { value: "new", label: "신작" },
    { value: "popular", label: "인기작" },
    { value: "reviewed", label: "리뷰 많은 순" },
    { value: "updated", label: "최근 업데이트" },
  ];

  const sortOptions = [
    { value: "newest", label: "최신순" },
    { value: "rating", label: "평점순" },
    { value: "reviews", label: "리뷰순" },
    { value: "views", label: "조회순" },
  ];

  return (
    <section className="mb-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Badge
              key={filter.value}
              variant={currentFilter === filter.value ? "default" : "secondary"}
              className={`cursor-pointer transition-colors ${
                currentFilter === filter.value 
                  ? "bg-primary text-white" 
                  : "hover:bg-neutral-300"
              }`}
              onClick={() => onFilterChange(filter.value)}
            >
              {filter.label}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-neutral-600">정렬:</span>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
}
