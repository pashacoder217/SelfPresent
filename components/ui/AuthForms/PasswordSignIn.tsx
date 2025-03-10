// components/ui/AuthForms/PasswordSignIn.tsx

'use client';

import { Button } from '@/SelfPresent/components/ui/shadcn/button';
import Link from 'next/link';
import { signInWithPassword } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

// Define prop type with allowEmail boolean
interface PasswordSignInProps {
  allowEmail: boolean;
  redirectMethod: string;
}

export default function PasswordSignIn({
  allowEmail,
  redirectMethod
}: PasswordSignInProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(
      e,
      signInWithPassword,
      redirectMethod === 'client' ? router : null
    );
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="my-8 ">
      <form
        noValidate={true}
        className="mb-4 "
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="grid gap-2">
          <div className="grid gap-1">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              placeholder="name@example.com"
              type="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              className="w-full rounded-md bg-neutral-100 p-3 dark:bg-neutral-900"
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              placeholder="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              className="w-full rounded-md bg-neutral-100 p-3 dark:bg-neutral-900"
            />
          </div>
          <Button
            // variant="secondary"
            type="submit"
            className="mt-5 rounded-full"
            loading={isSubmitting}
          >
            Sign in
          </Button>
        </div>
      </form>
      <p>
        <Link href="/signin/forgot_password" className="text-sm font-light">
          Forgot your password?
        </Link>
      </p>
      {/* {allowEmail && (
        <p>
          <Link href="/signin/email_signin" className="font-light text-sm">
            Sign in via magic link
          </Link>
        </p>
      )} */}
      {/* <p>
        <Link href="/signin/signup" className="font-light text-sm">
          Don't have an account? Sign up
        </Link>
      </p> */}
    </div>
  );
}
