interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: string;
}

export function Skeleton({ className = '', width, height, rounded = '8px' }: SkeletonProps) {
  return (
    <div
      className={`bg-[var(--line-disabled)] animate-skeleton ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: rounded,
      }}
    />
  );
}
