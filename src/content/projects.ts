import type { Project } from './types'

export const frontendCopy =
  'I designed the React frontend architecture for the agent loyalty widget.'

export const projects: Project[] = [
  {
    id: 'domclick',
    title: 'Agent rewards',
    company: 'Domclick',
    domain: 'PropTech',
    summary:
      'An agent loyalty widget I co-developed end to end, from the React interface to the NestJS API and PostgreSQL schema.',
    responsibilities: [
      frontendCopy,
      'Designed the REST API, NestJS modules and PostgreSQL schema for the loyalty widget.',
    ],
    stack: ['React', 'TypeScript', 'NestJS', 'PostgreSQL'],
    outcome: { value: '+10%', description: 'agent-submitted deals' },
    image: '/images/architecture.webp',
    imageAlt:
      'Sunlit concrete balconies on an apartment building, illustrating the PropTech domain',
  },
  {
    id: 'tripster',
    title: 'Booking flow',
    company: 'Tripster',
    domain: 'TravelTech',
    summary:
      'A multi-step booking flow improved through iterative redesign and A/B testing.',
    responsibilities: [
      'Worked on the booking interface and A/B tests to improve the path to a confirmed booking.',
    ],
    stack: ['Frontend', 'A/B testing'],
    outcome: { value: '2×', description: 'conversion' },
    image: '/images/journey.webp',
    imageAlt:
      'A mountain road winding through a forest, with a small bus rounding a bend',
  },
  {
    id: 'reports-case',
    title: 'Reporting module',
    company: 'SIBINTEK',
    domain: 'Enterprise analytics',
    summary:
      'An internal reporting and analytics module that cut manual report preparation time from two hours to fifteen minutes.',
    responsibilities: [
      'Built a module that combined data from multiple corporate sources and provided automated dashboards.',
    ],
    stack: ['Reporting', 'Enterprise analytics'],
    outcome: { value: '2h → 15m', description: 'report preparation' },
  },
]
