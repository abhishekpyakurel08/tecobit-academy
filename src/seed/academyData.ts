import type { Payload } from 'payload'

interface TrackData {
  id: string
  name: string
  description: string
  icon: string
  courseCount: number
}

interface CourseData {
  id: string
  title: string
  description: string
  fullDescription: string
  trackId: string
  trackName: string
  duration: string
  level: "Beginner" | "Intermediate" | "Advanced"
  featured: boolean
  syllabus?: {
    title: string
    description: string
    lessons: { topic: string }[]
  }[]
}

interface BatchData {
  id: string
  courseId: string
  name: string
  startDate: string
  maxSeats: number
  seatsRemaining: number
  status: "open" | "closed"
}

interface LecturerData {
  id: string
  name: string
  role: string
  experience: string
  photo: string
  courseIds: string[]
}

interface EventData {
  id: string
  title: string
  date: string
  description: string
  location: string
  courseId?: string
  link?: string
}

interface TestimonialData {
  id: string
  studentName: string
  rating: number
  content: string
  courseId?: string
  featured: boolean
}

interface ApplicationData {
  id: string
  fullName: string
  email: string
  phone: string
  educationLevel: "high-school" | "bachelor" | "master" | "phd" | "other"
  college: string
  courseId: string
  batchId?: string
  status: "pending" | "approved" | "rejected"
}

const tracks: TrackData[] = [
  { id: "programming", name: "Programming Track", description: "Master foundational programming with Python, Java, C++, and software engineering principles.", icon: "Code", courseCount: 4 },
  { id: "ai-ml", name: "AI/ML Track", description: "Dive into machine learning, deep learning, NLP, and MLOps for production-ready AI systems.", icon: "Brain", courseCount: 3 },
  { id: "web", name: "Web Track", description: "Build modern web apps with React, Node.js, TypeScript, and cloud deployment.", icon: "Globe", courseCount: 3 },
  { id: "data-science", name: "Data Science Track", description: "Learn data analysis, visualization, statistical modeling, and big data tools.", icon: "BarChart3", courseCount: 3 },
]

const programmingSyllabus = [
  {
    title: "Module 1: Language Fundamentals",
    description: "Master the syntax, data structures, and core logic of the language.",
    lessons: [{ topic: "Variables & Data Types" }, { topic: "Control Flow" }, { topic: "Functions & Scope" }]
  },
  {
    title: "Module 2: Object-Oriented Programming",
    description: "Learn to build scalable systems using classes, inheritance, and polymorphism.",
    lessons: [{ topic: "Classes & Objects" }, { topic: "Inheritance" }, { topic: "Design Patterns" }]
  },
  {
    title: "Module 3: Project Architecture",
    description: "Design and implement a complete software solution from scratch.",
    lessons: [{ topic: "System Design" }, { topic: "Testing & Debugging" }, { topic: "Deployment" }]
  }
]

const aiSyllabus = [
  {
    title: "Module 1: Mathematical Foundations",
    description: "The core math behind AI: Linear Algebra, Calculus, and Statistics.",
    lessons: [{ topic: "Matrix Operations" }, { topic: "Probability" }, { topic: "Optimization" }]
  },
  {
    title: "Module 2: Machine Learning Models",
    description: "Implement supervised and unsupervised learning algorithms.",
    lessons: [{ topic: "Regression" }, { topic: "Neural Networks" }, { topic: "Clustering" }]
  },
  {
    title: "Module 3: Deep Learning & Vision",
    description: "Build advanced computer vision and NLP systems.",
    lessons: [{ topic: "CNNs" }, { topic: "Transformers" }, { topic: "Generative AI" }]
  }
]

const webSyllabus = [
  {
    title: "Module 1: Modern Frontend",
    description: "Building responsive and interactive UIs with React and TypeScript.",
    lessons: [{ topic: "React Hooks" }, { topic: "State Management" }, { topic: "Next.js" }]
  },
  {
    title: "Module 2: Backend Engineering",
    description: "Developing robust APIs and database architectures.",
    lessons: [{ topic: "Node.js & Express" }, { topic: "SQL vs NoSQL" }, { topic: "Auth & Security" }]
  },
  {
    title: "Module 3: Full-Stack Deployment",
    description: "Scaling and monitoring web applications in the cloud.",
    lessons: [{ topic: "Docker" }, { topic: "CI/CD Pipelines" }, { topic: "AWS/Vercel" }]
  }
]

