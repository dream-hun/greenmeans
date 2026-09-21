import { Head } from '@inertiajs/react';
import { appear, PageHero, Section } from '@/components/site/ui';

export default function TermsOfService() {
    return (
        <>
            <Head title="Terms of Service">
                <meta
                    name="description"
                    content="The terms that apply to the use of the Green Means Ltd website and to enquiries submitted through it."
                />
            </Head>

            <PageHero
                title="Terms of Service"
                description="The terms that apply when you use this website and when you send us an enquiry."
            />

            <Section>
                <article
                    className="prose mx-auto max-w-[800px]"
                    {...appear('up', 0.4, true)}
                >
                    <h4>Use of This Website</h4>
                    <p>
                        This website is provided by Green Means Ltd for
                        information about our HVAC, electronics, appliance,
                        display, audio, and technical service solutions. By
                        using the site you agree to use it lawfully and not to
                        interfere with its operation or security.
                    </p>

                    <h4>Information Accuracy</h4>
                    <p>
                        We take care to keep the information on this site
                        accurate and current. Product availability,
                        specifications, and service scope may change, and the
                        content here does not replace a written quotation or a
                        technical assessment of your site.
                    </p>

                    <h4>Enquiries and Quotations</h4>
                    <p>
                        An enquiry submitted through this website is a request
                        for information and does not create a contract. Work
                        begins only once scope, equipment, pricing, and
                        timeframe have been agreed in writing.
                    </p>

                    <h4>Services and Warranties</h4>
                    <p>
                        Equipment supplied by Green Means Ltd carries the
                        warranty offered by its manufacturer. Warranty cover may
                        be affected by installation conditions, operating
                        conditions, and maintenance, and the applicable terms
                        are confirmed for each project.
                    </p>

                    <h4>Intellectual Property</h4>
                    <p>
                        The content of this website, including text, layout, and
                        graphics, belongs to Green Means Ltd or its licensors
                        and may not be reproduced for commercial purposes
                        without permission.
                    </p>

                    <h4>External Links</h4>
                    <p>
                        This site may link to other websites. We are not
                        responsible for the content or practices of sites we do
                        not operate.
                    </p>

                    <h4>Changes to These Terms</h4>
                    <p>
                        We may update these terms from time to time. The version
                        published on this page applies to your use of the site.
                    </p>
                </article>
            </Section>
        </>
    );
}
