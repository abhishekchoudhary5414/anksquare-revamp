'use client'
import { useState } from 'react'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import styles from './contact.module.css'
import Heading from '../../components/heading/heading'
import NotificationModal from '@/components/notification/NotificationModal'
import { contact } from '@/data/details'
import { supabase } from '@/lib/supabase'

const fullAddress = `${contact.address.street.replace(/,\s*$/, '')}, ${contact.address.city}, ${contact.address.state} ${contact.address.zipCode}, ${contact.address.country}`

const contactInfo = [
    {
        icon: <FiMail />,
        title: 'Email Us',
        content: contact.email,
        link: `mailto:${contact.email}`
    },
    {
        icon: <FiPhone />,
        title: 'Call Us',
        content: contact.phone,
        link: `tel:${contact.phone}`
    },
    {
        icon: <FiMapPin />,
        title: 'Visit Us',
        content: fullAddress,
        link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`
    }
]

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        number: '',
        subject: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    // Add validation state
    const [errors, setErrors] = useState({
        name: '',
        number: ''
    })
    const [notification, setNotification] = useState({
        show: false,
        type: 'success' as 'success' | 'error' | 'warning',
        message: ''
    })

    // Update handleChange function
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target

        // Validation for name field - only alphabets and spaces
        if (name === 'name') {
            if (!/^[A-Za-z\s]*$/.test(value)) {
                setErrors(prev => ({
                    ...prev,
                    name: 'Please enter alphabets only'
                }))
                return
            } else {
                setErrors(prev => ({
                    ...prev,
                    name: ''
                }))
            }
        }

        // Validation for phone number
        if (name === 'number') {
            // Check if starts with valid digits and has correct length
            if (!/^[6-9]\d{0,9}$/.test(value)) {
                setErrors(prev => ({
                    ...prev,
                    number: 'Enter valid 10-digit number starting with 6-9'
                }))
                // Allow input only if it's empty or matches pattern
                if (value && !/^[6-9]\d*$/.test(value)) {
                    return
                }
            } else {
                setErrors(prev => ({
                    ...prev,
                    number: ''
                }))
            }
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const { error } = await supabase
                .from('contacts')
                .insert([
                    {
                        name: formData.name,
                        number: formData.number,
                        subject: formData.subject,
                        message: formData.message,
                        status: 'new'
                    }
                ])

            if (error) throw error

            // Show success notification
            setNotification({
                show: true,
                type: 'success',
                message: 'Thank you! Your message has been sent successfully. We will get back to you soon.'
            })

            // Reset form
            setFormData({ name: '', number: '', subject: '', message: '' })

            // Auto-close notification after 3 seconds
            setTimeout(() => {
                setNotification({ show: false, type: 'success', message: '' })
            }, 3000)
        } catch (error) {
            console.error('Error submitting form:', error)
            
            // Show error notification
            setNotification({
                show: true,
                type: 'error',
                message: 'Failed to send message. Please try again or contact us directly.'
            })

            // Auto-close error notification after 3 seconds
            setTimeout(() => {
                setNotification({ show: false, type: 'error', message: '' })
            }, 3000)
        } finally {
            setIsSubmitting(false)
        }
    }


    return (
        <section className={styles.contact} aria-labelledby="contact-heading" itemScope itemType="https://schema.org/ContactPage">
            <div className={styles.container}>
                <Heading
                    id="contact-heading"
                    title='Get in Touch '
                    subtitle='Let&apos;s Connect '
                    titleHighlight='Together'
                ></Heading>

                <div className={styles.content}>
                    <div
                        className={styles.contactInfo}
                    >
                        {contactInfo.map((info, index) => (
                            <a
                                key={index}
                                href={info.link}
                                target={(info.title === 'Visit Us') ? '_blank' : undefined}
                                rel={(info.title === 'Visit Us') ? 'noopener noreferrer' : undefined}
                                className={styles.infoCard}
                                aria-label={`Contact us via ${info.title}: ${info.content}`}
                            >
                                <div className={styles.iconWrapper} aria-hidden="true">{info.icon}</div>
                                <div className={styles.infoContent}>
                                    <p className={styles.infoTitle}>{info.title}</p>
                                    <p>{info.content}</p>
                                </div>
                            </a>
                        ))}
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className={styles.form}
                        aria-label="Contact form"
                        itemScope 
                        itemType="https://schema.org/ContactForm"
                    >
                        <div className={styles.formGroup}>
                            <label htmlFor="name-input">Name *</label>
                            <input
                                id="name-input"
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                pattern="[A-Za-z\s]+"
                                title="Please enter alphabets only"
                                aria-label="Your full name"
                                aria-describedby="name-error"
                            />
                            {errors.name && <span id="name-error" className={styles.errorText}>{errors.name}</span>}
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="phone-input">Phone Number *</label>
                            <input
                                id="phone-input"
                                type="tel"
                                name="number"
                                placeholder="Your Number"
                                value={formData.number}
                                onChange={handleChange}
                                required
                                pattern="[6-9][0-9]{9}"
                                maxLength={10}
                                title="Please enter a valid 10-digit number starting with 6-9"
                                aria-label="Your phone number"
                                aria-describedby="phone-error"
                            />
                            {errors.number && <span id="phone-error" className={styles.errorText}>{errors.number}</span>}
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="message-input">Message *</label>
                            <textarea
                                id="message-input"
                                name="message"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                aria-label="Your message"
                            />
                        </div>
                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
                <div
                    className={styles.mapSection}
                >
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Visit Our Office Location</h3>
                    <div className={styles.mapWrapper}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.8666266352675!2d85.05918450000001!3d25.6093478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed57d9feb6ce2d%3A0xc0afc42975406f08!2sAnk%20Square%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1757592675504!5m2!1sen!2sin"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Ank Square office location at Patna, Bihar - Map"
                            aria-label="Google Map showing Ank Square office location in Patna"
                        />
                    </div>
                </div>
            </div>

            {/* Success/Error Notification Modal */}
            <NotificationModal
                open={notification.show}
                type={notification.type}
                message={notification.message}
                onClose={() => setNotification({ show: false, type: 'success', message: '' })}
            />
        </section>
    )
}

export default Contact