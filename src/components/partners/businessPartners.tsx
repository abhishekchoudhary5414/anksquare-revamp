import Heading from '@/components/heading/heading'
import styles from './businessPartners.module.css'

const BusinessPartners = () => (
    <section className={styles.partnerSection} aria-labelledby="business-partners-heading">
        <div className={styles.container}>
            <Heading
                subtitle="Partnerships"
                title="Our "
                titleHighlight="Business Partners"
                id="business-partners-heading"
            />
            <article className={styles.partnerCard}>
                <h3 className={styles.partnerName}>
                    <a
                        href="https://www.gracetechnologies.uk/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Grace Technologies
                    </a>
                </h3>
                <p className={styles.description}>
                    Ank Square is pleased to recognize Grace Technologies as a business partner in the United Kingdom.
                    Visit their website to learn more about Grace Technologies.
                </p>
                <dl className={styles.details}>
                    <div>
                        <dt>Country</dt>
                        <dd>United Kingdom</dd>
                    </div>
                    <div>
                        <dt>Relationship</dt>
                        <dd>Business Partner</dd>
                    </div>
                </dl>
            </article>
        </div>
    </section>
)

export default BusinessPartners
