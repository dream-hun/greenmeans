const paths: Record<string, string> = {
    'hvac-design':
        'M6 22V3h12v19 M3 22h18 M9 7h1 M14 7h1 M9 11h1 M14 11h1 M9 15h1 M14 15h1 M10 22v-3h4v3',
    'hvac-equipment-supply': 'M3 8l9-5 9 5v8l-9 5-9-5Z M3 8l9 5 9-5 M12 13v10',
    'hvac-installation':
        'M5 9h14l2 10H3L5 9Z M7 14h10 M10 9l-1 10 M14 9l1 10 M12 2v3 M5 4l2 2 M19 4l-2 2',
    'hvac-maintenance-repair':
        'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8 M12 2v3 M12 19v3 M2 12h3 M19 12h3 M5 5l2 2 M17 17l2 2 M19 5l-2 2 M7 17l-2 2',
    'electronics-home-appliances': 'M3 6h18v11H3Z M8 21h8 M12 17v4 M7 10h4',
    'display-solutions': 'M4 4h16v12H4Z M12 16v4 M8 20h8 M7 8h6 M7 12h9',
    'sound-audio-solutions':
        'M11 5 6 9H3v6h3l5 4Z M16 9a4 4 0 0 1 0 6 M19 6a8 8 0 0 1 0 12',
    'repair-service-center':
        'm9 3 3-1 4 7-4 1 M18 10l3 3-4 7-2-3 M12 21H6l-4-7 4 1 M5 10l4-7',
};

export default function ServiceIcon({ slug }: { slug: string }) {
    return (
        <span className="service-icon">
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <path d={paths[slug] ?? paths['hvac-design']} />
            </svg>
        </span>
    );
}
