import { 
  Zap, 
  Settings, 
  Wrench, 
  Sun, 
  Utensils, 
  Wind, 
  Flame, 
  Monitor 
} from 'lucide-react';

export const allServices = [
  {
    id: 'generator-solutions',
    num: '01',
    title: 'Generator Solutions',
    category: 'Heavy Power Generation',
    badge: '15 – 2500 kVA',
    icon: Zap,
    image: '/assets/services/generator-main.jpg',
    secondaryImage: '/assets/services/generator-cummins-perkins.jpg',
    shortDesc: 'Reliable power generation solutions designed to ensure uninterrupted operations for commercial and industrial facilities.',
    longDesc: 'From single-unit prime power installations to complex multi-megawatt synchronized industrial power plants, KPS delivers turnkey generator solutions. We partner with world-leading engine manufacturers to guarantee rock-solid electrical uptime, fuel efficiency, and emergency power readiness.',
    offerings: [
      'Sales of New and Used Generators',
      'Generator Rental Services (Prime & Standby Fleet)',
      'Generator Repair, Rebuilds & Scheduled Maintenance',
      'OEM Spare Parts Supply & Preventative Filter Kits',
      'Annual Maintenance Contracts (AMC Coverage)',
      'Operations and Maintenance (O&M) Protocols',
      'Soundproof & Weatherproof Generator Canopies'
    ],
    capacity: '15 KVA to 2500 KVA',
    brands: ['LOVOL', 'Perkins', 'Cummins', 'Weichai', 'VMAN', 'Stamford', 'Leroy-Somer'],
    specs: [
      { label: 'Power Range', value: '15 kVA – 2500 kVA' },
      { label: 'Engine Alliances', value: 'Perkins, Cummins, Lovol, Weichai, VMAN' },
      { label: 'Alternator Standard', value: 'Stamford / Leroy-Somer (Class H)' },
      { label: 'Acoustic Attenuation', value: '68–75 dBA @ 7m Enclosures' },
      { label: 'Voltage Output', value: '230V / 400V 50Hz 3-Phase' },
      { label: 'Fuel Options', value: 'High-Speed Diesel / Natural Gas' }
    ]
  },
  {
    id: 'electrical-engineering-panels',
    num: '02',
    title: 'Electrical Engineering & Panels',
    category: 'Switchgear & Power Distribution',
    badge: 'IEC Compliant',
    icon: Settings,
    image: '/assets/services/electrical-panel-switchgear.jpg',
    secondaryImage: '/assets/services/electrical-ats-panel.jpg',
    shortDesc: 'Complete electrical engineering solutions, including power distribution, control systems, and industrial electrical infrastructure.',
    longDesc: 'Engineered in-house to stringent international standards, our custom switchgear assemblies protect heavy industrial plant assets. We design and build high-efficiency low and high tension distribution switchboards, automated transfer panels, and power factor correction units.',
    offerings: [
      'Low Tension (LT) Electrical Switchgear Panels',
      'High Tension (HT) Substation Distribution Panels',
      'Automatic Transfer Switch (ATS) Panels',
      'Auto Mains Failure (AMF) Synchronization Panels',
      'Power Factor Correction (PFC) Capacitor Bank Panels',
      'Distribution Boards (DB Boxes & Feeder Pillars)',
      'Electrical Panel Installation & Site Commissioning',
      'Electrical Panel Maintenance & Thermal Diagnostics'
    ],
    capacity: 'Up to 6300A Busbar Capacity',
    brands: ['Schneider Electric', 'ABB', 'Siemens', 'Deep Sea Electronics (DSE)'],
    specs: [
      { label: 'Design Compliance', value: 'IEC 61439-1/2 & IEC 60947' },
      { label: 'Enclosure Protection', value: 'IP54 / IP55 Weatherproof Sheet' },
      { label: 'Busbar Purity', value: '99.9% Electrolytic Copper Busbars' },
      { label: 'Controller Systems', value: 'DeepSea DSE / ComAp Smart Sync' },
      { label: 'Form of Separation', value: 'Form 2b, 3b, and 4b Available' },
      { label: 'Testing Protocol', value: 'Dielectric & Micro-Ohm Contact Tested' }
    ]
  },
  {
    id: 'industrial-fabrication',
    num: '03',
    title: 'Industrial Fabrication',
    category: 'Heavy Metal Engineering',
    badge: 'Precision CRCA Steel',
    icon: Wrench,
    image: '/assets/services/fabrication-canopy-tanks.jpg',
    secondaryImage: '/assets/services/fabrication-plant.jpg',
    shortDesc: 'Custom industrial fabrication solutions engineered for durability, reliability, and demanding operational environments.',
    longDesc: 'Our heavy fabrication facility utilizes laser cutting, CNC hydraulic press brakes, and electrostatic 9-tank powder coating to craft soundproof generator canopies, underground bulk fuel reservoirs, and heavy mobile towing chassis tailored to exact client site drawings.',
    offerings: [
      'Generator Soundproof Canopies (Weatherproof)',
      'Industrial Storage Tanks (Overhead & Underground)',
      'Bulk Diesel & Chemical Fuel Tanks',
      'Generator Heavy-Duty Towing Trolleys',
      'LT & HT Electrical Enclosures',
      'Distribution Board Boxes (DB Enclosures)',
      'Industrial Sheet Metal Ducting',
      'Certified Fuel Piping Lines & Manifolds'
    ],
    capacity: 'Up to 50,000 Liter Tanks',
    brands: ['Prime CRCA', 'Galvanized Sheet', 'Electrostatic Powder Coated'],
    specs: [
      { label: 'Sheet Thickness', value: '14 to 18 Gauge Heavy CRCA Steel' },
      { label: 'Surface Treatment', value: '9-Tank Zinc Phosphate + Powder Coat' },
      { label: 'Acoustic Liner', value: 'Non-Flammable Rockwool / Acoustic Foam' },
      { label: 'Welding Standards', value: 'AWS D1.1 Certified MIG/TIG Welds' },
      { label: 'Tank Validation', value: 'Hydrostatic Pressure & Leak Certified' },
      { label: 'Hardware', value: 'Stainless Steel Hinges & Recessed Locks' }
    ]
  },
  {
    id: 'solar-power-solutions',
    num: '04',
    title: 'Solar Power Solutions',
    category: 'Renewable & Clean Energy',
    badge: 'Tier-1 Photovoltaics',
    icon: Sun,
    image: '/assets/services/solar-installation-commercial.jpg',
    secondaryImage: '/assets/services/solar-grid-inverter.jpg',
    shortDesc: 'Comprehensive solar energy solutions designed to support efficient and sustainable power generation.',
    longDesc: 'KPS designs and executes high-yield commercial and industrial solar photovoltaic plants that dramatically cut operational electricity expenses. From rooftop solar arrays to synchronized microgrids, we deliver turnkey engineering, net metering licensing, and lifecycle telemetry.',
    offerings: [
      'Turnkey Commercial & Industrial Solar Solutions',
      'On-Grid Grid-Tied Solar Energy Systems',
      'Off-Grid Independent Battery Storage Systems',
      'Hybrid Solar-Generator Synchronized Systems',
      'Solar Project Installation & Structure Engineering',
      'Solar Preventative Maintenance & Thermography',
      'Comprehensive After-Sales Support & Telemetry'
    ],
    capacity: '50 kW to Multi-Megawatt EPC',
    brands: ['Tier-1 PV Modules', 'Huawei', 'Sungrow', 'GoodWe', 'SMA'],
    specs: [
      { label: 'PV Module Tech', value: 'N-Type TopCon / Mono PERC Tier-1' },
      { label: 'Inverter Topology', value: 'Transformerless String / Central Inverters' },
      { label: 'Sync Capability', value: 'Zero Export & Diesel Generator Sync' },
      { label: 'Mounting Structure', value: 'Hot-Dip Galvanized / Anodized Aluminum' },
      { label: 'Performance Warranty', value: '25-Year Linear Power Output Warranty' },
      { label: 'Monitoring Link', value: 'Real-Time SCADA & Cloud Mobile Portal' }
    ]
  },
  {
    id: 'commercial-kitchen-equipment',
    num: '05',
    title: 'Commercial Kitchen Equipment',
    category: 'Food Service & Hospitality',
    badge: 'SS-304 Food Grade',
    icon: Utensils,
    image: '/assets/services/commercial-kitchen.jpg',
    secondaryImage: '/assets/services/kitchen-exhaust-hood.jpg',
    shortDesc: 'Commercial kitchen equipment supply and installation solutions for professional food preparation and commercial kitchen environments.',
    longDesc: 'Tailored for hotels, corporate dining halls, hospitals, and premier restaurant chains, KPS provides turnkey kitchen engineering. We supply, deliver, and install food-grade stainless steel cooking, cold storage, and preparation assemblies designed for hygiene, safety, and continuous use.',
    offerings: [
      'Commercial Kitchen Equipment Supply',
      'Professional Equipment Installation & Commissioning',
      'Complete Commercial Kitchen Layout Solutions',
      'Heavy-Duty Cooking Ranges, Ovens & Fryers',
      'Stainless Steel Grade 304 Workstations & Sinks',
      'Commercial Refrigerators, Freezers & Walk-In Chiller Lines'
    ],
    capacity: 'Commercial & Institutional Scale',
    brands: ['Food-Grade SS-304 Certified Fabrication'],
    specs: [
      { label: 'Material Standard', value: 'Food-Grade Stainless Steel AISI 304' },
      { label: 'Target Sectors', value: 'Hotels, Hospitals, Cafeterias & FMCG' },
      { label: 'Gas Systems', value: 'Industrial LPG / Natural Gas Line Layouts' },
      { label: 'Safety Compliance', value: 'Integrated Gas Leak & Fire Cutoff Valves' },
      { label: 'Warranty & AMC', value: 'Full Warranty with Spare Part Backing' }
    ]
  },
  {
    id: 'industrial-ducting-ventilation',
    num: '06',
    title: 'Industrial Ducting & Ventilation',
    category: 'HVAC & Environmental Control',
    badge: 'GI Air Distribution',
    icon: Wind,
    image: '/assets/services/ducting-commercial-hvac.jpg',
    secondaryImage: '/assets/services/ducting-industrial.jpg',
    shortDesc: 'Professional industrial ducting fabrication and installation solutions for commercial and industrial facilities.',
    longDesc: 'Optimized airflow, exhaust extraction, and temperature control are critical to industrial productivity. KPS designs, fabricates, and installs high-volume galvanized sheet ducting networks, kitchen hood exhaust systems, and generator radiator discharge louvers.',
    offerings: [
      'Industrial Ducting Complete Installation',
      'Precision Sheet Metal Duct Fabrication',
      'Industrial Ventilation & Air Handling Ductwork',
      'Commercial Kitchen Exhaust Hoods & Precipitators',
      'Generator Room Acoustic Intake & Radiator Louver Ducts'
    ],
    capacity: 'Up to 100,000+ CFM Airflow Systems',
    brands: ['Prime Galvanized Iron (GI)', 'Class-A Fire Retardant Sealant'],
    specs: [
      { label: 'Sheet Material', value: '18 to 26 Gauge Galvanized Iron (GI)' },
      { label: 'Fabrication Geometries', value: 'Rectangular, Spiral & Round Ducts' },
      { label: 'Joint Specifications', value: 'TDC / TDF Flanged Joints with Neoprene' },
      { label: 'Testing Standard', value: 'Air Velocity Balancing & Pressure Leak Tested' },
      { label: 'Thermal Insulation', value: 'Closed-Cell Nitrile / Glasswool Lined' }
    ]
  },
  {
    id: 'fire-fighting-equipment',
    num: '07',
    title: 'Fire Fighting Equipment & Installation',
    badge: 'Life Safety Systems',
    category: 'Facility Life Safety',
    icon: Flame,
    image: '/assets/services/fire-fighting-hydrant-pump.jpg',
    secondaryImage: '/assets/services/fire-equipment-extinguishers.jpg',
    shortDesc: 'Fire safety equipment and installation solutions designed to support safer commercial and industrial environments.',
    longDesc: 'Safeguard industrial plants, multi-story buildings, and warehouses with reliable fire protection infrastructure. KPS provides complete fire hydrant piping, skid-mounted high-pressure pump sets, automated sprinkler networks, and certified fire extinguisher deployments.',
    offerings: [
      'Fire Fighting Equipment Supply',
      'Fire Fighting System Turnkey Installation',
      'Electric, Diesel & Jockey Fire Pump Skid Sets',
      'Wet & Dry Fire Hydrant Systems & Hose Cabinets',
      'Automatic Fire Sprinkler Networks & Flow Alarm Valves',
      'Certified Handheld & Wheeled Fire Extinguishers'
    ],
    capacity: 'Complete Facility Safety Infrastructure',
    brands: ['Heavy Industrial Skids', 'High-Pressure Tested Systems'],
    specs: [
      { label: 'Pump Skid Design', value: 'Electric Main + Standby Diesel + Jockey Pump' },
      { label: 'System Pressure', value: 'Up to 250 PSI Tested Working Pressure' },
      { label: 'Piping Material', value: 'Seamless Carbon Steel Schedule 40 Pipes' },
      { label: 'Extinguisher Chemistries', value: 'CO2, Dry Chemical Powder (DCP), Foam, Clean Agent' },
      { label: 'Monitoring Integration', value: 'Direct Interface with Central Fire Alarm (FACP)' }
    ]
  },
  {
    id: 'smd-screens-led-displays',
    num: '08',
    title: 'SMD Screens & LED Display Solutions',
    badge: 'Digital Video Technology',
    category: 'Commercial Video Walls',
    icon: Monitor,
    image: '/assets/services/smd-screen-display-outdoor.jpg',
    secondaryImage: '/assets/services/smd-led-videowall.jpg',
    shortDesc: 'Advanced digital display solutions for commercial advertising, indoor environments, and outdoor applications.',
    longDesc: 'Deliver high-impact visual messaging with KPS digital screen engineering. We engineer, assemble, and support high-refresh indoor conference video walls, high-brightness weatherproof outdoor billboards, and custom curved architectural LED installations.',
    offerings: [
      'Indoor & Outdoor SMD LED Screens Supply',
      'Turnkey Screen Rigging & Structural Installation',
      'Digital Commercial Advertising Displays',
      'Commercial LED Video Walls & Command Centers',
      'High-Resolution Ultra-Fine Pitch LED Panels',
      'Custom Screen Sizes, Curves & Configurations',
      'Control Systems & Cloud Content Management (CMS)',
      'Maintenance & 24/7 Dedicated Technical Support',
      'Energy-Efficient Low-Power Display Technology'
    ],
    capacity: 'P1.2 Ultra-Fine to P10 Outdoor Billboards',
    brands: ['High-Refresh SMD Modules', 'NovaStar Video Controllers'],
    specs: [
      { label: 'Pixel Pitch Coverage', value: 'P1.2, P1.5, P1.8, P2.5, P3.9, P6, P10' },
      { label: 'Luminance Range', value: '800 nits (Indoor) to 6500+ nits (Outdoor)' },
      { label: 'Refresh Rate', value: '≥3840 Hz High-Refresh Flicker-Free' },
      { label: 'Weatherproofing', value: 'IP65 Rated Front & Rear Cabinets' },
      { label: 'Viewing Angles', value: '160° Horizontal / 140° Vertical' },
      { label: 'Processing & CMS', value: 'Synchronous / Asynchronous Cloud Management' }
    ]
  }
];

