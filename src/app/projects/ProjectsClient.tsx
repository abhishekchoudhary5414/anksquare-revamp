'use client'
import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { clients, ProjectWork } from '@/data/client'
import styles from './projects.module.css'
import EnquiryModal from '@/components/enquiry/EnquiryModal'
import Button from '@/components/button/Button'

const ProjectsClient: React.FC = () => {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<string>('')
  const [selectedFilter, setSelectedFilter] = useState<string>('all')

  const handleContactClick = (serviceTitle: string) => {
    setSelectedService(serviceTitle)
    setIsEnquiryModalOpen(true)
  }

  // Get all unique work types
  const workTypes = useMemo(() => {
    const types = new Set<string>()
    clients.forEach(client => {
      client.workDone.forEach(work => {
        types.add(work.type)
      })
    })
    return ['all', ...Array.from(types)]
  }, [])

  // Filter projects based on selected filter
  const filteredProjects = useMemo(() => {
    const allProjects: (ProjectWork & { clientName: string; clientSlug: string; clientLogo: string })[] = []

    clients.forEach(client => {
      client.workDone.forEach(work => {
        if (selectedFilter === 'all' || work.type === selectedFilter) {
          allProjects.push({
            ...work,
            clientName: client.name,
            clientSlug: client.slug,
            clientLogo: client.logo
          })
        }
      })
    })

    return allProjects
  }, [selectedFilter])

  const getWorkTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      logo: 'Logo Design',
      website: 'Website',
      visitingCard: 'Visiting Card',
      profile: 'Profile',
      business: 'Business',
      letterHead: 'Letterhead'
    }
    return labels[type] || type.charAt(0).toUpperCase() + type.slice(1)
  }

  // helper to prefix client asset paths stored under public/assets/client
  const resolveClientAsset = (relativePath: string) => {
    if (!relativePath) return ''
    if (relativePath.startsWith('/assets')) return relativePath
    // data paths begin with leading slash such as '/sharma-interiors/website.png'
    return `/assets/client${relativePath}`
  }

  return (
    <section className={styles.projectsPage}>
      <div className={styles.container}>
        {/* Skip to main content link for accessibility */}

        <main id="main-content" role="main">
        

          {/* Client Portfolio Section */}
          <div className={styles.section}>
            <h1 className={styles.sectionTitle}>Our Client Portfolio</h1>
            <p className={styles.sectionDescription}>
              Explore our successful projects and transformations across various industries and service categories.
            </p>

            {/* Filter Buttons */}
            <div className={styles.filterButtons}>
              {workTypes.map(type => (
                <button
                  key={type}
                  className={`${styles.filterButton} ${selectedFilter === type ? styles.active : ''}`}
                  onClick={() => setSelectedFilter(type)}
                >
                  {type === 'all' ? 'All Projects' : getWorkTypeLabel(type)}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className={styles.projectsGrid}>
              {filteredProjects.map((project, index) => (
                <div
                  key={`${project.clientSlug}-${project.type}-${index}`}
                  className={styles.projectCard}
                >
                  <div className={styles.projectHeader}>
                    <div className={styles.projectTypeBadge}>
                      {getWorkTypeLabel(project.type)}
                    </div>
                    <div className={styles.clientBadge}>
                      <img
                        src={resolveClientAsset(project.clientLogo)}
                        alt={project.clientName}
                        className={styles.clientBadgeImage}
                      />
                      <span>{project.clientName}</span>
                    </div>
                  </div>

                  <div className={styles.projectContent}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectDescription}>
                      {project.description.length > 120
                        ? `${project.description.substring(0, 120)}...`
                        : project.description}
                    </p>

                    {project.images && project.images.length > 0 && (
                      <div className={styles.projectImage}>
                        <Image
                          src={resolveClientAsset(project.images[0])}
                          alt={project.title}
                          fill
                          className={styles.projectImageSrc}
                          priority={false}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                  </div>

                  <div className={styles.projectActions}>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.viewProjectLink}
                      >
                        View Live →
                      </a>
                    )}
                    {project.presentationUrl && (
                      <a
                        href={project.presentationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.viewProjectLink}
                      >
                        View Presentation →
                      </a>
                    )}
                    <Button
                      variant="primary"
                      onClick={() => handleContactClick(`${getWorkTypeLabel(project.type)} - ${project.clientName}`)}
                    >
                      Enquiry Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          
          <div className={styles.ctaSection}>
            <h2 className={styles.ctaTitle}>Ready to Transform Your Business?</h2>
            <p className={styles.ctaDescription}>
              Let's discuss how our services can help you achieve your digital goals.
              Contact us today for a free consultation.
            </p>
            <Button
              variant="primary"
              onClick={() => handleContactClick('General Inquiry')}
            >
              Start Your Project
            </Button>
          </div>
        </main>

        <EnquiryModal
          open={isEnquiryModalOpen}
          onClose={() => setIsEnquiryModalOpen(false)}
          selectedService={selectedService}
        />
      </div>
    </section>
  )
}

export default ProjectsClient