const courses: CourseData[] = [
  { id: "python-fundamentals", title: "Python Fundamentals", description: "Start your coding journey with Python — the world's most popular programming language.", fullDescription: "This comprehensive course covers Python from basics to advanced topics including OOP, file handling, and libraries like NumPy and Pandas. Perfect for beginners.", trackId: "programming", trackName: "Programming Track", duration: "8 weeks", level: "Beginner", featured: true, syllabus: programmingSyllabus },
  { id: "java-masterclass", title: "Java Masterclass", description: "Enterprise-grade Java development covering Spring Boot, microservices, and design patterns.", fullDescription: "Deep dive into Java ecosystem with hands-on projects. Cover Spring Boot, REST APIs, JPA, microservices architecture, and testing strategies.", trackId: "programming", trackName: "Programming Track", duration: "12 weeks", level: "Intermediate", featured: false, syllabus: programmingSyllabus },
  { id: "ml-foundations", title: "Machine Learning Foundations", description: "Understand ML algorithms, model training, evaluation, and deployment fundamentals.", fullDescription: "From linear regression to ensemble methods. Hands-on with scikit-learn, feature engineering, cross-validation, and model interpretability.", trackId: "ai-ml", trackName: "AI/ML Track", duration: "10 weeks", level: "Intermediate", featured: true, syllabus: aiSyllabus },
  { id: "deep-learning", title: "Deep Learning & Neural Networks", description: "Build neural networks with TensorFlow and PyTorch for vision, NLP, and generative AI.", fullDescription: "Comprehensive deep learning covering CNNs, RNNs, Transformers, GANs, and deployment with TensorFlow Serving and ONNX.", trackId: "ai-ml", trackName: "AI/ML Track", duration: "12 weeks", level: "Advanced", featured: true, syllabus: aiSyllabus },
  { id: "react-fullstack", title: "Full-Stack React Development", description: "Build production-ready apps with React, TypeScript, Node.js, and PostgreSQL.", fullDescription: "End-to-end web development mastery. React hooks, state management, REST/GraphQL APIs, authentication, and cloud deployment.", trackId: "web", trackName: "Web Track", duration: "10 weeks", level: "Intermediate", featured: true, syllabus: webSyllabus },
  { id: "data-analysis", title: "Data Analysis with Python", description: "Transform raw data into actionable insights using Pandas, Matplotlib, and SQL.", fullDescription: "Hands-on data analysis covering data cleaning, exploratory analysis, statistical testing, and dashboard creation.", trackId: "data-science", trackName: "Data Science Track", duration: "8 weeks", level: "Beginner", featured: true, syllabus: aiSyllabus },
  { id: "mlops", title: "MLOps & Production ML", description: "Deploy and manage ML models at scale with CI/CD, monitoring, and infrastructure.", fullDescription: "Learn MLflow, Docker, Kubernetes, feature stores, model registries, A/B testing, and monitoring for production ML systems.", trackId: "ai-ml", trackName: "AI/ML Track", duration: "10 weeks", level: "Advanced", featured: false, syllabus: aiSyllabus },
  { id: "cpp-systems", title: "C++ Systems Programming", description: "Low-level systems programming with modern C++17/20 features and best practices.", fullDescription: "Memory management, concurrency, templates, STL, and building high-performance applications.", trackId: "programming", trackName: "Programming Track", duration: "10 weeks", level: "Advanced", featured: false, syllabus: programmingSyllabus },
  { id: "node-backend", title: "Node.js Backend Engineering", description: "Scalable backend systems with Express, databases, auth, and microservices.", fullDescription: "Build robust backends covering REST APIs, GraphQL, WebSockets, Redis, message queues, and containerized deployments.", trackId: "web", trackName: "Web Track", duration: "8 weeks", level: "Intermediate", featured: false, syllabus: webSyllabus },
  { id: "data-viz", title: "Data Visualization & Storytelling", description: "Create compelling visual narratives with D3.js, Plotly, and Tableau.", fullDescription: "From chart selection to interactive dashboards. Learn visual design principles, color theory, and storytelling with data.", trackId: "data-science", trackName: "Data Science Track", duration: "6 weeks", level: "Beginner", featured: false, syllabus: aiSyllabus },
]

