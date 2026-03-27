/**
 * Shared layout classes for authenticated dashboard routes (mobile-first).
 */

export const DASHBOARD_SECTION_CLASS =
  'relative w-full min-h-screen min-h-[100dvh] bg-[#f3f6f8] text-[#070a05] overflow-x-hidden';

export function dashboardMainClass(sidebarCollapsed: boolean): string {
  return [
    'relative z-[2] w-full min-w-0 min-h-screen min-h-[100dvh]',
    'transition-[margin] duration-300 ease-out',
    sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72',
  ].join(' ');
}

/** Sticky header: safe top padding, wraps on narrow screens */
export const DASHBOARD_TOPBAR_CLASS =
  'sticky top-0 z-[1] shrink-0 bg-white/60 backdrop-blur-sm border-b border-dotted border-[#393f5b]/15 flex flex-wrap items-center gap-x-2 gap-y-2 sm:gap-x-3 min-h-[3.25rem] sm:min-h-[4rem] lg:min-h-[4.5rem] px-3 sm:px-4 md:px-6 lg:px-10 py-2.5 sm:py-3 lg:py-0';

export const DASHBOARD_CONTENT_CLASS =
  'p-3 sm:p-4 md:p-6 lg:p-8 xl:px-10 w-full max-w-[1920px] mx-auto min-w-0';

export const DASHBOARD_TITLE_CLASS =
  'font-light leading-tight tracking-tight break-words';

export const dashboardTitleStyle = {
  fontSize: 'clamp(1.05rem, 3.5vw + 0.2rem, 1.75rem)',
} as const;
