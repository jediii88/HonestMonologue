import { createContext, ReactNode, useContext } from "react";
import { useQuery, useMutation, UseMutationResult } from "@tanstack/react-query";

type AuthContextType = {
  user: any | null;
  isLoading: boolean;
  error: Error | null;
  isAuthenticated: boolean;
  loginMutation: UseMutationResult<any, Error, any>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<any, Error, any>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // GitHub Pages에서는 정적 모드
  const isGitHubPages = window.location.hostname.includes('github.io');
  
  const { data: user, error, isLoading } = useQuery({
    queryKey: ["/api/user"],
    queryFn: () => Promise.resolve(null), // GitHub Pages에서는 항상 null
    retry: false,
    enabled: false, // 정적 사이트에서는 비활성화
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: any) => {
      throw new Error("정적 사이트에서는 로그인을 사용할 수 없습니다.");
    },
    onError: () => {},
  });

  const registerMutation = useMutation({
    mutationFn: async (credentials: any) => {
      throw new Error("정적 사이트에서는 회원가입을 사용할 수 없습니다.");
    },
    onError: () => {},
  });

  const logoutMutation = useMutation({
    mutationFn: async () => Promise.resolve(),
    onSuccess: () => {},
  });

  const contextValue: AuthContextType = {
    user: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
    loginMutation,
    logoutMutation,
    registerMutation,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
