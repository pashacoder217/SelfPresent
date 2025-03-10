'use client';

import { Button } from '@/SelfPresent/components/ui/shadcn/button';
import { handleRequest } from '@/utils/auth-helpers/client';
// import { signInWithOAuth } from '@/utils/auth-helpers/server';
import { signInWithOAuth } from '@/utils/auth-helpers/client';
import { type Provider } from '@supabase/supabase-js';
import { Chrome, Facebook } from 'lucide-react';
import { useState } from 'react';
type OAuthProviders = {
  name: Provider;
  displayName: string;
  icon: JSX.Element;
};

export default function OauthSignIn() {
  const oAuthProviders: OAuthProviders[] = [
    {
      name: 'google',
      displayName: 'Google',
      icon: <Chrome className="h5 w-5" />
    },
    {
      name: 'facebook',
      displayName: 'Face Book',
      icon: <Facebook className='h5 w-5' />
    }
    /* Add desired OAuth providers here */
  ];
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await signInWithOAuth(e);
    // await handleRequest(
    //   e,
    //   signInWithOAuth,
    //   // redirectMethod === 'client' ? router : null
    // );
    setIsSubmitting(false);
  };

  return (
    <div className="mt-8">
      {oAuthProviders.map((provider) => (
        <form
          key={provider.name}
          className="pb-2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input type="hidden" name="provider" value={provider.name} />
          <Button
            variant="outline"
            type="submit"
            className="w-full"
            loading={isSubmitting}
          >
            <span className="mr-2">{provider.icon}</span>
            <span>{provider.displayName}</span>
          </Button>
        </form>
      ))}
    </div>
  );
}
