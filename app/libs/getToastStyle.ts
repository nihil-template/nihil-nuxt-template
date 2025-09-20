export function getToastSeverity(variant: 'success' | 'error' | 'info' | 'warning' | 'default'): 'success' | 'error' | 'info' | 'warn' {
  switch (variant) {
  case 'success':
    return 'success';
  case 'error':
    return 'error';
  case 'info':
    return 'info';
  case 'warning':
    return 'warn';
  default:
    return 'info';
  }
}
