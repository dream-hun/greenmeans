<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Seed the launch articles for the blog.
     */
    public function run(): void
    {
        foreach ($this->articles() as $article) {
            Post::query()->updateOrCreate(['slug' => $article['slug']], $article);
        }
    }

    /**
     * The articles published with the website.
     *
     * @return list<array{slug: string, title: string, category: string, featured: bool, image: string, published_at: string, excerpt: string, body: string}>
     */
    private function articles(): array
    {
        return [
            [
                'slug' => 'choosing-an-air-conditioning-system',
                'title' => 'What to Consider Before Choosing an Air-Conditioning System',
                'category' => 'HVAC',
                'featured' => true,
                'image' => '/site/optimized/ac-indoor-airflow.webp',
                'published_at' => '2026-09-14',
                'excerpt' => 'Choosing an air conditioner involves more than selecting a brand or unit size. Room dimensions, occupancy, heat sources, operating hours, building use, installation conditions, and maintenance requirements can all affect system selection.',
                'body' => <<<'MARKDOWN'
                    Selecting an air-conditioning system should begin with the space and its actual cooling requirements, not simply the appearance or advertised capacity of a unit.

                    A correctly selected system should match how the room or building is used, the conditions in which the equipment will operate, and the installation requirements of the site.

                    ## 1. Start With the Size and Use of the Space

                    Room size is an important factor, but it is not the only one. A technical assessment may also consider:

                    - Ceiling height
                    - Number of occupants
                    - Windows and solar exposure
                    - Heat-producing equipment
                    - Room function
                    - Operating hours
                    - Building layout

                    A meeting room used periodically has different requirements from a busy retail space or a building with multiple independently occupied zones.

                    ## 2. Consider the Type of System

                    Different applications require different air-conditioning configurations. A straightforward room may be served by an individual air-conditioning unit, while a larger building with multiple zones may benefit from a more centralized or flexible solution such as a VRF system.

                    The correct choice depends on the building layout, required level of control, operating pattern, available installation space, and project budget.

                    ## 3. Think About Energy Use

                    Air-conditioning equipment may operate for many hours, particularly in offices, commercial facilities, hospitality environments, and other frequently occupied spaces. Energy efficiency should therefore be considered during system selection rather than after installation.

                    The system should be appropriately sized and configured for the actual load. Installation quality and maintenance also affect how effectively the equipment operates over time.

                    ## 4. Plan the Installation Properly

                    Even suitable equipment can perform poorly if installation conditions are not properly considered. Planning should address:

                    - Indoor-unit positioning
                    - Outdoor-unit positioning
                    - Refrigerant piping
                    - Drainage
                    - Electrical requirements
                    - Air distribution
                    - Service access
                    - Manufacturer installation requirements

                    A technical site assessment can identify these issues before installation begins.

                    ## 5. Do Not Ignore Maintenance

                    Air-conditioning systems require ongoing care. Filters, coils, drainage, electrical components, refrigerant circuits, and other parts may require inspection or servicing depending on the system and operating conditions.

                    Preventive maintenance can help identify faults before they develop into larger technical problems and keeps service requirements visible rather than purely reactive.

                    ## 6. Work With a Qualified Technical Team

                    The process should connect system selection, supply, installation, testing, and maintenance. Green Means Ltd provides HVAC design, equipment supply, installation, maintenance, and repair services, including air-conditioning and VRF solutions.

                    For a new installation, replacement, or upgrade, provide the technical team with details about the building, rooms, intended use, existing systems, and expected operating conditions.
                    MARKDOWN,
            ],
            [
                'slug' => 'understanding-vrf-systems',
                'title' => 'Understanding VRF Systems',
                'category' => 'HVAC',
                'featured' => false,
                'image' => '/site/optimized/post-understanding-vrf.webp',
                'published_at' => '2026-09-07',
                'excerpt' => 'Learn how Variable Refrigerant Flow systems support individual temperature control across multiple zones and where this type of HVAC solution may be appropriate.',
                'body' => <<<'MARKDOWN'
                    A Variable Refrigerant Flow system serves several indoor units from a common outdoor unit, varying the flow of refrigerant to match the demand of each area. That makes it suited to buildings where rooms or zones need to be controlled independently.

                    ## Where VRF Fits

                    VRF is typically considered for buildings with multiple rooms or zones that are occupied at different times or to different densities: offices, hospitality facilities, institutional buildings, and mixed-use spaces.

                    ## What to Plan For

                    - Number of zones and how each one is used
                    - Routes available for refrigerant piping
                    - Indoor and outdoor unit positioning
                    - Electrical supply and drainage
                    - Access for servicing after handover

                    Green Means Ltd designs, supplies, and installs VRF systems, and provides maintenance and repair support once the system is operating.
                    MARKDOWN,
            ],
            [
                'slug' => 'preventive-air-conditioner-maintenance',
                'title' => 'Why Preventive Air-Conditioner Maintenance Matters',
                'category' => 'Maintenance',
                'featured' => false,
                'image' => '/site/optimized/ac-repair-technician.webp',
                'published_at' => '2026-08-31',
                'excerpt' => 'Routine inspection and servicing can help identify developing problems, maintain airflow, and support dependable system operation.',
                'body' => <<<'MARKDOWN'
                    Air-conditioning equipment works continuously in conditions that gradually affect its components. Routine inspection keeps those changes visible before they turn into a failure.

                    ## What Servicing Covers

                    - Filters and airflow
                    - Coils and heat exchange surfaces
                    - Drainage
                    - Electrical components
                    - Refrigerant circuits
                    - General performance checks

                    How often each item needs attention depends on the system and the conditions it operates in. A unit running long hours in a dusty environment needs a different schedule from one used occasionally.

                    Preventive maintenance also keeps service requirements planned rather than reactive, which usually means fewer interruptions and a clearer view of when components will need replacing.
                    MARKDOWN,
            ],
            [
                'slug' => 'what-is-an-air-handling-unit',
                'title' => 'What Is an Air Handling Unit?',
                'category' => 'HVAC',
                'featured' => false,
                'image' => '/site/optimized/post-what-is-ahu.webp',
                'published_at' => '2026-08-24',
                'excerpt' => 'A practical introduction to air handling units, their role in HVAC systems, and the basic functions they perform in moving and conditioning air.',
                'body' => <<<'MARKDOWN'
                    An air handling unit moves air through a building and conditions it on the way: filtering it, heating or cooling it, and delivering it to the spaces that need it.

                    ## Basic Functions

                    - Moving air through supply and return paths
                    - Filtering the air that enters the building
                    - Heating or cooling the air being distributed
                    - Supporting ventilation and air distribution

                    Because an air handling unit serves several spaces at once, its specification depends on the layout of the building, the duct routes available, the plant space, and how the served areas are occupied.

                    Green Means Ltd supplies and installs air handling units alongside heating systems, air conditioning, and VRF solutions.
                    MARKDOWN,
            ],
            [
                'slug' => 'indoor-vs-outdoor-digital-displays',
                'title' => 'Indoor vs Outdoor Digital Displays',
                'category' => 'Display Solutions',
                'featured' => false,
                'image' => '/site/optimized/display-billboard.webp',
                'published_at' => '2026-08-17',
                'excerpt' => 'The installation environment, brightness requirements, viewing distance, weather exposure, and intended use should all be considered when selecting a display solution.',
                'body' => <<<'MARKDOWN'
                    Indoor and outdoor displays are built for different conditions. Choosing between them starts with where the screen will be installed and who needs to read it.

                    ## What Changes Outdoors

                    - Brightness needed to stay readable in daylight
                    - Weather exposure and ingress protection
                    - Mounting and structural requirements
                    - Viewing distance and angle
                    - Access for servicing

                    Indoors, the emphasis usually shifts to viewing distance, ambient lighting, and how the display fits the room it serves: reception areas, retail floors, meeting rooms, or information points.

                    Send us your location, viewing requirements, installation environment, and intended use, and our team will recommend a suitable solution.
                    MARKDOWN,
            ],
            [
                'slug' => 'when-to-call-an-appliance-repair-technician',
                'title' => 'When Should You Call an Appliance Repair Technician?',
                'category' => 'Technical Support',
                'featured' => false,
                'image' => '/site/optimized/post-appliance-repair.webp',
                'published_at' => '2026-08-10',
                'excerpt' => 'Unusual noise, temperature problems, repeated shutdowns, error messages, or loss of normal functionality can indicate that equipment needs professional diagnosis.',
                'body' => <<<'MARKDOWN'
                    Most appliance faults announce themselves before they stop the equipment completely. Acting on those signs early usually keeps the repair smaller.

                    ## Signs Worth Checking

                    - Unusual noise or vibration
                    - Temperature problems in a refrigerator or air conditioner
                    - Repeated shutdowns or restarts
                    - Error messages on the display
                    - Loss of normal functionality

                    A technical diagnosis identifies the cause before parts are replaced, which avoids paying for components that were never the problem.

                    Our service centre covers mobile phones, televisions, refrigerators, air conditioners, and other supported electronic appliances.
                    MARKDOWN,
            ],
            [
                'slug' => 'planning-hvac-for-a-commercial-space',
                'title' => 'Planning HVAC for a Commercial Space',
                'category' => 'HVAC Design',
                'featured' => false,
                'image' => '/site/optimized/post-commercial-hvac-planning.webp',
                'published_at' => '2026-08-03',
                'excerpt' => 'Commercial HVAC planning should consider occupancy, room use, zoning, operating schedules, ventilation, equipment access, and future maintenance.',
                'body' => <<<'MARKDOWN'
                    Commercial buildings rarely behave as one space. Different areas are occupied at different times, by different numbers of people, for different purposes, and the HVAC plan has to reflect that.

                    ## What the Plan Should Address

                    - Occupancy and how each room is used
                    - Zoning and the level of control each zone needs
                    - Operating schedules across the week
                    - Ventilation requirements
                    - Equipment positioning and access
                    - Maintenance over the life of the system

                    Decisions made at this stage determine how the building runs for years: the capacity installed, the way zones are controlled, and how easily equipment can be serviced.

                    Green Means Ltd carries this through from assessment and design to supply, installation, commissioning, and ongoing maintenance.
                    MARKDOWN,
            ],
        ];
    }
}
