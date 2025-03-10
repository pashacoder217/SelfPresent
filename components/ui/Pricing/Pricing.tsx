// components/ui/Pricing/Pricing.tsx

'use client';

import { Button } from '@/SelfPresent/components/ui/shadcn/button';
import LogoCloud from '@/SelfPresent/components/ui/LogoCloud';
import type { Tables } from '@/types_db';
import { getStripe } from '@/utils/stripe/client';
import { checkoutWithStripe } from '@/utils/stripe/server';
import { getErrorRedirect } from '@/utils/helpers';
import { User } from '@supabase/supabase-js';
import cn from 'classnames';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@/utils/supabase/client';
import logEventToLogSnag from '@/utils/logSnag';
import IsEmpty from '@/utils/is_empty';

type Subscription = Tables<'subscriptions'>;
type Product = Tables<'products'>;
type Price = Tables<'prices'>;
interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PriceWithProduct extends Price {
  products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface Props {
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

declare global {
  interface Window{
    promotekit_referral: any;
  }
}

type BillingInterval = 'lifetime' | 'year' | 'month';

export default function Pricing({ user, products, subscription }: Props) {
  const intervals = Array.from(
    new Set(
      products.flatMap((product) =>
        product?.prices?.map((price) => price?.interval)
      )
    )
  );
  const supabase = createClient();
  const router = useRouter();
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>('month');
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const currentPath = usePathname();

  const handleStripeCheckout = async (price: Price) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
    setPriceIdLoading(price.id);
    const referral = window.promotekit_referral;
    logEventToLogSnag("subscribe", `${user?.email} is subscribed!`, "email-list-new-subscriber", "💰");
    if (!user) {
      setPriceIdLoading(undefined);
      return router.push('/signin/email_signin');
    }
    let isEndedTrial = false;
    const { data: sub_data } = await supabase.from("subscriptions").select("*").eq("user_id", user.id).single();
    if (sub_data?.status == "canceled" && sub_data.trial_end) {
      isEndedTrial = true;
    }
    const { errorRedirect, sessionId } = await checkoutWithStripe(
      price,
      referral,
      currentPath,
      isEndedTrial
    );

    if (errorRedirect) {
      setPriceIdLoading(undefined);
      return router.push(errorRedirect);
    }

    if (!sessionId) {
      setPriceIdLoading(undefined);
      return router.push(
        getErrorRedirect(
          currentPath,
          'An unknown error occurred.',
          'Please try again later or contact a system administrator.'
        )
      );
    }

    const stripe = await getStripe();
    stripe?.redirectToCheckout({ sessionId });

    setPriceIdLoading(undefined);
    
  };

  if (!products.length) {
    return (
      <section className="bg-black">
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center"></div>
          <p className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            No subscription pricing plans found. Create them in your{' '}
            <a
              className="text-pink-500 underline"
              href="https://dashboard.stripe.com/products"
              rel="noopener noreferrer"
              target="_blank"
            >
              Stripe Dashboard
            </a>
            .
          </p>
        </div>
        {/* <LogoCloud /> */}
      </section>
    );
  } else {
    return (
      <section className="bg-black">
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center">
            <h1 className="text-4xl text-white sm:text-center sm:text-6xl">
              Pricing
            </h1>
            {/* <p className="max-w-2xl m-auto mt-5 text-xl text-neutral-200 sm:text-center sm:text-2xl">
              Start here
            </p> */}
            <div className="relative self-center mt-4 bg-neutral-900 rounded-full p-0.5 flex sm:mt-6 border border-neutral-800">
              <motion.div
                className="absolute inset-0 bg-neutral-700 rounded-full shadow-sm"
                layout
                transition={{ type: 'spring', stiffness: 300, damping: 19 }}
                style={{
                  left: billingInterval === 'month' ? '0%' : '50%',
                  width: '50%'
                }}
                initial={false}
              />
              {intervals.includes('month') && (
                <button
                  onClick={() => setBillingInterval('month')}
                  type="button"
                  className={`${
                    billingInterval === 'month'
                      ? 'relative w-1/2 text-white'
                      : 'relative w-1/2 border border-transparent text-neutral-400'
                  } rounded-full m-0.5 py-1 text-sm whitespace-nowrap focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:w-auto sm:px-8`}
                >
                  Monthly billing
                </button>
              )}
              {intervals.includes('year') && (
                <button
                  onClick={() => setBillingInterval('year')}
                  type="button"
                  className={`${
                    billingInterval === 'year'
                      ? 'relative w-1/2 text-white'
                      : 'relative w-1/2 border border-transparent text-neutral-400'
                  } rounded-full m-0.5 py-1 text-sm font-medium whitespace-nowrap focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:w-auto sm:px-8`}
                >
                  Yearly billing
                </button>
              )}
            </div>
          </div>
          <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 flex flex-wrap justify-center gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
            {products.map((product) => {
              const price = product?.prices?.find(
                (price) => price.interval === billingInterval
              );
              if (!price) return null;
              const priceString = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: price.currency!,
                minimumFractionDigits: 0
              }).format((price?.unit_amount || 0) / 100);
              return (
                <div
                  key={product.id}
                  className={cn(
                    'flex flex-col rounded-lg shadow-sm divide-y divide-neutral-600 bg-neutral-900',
                    {
                      'border border-neutral-500': subscription
                        ? product.name === subscription?.prices?.products?.name
                        : product.name === 'Freelancer'
                    },
                    'flex-1', // This makes the flex item grow to fill the space
                    'basis-1/3', // Assuming you want each card to take up roughly a third of the container's width
                    'max-w-xs' // Sets a maximum width to the cards to prevent them from getting too large
                  )}
                >
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold leading-6 bg-gradient-to-l from-neutral-300 to-neutral-100 bg-clip-text text-transparent">
                      {product.name}
                    </h2>
                    <p className="mt-4 bg-gradient-to-l from-neutral-300 to-neutral-100 bg-clip-text text-transparent">
                      {product.description}
                    </p>
                    <p className="mt-8">
                      <span className="text-5xl font-extrabold bg-gradient-to-l from-neutral-300 to-neutral-100 bg-clip-text text-transparent">
                        {priceString}
                      </span>
                      <span className="text-base font-medium text-neutral-100">
                        /{billingInterval}
                      </span>
                    </p>
                    <Button
                      // variant="slim"
                      type="button"
                      // loading={priceIdLoading === price.id}
                      data-stripe-url={`https://buy.stripe.com/test-session-id`}
                      loading={isSubmitting}
                      onClick={() => handleStripeCheckout(price)}
                      className="w-full py-2 mt-8 text-sm font-semibold text-center bg-gradient-to-l from-neutral-200 to-neutral-400 text-neutral-950 rounded-full hover:bg-neutral-900"
                    >
                      {subscription ? 'Manage' : 'Subscribe'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          {/* <LogoCloud /> */}
        </div>
      </section>
    );
  }
}
