import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  href?: string;
  className?: string;
}

export default function ServiceCard({
  title,
  description,
  icon,
  href,
  className = ""
}: ServiceCardProps) {
  const CardContentComponent = (
    <>
      {icon && (
        <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10 p-3 text-primary">
          {icon}
        </div>
      )}
      <CardHeader className="p-0 pb-4">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {href && (
          <div className="text-sm font-medium text-primary hover:text-primary/80">
            Learn more →
          </div>
        )}
      </CardContent>
    </>
  );

  if (href) {
    return (
      <Card className={`transition-all hover:shadow-lg hover:scale-[1.02] ${className}`}>
        <a href={href} className="block p-6">
          {CardContentComponent}
        </a>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <div className="p-6">{CardContentComponent}</div>
    </Card>
  );
}