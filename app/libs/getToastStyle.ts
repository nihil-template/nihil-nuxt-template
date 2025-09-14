export function getToastStyle(variant: 'success' | 'error' | 'info' | 'warning' | 'default'): Record<string, string> {
  switch (variant) {
  case 'success':
    return {
      backgroundColor: 'hsl(var(--success))',
      color: 'hsl(var(--success-foreground))',
    };
  case 'error':
    return {
      backgroundColor: 'hsl(var(--destructive))',
      color: 'hsl(var(--destructive-foreground))',
    };
  default:
    return {};
  }
}
