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

export type PostBlock =
    | { heading: string }
    | { text: string }
    | { list: string[] };

export interface Post {
    slug: string;
    number: string;
    title: string;
    category: string;
    reading_time: string;
    featured: boolean;
    image: string;
    excerpt: string;
    body: PostBlock[];
}
