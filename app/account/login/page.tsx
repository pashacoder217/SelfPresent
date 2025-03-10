'use client';
import { login, signup } from './actions';
import Link from 'next/link';
import { Button } from '@/SelfPresent/components/ui/shadcn/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/SelfPresent/components/ui/card-shadcn';
import { Input } from '@/SelfPresent/components/ui/shadcn/input';
import { Label } from '@/SelfPresent/components/ui/shadcn/label';
import { Sheet, SheetContent, SheetTrigger } from '@/SelfPresent/components/ui/sheet';
import { motion } from 'framer-motion';
import {
  Archive,
  Brain,
  MessageCircle,
  Package2,
  Scale,
  ScrollText,
  X
} from 'lucide-react';
import LogoXIconRotate from '@/SelfPresent/components/LogoXIconRotate';
import SwitchCustom from '@/SelfPresent/components/SwitchCustomVertical';
import { Poppins } from 'next/font/google';
import SwitchCustomHorizontal from '@/SelfPresent/components/SwitchCustomHorizontal';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export default function LoginPage() {
  return (
    <>
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-muted/40 px-4 backdrop-blur backdrop-filter lg:h-[60px] lg:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <motion.div
              initial={{ rotate: -45, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 5, // Lower stiffness makes the spring effect less rigid
                damping: 8, // Higher damping slows down the motion
                mass: 1, // Increased mass makes the spring effect feel heavier
                duration: 13, // Duration to complete the animation
                delay: 1 // Starts the animation after a delay
              }}
            >
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 shrink-0 bg-opacity-20 md:hidden"
              >
                <motion.div
                  initial={{ rotate: -45, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 5, // Lower stiffness makes the spring effect less rigid
                    damping: 8, // Higher damping slows down the motion
                    mass: 1, // Increased mass makes the spring effect feel heavier
                    duration: 13, // Duration to complete the animation
                    delay: 1 // Starts the animation after a delay
                  }}
                >
                  <X className="h-5 w-5 text-neutral-400 dark:text-neutral-300 " />
                </motion.div>
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </motion.div>
          </SheetTrigger>
          <div className="flex w-full justify-between">
            <span
              className={`${poppins.className} bg-gradient-to-r from-neutral-800 via-neutral-600 to-neutral-800 bg-clip-text text-sm font-medium tracking-widest text-transparent dark:from-neutral-300 dark:via-neutral-200 dark:to-neutral-300 md:hidden`}
            >
              selfrepresent.ai
            </span>
            <div className="flex items-center md:hidden">
              <SwitchCustomHorizontal />
            </div>
          </div>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 pb-2 pl-1 text-lg font-semibold"
              >
                <LogoXIconRotate />
                <span
                  className={`${poppins.className} bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text pl-2 text-sm font-bold tracking-wide text-transparent dark:from-neutral-100 dark:to-neutral-300`}
                >
                  selfrepresent.ai
                </span>
                <Package2 className="h-6 w-6" />
                <span className="sr-only">selfrepresent.ai</span>
              </Link>
              <hr className="" />
              <Link
                href=""
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Brain className="h-5 w-5" />
                AI Research
              </Link>
              <Link
                href=""
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Archive className="h-5 w-5" />
                Evidence
              </Link>
              <Link
                href="#"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <MessageCircle className="h-5 w-5" />
                Text Search
              </Link>
              <Link
                href="#"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <ScrollText className="h-5 w-5" />
                Legal Documents
              </Link>
              <Link
                href="#"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Scale className="h-5 w-5" />
                Courthouse
              </Link>
            </nav>
            <div className="mt-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Upgrade to Pro</CardTitle>
                  <CardDescription>
                    Unlock all features and get unlimited access to our support
                    team.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button size="sm" className="w-full">
                    Upgrade
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div className="mt-auto">
              <SwitchCustom />
            </div>
          </SheetContent>
        </Sheet>
        <div className=""></div>
      </header>

      <div className="flex h-screen items-center justify-center">
        <main className="relative z-0 flex w-full items-center justify-center">
          <motion.form
            initial={{ y: -700 }}
            animate={{ y: -200 }}
            transition={{
              type: 'spring',
              stiffness: 20, // Lower stiffness makes the spring effect less rigid
              damping: 6, // Higher damping slows down the motion
              mass: 1, // Increased mass makes the spring effect feel heavier
              duration: 13 // Duration to complete the animation
              // Starts the animation after a delay
            }}
            className="w-full"
          >
            <Card className="mx-auto max-w-sm">
              <CardHeader>
                <CardTitle className="bg-gradient-to-l  from-neutral-900 to-neutral-700 bg-clip-text text-2xl text-transparent dark:from-neutral-100 dark:to-neutral-300">
                  Entrance
                </CardTitle>
                <CardDescription className="bg-gradient-to-l from-neutral-900 to-neutral-700 bg-clip-text text-transparent dark:from-neutral-100 dark:to-neutral-300">
                  VIP Access Only
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label
                      className="bg-gradient-to-l from-neutral-900 to-neutral-700 bg-clip-text text-transparent dark:from-neutral-100 dark:to-neutral-300"
                      htmlFor="email"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label
                        htmlFor="password"
                        className="bg-gradient-to-l from-neutral-900 to-neutral-700 bg-clip-text text-transparent dark:from-neutral-100 dark:to-neutral-300"
                      >
                        Password
                      </Label>
                      {/* <Link
                        href="#"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Forgot your password?
                      </Link> */}
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                    />
                  </div>
                  <Button
                    // variant="secondary"
                    type="submit"
                    formAction={login}
                    className="w-full bg-gradient-to-l from-neutral-900 to-neutral-700 dark:from-neutral-100  dark:to-neutral-300"
                  >
                    Login
                  </Button>
                  {/* <Button
                    type="submit"
                    formAction={signup}
                    className="w-full bg-gradient-to-l from-neutral-900 to-neutral-400 dark:from-neutral-100  dark:to-neutral-300"
                  >
                    Sign up
                  </Button> */}
                </div>
              </CardContent>
            </Card>
          </motion.form>
        </main>
      </div>
    </>
  );
}