const batches: BatchData[] = [
  { id: "b1", courseId: "python-fundamentals", name: "Batch 2026-A", startDate: "2026-03-15", maxSeats: 30, seatsRemaining: 12, status: "open" },
  { id: "b2", courseId: "python-fundamentals", name: "Batch 2026-B", startDate: "2026-05-01", maxSeats: 30, seatsRemaining: 28, status: "open" },
  { id: "b3", courseId: "ml-foundations", name: "ML Spring 2026", startDate: "2026-04-01", maxSeats: 25, seatsRemaining: 8, status: "open" },
  { id: "b4", courseId: "deep-learning", name: "DL Cohort 5", startDate: "2026-04-15", maxSeats: 20, seatsRemaining: 3, status: "open" },
  { id: "b5", courseId: "react-fullstack", name: "React Spring 2026", startDate: "2026-03-20", maxSeats: 25, seatsRemaining: 15, status: "open" },
  { id: "b6", courseId: "data-analysis", name: "DA Batch 2026", startDate: "2026-03-10", maxSeats: 30, seatsRemaining: 20, status: "open" },
  { id: "b7", courseId: "java-masterclass", name: "Java 2026-A", startDate: "2026-05-15", maxSeats: 25, seatsRemaining: 25, status: "open" },
  { id: "b8", courseId: "mlops", name: "MLOps Cohort 3", startDate: "2026-06-01", maxSeats: 20, seatsRemaining: 18, status: "open" },
]

const lecturers: LecturerData[] = [
  { id: "l1", name: "Dr. Sarah Chen", role: "Lead AI Instructor", experience: "10+ years in ML/AI, ex-Google Research", photo: "", courseIds: ["ml-foundations", "deep-learning"] },
  { id: "l2", name: "Ahmed Khalid", role: "Senior Python Instructor", experience: "8 years Python development, ex-Meta", photo: "", courseIds: ["python-fundamentals", "data-analysis"] },
  { id: "l3", name: "Maria Rodriguez", role: "Full-Stack Lead", experience: "12 years web dev, ex-Spotify", photo: "", courseIds: ["react-fullstack", "node-backend"] },
  { id: "l4", name: "James Okonkwo", role: "Systems Programming Instructor", experience: "15 years C++ and systems, ex-AWS", photo: "", courseIds: ["cpp-systems", "java-masterclass"] },
  { id: "l5", name: "Dr. Priya Sharma", role: "MLOps Specialist", experience: "7 years MLOps, built ML platforms at Uber", photo: "", courseIds: ["mlops"] },
]

const events: EventData[] = [
  { id: "e1", title: "AI in 2026: Trends & Opportunities", date: "2026-03-20T10:00:00Z", description: "Join us for a deep dive into the latest AI trends and career opportunities in the field.", location: "Online Webinar", link: "#" },
  { id: "e2", title: "Python Workshop: Build a Web Scraper", date: "2026-03-25T14:00:00Z", description: "Hands-on workshop building a real-world web scraper with Python and BeautifulSoup.", location: "Tecobit Campus, Room 204", courseId: "python-fundamentals", link: "#" },
  { id: "e3", title: "React Hackathon 2026", date: "2026-04-10T09:00:00Z", description: "48-hour hackathon building React applications. Prizes and mentorship included!", location: "Tecobit Campus", courseId: "react-fullstack", link: "#" },
  { id: "e4", title: "Data Science Career Panel", date: "2026-04-15T16:00:00Z", description: "Industry professionals share insights on building a career in data science.", location: "Online Webinar", link: "#" },
  { id: "e5", title: "MLOps Workshop: Model Deployment", date: "2026-05-01T10:00:00Z", description: "Learn to deploy ML models using Docker and Kubernetes in this hands-on session.", location: "Tecobit Campus, Lab 3", courseId: "mlops", link: "#" },
  { id: "e6", title: "Open House: Tour Tecobit Academy", date: "2026-03-30T11:00:00Z", description: "Visit our campus, meet instructors, and learn about our programs.", location: "Tecobit Campus", link: "#" },
]

const testimonials: TestimonialData[] = [
  { id: "t1", studentName: "Alex Johnson", rating: 5, content: "Tecobit's Python course completely changed my career trajectory. Within 3 months of completing it, I landed my first developer role!", courseId: "python-fundamentals", featured: true },
  { id: "t2", studentName: "Fatima Al-Hassan", rating: 5, content: "The ML Foundations course is outstanding. Dr. Chen explains complex concepts with such clarity. I'm now working as an ML Engineer.", courseId: "ml-foundations", featured: true },
  { id: "t3", studentName: "Carlos Rivera", rating: 4, content: "Great full-stack course. The project-based approach meant I had a real portfolio by the time I finished.", courseId: "react-fullstack", featured: true },
  { id: "t4", studentName: "Sophia Wang", rating: 5, content: "The Deep Learning course pushed me to think differently. Best investment in my education.", courseId: "deep-learning", featured: false },
  { id: "t5", studentName: "Michael Obi", rating: 5, content: "Data Analysis course gave me practical skills I use every single day at work. Highly recommend!", courseId: "data-analysis", featured: true },
  { id: "t6", studentName: "Emma Taylor", rating: 4, content: "MLOps course bridged the gap between building models and deploying them. Very relevant to industry needs.", courseId: "mlops", featured: false },
]

