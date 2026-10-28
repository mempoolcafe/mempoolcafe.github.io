interface PageHeaderProps {
  title: string;
  color?: "red" | "blue";
  /** Heading level; pages use the default h1, sidebar boxes use h2. */
  as?: "h1" | "h2";
  className?: string;
}

export default function PageHeader({
  title,
  color = "red",
  as: Tag = "h1",
  className = "mb-4",
}: PageHeaderProps) {
  return (
    <Tag className={`${color === "red" ? "bar-red" : "bar-blue"} ${className}`}>
      {title}
    </Tag>
  );
}