export const featuredDivisions = [
  {
    id: 'power-generation',
    letter: 'A',
    eyebrow: 'DIVISION 01 // CRITICAL ENERGY',
    title: 'Power Generation & Backup Solutions',
    lead: 'Continuous, prime, and standby diesel and gas generator power plants engineered to keep mission-critical manufacturing and enterprise infrastructures operating without disruption.',
    image: '/assets/services/generator-main.jpg',
    altImage: '/assets/services/generator-cummins-perkins.jpg',
    badge: '15 – 2500 kVA Fleet',
    highlights: [
      {
        title: 'Generator Sales & Rental Fleet',
        desc: 'Brand-new and certified overhauled generator sets ready for rapid deployment with full delivery and setup.'
      },
      {
        title: 'Comprehensive Generator Maintenance',
        desc: 'Computerized diagnostics, dynamometer load verification, cylinder top-end overhauls, and preventative servicing.'
      },
      {
        title: 'Genuine OEM Spare Parts Supply',
        desc: 'Authentic consumables, electronic governors, AVR modules, and filters for Lovol, Perkins, Cummins, and Weichai.'
      },
      {
        title: 'Annual Maintenance Contracts (AMC & O&M)',
        desc: 'Dedicated 24/7 mobile field engineers on standing callout with guaranteed response times across all industrial hubs.'
      }
    ],
    stats: [
      { label: 'Output Range', val: '15 – 2500 kVA' },
      { label: 'Engine Brands', val: 'Lovol, Perkins, Cummins' },
      { label: 'Field Response', val: '24/7 Nationwide' }
    ]
  },
  {
    id: 'electrical-solar',
    letter: 'B',
    eyebrow: 'DIVISION 02 & 04 // SMART DISTRIBUTION & CLEAN ENERGY',
    title: 'Electrical & Solar Engineering',
    lead: 'Harmonizing heavy-duty IEC switchgear power distribution with high-efficiency commercial solar photovoltaic installations for maximum energy efficiency and grid resilience.',
    image: '/assets/services/electrical-panel-switchgear.jpg',
    secondaryImage: '/assets/services/solar-installation-commercial.jpg',
    badge: 'IEC 61439 & Tier-1 PV',
    highlights: [
      {
        title: 'Low & High Tension Electrical Panels',
        desc: 'Custom engineered LT & HT switchgear, motor control centers (MCC), and feeder pillars built with 99.9% copper busbars.'
      },
      {
        title: 'Automated Switchgear & ATS/AMF Synchronization',
        desc: 'Seamless automatic mains failure transfer systems and PLC-driven multi-generator paralleling with the utility grid.'
      },
      {
        title: 'Turnkey Commercial & Industrial Solar Projects',
        desc: 'High-yield on-grid, off-grid, and hybrid generator-synchronized solar installations designed for industrial ROI.'
      },
      {
        title: 'Turnkey Single-Line Electrical Engineering',
        desc: 'End-to-end electrical design, load balance audits, power factor capacitor banks, and certified handover.'
      }
    ],
    stats: [
      { label: 'Busbar Rating', val: 'Up to 6300A' },
      { label: 'Solar Systems', val: 'On / Off / Hybrid' },
      { label: 'Standard', val: '100% IEC Certified' }
    ]
  },
  {
    id: 'industrial-fabrication-ducting',
    letter: 'C',
    eyebrow: 'DIVISION 03 & 06 // PRECISION MANUFACTURING',
    title: 'Industrial Engineering & Fabrication',
    lead: 'Precision heavy sheet metal fabrication, acoustic sound attenuation, bulk fluid storage, and high-volume industrial ventilation engineered to exact CAD site specifications.',
    image: '/assets/services/fabrication-canopy-tanks.jpg',
    secondaryImage: '/assets/services/ducting-commercial-hvac.jpg',
    badge: 'Heavy CRCA & GI Ducting',
    highlights: [
      {
        title: 'Custom Heavy Metal Fabrication',
        desc: 'Prime CRCA steel fabrication with computerized laser cutting, certified MIG/TIG welding, and electrostatic powder coating.'
      },
      {
        title: 'Industrial Storage Tanks & Bulk Fuel Reservoirs',
        desc: 'Underground and overhead heavy-gauge diesel storage tanks tested hydrostatically for leak-proof industrial longevity.'
      },
      {
        title: 'Acoustic Soundproof & Weatherproof Canopies',
        desc: 'Engineered noise attenuation enclosures maintaining 68–75 dBA at 7 meters with internal residential-grade silencers.'
      },
      {
        title: 'High-Volume Industrial Ducting & Fuel Piping',
        desc: 'Galvanized iron (GI) ventilation ducting, kitchen exhaust systems, and certified generator fuel manifolds.'
      }
    ],
    stats: [
      { label: 'Acoustic Rating', val: '68–75 dBA @ 7m' },
      { label: 'Finishing', val: '9-Tank Powder Coat' },
      { label: 'Tank Storage', val: 'Up to 50,000 Liters' }
    ]
  }
];

