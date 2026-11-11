import type { Project } from './types'

export const frontendCopy =
  'I built the React UI, including complex forms, validation and the client-side business logic behind the agent workflow.'

export const projects: Project[] = [
  {
    id: 'domclick',
    title: 'Agent rewards',
    company: 'Domclick',
    domain: 'PropTech',
    summary:
      'An agent loyalty program built end to end, from the React interface to the NestJS API and PostgreSQL schema.',
    responsibilities: [
      frontendCopy,
      'Built the NestJS API, reward rules and PostgreSQL data model behind the loyalty workflow.',
    ],
    stack: ['React', 'TypeScript', 'NestJS', 'PostgreSQL'],
    outcome: { value: '+10%', description: 'agent deals' },
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
      'A redesigned booking journey, supported by A/B testing and frontend performance work.',
    responsibilities: [
      'Worked on the booking interface and A/B tests to improve the path to a confirmed booking.',
      'Worked on frontend performance alongside the redesigned booking journey.',
    ],
    stack: ['Frontend', 'A/B testing', 'Performance'],
    outcome: { value: '2×', description: 'conversion' },
    image: '/images/journey.webp',
    imageAlt:
      'A mountain road winding through a forest, with a small bus rounding a bend',
  },
  {
    id: 'reports-case',
    title: 'Report engine',
    company: 'Reporting',
    domain: 'Enterprise analytics',
    summary:
      'Industrial reporting that brought generation time down from two hours to fifteen minutes per report.',
    responsibilities: [
      'Improved report generation, reducing the time needed to produce operational reports.',
    ],
    stack: ['Reporting', 'Enterprise analytics'],
    outcome: { value: '2h → 15m', description: 'per report' },
  },
]
