import { usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import SiteFooter from '@/components/site/site-footer';
import Seo from '@/components/site/seo';
import SiteHeader from '@/components/site/site-header';
import { useAppear } from '@/hooks/use-appear';

export default function SiteLayout({ children }: { children: ReactNode }) {
    const { component, url } = usePage();

    useAppear(url);

    return (
        <>
            <Seo />
            <SiteHeader transparent={component === 'site/home'} />
            <main id="main">{children}</main>
            <SiteFooter />
        </>
    );
}
