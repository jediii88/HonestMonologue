export function isUnauthorizedError(error: Error): boolean {
  return /^401: .*(Unauthorized|로그인이 필요합니다)/.test(error.message);
}