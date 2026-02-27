'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { Search, GraduationCap, ArrowRight, Users, Award, BookOpen, Globe, Rocket, ShieldCheck, Zap, Calendar, MapPin, Target, Lightbulb, Filter, X, Clock, Play, Pause, RefreshCw } from 'lucide-react'
import Image from 'next/image'
import { CourseCard } from '@/components/academy/CourseCard'
import { TrackCard } from '@/components/academy/TrackCard'
import { TestimonialCard } from '@/components/academy/TestimonialCard'
import { EventCard } from '@/components/academy/EventCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

import type { Course, Track, Testimonial, Event, Lecturer, Setting } from '@/payload-types'

interface AcademyPageContentProps {
  courses: Course[]
  tracks: Track[]
  testimonials: Testimonial[]
  events: Event[]
  lecturers: Lecturer[]
  settings?: Setting
}

// Extended Course type for rating support
interface CourseWithRating extends Course {
  rating?: number
}

type SortOption = 'popularity' | 'price' | 'duration' | 'newest' | 'rating'

export function AcademyPageContent({ courses, tracks, testimonials, events, lecturers, settings }: AcademyPageContentProps) {
  const _settings = settings // Mark as unused
  // Core State Management
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTrack, setSelectedTrack] = useState<string>('all')
  const [selectedLevel, setSelectedLevel] = useState<string>('all')
  const [selectedEventType, setSelectedEventType] = useState<string>('all')
  const [sortBy, setSortBy] = useState<SortOption>('popularity')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isLoading, setIsLoading] = useState(false)
  const [savedCourses, setSavedCourses] = useState<Set<string>>(new Set())
  const [_likedCourses, setLikedCourses] = useState<Set<string>>(new Set())
  const [_recentlyViewed, setRecentlyViewed] = useState<string[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  
  // Animated Stats State
  const [animatedStats, setAnimatedStats] = useState({ 
    students: 0, 
    courses: 0, 
    rate: 0, 
    partners: 0,
    hours: 0 
  })

  // Live Activity State
  const [liveStats, setLiveStats] = useState({ 
    onlineUsers: 245, 
    activeCourses: 12, 
    enrollmentsToday: 28 
  })

  // Advanced Filtering Logic
  const filteredCourses = useMemo(() => {
    let filtered = courses.map(course => course as CourseWithRating)

    // Search Filter with fuzzy matching
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(course => {
        const title = course.title.toLowerCase()
        const description = course.description?.toLowerCase() || ''
        const trackName = typeof course.track === 'object' ? course.track?.name?.toLowerCase() : ''
        const level = course.level?.toLowerCase() || ''
        
        return title.includes(query) || 
               description.includes(query) || 
               trackName.includes(query) ||
               level.includes(query)
      })
    }

    // Track Filter
    if (selectedTrack !== 'all') {
      filtered = filtered.filter(course => {
        const trackId = typeof course.track === 'object' ? course.track?.id : course.track
        return trackId === selectedTrack
      })
    }

    // Level Filter
    if (selectedLevel !== 'all') {
      filtered = filtered.filter(course => course.level === selectedLevel)
    }

    // Advanced Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return (a.price || 0) - (b.price || 0)
        case 'duration':
          return (a.duration || '').localeCompare(b.duration || '')
        case 'newest':
          return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
        case 'rating':
          return (b.rating || 0) - (a.rating || 0)
        case 'popularity':
        default:
          // Multi-factor popularity score
          const scoreA = (a.featured ? 10 : 0) + ((a.rating || 0) * 2) + (savedCourses.has(a.id) ? 5 : 0)
          const scoreB = (b.featured ? 10 : 0) + ((b.rating || 0) * 2) + (savedCourses.has(b.id) ? 5 : 0)
          return scoreB - scoreA
      }
    })

    return filtered
  }, [courses, searchQuery, selectedTrack, selectedLevel, sortBy, savedCourses])

  const filteredEvents = useMemo(() => {
    let filtered = [...events]

    if (selectedEventType !== 'all') {
      filtered = filtered.filter(event => event.type === selectedEventType)
    }

    return filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [events, selectedEventType])

  // Stats Animation Effect
  useEffect(() => {
    const targetStats = {
      students: 2500,
      courses: courses.length,
      rate: 95,
      partners: 50,
      hours: 1200000
    }

    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      
      setAnimatedStats({
        students: Math.floor(targetStats.students * progress),
        courses: Math.floor(targetStats.courses * progress),
        rate: Math.floor(targetStats.rate * progress),
        partners: Math.floor(targetStats.partners * progress),
        hours: Math.floor(targetStats.hours * progress)
      })

      if (currentStep >= steps) {
        clearInterval(timer)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [courses.length])

  // Live Stats Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        onlineUsers: Math.max(100, Math.min(500, prev.onlineUsers + Math.floor(Math.random() * 21) - 10)),
        activeCourses: Math.max(5, Math.min(courses.length, prev.activeCourses + Math.floor(Math.random() * 3) - 1)),
        enrollmentsToday: Math.min(100, prev.enrollmentsToday + Math.floor(Math.random() * 3))
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [courses.length])

  // Auto-rotating Testimonials
  useEffect(() => {
    if (!isPlaying || testimonials.length === 0) return

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying, testimonials.length])

  // Interaction Handlers
  const _handleSaveCourse = useCallback((courseId: string) => {
    setSavedCourses(prev => {
      const newSet = new Set(prev)
      if (newSet.has(courseId)) {
        newSet.delete(courseId)
      } else {
        newSet.add(courseId)
      }
      return newSet
    })
  }, [])

  const _handleLikeCourse = useCallback((courseId: string) => {
    setLikedCourses(prev => {
      const newSet = new Set(prev)
      if (newSet.has(courseId)) {
        newSet.delete(courseId)
      } else {
        newSet.add(courseId)
      }
      return newSet
    })
  }, [])

  const _handleViewCourse = useCallback((courseId: string) => {
    setRecentlyViewed(prev => {
      const updated = [courseId, ...prev.filter(id => id !== courseId)].slice(0, 5)
      return updated
    })
  }, [])

  const _handleShareCourse = useCallback(async (courseId: string) => {
    const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/academy/courses/${courseId}`
    
    if (navigator.share) {
      await navigator.share({
        title: 'Check out this course!',
        text: 'I found this amazing course on Tecobit Academy',
        url
      })
    } else {
      await navigator.clipboard.writeText(url)
    }
  }, [])

  const clearAllFilters = useCallback(() => {
    setSearchQuery('')
    setSelectedTrack('all')
    setSelectedLevel('all')
    setSelectedEventType('all')
  }, [])

  // Dynamic Data Processing
  const featuredCourses = useMemo(() => 
    filteredCourses.filter(course => course.featured).slice(0, 6), 
    [filteredCourses]
  )
  
  const upcomingEvents = useMemo(() => 
    filteredEvents.filter(event => new Date(event.date) > new Date()).slice(0, 3), 
    [filteredEvents]
  )
  
  const featuredTestimonials = useMemo(() => testimonials.slice(0, 4), [testimonials])
  const topLecturers = useMemo(() => lecturers.slice(0, 4), [lecturers])
  const _trendingCourses = useMemo(() => filteredCourses.slice(0, 8), [filteredCourses])

  const whyFeatures = [
    { 
      iconType: 'Rocket', 
      title: 'Accelerated Learning', 
      description: 'Intense, industry-aligned curriculum designed to get you job-ready in weeks, not years.' 
    },
    { 
      iconType: 'ShieldCheck', 
      title: 'Guaranteed Excellence', 
      description: 'Every course is vetted by tech leads from top companies to ensure curriculum relevance.' 
    },
    { 
      iconType: 'Users', 
      title: 'Elite Community', 
      description: 'Join a network of thousands of alumni working at companies like Google, Meta, and Netflix.' 
    },
    { 
      iconType: 'Zap', 
      title: 'Real World Projects', 
      description: 'Build a high-impact portfolio with projects that solve actual enterprise-level problems.' 
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Tecobit Academy</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="relative gradient-primary text-primary-foreground py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"></div>
        
        <div className="relative container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-white/10 text-white border-white/20 px-4 py-2 text-xs font-semibold animate-fade-in">
            🚀 Registration Open — Spring 2026 Admissions
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Explore Our
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400">
              Engineering Programs
            </span>
          </h1>
          
          <p className="text-lg md:text-xl mb-12 text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Master the most in-demand tech skills through our specialized industry tracks. 
            Join {animatedStats.students.toLocaleString()}+ alumni working at top tech companies worldwide.
          </p>
          
          {/* Enhanced Search */}
          <div className="max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-foreground/60" />
              <Input 
                placeholder="Search for programs, tracks, or skills..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-background/20 backdrop-blur border-white/20 text-white placeholder:text-white/60 pl-12 pr-12 h-12 text-base"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            {searchQuery && (
              <div className="mt-2 text-sm text-primary-foreground/60 animate-fade-in">
                Found {filteredCourses.length} courses matching &quot;{searchQuery}&quot;
                {filteredCourses.length === 0 && (
                  <div className="mt-2">
                    <Button 
                      variant="link" 
                      className="text-white underline" 
                      onClick={() => setSearchQuery('')}
                    >
                      Clear search to see all courses
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Live Activity Indicators */}
          <div className="mb-8 flex items-center justify-center gap-6 text-sm text-primary-foreground/60 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>{liveStats.onlineUsers} users online</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span>{liveStats.enrollmentsToday} enrollments today</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-3 shadow-lg">
              <Target className="h-4 w-4 mr-2" />
              Explore Programs ({filteredCourses.length})
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-8 py-3">
              <Lightbulb className="h-4 w-4 mr-2" />
              Get Free Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Dynamic Stats Bar */}
      <section className="bg-primary/95 border-y border-white/5 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="text-center group">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 mb-3 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6 text-white" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white mb-1">{animatedStats.students.toLocaleString()}+</p>
              <p className="text-xs text-white/60 uppercase tracking-wider">Success Stories</p>
            </div>
            <div className="text-center group">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 mb-3 group-hover:scale-110 transition-transform">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white mb-1">{animatedStats.courses}</p>
              <p className="text-xs text-white/60 uppercase tracking-wider">Courses</p>
            </div>
            <div className="text-center group">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 mb-3 group-hover:scale-110 transition-transform">
                <Award className="h-6 w-6 text-white" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white mb-1">{animatedStats.rate}%</p>
              <p className="text-xs text-white/60 uppercase tracking-wider">Employment Rate</p>
            </div>
            <div className="text-center group">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 mb-3 group-hover:scale-110 transition-transform">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white mb-1">{animatedStats.partners}+</p>
              <p className="text-xs text-white/60 uppercase tracking-wider">Partners</p>
            </div>
            <div className="text-center group">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 mb-3 group-hover:scale-110 transition-transform">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white mb-1">{(animatedStats.hours / 1000000).toFixed(1)}M+</p>
              <p className="text-xs text-white/60 uppercase tracking-wider">Learning Hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Filter Bar */}
      <section className="py-8 bg-muted/30 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold">Filters:</span>
              <Badge variant="secondary" className="text-xs">
                {filteredCourses.length} results
              </Badge>
            </div>
            
            {/* Track Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Track:</span>
              <select 
                value={selectedTrack}
                onChange={(e) => setSelectedTrack(e.target.value)}
                className="text-sm border rounded px-2 py-1 bg-background"
              >
                <option value="all">All Tracks</option>
                {tracks.map(track => (
                  <option key={track.id} value={track.id}>{track.name}</option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Level:</span>
              <select 
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="text-sm border rounded px-2 py-1 bg-background"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="text-sm border rounded px-2 py-1 bg-background"
              >
                <option value="popularity">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price">Price: Low to High</option>
                <option value="duration">Duration</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 ml-auto">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                List
              </Button>
            </div>

            {/* Clear Filters */}
            {(selectedTrack !== 'all' || selectedLevel !== 'all' || searchQuery) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}

            {/* Refresh Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsLoading(true)
                setTimeout(() => setIsLoading(false), 1000)
              }}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </section>

      {/* Learning Tracks Section */}
      {tracks.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Learning Paths</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Track</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Select a specialized learning path designed for modern industry demands and career growth.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {tracks.map((track, index) => (
                <div key={track.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <TrackCard track={track} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Courses Section */}
      {featuredCourses.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Featured Programs</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Most Popular Courses {searchQuery && `(${featuredCourses.length})`}
                </h2>
                <p className="text-muted-foreground">Hand-picked courses by our expert instructors</p>
              </div>
              <Link href="/academy/courses">
                <Button variant="outline" className="mt-4 md:mt-0">
                  View All Courses <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className={`gap-6 ${viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3' : 'space-y-4'}`}>
              {featuredCourses.map((course, index) => (
                <div key={course.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Courses Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">All Programs</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              All Available Courses {filteredCourses.length !== courses.length && `(${filteredCourses.length} filtered)`}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our complete catalog of {courses.length} courses across all tracks
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>Loading courses...</p>
            </div>
          ) : (
            <div className={`gap-6 ${viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3' : 'space-y-4'}`}>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course, index) => (
                  <div key={course.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                    <CourseCard course={course} />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-muted-foreground mb-4">
                    <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">No courses found matching your criteria</p>
                    <p className="text-sm mt-2">Try adjusting your filters or search terms</p>
                  </div>
                  <Button onClick={clearAllFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid gap-20 lg:grid-cols-2 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-white/10 border border-white/10">
                <ShieldCheck className="h-3.5 w-3.5 text-[#00f3ff]" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00f3ff]">The Tecobit Advantage</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight">
                Why Engineers Choose Our Academy
              </h2>
              <p className="text-white/70 mb-12 text-xl max-w-lg leading-relaxed font-medium">
                We don&apos;t just provide tutorials — we architect career paths for future technology leaders.
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                {whyFeatures.map((feature) => {
                  const IconMap: Record<string, React.ComponentType<{ className?: string }>> = { 
                    Rocket, ShieldCheck, Users, Zap, Award, Globe, Target, Lightbulb 
                  }
                  const iconName = feature.iconType || 'Rocket'
                  const Icon = IconMap[iconName] || Rocket

                  return (
                    <div key={feature.title} className="group">
                      <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-1">
                        <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#00f3ff] group-hover:text-[#5173ff] transition-all duration-500">
                          <Icon className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-black mb-3 tracking-tight">{feature.title}</h3>
                        <p className="text-white/70 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            
            {/* Interactive Stats Card */}
            <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
              <Card className="relative bg-white/5 border-white/10 backdrop-blur">
                <CardContent className="p-8 text-center">
                  <div className="mb-8">
                    <p className="text-5xl md:text-6xl font-bold text-white mb-2">{animatedStats.students.toLocaleString()}M+</p>
                    <p className="text-primary-foreground/70">Hours of Learning</p>
                  </div>
                  <div className="h-px bg-white/20 mb-8"></div>
                  <div className="flex justify-center gap-2 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-white/60" />
                      </div>
                    ))}
                    <div className="h-10 w-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold">
                      +2k
                    </div>
                  </div>
                  <p className="text-primary-foreground/80">Active Learners Community</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Top Lecturers Section */}
      {topLecturers.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Expert Instructors</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Learn from Industry Leaders</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our instructors are experienced professionals from top tech companies.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {topLecturers.map((lecturer) => (
                <Card key={lecturer.id} className="text-center group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-primary/5">
                  <CardContent className="p-8">
                    <div className="relative h-24 w-24 mx-auto mb-6">
                      <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse group-hover:scale-110 transition-transform" />
                      <div className="relative h-full w-full rounded-full overflow-hidden border-2 border-white shadow-lg">
                        {typeof lecturer.photo === 'object' && lecturer.photo?.url ? (
                          <Image src={lecturer.photo.url} alt={lecturer.name} fill className="object-cover" sizes="80px" />
                        ) : (
                          <div className="h-full w-full bg-primary/20 flex items-center justify-center">
                            <span className="text-2xl font-black text-primary">
                              {lecturer.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <h3 className="font-black text-xl mb-1 group-hover:text-primary transition-colors">{lecturer.name}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{lecturer.role}</p>
                    <p className="text-xs text-muted-foreground">{lecturer.experience}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events Section */}
      {upcomingEvents.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Events</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
                <p className="text-muted-foreground">Join our workshops, webinars, and hackathons</p>
              </div>
              <Link href="/academy/events">
                <Button variant="outline" className="mt-4 md:mt-0">
                  View All Events <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event, index) => (
                <div key={event.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Student Testimonials Section */}
      {featuredTestimonials.length > 0 && (
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Badge className="bg-white/10 text-white border-white/20">Success Stories</Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:bg-white/10"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Students Say</h2>
              <p className="text-primary-foreground/80 max-w-2xl mx-auto">
                Real stories from real students who transformed their careers
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {featuredTestimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id} 
                  className={`animate-fade-in transition-all duration-500 ${
                    index === currentTestimonial ? 'scale-105 shadow-2xl' : 'opacity-70'
                  }`} 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <GraduationCap className="h-20 w-20 mx-auto mb-6 text-yellow-300" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Can&apos;t find the right program?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto text-lg">
            Our curriculum advisors can help you choose the perfect track based on your goals and background
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-3">
              <Users className="h-4 w-4 mr-2" />
              Talk to an Advisor
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-8 py-3">
              <Calendar className="h-4 w-4 mr-2" />
              Book a Free Session
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-bold">Tecobit Academy</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Empowering the next generation of tech leaders with world-class education.
              </p>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  +977 1234567890
                </span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/academy/courses" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Courses</Link>
                <Link href="/academy/events" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Events</Link>
                <Link href="/academy/testimonials" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Testimonials</Link>
                <Link href="/academy/apply" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Apply</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Kathmandu, Nepal
                </p>
                <p className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  +977 1234567890
                </p>
                <p>info@tecobit.com</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Join Monthly News</h4>
              <div className="flex gap-2">
                <Input placeholder="Your email" className="flex-1" />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Tecobit Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
