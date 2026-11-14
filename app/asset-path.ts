export function asset(path: string) {
  return `${process.env.NEXT_PUBLIC_PORTFOLIO_BASE_PATH ?? ''}/${path}`;
}
