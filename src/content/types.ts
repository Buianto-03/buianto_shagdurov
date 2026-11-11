export interface Project {
  id: string
  title: string
  company: string
  domain: string
  summary: string
  responsibilities: string[]
  stack: string[]
  outcome: { value: string; description: string }
  image?: string
  imageAlt?: string
}
