// components/NavURLHighlighter.tsx

'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Spin from './ui/shadcn/Spin';
import {
  Archive,
  Brain,
  FileStack,
  Files,
  MessageCircleMore,
  ScrollText,
  TextSearch
} from 'lucide-react';

const NavURLHighlighter = () => {
  const pathname = usePathname();
  const [isResearchLoading, setIsResearchLoading] = useState<boolean>(false);
  const [isFilesLoading, setIsFilesLoading] = useState<boolean>(false);
  const [isTextMessagesLoading, setIsTextMessagesLoading] =
    useState<boolean>(false);

  const handleResearch = () => {
    setIsResearchLoading(true);
    setTimeout(() => {
      setIsResearchLoading(false);
    }, 1000);
  };
  const handleFiles = () => {
    setIsFilesLoading(true);
    setTimeout(() => {
      setIsFilesLoading(false);
    }, 1000);
  };
  const handleTextMessages = () => {
    setIsTextMessagesLoading(true);
    setTimeout(() => {
      setIsTextMessagesLoading(false);
    }, 1000);
  };

  return (
    <nav className="grid items-start gap-2 px-2 text-sm font-medium lg:px-4">
      <Link
        onClick={() => handleResearch()}
        href="/dashboard/events"
        className={`flex flex-col items-start gap-2 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary ${
          pathname === '/dashboard/events'
            ? 'bg-muted text-primary'
            : 'text-muted-foreground'
        }`}
      >
        <div className="flex items-center gap-3">
          <AnimatePresence mode="wait">
            {isResearchLoading ? (
              <motion.div
                key="spin"
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Spin />
              </motion.div>
            ) : (
              <motion.div
                key="icon"
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <TextSearch strokeWidth={1} className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
          <h2 className="text-md tracking-wider">Legal Research</h2>
        </div>
      </Link>
      <Link
        onClick={() => handleTextMessages()}
        href="/app/texts"
        className={`flex flex-col items-start gap-2 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary ${
          pathname === '/app/texts'
            ? 'bg-muted text-primary'
            : 'text-muted-foreground'
        }`}
      >
        <div className="flex items-center gap-3">
          <AnimatePresence mode="wait">
            {isTextMessagesLoading ? (
              <motion.div
                key="spin"
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Spin />
              </motion.div>
            ) : (
              <motion.div
                key="icon"
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <MessageCircleMore className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
          <h2 className="text-md tracking-wider">Text Messages</h2>
        </div>
      </Link>
      <Link
        onClick={() => handleFiles()}
        href="/app/files"
        className={`flex flex-col items-start gap-2 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary ${
          pathname === '/app/files'
            ? 'bg-muted text-primary'
            : 'text-muted-foreground'
        }`}
      >
        <div className="flex items-center gap-3">
          <AnimatePresence mode="wait">
            {isFilesLoading ? (
              <motion.div
                key="spin"
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Spin />
              </motion.div>
            ) : (
              <motion.div
                key="icon"
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Files className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
          <h2 className="text-md tracking-wider">Files</h2>
        </div>
      </Link>
    </nav>
  );
};

export default NavURLHighlighter;
