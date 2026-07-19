/* ============================================
   NRG Bridge Power Solution - Content Data
   Replicated from the NRG website content.json
   ============================================ */

import type { PhaseData, BoardImage } from './types'

// Board images - these match the files in src/assets/images/boards/
export const BOARD_IMAGES: BoardImage[] = [
  { id: '00', name: 'Community', filename: '00_COMMUNITY.png', description: 'Community engagement and stakeholder alignment' },
  { id: '01', name: 'Fiber Connection', filename: '01_FIBER_CONNECTION_2.png', description: 'Establishing fiber optic connectivity infrastructure' },
  { id: '02', name: 'Gas Supply', filename: '02_GAS_SUPPLY.png', description: 'Natural gas supply infrastructure planning' },
  { id: '03', name: 'Water Supply', filename: '03_WATER_SUPPLY.png', description: 'Water supply and cooling systems design' },
  { id: '04', name: 'Turbine Reservation', filename: '04_TURBINE_RESERVATION.png', description: 'Gas turbine reservation and procurement' },
  { id: '05', name: 'TSP Engagement', filename: '05_TSP_ENGAGEMENT.png', description: 'Transmission service provider engagement' },
  { id: '06', name: 'Pre-Application Review', filename: '06_PRE_APPLICATION_REVIEW.png', description: 'Pre-application review and regulatory assessment' },
  { id: '07', name: 'Load Ramp Plan', filename: '07_LOAD_RAMP_PLAN.png', description: 'Load ramp-up plan and scheduling' },
  { id: '08', name: 'CCS Studies', filename: '08_CCS_STUDIES.png', description: 'Carbon capture and storage feasibility studies' },
  { id: '09', name: 'Land Environmental Evaluation', filename: '09_LAND_ENVIRONMENTAL_EVALUATION.png', description: 'Environmental impact and land evaluation' },
  { id: '10', name: 'Air Permitting', filename: '10_AIR_PERMITTING.png', description: 'Air quality permits and compliance' },
  { id: '11', name: 'Low Carbon Requirement', filename: '11_LOW_CARBON_REQUIREMENT.png', description: 'Low carbon emissions requirements' },
  { id: '12', name: 'Load Interconnection Coordination', filename: '12_LOAD_INTERCONNECTION_COORDINATION.png', description: 'Grid interconnection coordination' },
  { id: '13', name: 'Onsite Generation Construction', filename: '13_ONSITE_GENERATION_CONSTRUCTION.png', description: 'On-site power generation construction' },
  { id: '14', name: 'Data Hall Construction', filename: '14_DATA_HALL_CONSTRUCTION.png', description: 'Data center hall construction' },
  { id: '15', name: 'Site Mobilization', filename: '15_SITE_MOBILIZATION.png', description: 'Site preparation and mobilization' },
  { id: '16', name: 'Shell Construction Facilities', filename: '16_SHELL_CONSTRUCTION_FACILITIES.png', description: 'Shell and facility construction' },
  { id: '17', name: 'Equipment Delivery', filename: '17_EQUIPMENT_DELIVERY.png', description: 'Major equipment delivery and installation' },
  { id: '18', name: 'Gas Infrastructure', filename: '18_GAS_INFRASTRUCTURE.png', description: 'Gas pipeline infrastructure buildout' },
]

// Phase definitions - matching the NRG site's 5 phases
export const PHASES: PhaseData[] = [
  {
    phase: 1,
    title: 'Site Evaluation',
    subtitle: 'Assessing the Perfect Location',
    description: 'NRG brings speed to power for data centers using a phased deployment strategy that leverages third-party bridge power solutions when grid power or necessary equipment is unavailable.',
    boardImages: BOARD_IMAGES.slice(0, 4),
    color: '#1a3a2a',
  },
  {
    phase: 2,
    title: 'Site Development',
    subtitle: 'Engineering & Permits',
    description: 'From environmental assessments to interconnection agreements, NRG navigates the complex regulatory landscape to secure all necessary approvals for your data center.',
    boardImages: BOARD_IMAGES.slice(4, 8),
    color: '#2a1a3a',
  },
  {
    phase: 3,
    title: 'Construction',
    subtitle: 'Building the Infrastructure',
    description: 'NRG manages the full construction process — from site mobilization to equipment delivery — ensuring your data center is built to the highest standards.',
    boardImages: BOARD_IMAGES.slice(8, 13),
    color: '#3a2a1a',
  },
  {
    phase: 4,
    title: 'Power Ramp-up',
    subtitle: 'Energizing Operations',
    description: 'With construction complete, NRG begins the power ramp-up process, bringing generation assets online and coordinating grid interconnection.',
    boardImages: BOARD_IMAGES.slice(13, 16),
    color: '#1a2a3a',
  },
  {
    phase: 5,
    title: 'Fully Operational',
    subtitle: 'Powering Your Future',
    description: 'Your data center is fully powered and operational, with NRG providing ongoing support, maintenance, and optimization of power delivery.',
    boardImages: BOARD_IMAGES.slice(16),
    color: '#2a3a1a',
  },
]

