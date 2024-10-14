export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
  immediate: boolean = false // 添加一个参数控制是否立即执行
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout | null = null;

  return function (this: any, ...args: Parameters<T>) {
    const callNow = immediate && !timer; // 判断是否立即调用

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      timer = null; // 清除定时器
      if (!immediate) {
        fn.apply(this, args); // 只有在非立即模式下才执行
      }
    }, delay);

    if (callNow) {
      fn.apply(this, args); // 立即调用
    }
  };
}