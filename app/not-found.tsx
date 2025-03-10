import { Button } from '@/SelfPresent/components/ui/shadcn/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-1  p-4 text-center shadow-sm">
        <h3 className="text-2xl font-bold tracking-tight">
          This page does not exist
        </h3>
        <p className="text-sm text-muted-foreground">
          Click the button. Or something.
        </p>
        <Button className="mt-4">
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  );
}
