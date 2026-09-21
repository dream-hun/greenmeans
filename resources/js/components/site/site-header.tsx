import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Brand from '@/components/site/brand';
import { Btn } from '@/components/site/ui';
import { about, blog, contact, home, projects, services } from '@/routes';

const links = [
    { label: 'Home', href: home.url() },
    { label: 'About Us', href: about.url() },
    { label: 'Services', href: services.url() },
    { label: 'Projects', href: projects.url() },
    { label: 'Blog', href: blog.url() },
];

export default function SiteHeader({ transparent }: { transparent: boolean }) {
    const { url } = usePage();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const update = () => setScrolled(window.scrollY > 40);

        update();
        window.addEventListener('scroll', update, { passive: true });

        return () => window.removeEventListener('scroll', update);
    }, []);

    useEffect(() => setOpen(false), [url]);

    useEffect(() => {
        if (!open) {
            return;
        }

        const onKeydown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpen(false);
            }
        };

        const onClick = (event: MouseEvent) => {
            if (!(event.target as HTMLElement).closest('.site-header')) {
                setOpen(false);
            }
        };

        const wide = window.matchMedia('(min-width: 810px)');
        const onChange = (event: MediaQueryListEvent) => {
            if (event.matches) {
                setOpen(false);
            }
        };

        document.addEventListener('keydown', onKeydown);
        document.addEventListener('click', onClick);
        wide.addEventListener('change', onChange);

        return () => {
            document.removeEventListener('keydown', onKeydown);
            document.removeEventListener('click', onClick);
            wide.removeEventListener('change', onChange);
        };
    }, [open]);

    const current = (href: string) =>
        href === '/' ? url === '/' : url.startsWith(href);

    return (
        <>
            <a href="#main" className="skip-link">
                Skip to content
            </a>
            <header
                className={`site-header ${transparent ? 'header-home' : ''} ${scrolled ? 'is-scrolled' : ''}`.trim()}
            >
                <nav className="nav-shell" aria-label="Main navigation">
                    <Brand />
                    <div className="desktop-nav">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                aria-current={
                                    current(link.href) ? 'page' : undefined
                                }
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="nav-actions">
                        <Btn href={contact.url()} label="Contact Us" />
                        <button
                            type="button"
                            className="menu-toggle"
                            aria-label={open ? 'Close menu' : 'Open menu'}
                            aria-controls="mobile-menu"
                            aria-expanded={open}
                            onClick={() => setOpen(!open)}
                        >
                            <span />
                            <span />
                        </button>
                    </div>
                </nav>
                <nav
                    id="mobile-menu"
                    className="mobile-menu"
                    aria-label="Mobile navigation"
                    hidden={!open}
                >
                    {[
                        ...links,
                        { label: 'Contact Us', href: contact.url() },
                    ].map((link) => (
                        <Link key={link.href} href={link.href}>
                            {link.label}
                            <span aria-hidden="true">↗</span>
                        </Link>
                    ))}
                </nav>
            </header>
        </>
    );
}
