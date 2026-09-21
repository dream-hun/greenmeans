import { Link } from '@inertiajs/react';
import Brand from '@/components/site/brand';
import NewsletterForm from '@/components/site/newsletter-form';
import { icons, mail, map, phone, pin } from '@/components/site/social-icons';
import { Btn } from '@/components/site/ui';
import {
    about,
    blog,
    contact,
    home,
    privacyPolicy,
    projects,
    services,
    termsOfService,
} from '@/routes';
import { show as showService } from '@/routes/services';

const companyLinks = [
    { label: 'Home', href: home.url() },
    { label: 'About Us', href: about.url() },
    { label: 'Services', href: services.url() },
    { label: 'Projects', href: projects.url() },
    { label: 'Insights', href: blog.url() },
    { label: 'Contact Us', href: contact.url() },
];

const serviceLinks = [
    { label: 'HVAC Design', slug: 'hvac-design' },
    { label: 'Equipment Supply', slug: 'hvac-equipment-supply' },
    { label: 'HVAC Installation', slug: 'hvac-installation' },
    { label: 'Maintenance & Repair', slug: 'hvac-maintenance-repair' },
    { label: 'Electronics & Appliances', slug: 'electronics-home-appliances' },
    { label: 'Display Solutions', slug: 'display-solutions' },
    { label: 'Repair & Service Center', slug: 'repair-service-center' },
];

/**
 * Social profiles. Add the profile URL to show an icon; entries without a
 * URL are left out rather than linked to a guessed account.
 */
const social: { name: string; label: string; url: string | null }[] = [
    {
        name: 'linkedin',
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/company/green-means-ltd',
    },
    { name: 'facebook', label: 'Facebook', url: null },
    { name: 'instagram', label: 'Instagram', url: null },
    { name: 'x', label: 'X', url: null },
    { name: 'whatsapp', label: 'WhatsApp', url: null },
    { name: 'website', label: 'Website', url: 'https://www.greenmeans.rw' },
];

export default function SiteFooter() {
    return (
        <footer className="site-footer">
            <div className="footer-cta">
                <h2>
                    Have a Project That Needs
                    <br />a Reliable Technical Solution?
                </h2>
                <p>
                    Talk to Green Means Ltd about HVAC design and installation,
                    air conditioning, VRF systems,
                    <br className="hidden md:block" /> electronics, displays,
                    audio systems, maintenance, or equipment repair.
                </p>
                <div className="footer-actions">
                    <Btn href={contact.url()} label="Request a Quote" />
                    <Btn
                        href={services.url()}
                        label="Explore Our Services"
                        variant="btn-outline"
                    />
                </div>
            </div>

            <div className="footer-card">
                <div className="footer-grid">
                    <div className="footer-intro">
                        <Brand variant="lockup" />
                        <p>
                            A specialty trade contractor founded in 2020,
                            delivering HVAC, electronics, appliance, display,
                            audio, and technical service solutions.
                        </p>
                        <p className="footer-contact">
                            {pin}
                            <span>
                                30 KN 1 Road, Muhima
                                <br />
                                Kigali, Rwanda
                            </span>
                        </p>
                        <p className="footer-contact">
                            {map}
                            <span>
                                Serving Rwanda, Burundi &amp; Eastern DRC
                            </span>
                        </p>
                        <p className="footer-contact">
                            {phone}
                            <a href="tel:+250793084852">0793 084 852</a>
                        </p>
                        <p className="footer-contact">
                            {mail}
                            <a href="mailto:sales@greenmeans.rw">
                                sales@greenmeans.rw
                            </a>
                        </p>
                        <div className="social-row">
                            {social
                                .filter((profile) => profile.url)
                                .map((profile) => (
                                    <a
                                        key={profile.name}
                                        className="social-icon"
                                        href={profile.url as string}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={profile.label}
                                        title={profile.label}
                                    >
                                        {icons[profile.name]}
                                    </a>
                                ))}
                        </div>
                    </div>

                    <div className="footer-col">
                        <h3>Company</h3>
                        <ul>
                            {companyLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h3>Services</h3>
                        <ul>
                            {serviceLinks.map((link) => (
                                <li key={link.slug}>
                                    <Link href={showService.url(link.slug)}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="newsletter-panel">
                        <h3>Practical HVAC and technical insights</h3>
                        <p>
                            Occasional notes on system selection, maintenance,
                            and equipment care. No more than one email a month.
                        </p>
                        <NewsletterForm />
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        © {new Date().getFullYear()} Green Means Ltd. All rights
                        reserved.
                    </p>
                    <nav aria-label="Legal">
                        <Link href={privacyPolicy.url()}>Privacy Policy</Link>
                        <Link href={termsOfService.url()}>
                            Terms of Service
                        </Link>
                        <Link href={contact.url()}>Contact</Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
