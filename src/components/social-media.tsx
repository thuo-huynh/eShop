import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

import { Facebook, Github, Linkedin, Slack, Youtube } from 'lucide-react';
import Link from 'next/link';

const socialLink = [
  {
    title: 'Youtube',
    href: '#',
    icon: <Youtube className="w-5 h-5" />,
  },
  {
    title: 'Github',
    href: '#',
    icon: <Github className="w-5 h-5" />,
  },
  {
    title: 'Linkedin',
    href: '#',
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    title: 'Facebook',
    href: '#',
    icon: <Facebook className="w-5 h-5" />,
  },
  {
    title: 'Slack',
    href: '#',
    icon: <Slack className="w-5 h-5" />,
  },
];

type Props = {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
};

function SocialMedia({ className, iconClassName, tooltipClassName }: Props) {
  return (
    <TooltipProvider>
      <div className={cn('flex items-center gap-3.5', className)}>
        {socialLink?.map((item) => (
          <Tooltip key={item?.title}>
            <TooltipTrigger asChild>
              <Link
                href={item?.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'p-2 border rounded-full hover:text-white hover:border-white hoverEffect',
                  iconClassName,
                )}
              >
                {item?.icon}
              </Link>
            </TooltipTrigger>
            <TooltipContent
              className={cn('bg-white text-darkColor font-semibold', tooltipClassName)}
            >
              {item?.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}

export default SocialMedia;
