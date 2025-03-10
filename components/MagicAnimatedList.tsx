'use client';

import { cn } from '@/SelfPresent/lib/utils';
import { AnimatedList } from '@/SelfPresent/components/magicui/animated-list';

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

let notifications = [
  {
    name: 'California',
    time: 'Family Code',
    description: 'Family Code §3000-3089.',
    icon: '🇺🇸',
    color: '#1C1C1C' // Nearly black (very dark charcoal)
  },
  {
    name: 'Texas',
    time: 'Texas Family Code',
    description: 'Family Code Title 1, Subtitle D.',
    icon: '🇺🇸',
    color: '#1C1C1C' // Nearly black (very dark charcoal)
  },
  {
    name: 'New York',
    time: 'Domestic Relations Law',
    description: 'Domestic Relations Law §240.',
    icon: '🇺🇸',
    color: '#1C1C1C' // Nearly black (very dark charcoal)
  },
  {
    name: 'Florida',
    time: 'Florida Statutes',
    description: 'Statutes Chapter 61.',
    icon: '🇺🇸',
    color: '#1C1C1C' // Nearly black (very dark charcoal)
  },
  {
    name: 'Illinois',
    time: 'Illinois Marriage and Dissolution of Marriage Act',
    description: '750 ILCS 5/1.',
    icon: '🇺🇸',
    color: '#1C1C1C' // Nearly black (very dark charcoal)
  },
  {
    name: 'Pennsylvania',
    time: 'Pennsylvania Consolidated Statutes',
    description: '23 Pa.C.S. §3101-3904.',
    icon: '🇺🇸',
    color: '#1C1C1C' // Nearly black (very dark charcoal)
  },
  {
    name: 'Ohio',
    time: 'Ohio Revised Code',
    description: 'Revised Code §3109.04.',
    icon: '🇺🇸',
    color: '#1C1C1C' // Nearly black (very dark charcoal)
  },
  {
    name: 'Michigan',
    time: 'Michigan Compiled Laws',
    description: 'Compiled Laws §722.21-722.31.',
    icon: '🇺🇸',
    color: '#1C1C1C' // Nearly black (very dark charcoal)
  },
  {
    name: 'Georgia',
    time: 'Georgia Code',
    description: 'Code Title 19, Chapter 9.',
    icon: '🇺🇸',
    color: '#1C1C1C' // Nearly black (very dark charcoal)
  },
  {
    name: 'North Carolina',
    time: 'North Carolina General Statutes',
    description: 'General Statutes §50-13.2.',
    icon: '🇺🇸',
    color: '#1C1C1C' // Nearly black (very dark charcoal)
  },
  {
    name: 'Washington',
    time: 'Washington Revised Code',
    description: 'Revised Code §26.09.',
    icon: '🇺🇸',
    color: '#1C1C1C' // Nearly black (very dark charcoal)
  },
  {
    name: 'Virginia',
    time: 'Virginia Code',
    description: 'Code §20-108.2.',
    icon: '🇺🇸',
    color: '#1C1C1C' // Nearly black (very dark charcoal)
  },
  {
    name: 'Massachusetts',
    time: 'Massachusetts General Laws',
    description: 'General Laws Chapter 208.',
    icon: '🇺🇸',
    color: '#1C1C1C' // Nearly black (very dark charcoal)
  },
  {
    name: 'Indiana',
    time: 'Indiana Code',
    description: 'Code §31-17-2.',
    icon: '🇺🇸',
    color: '#1C1C1C' // Nearly black (very dark charcoal)
  },
  {
    name: 'Arizona',
    time: 'Arizona Revised Statutes',
    description: 'Revised Statutes §25-403.',
    icon: '🇺🇸',
    color: '#1C1C1C' // Nearly black (very dark charcoal)
  },
  {
    name: 'Tennessee',
    time: 'Tennessee Code',
    description: 'Code §36-6-106.',
    icon: '🇺🇸',
    color: '#1C1C1C' // Nearly black (very dark charcoal)
  },
  {
    name: 'Missouri',
    time: 'Missouri Statutes',
    description: 'Statutes §452.375.',
    icon: '🇺🇸',
    color: '#1C1C1C' // Nearly black (very dark charcoal)
  },
  {
    name: 'Maryland',
    time: 'Maryland Family Law',
    description: 'Family Law §5-203.',
    icon: '🇺🇸',
    color: '#1C1C1C' // Nearly black (very dark charcoal)
  },
  {
    name: 'Wisconsin',
    time: 'Wisconsin Statutes',
    description: 'Statutes §767.41.',
    icon: '🇺🇸',
    color: '#1C1C1C' // Nearly black (very dark charcoal)
  },
  {
    name: 'Minnesota',
    time: 'Minnesota Statutes',
    description: 'Statutes §518.17.',
    icon: '🇺🇸',
    color: '#1C1C1C' // Nearly black (very dark charcoal)
  },
  {
    name: 'South Carolina',
    time: 'South Carolina Code',
    description: 'Code §63-15-240.',
    icon: '🇺🇸',
    color: '#1C1C1C' // Nearly black (very dark charcoal)
  },
  {
    name: 'Alabama',
    time: 'Alabama Code',
    description: 'Code §30-3-152.',
    icon: '🇺🇸',
    color: '#1C1C1C' // Nearly black (very dark charcoal)
  },
  {
    name: 'Colorado',
    time: 'Colorado Revised Statutes',
    description: 'Revised Statutes §14-10-124.',
    icon: '🇺🇸',
    color: '#1C1C1C' // Nearly black (very dark charcoal)
  },
  {
    name: 'Kentucky',
    time: 'Kentucky Revised Statutes',
    description: 'Revised Statutes §403.270.',
    icon: '🇺🇸',
    color: '#1C1C1C' // Nearly black (very dark charcoal)
  },
  {
    name: 'Louisiana',
    time: 'Louisiana Civil Code',
    description: 'Civil Code Art. 131.',
    icon: '🇺🇸',
    color: '#1C1C1C' // Nearly black (very dark charcoal)
  },
  {
    name: 'Oregon',
    time: 'Oregon Revised Statutes',
    description: 'Revised Statutes §107.137.',
    icon: '🇺🇸',
    color: '#1C1C1C' // Nearly black (very dark charcoal)
  },
  {
    name: 'Oklahoma',
    time: 'Oklahoma Statutes',
    description: 'Statutes Title 43 §109.',
    icon: '🇺🇸',
    color: '#1C1C1C' // Nearly black (very dark charcoal)
  },
  {
    name: 'Connecticut',
    time: 'Connecticut General Statutes',
    description: 'General Statutes §46b-56.',
    icon: '🇺🇸',
    color: '#1C1C1C' // Nearly black (very dark charcoal)
  },
  {
    name: 'Iowa',
    time: 'Iowa Code',
    description: 'Code §598.41.',
    icon: '🇺🇸',
    color: '#1C1C1C' // Nearly black (very dark charcoal)
  },
  {
    name: 'Mississippi',
    time: 'Mississippi Code',
    description: 'Code §93-5-24.',
    icon: '🇺🇸',
    color: '#1C1C1C' // Nearly black (very dark charcoal)
  },
  {
    name: 'Arkansas',
    time: 'Arkansas Code',
    description: 'Code §9-13-101.',
    icon: '🇺🇸',
    color: '#1C1C1C' // Nearly black (very dark charcoal)
  },
  {
    name: 'Nevada',
    time: 'Nevada Revised Statutes',
    description: 'Revised Statutes §125C.0035.',
    icon: '🇺🇸',
    color: '#1C1C1C' // Nearly black (very dark charcoal)
  },
  {
    name: 'Kansas',
    time: 'Kansas Statutes',
    description: 'Statutes §23-3201.',
    icon: '🇺🇸',
    color: '#1C1C1C' // Nearly black (very dark charcoal)
  }
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        'relative mx-auto min-h-fit w-full max-w-[400px] transform cursor-pointer overflow-hidden rounded-2xl p-4',
        // animation styles
        'transition-all duration-200 ease-in-out hover:scale-[103%]',
        // light styles
        'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
        // dark styles
        'transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]'
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function MagicAnimatedList() {
  return (
    <div className="relative flex max-h-[400px] min-h-[400px] w-full max-w-[32rem] flex-col overflow-hidden rounded-lg border bg-background p-6 shadow-lg">
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}
