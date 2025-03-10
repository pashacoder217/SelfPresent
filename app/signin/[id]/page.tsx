import Logo from '@/SelfPresent/components/icons/Logo';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  getAuthTypes,
  getViewTypes,
  getDefaultSignInView,
  getRedirectMethod
} from '@/utils/auth-helpers/settings';
import Card from '@/SelfPresent/components/ui/Card/Card';
import PasswordSignIn from '@/SelfPresent/components/ui/AuthForms/PasswordSignIn';
import EmailSignIn from '@/SelfPresent/components/ui/AuthForms/EmailSignIn';
import Separator from '@/SelfPresent/components/ui/AuthForms/Separator';
import OauthSignIn from '@/SelfPresent/components/ui/AuthForms/OauthSignIn';
import ForgotPassword from '@/SelfPresent/components/ui/AuthForms/ForgotPassword';
import UpdatePassword from '@/SelfPresent/components/ui/AuthForms/UpdatePassword';
import SignUp from '@/SelfPresent/components/ui/AuthForms/Signup';
import LogoIconBlink from '@/SelfPresent/components/LogoIconBlink';
import { Poppins, Roboto_Mono } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap'
});

export default async function SignIn({
  params,
  searchParams
}: {
  params: { id: string };
  searchParams: { disable_button: boolean };
}) {
  const { allowOauth, allowEmail, allowPassword } = getAuthTypes();
  const viewTypes = getViewTypes();
  const redirectMethod = getRedirectMethod();

  // Declare 'viewProp' and initialize with the default value
  let viewProp: string;

  // Assign url id to 'viewProp' if it's a valid string and ViewTypes includes it
  if (typeof params.id === 'string' && viewTypes.includes(params.id)) {
    viewProp = params.id;
  } else {
    const preferredSignInView =
      cookies().get('preferredSignInView')?.value || null;
    viewProp = getDefaultSignInView(preferredSignInView);
    return redirect(`/signin/${viewProp}`);
  }

  // Check if the user is already logged in and redirect to the account page if so
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (user && viewProp !== 'update_password') {
    return redirect('/');
  } else if (!user && viewProp === 'update_password') {
    return redirect('/signin');
  }

  return (
    <div className="flex h-screen justify-center">
      <div className="m-auto flex w-80 max-w-lg flex-col justify-center p-3 ">
        <div className="flex items-center justify-center  gap-3  pt-1 font-semibold">
          <LogoIconBlink />
          <p
            className={`${poppins.className} bg-gradient-to-r from-neutral-600 to-neutral-400 bg-clip-text pl-0 text-center text-sm font-medium tracking-widest text-transparent dark:from-neutral-200  dark:to-neutral-400 md:ml-0.5`}
          >
            <span>self </span>
            <span className="">represent </span>
            <span
              className={`${robotoMono.className} text-xs text-muted-foreground`}
            >
              ai
            </span>
          </p>
        </div>

        <Card
          title={
            viewProp === 'forgot_password'
              ? 'Reset Password'
              : viewProp === 'update_password'
                ? 'Update Password'
                : viewProp === 'signup'
                  ? ''
                  : ''
          }
        >
          {viewProp === 'password_signin' && (
            <PasswordSignIn
              allowEmail={allowEmail}
              redirectMethod={redirectMethod}
            />
          )}
          {viewProp === 'email_signin' && (
            <EmailSignIn
              allowPassword={allowPassword}
              redirectMethod={redirectMethod}
              disableButton={searchParams.disable_button}
            />
          )}
          {viewProp === 'forgot_password' && (
            <ForgotPassword
              allowEmail={allowEmail}
              redirectMethod={redirectMethod}
              disableButton={searchParams.disable_button}
            />
          )}
          {viewProp === 'update_password' && (
            <UpdatePassword redirectMethod={redirectMethod} />
          )}
          {viewProp === 'signup' && (
            <SignUp allowEmail={allowEmail} redirectMethod={redirectMethod} />
          )}
          {viewProp !== 'update_password' &&
            allowOauth && (
              <>
                <Separator text="Third-party sign-in" />
                <OauthSignIn />
              </>
            )}
        </Card>
      </div>
    </div>
  );
}
