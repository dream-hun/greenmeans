import { Head } from '@inertiajs/react';
import { appear, PageHero, Section } from '@/components/site/ui';

export default function PrivacyPolicy() {
    return (
        <>
            <Head title="Privacy Policy">
                <meta
                    name="description"
                    content="How Green Means Ltd collects, uses, and protects the information you share with us."
                />
            </Head>

            <PageHero
                title="Privacy Policy"
                description="We respect your privacy and handle your data securely and responsibly."
            />

            <Section>
                <article
                    className="prose mx-auto max-w-[800px]"
                    {...appear('up', 0.4, true)}
                >
                    <h4>Introduction</h4>
                    <p>
                        Green Means Ltd values your privacy and is committed to
                        protecting your personal information. This policy
                        explains what information we collect through this
                        website, how we use it, and the choices available to
                        you.
                    </p>

                    <h4>Information We Collect</h4>
                    <p>
                        When you send an enquiry we collect the details you
                        provide: your name, company or organization, email
                        address, phone number, the service you are interested
                        in, the project location, and your message. We may also
                        collect basic usage information such as the pages
                        visited and the type of device and browser used.
                    </p>

                    <h4>How We Use Your Information</h4>
                    <p>
                        We use your information to respond to enquiries, prepare
                        quotations, schedule site assessments, deliver and
                        support the services you request, and improve this
                        website. If you subscribe to our updates, we use your
                        email address to send occasional technical information
                        and company news.
                    </p>

                    <h4>Sharing &amp; Disclosure</h4>
                    <p>
                        We do not sell your personal data. Information may be
                        shared with suppliers or technicians only where it is
                        necessary to deliver the service you have requested, or
                        where we are required to do so by law.
                    </p>

                    <h4>Data Security</h4>
                    <p>
                        We apply technical and organizational measures intended
                        to protect your information from unauthorized access,
                        loss, or misuse, and we keep enquiry records only as
                        long as they are needed for the purposes described here.
                    </p>

                    <h4>Your Rights</h4>
                    <p>
                        You may ask us to access, correct, or delete the
                        personal information we hold about you, withdraw consent
                        for future communications, or ask how your data has been
                        used. Contact us through the details on the contact page
                        to make a request.
                    </p>

                    <h4>Cookies</h4>
                    <p>
                        This website uses only the cookies required to keep your
                        session secure while you use our forms. You can manage
                        or block cookies through your browser settings.
                    </p>

                    <h4>Updates to This Policy</h4>
                    <p>
                        We may update this policy to reflect changes in our
                        practices or legal requirements. Any updates will be
                        posted on this page.
                    </p>
                </article>
            </Section>
        </>
    );
}