const applications: ApplicationData[] = [
  { id: "a1", fullName: "John Doe", email: "john@example.com", phone: "+1234567890", educationLevel: "bachelor", college: "MIT", courseId: "python-fundamentals", batchId: "b1", status: "pending" },
  { id: "a2", fullName: "Jane Smith", email: "jane@example.com", phone: "+1234567891", educationLevel: "master", college: "Stanford", courseId: "ml-foundations", batchId: "b3", status: "approved" },
  { id: "a3", fullName: "Bob Wilson", email: "bob@example.com", phone: "+1234567892", educationLevel: "bachelor", college: "UCLA", courseId: "react-fullstack", batchId: "b5", status: "rejected" },
]

export const seedAcademyData = async (payload: Payload): Promise<void> => {
  console.log('🌱 Starting academy data seeding...')

  try {
    // Clear existing data
    console.log('🗑️  Clearing existing data...')
    await payload.delete({ collection: 'applications', where: {} })
    await payload.delete({ collection: 'testimonials', where: {} })
    await payload.delete({ collection: 'events', where: {} })
    await payload.delete({ collection: 'lecturers', where: {} })
    await payload.delete({ collection: 'batches', where: {} })
    await payload.delete({ collection: 'courses', where: {} })
    await payload.delete({ collection: 'tracks', where: {} })

    // Seed tracks
    console.log('📚 Seeding tracks...')
    const trackMap = new Map<string, string>()
    for (const track of tracks) {
      const createdTrack = await payload.create({
        collection: 'tracks',
        data: {
          name: track.name,
          description: track.description,
          icon: track.icon,
          courseCount: track.courseCount,
        },
      })
      trackMap.set(track.id, createdTrack.id as string)
      console.log(`✅ Created track: ${createdTrack.name}`)
    }

    // Seed courses
    console.log('📖 Seeding courses...')
    const courseMap = new Map<string, string>()
    for (const course of courses) {
      const createdCourse = await payload.create({
        collection: 'courses',
        data: {
          title: course.title,
          description: course.description,
          fullDescription: course.fullDescription,
          duration: course.duration,
          level: course.level,
          featured: course.featured,
          trackName: course.trackName,
          track: trackMap.get(course.trackId) as string,
          syllabus: course.syllabus,
        },
      })
      courseMap.set(course.id, createdCourse.id as string)
      console.log(`✅ Created course: ${createdCourse.title}`)
    }

    // Seed batches
    console.log('👥 Seeding batches...')
    const batchMap = new Map<string, string>()
    for (const batch of batches) {
      const createdBatch = await payload.create({
        collection: 'batches',
        data: {
          name: batch.name,
          startDate: batch.startDate,
          maxSeats: batch.maxSeats,
          seatsRemaining: batch.seatsRemaining,
          status: batch.status,
          course: courseMap.get(batch.courseId) as string,
        },
      })
      batchMap.set(batch.id, createdBatch.id as string)
      console.log(`✅ Created batch: ${createdBatch.name}`)
    }

    // Seed lecturers
    console.log('👨‍🏫 Seeding lecturers...')
    for (const lecturer of lecturers) {
      const courseIds = lecturer.courseIds.map(id => courseMap.get(id) as string).filter(Boolean)
      
      await payload.create({
        collection: 'lecturers',
        data: {
          name: lecturer.name,
          role: lecturer.role,
          experience: lecturer.experience,
          courses: courseIds,
        },
      })
      console.log(`✅ Created lecturer: ${lecturer.name}`)
    }

    // Seed events
    console.log('📅 Seeding events...')
    for (const event of events) {
      const courseId = event.courseId ? courseMap.get(event.courseId) : undefined
      await payload.create({
        collection: 'events',
        data: {
          title: event.title,
          date: event.date,
          description: event.description,
          location: event.location,
          link: event.link,
          course: courseId,
          type: event.title.toLowerCase().includes('workshop') ? 'workshop' : 
                event.title.toLowerCase().includes('webinar') ? 'webinar' : 
                event.title.toLowerCase().includes('hackathon') ? 'hackathon' : 'meetup',
        },
      })
      console.log(`✅ Created event: ${event.title}`)
    }

    // Seed testimonials
    console.log('⭐ Seeding testimonials...')
    for (const testimonial of testimonials) {
      const courseId = testimonial.courseId ? courseMap.get(testimonial.courseId) : undefined
      await payload.create({
        collection: 'testimonials',
        data: {
          studentName: testimonial.studentName,
          rating: testimonial.rating,
          content: testimonial.content,
          featured: testimonial.featured,
          course: courseId,
        },
      })
      console.log(`✅ Created testimonial: ${testimonial.studentName}`)
    }

    // Seed applications
    console.log('📝 Seeding applications...')
    for (const application of applications) {
      const courseId = courseMap.get(application.courseId)
      const batchId = application.batchId ? batchMap.get(application.batchId) : undefined
      
      await payload.create({
        collection: 'applications',
        data: {
          fullName: application.fullName,
          email: application.email,
          phone: application.phone,
          educationLevel: application.educationLevel,
          college: application.college,
          status: application.status,
          course: courseId as string,
          batch: batchId,
        },
      })
      console.log(`✅ Created application: ${application.fullName}`)
    }

    console.log('🎉 Academy collections seeding completed!')

    // Seed Globals
    console.log('🌐 Seeding globals...')

    // Settings Global
    console.log('⚙️ Seeding Settings...')
    await payload.updateGlobal({
      slug: 'settings',
      context: { disableRevalidate: true },
      data: {
        siteName: 'Tecobit Academy',
        heroAdmissionText: 'Admission Open for 2026',
        heroEngineeringText: 'Engineering The Future',
        heroDescription: 'Master the most in-demand tech skills with hands-on training from industry experts. Join the next generation of engineers.',
        stats: [
          { label: 'Graduates', value: '1,200+', iconType: 'Users' },
          { label: 'Industry Partners', value: '50+', iconType: 'Globe' },
          { label: 'Success Rate', value: '98%', iconType: 'Award' },
        ],
        whyFeatures: [
          { title: 'Industry Experts', description: 'Learn from veterans who have worked at top tech companies.', iconType: 'Users' },
          { title: 'Project-Based', description: 'Build a portoio of real-world projects that impress employers.', iconType: 'Rocket' },
          { title: 'Global Network', description: 'Join an alumni community spanning across 20+ countries.', iconType: 'Zap' },
        ],
        socialLinks: [
          { platform: 'facebook', url: 'https://facebook.com/tecobit' },
          { platform: 'linkedin', url: 'https://linkedin.com/company/tecobit' },
          { platform: 'instagram', url: 'https://instagram.com/tecobit' },
          { platform: 'twitter', url: 'https://twitter.com/tecobit' },
          { platform: 'youtube', url: 'https://youtube.com/tecobit' },
        ],
      },
    })

    // Header Global
    console.log('🔝 Seeding Header...')
    await payload.updateGlobal({
      slug: 'header',
      context: { disableRevalidate: true },
      data: {
        topBar: {
          email: 'info@tecobit.academy',
          phone: '+977 (01) 482-1234',
          address: 'Anamnagar, Kathmandu, Nepal',
        },
        navItems: [
          { link: { type: 'custom', url: '/', label: 'HOME' } },
          { link: { type: 'custom', url: '/academy/courses', label: 'COURSES' } },
          { link: { type: 'custom', url: '/academy/events', label: 'EVENTS' } },
          { link: { type: 'custom', url: '/academy/testimonials', label: 'TESTIMONIALS' } },
          { link: { type: 'custom', url: '/academy/apply', label: 'APPLY' } },
        ],
      },
    })

    // Footer Global
    console.log('👣 Seeding Footer...')
    await payload.updateGlobal({
      slug: 'footer',
      context: { disableRevalidate: true },
      data: {
        slogan: 'Empowering the next generation of tech leaders through industry-focused training in AI, Data Science, and Modern Engineering.',
        email: 'info@tecobit.academy',
        phone: '+977 (01) 482-1234',
        address: 'Anamnagar-32, Kathmandu\nBagmati, Nepal',
        admissionButton: {
          label: 'Online Admission',
          link: { type: 'custom', url: '/academy/apply', label: 'Apply Now' },
        },
        navItems: [
          { link: { type: 'custom', url: '/about', label: 'About Us' } },
          { link: { type: 'custom', url: '/contact', label: 'Contact' } },
          { link: { type: 'custom', url: '/careers', label: 'Careers' } },
        ],
      },
    })

    console.log('🎉 Academy data seeding completed successfully!')

  } catch (error) {
    console.error('❌ Error seeding academy data:', error)
    throw error
  }
}
