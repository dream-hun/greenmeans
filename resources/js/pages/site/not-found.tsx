import { appear, Btn, graphic } from '@/components/site/ui';
import { home } from '@/routes';

export default function NotFound() {
    return (
        <>
            <section className="page-hero section-space">
                <img
                    src={graphic('83c45GSJMNdIfVlnq6R8iWwMYlU.svg')}
                    alt="404"
                    className="mx-auto mb-16 w-full max-w-[650px]"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    {...appear('zoom', 0.2, true)}
                />
                <h1 {...appear('up', 0.4, true)}>Oops! Page Not Found</h1>
                <p {...appear('up', 0.4, true)}>
                    The page you are looking for has moved or no longer exists.
                    Head back to the home page, or tell us what you were looking
                    for and our team will point you to it.
                </p>
                <div className="mt-10" {...appear('up', 0.6, true)}>
                    <Btn href={home.url()} label="Back to home page" />
                </div>
            </section>
        </>
    );
}
