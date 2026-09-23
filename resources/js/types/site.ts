export interface Stat {
    label: string;
    value: number;
    start: number;
    suffix: string;
    grouping?: boolean;
}

export interface Faq {
    question: string;
    answer: string;
}

export interface Value {
    label: string;
    title: string;
    description: string;
}

export interface Step {
    step: string;
    title: string;
    description: string;
    image?: string;
    pill?: string;
}

export interface Service {
    slug: string;
    number: string;
    label: string;
    title: string;
    excerpt: string;
    summary: string;
    image: string;
    highlights: string[];
    features: string[];
    intro: string;
    included: string[];
    results: string[];
}

export interface Project {
    slug: string;
    number: string;
    name: string;
    category: string;
    status: string;
    summary: string;
    image: string;
    overview: string;
    requirement: string;
    outcome: string;
}

export interface PostSummary {
    slug: string;
    title: string;
    category: string;
    excerpt: string;
    image: string | null;
    image_alt: string;
    reading_time: string;
    featured: boolean;
    published_at: string | null;
}

export interface Post extends PostSummary {
    body: string;
    updated_at: string | null;
}

export interface Seo {
    title: string;
    description: string;
    canonical: string;
    image: string;
    image_alt: string;
    type: string;
    robots: string;
    site_name: string;
    locale: string;
    published_time: string | null;
    modified_time: string | null;
    schema: string;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface Paginated<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    prev_page_url: string | null;
    next_page_url: string | null;
    links: PaginationLink[];
}
