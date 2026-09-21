import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { arrow } from '@/components/site/social-icons';
import { store } from '@/routes/newsletter';

export default function NewsletterForm() {
    const form = useForm({ email: '' });

    const submit = (event: FormEvent) => {
        event.preventDefault();

        form.post(store.url(), {
            preserveScroll: true,
            onSuccess: () => form.reset(),
        });
    };

    return (
        <form onSubmit={submit}>
            <label htmlFor="newsletter-email" className="sr-only">
                Email address
            </label>
            <div className="newsletter-field">
                <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    required
                    placeholder="Your email address"
                    autoComplete="email"
                    value={form.data.email}
                    onChange={(event) =>
                        form.setData('email', event.target.value)
                    }
                />
                <button
                    type="submit"
                    aria-label="Subscribe"
                    disabled={form.processing}
                >
                    {arrow}
                </button>
            </div>
            <p className="form-status" role="status">
                {form.errors.email ??
                    (form.wasSuccessful ? 'Thank you for subscribing.' : '')}
            </p>
        </form>
    );
}