// Deep dive content for each topic
export const DEEP_DIVES: Record<string, {
  title: string
  intro: string
  color: string
  blocks: Array<{
    type: string
    title?: string
    content?: string
    items?: Array<{ label: string; value: string }>
  }>
}> = {
  community: {
    title: 'Community Engagement',
    intro: 'Building strong relationships with local communities is fundamental to successful data center development. NRG prioritizes transparent communication and community benefit programs.',
    color: '#1a3a2a',
    blocks: [
      {
        type: 'textblock',
        title: 'Our Approach',
        content: 'NRG engages with communities early in the development process, ensuring local stakeholders have a voice in how projects move forward. This includes town halls, community advisory boards, and economic impact studies.',
      },
      {
        type: 'textblock',
        title: 'Community Benefits',
        content: 'Every NRG data center project brings significant economic benefits including local job creation, tax revenue, infrastructure improvements, and community investment programs.',
      },
    ],
  },
  fiber: {
    title: 'Fiber Connection',
    intro: 'High-speed fiber connectivity is the backbone of any modern data center. NRG ensures multiple redundant fiber paths to guarantee uninterrupted data transmission.',
    color: '#2a1a3a',
    blocks: [
      {
        type: 'textblock',
        title: 'Redundant Connectivity',
        content: 'NRG designs fiber infrastructure with multiple diverse paths, ensuring that no single point of failure can disrupt connectivity. Our approach includes partnerships with major carriers.',
      },
    ],
  },
  gas_supply: {
    title: 'Gas Supply',
    intro: 'Reliable natural gas supply is critical for bridge power generation. NRG secures long-term gas supply agreements and builds the necessary pipeline infrastructure.',
    color: '#3a2a1a',
    blocks: [
      {
        type: 'textblock',
        title: 'Supply Security',
        content: 'NRG leverages its extensive energy portfolio to secure reliable, competitively-priced natural gas supply for data center bridge power generation.',
      },
    ],
  },
  water_supply: {
    title: 'Water Supply',
    intro: 'Efficient water management is essential for data center cooling systems. NRG implements advanced water-efficient cooling technologies.',
    color: '#1a2a3a',
    blocks: [
      {
        type: 'textblock',
        title: 'Water Efficiency',
        content: 'NRG utilizes state-of-the-art cooling systems that minimize water consumption while maintaining optimal operating temperatures.',
      },
    ],
  },
}

// Navigation menu items
export const MENU_ITEMS = [
  { label: 'Site Evaluation', phase: 1 },
  { label: 'Site Development', phase: 2 },
  { label: 'Construction', phase: 3 },
  { label: 'Power Ramp-up', phase: 4 },
  { label: 'Fully Operational', phase: 5 },
  { label: 'Virtual Tour', phase: 0 },
]

// Hero section content
export const HERO_CONTENT = {
  title: ['Bridge Power', 'Solution'],
  paragraph: 'NRG brings speed to power for data centers using a phased deployment strategy that leverages third-party bridge power solutions when grid power or necessary equipment is unavailable.',
  ctaText: 'Explore Bridge Power Solution',
  introLines: [
    'Build AI and cloud data center',
    'infrastructure with NRG—from',
    'site evaluation to completion—',
    'delivering scalable, reliable and',
    'future-proof solutions.',
  ],
}

// Footer links
export const FOOTER_LINKS = [
  { label: 'Privacy Rights & Requests', url: 'https://www.nrg.com/legal/privacy-rights-and-requests.html' },
  { label: 'Legal', url: 'https://www.nrg.com/legal.html' },
  { label: 'Energy Policy', url: 'https://www.nrg.com/energy-policy.html' },
  { label: 'Code of Conduct', url: 'https://investors.nrg.com/corporate-governance/highlights#code-of-conduct' },
  { label: 'Suppliers', url: 'https://www.nrg.com/suppliers.html' },
]
