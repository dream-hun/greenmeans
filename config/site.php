<?php

/*
|--------------------------------------------------------------------------
| Green Means Ltd website content
|--------------------------------------------------------------------------
|
| Marketing content for the public website. Copy is based on the Green Means
| Ltd company profile. Entries marked as placeholders must be replaced with
| verified project, partner, and contact data before publication.
|
*/

return [

    'company' => [
        'name' => 'Green Means Ltd',
        'short_name' => 'Green Means',
        'founded' => 2020,
        'address' => [
            'street' => '30 KN 1 Road',
            'area' => 'Muhima, Kigali',
            'country' => 'Rwanda',
        ],
        'phone' => '0793 084 852',
        'phone_link' => '+250793084852',
        'email' => 'sales@greenmeans.rw',
        'website' => 'www.greenmeans.rw',
        'linkedin' => 'https://www.linkedin.com/company/green-means-ltd',
        'areas' => ['Rwanda'],
    ],

    /*
     * Factual figures taken from the company profile. No performance or
     * customer metrics are published until they have been verified.
     */
    'stats' => [
        ['label' => 'Year Founded', 'value' => 2020, 'start' => 2016, 'suffix' => '', 'grouping' => false],
        ['label' => 'Service Categories', 'value' => 8, 'start' => 1, 'suffix' => ''],
        ['label' => 'Repair Categories', 'value' => 5, 'start' => 1, 'suffix' => ''],
    ],

    'faqs' => [
        [
            'question' => 'What services does Green Means Ltd provide?',
            'answer' => 'HVAC design, equipment supply, installation, maintenance and repair, plus electronics and home appliances, indoor and outdoor displays, sound and audio solutions, and an electronics repair service centre.',
        ],
        [
            'question' => 'What information do you need for an HVAC quote?',
            'answer' => 'The project location, type of building or room, approximate floor area, number of rooms or zones, any existing HVAC equipment, the service required, and your preferred timeframe.',
        ],
        [
            'question' => 'Do you support equipment after installation?',
            'answer' => 'Yes. We provide preventive maintenance, fault diagnosis, repairs, performance checks, component replacement where required, and technical support for installed systems.',
        ],
        [
            'question' => 'What equipment can your service centre repair?',
            'answer' => 'Our service centre covers mobile phones, televisions, refrigerators, air conditioners, and other supported electronic appliances.',
        ],
    ],

    /*
     * The four-step working method described on the About page.
     */
    'approach' => [
        [
            'step' => '01',
            'title' => 'Understand',
            'description' => "We review the client's requirements, site conditions, intended use, and technical priorities.",
            'image' => 'approach-understand',
            'pill' => 'Step 01',
        ],
        [
            'step' => '02',
            'title' => 'Design & Recommend',
            'description' => 'Our team develops or recommends a solution appropriate for the required application.',
            'image' => 'approach-design',
            'pill' => 'Step 02',
        ],
        [
            'step' => '03',
            'title' => 'Supply & Install',
            'description' => 'We source suitable equipment and complete professional installation and commissioning.',
            'image' => 'approach-supply',
            'pill' => 'Step 03',
        ],
        [
            'step' => '04',
            'title' => 'Maintain & Support',
            'description' => 'We provide maintenance and repair support to help systems continue operating effectively.',
            'image' => 'approach-maintain',
            'pill' => 'Ongoing',
        ],
    ],

    'values' => [
        [
            'label' => 'Value 1',
            'title' => 'Sustainability',
            'description' => 'We consider energy efficiency and environmental responsibility when selecting and delivering solutions.',
        ],
        [
            'label' => 'Value 2',
            'title' => 'Quality',
            'description' => 'We aim to provide dependable products and services and work with reputable manufacturers and suppliers.',
        ],
        [
            'label' => 'Value 3',
            'title' => 'Customer Focus',
            'description' => "We take time to understand each customer's needs and recommend solutions suited to the intended application.",
        ],
        [
            'label' => 'Value 4',
            'title' => 'Technical Support',
            'description' => 'Our work extends beyond product supply. We provide installation, maintenance, repair, and after-sales technical support.',
        ],
    ],

    /*
     * The working method described on the About page.
     */
    'how_we_work' => [
        [
            'step' => '01',
            'title' => 'Requirement Assessment',
            'description' => 'We establish what the client needs, how the space or equipment will be used, and what technical constraints must be considered.',
        ],
        [
            'step' => '02',
            'title' => 'Technical Planning',
            'description' => 'For HVAC and related installations, we identify suitable equipment, system configurations, and installation requirements.',
        ],
        [
            'step' => '03',
            'title' => 'Professional Execution',
            'description' => 'Our technicians complete installation and associated technical work with attention to correct operation and system performance.',
        ],
        [
            'step' => '04',
            'title' => 'After-Sales Support',
            'description' => 'Maintenance and repair services help clients protect their equipment and address technical issues after installation or purchase.',
        ],
    ],

    /*
     * Stages of a project, shown on the Projects page.
     */
    'project_process' => [
        ['step' => '01', 'title' => 'Site & Requirement Review', 'description' => 'We establish the technical requirement and inspect relevant site conditions where required.'],
        ['step' => '02', 'title' => 'Solution Development', 'description' => 'We identify equipment and a technical approach suited to the application.'],
        ['step' => '03', 'title' => 'Supply & Installation', 'description' => 'The approved equipment is supplied and installed by the technical team.'],
        ['step' => '04', 'title' => 'Testing & Handover', 'description' => 'Installed systems are checked for correct operation before handover.'],
        ['step' => '05', 'title' => 'Maintenance Support', 'description' => 'Where required, we provide ongoing servicing and repair support.'],
    ],

    /*
     * Service catalogue. Order defines the numbering shown on the website.
     */
    'services' => [
        [
            'slug' => 'hvac-design',
            'seo_title' => 'HVAC Design & System Sizing in Rwanda',
            'meta_description' => 'HVAC design in Rwanda: cooling load assessment, equipment sizing, VRF planning and air distribution for homes and commercial buildings. Request a design review.',
            'label' => 'HVAC Design',
            'title' => 'HVAC Design',
            'excerpt' => 'We assess cooling, heating, ventilation, space, occupancy, and operational requirements before recommending an appropriate HVAC solution.',
            'summary' => 'Good HVAC performance begins with the right system design. We evaluate the intended use of the building or space, cooling and heating requirements, ventilation needs, system configuration, equipment placement, and operational priorities.',
            'image' => 'ac-indoor-airflow',
            'highlights' => [
                'Requirement-led system selection',
                'Equipment sizing and configuration',
                'Air-distribution planning',
                'Energy-efficiency considerations',
            ],
            'features' => [
                'HVAC requirement assessment',
                'System selection',
                'Equipment sizing and configuration',
                'VRF system planning',
                'Installation planning',
            ],
            'intro' => 'The objective of our design work is a practical system that delivers comfort and efficient operation. We start from how the building or space is actually used, then work through capacity, configuration, equipment placement, and the installation requirements of the site.',
            'included' => [
                'HVAC requirement assessment',
                'System selection',
                'Equipment sizing and configuration',
                'VRF system planning',
                'Air-distribution considerations',
                'Installation planning',
                'Energy-efficiency considerations',
            ],
            'results' => [
                'A system matched to the actual load of the space',
                'Clear equipment and configuration recommendations',
                'Installation requirements identified before work begins',
                'Energy use considered during selection rather than after',
            ],
        ],
        [
            'slug' => 'hvac-equipment-supply',
            'seo_title' => 'HVAC & AC Equipment Supplier in Kigali',
            'meta_description' => 'Air conditioners, VRF systems, heating and air handling units supplied in Kigali, matched to your project and backed by installation and support. Get a quote.',
            'label' => 'Equipment Supply',
            'title' => 'HVAC Equipment Supply',
            'excerpt' => 'We supply HVAC equipment for residential, commercial, institutional, and other applications, selected according to the project requirements.',
            'summary' => 'We supply air-conditioning systems, VRF systems, heating systems, air handling units, and associated HVAC equipment and components, working with reputable manufacturers and suppliers.',
            'image' => 'ac-outdoor-condenser',
            'highlights' => [
                'Air-conditioning systems',
                'VRF systems',
                'Heating systems',
                'Air handling units',
            ],
            'features' => [
                'Air-conditioning systems',
                'VRF systems',
                'Heating systems',
                'Air handling units',
                'Associated HVAC equipment and components',
            ],
            'intro' => 'Equipment is selected according to the requirements of the project rather than a fixed catalogue. We work with reputable manufacturers and suppliers to provide dependable equipment backed by professional installation and technical support.',
            'included' => [
                'Air-conditioning systems',
                'VRF systems',
                'Heating systems',
                'Air handling units',
                'Associated HVAC equipment and components',
                'Supply coordinated with installation planning',
            ],
            'results' => [
                'Equipment matched to the project requirement',
                'Supply from reputable manufacturers and suppliers',
                'Installation and technical support from one team',
                'Support for residential, commercial, and institutional applications',
            ],
        ],
        [
            'slug' => 'hvac-installation',
            'seo_title' => 'AC & HVAC Installation in Kigali, Rwanda',
            'meta_description' => 'Professional air conditioner, VRF and air handling unit installation in Kigali, with refrigerant piping, testing and commissioning. Book a site assessment.',
            'label' => 'HVAC Installation',
            'title' => 'HVAC Installation',
            'excerpt' => 'Our technicians install HVAC systems with attention to equipment positioning, connections, system configuration, testing, and operational performance.',
            'summary' => 'Installation covers air conditioners, VRF systems, heating systems, and air handling units, including system testing and commissioning before handover.',
            'image' => 'ac-outdoor-bank',
            'highlights' => [
                'Correct equipment positioning',
                'Refrigerant piping and drainage',
                'System testing and commissioning',
                'Service access considered',
            ],
            'features' => [
                'Air-conditioner installation',
                'VRF system installation',
                'Heating-system installation',
                'Air handling unit installation',
                'System testing and commissioning',
            ],
            'intro' => 'Even suitable equipment can perform poorly if installation conditions are not properly considered. Our technicians work to the manufacturer requirements of the equipment supplied and check operation before handover.',
            'included' => [
                'Air-conditioner installation',
                'VRF system installation',
                'Heating-system installation',
                'Air handling unit installation',
                'Indoor and outdoor unit positioning',
                'Refrigerant piping, drainage, and electrical requirements',
                'System testing and commissioning',
            ],
            'results' => [
                'Installation completed to manufacturer requirements',
                'Systems checked for correct operation before handover',
                'Air distribution and service access considered',
                'A single team from supply through commissioning',
            ],
        ],
        [
            'slug' => 'hvac-maintenance-repair',
            'seo_title' => 'AC Repair & HVAC Maintenance in Kigali',
            'meta_description' => 'AC repair, servicing and preventive HVAC maintenance in Kigali: fault diagnosis, refrigerant and coil checks, part replacement. Book a technician today.',
            'label' => 'Maintenance & Repair',
            'title' => 'HVAC Maintenance & Repair',
            'excerpt' => 'Regular maintenance helps HVAC equipment maintain performance and reduces the risk of avoidable failures.',
            'summary' => 'Our support covers preventive maintenance, air-conditioner servicing, fault diagnosis, repairs, performance checks, and component replacement where required.',
            'image' => 'ac-repair-technician',
            'highlights' => [
                'Preventive maintenance',
                'Fault diagnosis',
                'Performance checks',
                'Technical support for installed systems',
            ],
            'features' => [
                'Preventive maintenance',
                'Air-conditioner servicing',
                'Fault diagnosis and HVAC repairs',
                'Performance checks',
                'Component replacement where required',
            ],
            'intro' => 'Filters, coils, drainage, electrical components, and refrigerant circuits may require inspection or servicing depending on the system and operating conditions. Preventive maintenance can identify faults before they develop into larger technical problems.',
            'included' => [
                'Preventive maintenance',
                'Air-conditioner servicing',
                'Fault diagnosis',
                'HVAC repairs',
                'Performance checks',
                'Component replacement where required',
                'Technical support for installed systems',
            ],
            'results' => [
                'Developing faults identified earlier',
                'Airflow and system performance maintained',
                'Service requirements planned rather than reactive',
                'Support for systems we installed and systems we did not',
            ],
        ],
        [
            'slug' => 'electronics-home-appliances',
            'seo_title' => 'Electronics & Home Appliances in Kigali',
            'meta_description' => 'TVs, refrigerators, washing machines, soundbars and home appliances supplied in Kigali for homes, offices and hotels, with after-sales support. Ask for a quote.',
            'label' => 'Electronics & Appliances',
            'title' => 'Electronics & Home Appliances',
            'excerpt' => 'We supply televisions, refrigerators, washing machines, home-theatre systems, soundbars, small appliances, and other electronics.',
            'summary' => 'Green Means Ltd supplies electronics and appliances for homes, offices, hospitality facilities, institutions, and commercial environments.',
            'image' => 'service-electronics-appliances',
            'highlights' => [
                'Televisions and home theatre',
                'Refrigerators and washing machines',
                'Soundbars and small appliances',
                'Supported consumer electronics',
            ],
            'features' => [
                'Televisions',
                'Refrigerators and washing machines',
                'Home-theatre systems and soundbars',
                'Small appliances',
                'Other supported consumer electronics',
            ],
            'intro' => 'We supply electronics and appliances for homes, offices, hospitality facilities, institutions, and commercial environments, with the same technical support and repair service that backs our HVAC work.',
            'included' => [
                'Televisions',
                'Refrigerators',
                'Washing machines',
                'Home-theatre systems',
                'Soundbars',
                'Small appliances',
                'Other supported consumer electronics',
            ],
            'results' => [
                'Products selected for the space and intended use',
                'Supply from reputable manufacturers and suppliers',
                'After-sales technical support',
                'Repair service for supported products',
            ],
        ],
        [
            'slug' => 'display-solutions',
            'seo_title' => 'Indoor & Outdoor Digital Displays, Rwanda',
            'meta_description' => 'Indoor and outdoor digital display screens for retail, hospitality and corporate spaces in Rwanda, selected for brightness and viewing distance. Get a quote.',
            'label' => 'Display Solutions',
            'title' => 'Indoor & Outdoor Display Solutions',
            'excerpt' => 'We provide display solutions for organizations that need clear digital communication in indoor or outdoor environments.',
            'summary' => 'Applications include corporate communication, retail displays, hospitality, information displays, public-facing digital communication, and promotional or presentation environments.',
            'image' => 'display-billboard',
            'highlights' => [
                'Indoor and outdoor installations',
                'Brightness matched to the environment',
                'Viewing distance considered',
                'Installation and technical support',
            ],
            'features' => [
                'Corporate communication displays',
                'Retail and hospitality displays',
                'Information displays',
                'Public-facing digital communication',
                'Promotional and presentation environments',
            ],
            'intro' => 'The installation environment, brightness requirements, viewing distance, weather exposure, and intended use should all be considered when selecting a display solution. Send us your location, viewing requirements, installation environment, and intended use so we can recommend a suitable solution.',
            'included' => [
                'Requirement and site review',
                'Indoor display solutions',
                'Outdoor display solutions',
                'Installation and mounting',
                'Configuration and testing',
                'After-sales technical support',
            ],
            'results' => [
                'Displays matched to the viewing environment',
                'Brightness and weather exposure accounted for',
                'Installation planned around the site',
                'Ongoing technical support',
            ],
        ],
        [
            'slug' => 'sound-audio-solutions',
            'seo_title' => 'Sound & Audio System Installation, Kigali',
            'meta_description' => 'Sound and audio systems for offices, meeting rooms, hotels, retail and homes in Kigali, supplied, installed and configured for your space. Request a quote.',
            'label' => 'Sound & Audio',
            'title' => 'Sound & Audio Solutions',
            'excerpt' => 'We supply sound and audio solutions according to the size and use of the space.',
            'summary' => 'Applications include offices, meeting rooms, hospitality environments, retail spaces, institutional facilities, and home entertainment.',
            'image' => 'service-sound-audio',
            'highlights' => [
                'Offices and meeting rooms',
                'Hospitality and retail spaces',
                'Institutional facilities',
                'Home entertainment',
            ],
            'features' => [
                'Offices and meeting rooms',
                'Hospitality environments',
                'Retail spaces',
                'Institutional facilities',
                'Home entertainment',
            ],
            'intro' => 'Sound solutions are selected according to the size and use of the space. Tell us how the room is used, how many people it serves, and what equipment is already installed, and we will recommend an appropriate configuration.',
            'included' => [
                'Requirement and space review',
                'Equipment selection',
                'Supply of sound and audio equipment',
                'Installation and configuration',
                'Testing and handover',
                'After-sales technical support',
            ],
            'results' => [
                'Audio matched to the size and use of the space',
                'Equipment selected for the intended application',
                'Professional installation and configuration',
                'Technical support after handover',
            ],
        ],
        [
            'slug' => 'repair-service-center',
            'seo_title' => 'Refrigerator, TV & AC Repair in Kigali',
            'meta_description' => 'Refrigerator, fridge, TV, air conditioner and phone repair in Kigali. Our service centre diagnoses faults before replacing parts. Contact us for a repair.',
            'label' => 'Repair & Service',
            'title' => 'Repair & Service Center',
            'excerpt' => 'Our service center provides technical diagnosis and repair for supported electronics and appliances.',
            'summary' => 'Repair categories include mobile phones, televisions, refrigerators, air conditioners, and other supported appliances and electronics.',
            'image' => 'service-repair-center',
            'highlights' => [
                'Mobile phones',
                'Televisions',
                'Refrigerators',
                'Air conditioners',
            ],
            'features' => [
                'Mobile phones',
                'Televisions',
                'Refrigerators',
                'Air conditioners',
                'Other supported appliances and electronics',
            ],
            'intro' => 'Unusual noise, temperature problems, repeated shutdowns, error messages, or loss of normal functionality can indicate that equipment needs professional diagnosis. Our service centre provides technical diagnosis and repair for supported electronics and appliances.',
            'included' => [
                'Technical diagnosis',
                'Mobile-phone repair',
                'Television repair',
                'Refrigerator repair',
                'Air-conditioner repair and maintenance',
                'Other supported appliances and electronics',
            ],
            'results' => [
                'Faults diagnosed before parts are replaced',
                'Repairs carried out by trained technicians',
                'Support for equipment we supplied and equipment we did not',
                'Advice on whether repair or replacement is appropriate',
            ],
        ],
    ],

    /*
     * Capability showcases. The public company profile does not provide
     * verified client projects, so these entries describe the work Green
     * Means Ltd delivers. Replace them with verified project names, clients,
     * locations, dates, and results before publication.
     */
    'projects' => [
        [
            'slug' => 'vrf-system-installation',
            'seo_title' => 'VRF System Installation in Rwanda',
            'meta_description' => 'VRF system design, supply and installation in Rwanda for buildings that need independent temperature control across multiple rooms or zones. Talk to our team.',
            'name' => 'VRF System Installation',
            'category' => 'VRF Systems',
            'status' => 'Capability showcase',
            'summary' => 'Variable Refrigerant Flow systems for buildings that require flexible temperature control across multiple rooms or zones.',
            'image' => 'ac-outdoor-condenser',
            'overview' => 'We design, supply, and install VRF systems for buildings where different rooms or zones need independent temperature control. The system configuration follows the building layout, the required level of control, the operating pattern, and the space available for installation.',
            'requirement' => 'Before specifying a VRF system we review the number of zones, how each area is used and occupied, the available routes for refrigerant piping, the electrical supply, and where indoor and outdoor units can be positioned and serviced.',
            'outcome' => 'The installed system is tested and commissioned before handover, and we remain available for preventive maintenance, fault diagnosis, and component replacement over the life of the installation.',
        ],
        [
            'slug' => 'air-conditioning-installation',
            'seo_title' => 'Air Conditioning Installation, Rwanda',
            'meta_description' => 'Air conditioning supply, installation, maintenance and repair for homes, offices and institutions in Rwanda, sized to the real cooling load. Request a quote.',
            'name' => 'Air Conditioning Installation',
            'category' => 'Air Conditioning',
            'status' => 'Capability showcase',
            'summary' => 'Supply, installation, maintenance, and repair of air-conditioning systems for residential, commercial, institutional, and other built environments.',
            'image' => 'ac-indoor-split',
            'overview' => 'Air-conditioning work covers everything from a single room to a building with several independently occupied areas. We size and position equipment for the actual load rather than the advertised capacity of a unit.',
            'requirement' => 'The assessment considers room size and ceiling height, occupancy, windows and solar exposure, heat-producing equipment, room function, and operating hours, along with the drainage and electrical requirements of the site.',
            'outcome' => 'Systems are commissioned, handed over with operating guidance, and supported by servicing, fault diagnosis, and repair as required.',
        ],
        [
            'slug' => 'heating-air-handling-units',
            'seo_title' => 'Heating & Air Handling Units in Rwanda',
            'meta_description' => 'Heating systems and air handling units in Rwanda, specified around ventilation needs, duct routes and service access, then tested before handover. Get in touch.',
            'name' => 'Heating & Air Handling Units',
            'category' => 'Heating & Ventilation',
            'status' => 'Capability showcase',
            'summary' => 'Heating systems and air handling units designed to support indoor comfort, ventilation, and effective air distribution.',
            'image' => 'project-heating-ahu',
            'overview' => 'Air handling units move and condition air for a building, while heating systems support comfort where the climate or application requires it. Both are specified around ventilation needs and the way air has to be distributed through the space.',
            'requirement' => 'We review the building layout, ventilation requirements, plant space, duct routes, access for servicing, and the way the spaces served are occupied and scheduled.',
            'outcome' => 'Installed equipment is tested for correct operation before handover, with maintenance and repair support available afterwards.',
        ],
        [
            'slug' => 'display-installations',
            'seo_title' => 'Indoor & Outdoor Display Installation',
            'meta_description' => 'Indoor and outdoor display installations for business, hospitality, retail and event spaces in Rwanda, configured and tested on site. Discuss your project.',
            'name' => 'Indoor & Outdoor Displays',
            'category' => 'Displays',
            'status' => 'Capability showcase',
            'summary' => 'Indoor and outdoor display systems for business, institutional, hospitality, retail, and event environments.',
            'image' => 'display-billboard',
            'overview' => 'Display work covers corporate communication, retail and hospitality displays, information screens, and public-facing digital communication, indoors or outdoors.',
            'requirement' => 'Selection depends on the installation environment, brightness requirements, viewing distance, weather exposure, mounting position, and the intended use of the screen.',
            'outcome' => 'Displays are installed, configured, and tested on site, with technical support available after handover.',
        ],
        [
            'slug' => 'sound-audio-systems',
            'seo_title' => 'Sound & Audio System Projects in Rwanda',
            'meta_description' => 'Sound and audio systems for meeting rooms, hospitality and retail spaces in Rwanda, specified for room size and use, installed and tested. Discuss your project.',
            'name' => 'Sound & Audio Systems',
            'category' => 'Audio Solutions',
            'status' => 'Capability showcase',
            'summary' => 'Sound and audio solutions supplied according to the size and use of the space, from meeting rooms to hospitality and retail environments.',
            'image' => 'project-sound-audio-systems',
            'overview' => 'Audio solutions are specified for the room and the way it is used: offices, meeting rooms, hospitality environments, retail spaces, institutional facilities, and home entertainment.',
            'requirement' => 'We look at the size and shape of the space, how many people it serves, existing equipment, and how the system will be operated day to day.',
            'outcome' => 'Equipment is installed, configured, and tested before handover, with after-sales technical support.',
        ],
        [
            'slug' => 'electronics-appliance-supply',
            'seo_title' => 'Electronics & Appliance Supply, Rwanda',
            'meta_description' => 'Televisions, refrigerators, washing machines and home-theatre systems supplied for homes, offices and commercial facilities in Rwanda. Request a quote today.',
            'name' => 'Electronics & Appliance Supply',
            'category' => 'Electronics',
            'status' => 'Capability showcase',
            'summary' => 'Televisions, refrigerators, washing machines, home-theatre systems, soundbars, and small appliances for homes, offices, and commercial facilities.',
            'image' => 'project-electronics-supply',
            'overview' => 'We supply electronics and home appliances for homes, offices, hospitality facilities, institutions, and commercial environments, sourced through reputable manufacturers and suppliers.',
            'requirement' => 'Product selection follows the intended use of the space, the number of users, the installation environment, and the level of after-sales support required.',
            'outcome' => 'Supplied products are backed by installation where applicable, after-sales technical support, and our repair and service centre.',
        ],
    ],

];
