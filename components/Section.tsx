import { ReactNode } from 'react';

interface SectionProps {
  kicker?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function Section({
  kicker,
  title,
  description,
  children,
  className = "",
  id
}: SectionProps) {
  return (
    <section className={`py-16 md:py-24 ${className}`} id={id}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {(kicker || title || description) && (
          <div className="mx-auto max-w-2xl text-center">
            {kicker && (
              <p className="text-sm font-medium text-primary mb-2 uppercase tracking-wider">
                {kicker}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-lg text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        )}
        <div className="mt-16">{children}</div>
      </div>
    </section>
  );
}