export const processSteps = [
  {
    step: '01',
    title: 'Consultation & Requirements',
    desc: 'Our senior electrical and power engineers conduct an in-depth on-site audit to calculate starting inrush, peak load profiles, and site-specific operational requirements.'
  },
  {
    step: '02',
    title: 'Engineering & Planning',
    desc: 'We engineer customized single-line diagrams (SLD), CAD physical layouts, acoustic attenuation specifications, and complete bill of quantities (BOQ) with transparent project scopes.'
  },
  {
    step: '03',
    title: 'Supply & Installation',
    desc: 'Certified OEM equipment is dispatched and installed by specialized field technicians, encompassing civil pad mounting, electrical busbar termination, and fuel line integration.'
  },
  {
    step: '04',
    title: 'Maintenance & Support',
    desc: 'We conduct full-capacity resistive load bank certification before final client sign-off, backed by nationwide 24/7 emergency dispatch and proactive AMC maintenance.'
  }
];

export const whyChooseKPS = [
  {
    id: 1,
    title: 'Comprehensive Engineering Solutions',
    desc: 'Single-source accountability covering power generation, electrical panels, acoustic fabrication, and renewable solar under one unified technical team.'
  },
  {
    id: 2,
    title: 'Experienced Engineering Professionals',
    desc: 'Steered by certified power and electrical engineers with decades of hands-on experience in national infrastructure and manufacturing power plants.'
  },
  {
    id: 3,
    title: 'Quality-Focused Approach',
    desc: 'Strict adherence to international IEC, IEEE, and NFPA standards, utilizing prime materials, genuine OEM spare parts, and computerized diagnostic tools.'
  },
  {
    id: 4,
    title: 'Customized Engineering Solutions',
    desc: 'Every power plant, switchgear board, and canopy enclosure is custom-engineered to match the exact spatial and load parameters of your facility.'
  },
  {
    id: 5,
    title: 'Reliable After-Sales Support',
    desc: 'Standing rapid-response field support teams equipped with genuine consumables, diagnostic link-ups, and emergency repair apparatus.'
  },
  {
    id: 6,
    title: 'Long-Term Customer Relationships',
    desc: 'Enduring client alliances with textile conglomerates, hospital networks, FMCG brands, and financial institutions nationwide.'
  }
];
