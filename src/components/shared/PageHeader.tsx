interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-brand-green-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      {/* Decorative lens circles */}
      <div
        className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-2 border-brand-green-200 opacity-30"
        aria-hidden="true"
      />
      <div
        className="absolute -right-10 -top-10 h-44 w-44 rounded-full border-2 border-brand-green-300 opacity-20"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold tracking-tight text-brand-black sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
