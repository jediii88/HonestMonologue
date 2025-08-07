import { useState } from "react";

export function useToast() {
  const [toasts, setToasts] = useState<any[]>([]);

  const toast = (options: { title: string; description?: string; variant?: string }) => {
    console.log("Toast:", options);
    // GitHub Pages에서는 console.log로 대체
  };

  return { toast };
}
