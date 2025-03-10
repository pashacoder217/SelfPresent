import { createClient } from '@/utils/supabase/server';
import { EdgeStoreProvider } from '@/SelfPresent/lib/edgestore';
import { OnboardingProvider } from '@/SelfPresent/context/onboardingContext';
import '../../styles/main.css';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import DotPattern from '@/SelfPresent/components/magicui/dot-pattern';
import { cn } from '@/SelfPresent/lib/utils';
import QueryProvider from '@/SelfPresent/components/onboarding/QueryProvider';

export default async function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/signin/password_signin');
  }

  return (
    <QueryProvider>
      <EdgeStoreProvider>
        <OnboardingProvider>
          {children}
          <DotPattern
            width={20}
            height={20}
            cx={1}
            cy={1}
            cr={1}
            className={cn(
              '[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] '
            )}
          />
        </OnboardingProvider>
      </EdgeStoreProvider >
    </QueryProvider>
  );
}
