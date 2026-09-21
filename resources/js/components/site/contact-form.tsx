import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { SubmitButton } from '@/components/site/ui';
import { store } from '@/routes/contact';

interface Fields {
    name: string;
    company: string;
    email: string;
    phone: string;
    service: string;
    location: string;
    message: string;
    source: string;
}

const blank = (source: string): Fields => ({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    location: '',
    message: '',
    source,
});

/**
 * The full enquiry form used on the contact page.
 */
export function ContactForm({ services }: { services: string[] }) {
    const form = useForm<Fields>(blank('contact'));

    const submit = (event: FormEvent) => {
        event.preventDefault();

        form.post(store.url(), {
            preserveScroll: true,
            onSuccess: () => form.reset(),
        });
    };

    return (
        <form
            className="contact-form rounded-[22px] bg-white p-6 md:p-[33px] md:pb-[50px]"
            onSubmit={submit}
        >
            <h2 className="text-2xl font-medium">Tell Us About Your Request</h2>
            <p className="text-muted mt-5 mb-[45px]">
                Describe the project, equipment, fault, or service you need and
                our team will identify the appropriate next step.
            </p>
            <div className="grid gap-x-4 gap-y-6 sm:grid-cols-2">
                <label>
                    <span className="sr-only">Full Name</span>
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Full Name"
                        autoComplete="name"
                        required
                        value={form.data.name}
                        onChange={(event) =>
                            form.setData('name', event.target.value)
                        }
                    />
                </label>
                <label>
                    <span className="sr-only">Company / Organization</span>
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Company / Organization"
                        autoComplete="organization"
                        value={form.data.company}
                        onChange={(event) =>
                            form.setData('company', event.target.value)
                        }
                    />
                </label>
                <label>
                    <span className="sr-only">Email Address</span>
                    <input
                        className="form-input"
                        type="email"
                        placeholder="Email Address"
                        autoComplete="email"
                        required
                        value={form.data.email}
                        onChange={(event) =>
                            form.setData('email', event.target.value)
                        }
                    />
                </label>
                <label>
                    <span className="sr-only">Phone Number</span>
                    <input
                        className="form-input"
                        type="tel"
                        placeholder="Phone Number"
                        autoComplete="tel"
                        required
                        value={form.data.phone}
                        onChange={(event) =>
                            form.setData('phone', event.target.value)
                        }
                    />
                </label>
                <label className="sm:col-span-2">
                    <span className="sr-only">Service Required</span>
                    <select
                        className="form-input"
                        required
                        value={form.data.service}
                        onChange={(event) =>
                            form.setData('service', event.target.value)
                        }
                    >
                        <option value="">Service Required</option>
                        {services.map((service) => (
                            <option key={service}>{service}</option>
                        ))}
                        <option>Other</option>
                    </select>
                </label>
                <label className="sm:col-span-2">
                    <span className="sr-only">Project Location</span>
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Project Location"
                        value={form.data.location}
                        onChange={(event) =>
                            form.setData('location', event.target.value)
                        }
                    />
                </label>
                <label className="sm:col-span-2">
                    <span className="sr-only">Message</span>
                    <textarea
                        className="form-input min-h-[130px] resize-y"
                        placeholder="Message"
                        required
                        value={form.data.message}
                        onChange={(event) =>
                            form.setData('message', event.target.value)
                        }
                    />
                </label>
            </div>
            <SubmitButton
                label="Send Enquiry"
                className="mt-[45px] w-full"
                disabled={form.processing}
            />
            <FormStatus
                errors={Object.values(form.errors)}
                success={form.wasSuccessful}
            />
        </form>
    );
}

/**
 * The compact form shown beside a service description.
 */
export function ServiceEnquiryForm({ service }: { service: string }) {
    const form = useForm<Fields>({ ...blank('service'), service });

    const submit = (event: FormEvent) => {
        event.preventDefault();

        form.post(store.url(), {
            preserveScroll: true,
            onSuccess: () => form.reset('name', 'email', 'phone', 'message'),
        });
    };

    return (
        <form
            className="contact-form bg-forest rounded-[22px] p-8 text-white"
            onSubmit={submit}
        >
            <h2 className="text-[22px] font-medium">
                Have a question? Let’s talk
            </h2>
            <p className="mt-4 mb-7 text-sm text-white/75">
                Reach out to our team for quick answers, expert guidance, and
                the right solution for your needs.
            </p>
            <label className="mb-5 block text-sm">
                Your Name*
                <input
                    type="text"
                    required
                    autoComplete="name"
                    className="mt-2 block w-full rounded-md bg-white/10 px-3 py-3"
                    value={form.data.name}
                    onChange={(event) =>
                        form.setData('name', event.target.value)
                    }
                />
            </label>
            <label className="mb-5 block text-sm">
                Email Address*
                <input
                    type="email"
                    required
                    autoComplete="email"
                    className="mt-2 block w-full rounded-md bg-white/10 px-3 py-3"
                    value={form.data.email}
                    onChange={(event) =>
                        form.setData('email', event.target.value)
                    }
                />
            </label>
            <label className="mb-5 block text-sm">
                Phone Number*
                <input
                    type="tel"
                    required
                    autoComplete="tel"
                    className="mt-2 block w-full rounded-md bg-white/10 px-3 py-3"
                    value={form.data.phone}
                    onChange={(event) =>
                        form.setData('phone', event.target.value)
                    }
                />
            </label>
            <label className="mb-5 block text-sm">
                What can we help you find?*
                <input
                    type="text"
                    required
                    className="mt-2 block w-full rounded-md bg-white/10 px-3 py-3"
                    value={form.data.message}
                    onChange={(event) =>
                        form.setData('message', event.target.value)
                    }
                />
            </label>
            <SubmitButton
                label="Submit"
                variant="btn-white"
                className="mt-3 w-full"
                disabled={form.processing}
            />
            <FormStatus
                errors={Object.values(form.errors)}
                success={form.wasSuccessful}
            />
        </form>
    );
}

function FormStatus({
    errors,
    success,
}: {
    errors: (string | undefined)[];
    success: boolean;
}) {
    const message = errors.find(Boolean);

    return (
        <p className="form-status mt-4 text-sm" role="status">
            {message ??
                (success ? 'Thank you. Your enquiry has been sent.' : '')}
        </p>
    );
}
