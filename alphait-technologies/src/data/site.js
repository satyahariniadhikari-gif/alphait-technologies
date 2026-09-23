export const company = {
  name: 'AlphaIT Technologies',
  shortName: 'AlphaIT',
  tagline:
    'Provide IT consulting, customized solutions and products by creating an environment conducive to excellence in the growth of knowledge.',
  address: '971 US Highway 202 N, Branchburg, NJ 08876',
  addressLines: ['971 US Highway 202 N', 'Branchburg, NJ 08876'],
  phone: '+1 (732) 383-9115',
  phoneHref: 'tel:+17323839115',
  email: 'info@alphait-technologies.com',
  emailHref: 'mailto:info@alphait-technologies.com',
  foundedYear: 2019,
}

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Career', to: '/career' },
  { label: 'Contact Us', to: '/contact' },
]

export const slides = [
  {
    eyebrow: 'Welcome to AlphaIT Technologies',
    title: 'You can trust AlphaIT Technologies',
    text: company.tagline,
    cta: { label: 'Explore Our Services', to: '/services' },
  },
  {
    eyebrow: 'Consulting · Training · Development',
    title: 'Technology that moves your business forward',
    text: 'We help small, medium and large enterprises turn technology into measurable business outcomes — on time and on budget.',
    cta: { label: 'Talk To Us', to: '/contact' },
  },
  {
    eyebrow: 'Careers at AlphaIT',
    title: 'Accelerate your career with us',
    text: 'Join a process-oriented, people-centric team where brainstorming is encouraged and contribution is recognised.',
    cta: { label: 'View Open Roles', to: '/career' },
  },
]

export const services = [
  {
    slug: 'consulting',
    title: 'Consulting',
    summary:
      'IT Consulting services facilitate customers in a process and technology-driven transformation to achieve business outcomes.',
    points: [
      'Technology strategy and roadmap definition',
      'Process and platform modernisation',
      'Staff augmentation and managed capacity',
      'Cloud migration and cost optimisation',
    ],
    icon: 'consulting',
  },
  {
    slug: 'training',
    title: 'Training',
    summary:
      'Custom-made instructor-led classroom and online training for students and businesses across a wide range of software technologies.',
    points: [
      'Instructor-led classroom and live online batches',
      'Corporate upskilling programs',
      'Hands-on labs and real project scenarios',
      'Interview preparation and placement support',
    ],
    icon: 'training',
  },
  {
    slug: 'application-development',
    title: 'Application Development',
    summary:
      'As a pioneer in IT application development, AlphaIT Technologies effectively helps you meet your technology-specific objectives.',
    points: [
      'Custom web and mobile application build-outs',
      'API, integration and data engineering',
      'QA, automation and performance testing',
      'Support, maintenance and enhancements',
    ],
    icon: 'development',
  },
]

export const industries = [
  'Banking',
  'Healthcare',
  'Engineering',
  'Financial Services',
  'Telecommunications',
]

export const technologies = [
  'Cloud Computing',
  'Data Science',
  'E-Commerce',
  'CRM',
  'Data Warehousing',
  'Web Technologies',
]

export const stats = [
  { value: '15+', label: 'Years of combined delivery experience' },
  { value: '120+', label: 'Consultants trained and placed' },
  { value: '5', label: 'Core industry domains served' },
  { value: '98%', label: 'On-time project delivery' },
]

export const jobs = [
  {
    id: 'tc-001',
    title: 'Technical Consultant',
    type: 'Full Time',
    location: 'Branchburg, NJ',
    experience: '3-6 years',
    summary:
      'Work directly with client stakeholders to translate business requirements into delivered technical solutions.',
  },
  {
    id: 'tc-002',
    title: 'Senior Java Developer',
    type: 'Full Time',
    location: 'Branchburg, NJ / Remote',
    experience: '5-8 years',
    summary:
      'Design and build enterprise-grade services for banking and financial services clients.',
  },
  {
    id: 'tc-003',
    title: 'Data Engineer',
    type: 'Full Time',
    location: 'Remote (US)',
    experience: '4-7 years',
    summary:
      'Build and maintain data warehousing and analytics pipelines on modern cloud platforms.',
  },
  {
    id: 'tc-004',
    title: 'QA Automation Engineer',
    type: 'Contract',
    location: 'Branchburg, NJ',
    experience: '3-5 years',
    summary:
      'Own automated regression coverage and release quality across multiple client engagements.',
  },
  {
    id: 'tc-005',
    title: 'Technical Trainer',
    type: 'Part Time',
    location: 'Hybrid · NJ',
    experience: '6+ years',
    summary:
      'Deliver instructor-led classroom and online sessions in cloud, data and web technologies.',
  },
]

export const aiProgram = {
  title: 'AI Training Program + Live Project Experience',
  batchLabel: 'Oct 1 Batch',
  startDate: '2026-10-01',
  startDateLabel: 'October 1, 2026',
  eligibility: ['USA', 'Canada'],
  summary:
    'An industry-oriented AI Training Program with Live Project Experience for candidates in the USA & Canada. Build practical AI/ML skills and gain real-world project experience.',
  benefits: [
    'AI & Machine Learning Training',
    'Hands-on Live Project Experience',
    'Real-World Industry Exposure',
    'Practical AI/ML Implementation',
    'Guidance from Experienced Professionals',
    'Project & Career Support',
    'Strengthen Your Technical Profile with Practical Experience',
  ],
  registerUrl: 'https://forms.gle/MQ2DZuX2rba2BWpq8',
  contactEmail: company.email,
  contactEmailHref: company.emailHref,
}
