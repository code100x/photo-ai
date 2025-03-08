export function PackGridSkeleton() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm animate-pulse">
            <div className="p-6 space-y-4">
              <div className="h-6 bg-muted rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="h-4 bg-muted rounded w-4/6"></div>
              </div>
              <div className="flex gap-2 h-24">
                <div className="h-full bg-muted rounded flex-1"></div>
                <div className="h-full bg-muted rounded flex-1"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  