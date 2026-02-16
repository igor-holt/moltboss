import { Agent } from '../types'

export const agents: Agent[] = [
  {
    id: 'agent-1',
    name: 'DataMind Pro',
    description: 'Advanced data analysis and visualization specialist. Transforms complex datasets into actionable insights.',
    capabilities: ['Data Analysis', 'Statistical Modeling', 'Visualization', 'Predictive Analytics'],
    category: 'Data Analysis',
    status: 'available',
    avatar: '📊'
  },
  {
    id: 'agent-2',
    name: 'ContentCraft AI',
    description: 'Creative content generation expert for articles, marketing copy, and storytelling.',
    capabilities: ['Content Writing', 'Copywriting', 'SEO Optimization', 'Brand Voice'],
    category: 'Content Generation',
    status: 'available',
    avatar: '✍️'
  },
  {
    id: 'agent-3',
    name: 'CodeReview Sentinel',
    description: 'Thorough code review assistant specializing in security, best practices, and optimization.',
    capabilities: ['Code Review', 'Security Audit', 'Performance Analysis', 'Best Practices'],
    category: 'Code Review',
    status: 'available',
    avatar: '🔍'
  },
  {
    id: 'agent-4',
    name: 'ResearchHub',
    description: 'Comprehensive research assistant for gathering, analyzing, and synthesizing information.',
    capabilities: ['Web Research', 'Source Verification', 'Report Generation', 'Citation Management'],
    category: 'Research',
    status: 'available',
    avatar: '📚'
  },
  {
    id: 'agent-5',
    name: 'DesignCritic',
    description: 'UI/UX design feedback specialist providing actionable design improvements.',
    capabilities: ['Design Review', 'Accessibility Audit', 'User Experience', 'Visual Hierarchy'],
    category: 'Design',
    status: 'available',
    avatar: '🎨'
  },
  {
    id: 'agent-6',
    name: 'DevOps Navigator',
    description: 'Infrastructure and deployment expert for CI/CD, monitoring, and system architecture.',
    capabilities: ['Infrastructure', 'CI/CD', 'Monitoring', 'Cloud Architecture'],
    category: 'DevOps',
    status: 'busy',
    avatar: '⚙️'
  },
  {
    id: 'agent-7',
    name: 'API Architect',
    description: 'RESTful and GraphQL API design specialist focused on scalable architectures.',
    capabilities: ['API Design', 'Documentation', 'Security', 'Scalability'],
    category: 'Code Review',
    status: 'available',
    avatar: '🔗'
  },
  {
    id: 'agent-8',
    name: 'ML Strategist',
    description: 'Machine learning implementation guide for model selection and training strategies.',
    capabilities: ['Model Selection', 'Training Strategy', 'Data Preparation', 'Evaluation'],
    category: 'Data Analysis',
    status: 'available',
    avatar: '🤖'
  }
]
