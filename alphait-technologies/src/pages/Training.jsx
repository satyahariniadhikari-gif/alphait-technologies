import Editable from '../admin/Editable.jsx'
import EditableImage from '../admin/EditableImage.jsx'
import EditableList from '../admin/EditableList.jsx'
import ButtonLink from '../admin/ButtonLink.jsx'
import PageSections from '../admin/PageSections.jsx'
import { useCompany } from '../admin/content-context.js'
import PageBanner from '../components/PageBanner.jsx'
import Icon from '../components/Icon.jsx'
import trainingPhoto from '../assets/training-session.jpg'
import trainingLab from '../assets/training-lab.jpg'
import { services, stats, technologies, trainingCourses as courses } from '../data/site.js'

// The offer, technologies and stat sections reuse the site's existing Training service,
// technologies and stats; the ids are shared so an edit made on one page shows on the others.
const training = services.find((service) => service.slug === 'training')
const trainedIndex = stats.findIndex((stat) => /trained/i.test(stat.label))
const trained = stats[trainedIndex]

export default function Training() {
  const company = useCompany()

  return (
    <>
      <PageBanner
        id="training.banner"
        title="Trainings"
        subtitle={training.summary}
        image={trainingLab}
        aside={
          <>
            <div className="hero__panel-card">
              <Icon name="users" size={28} />
              <h2>
                <Editable id={`stats.${trainedIndex}.value`}>{trained.value}</Editable>
              </h2>
              <p>
                <Editable id={`stats.${trainedIndex}.label`}>{trained.label}</Editable>
              </p>
            </div>
            <div className="hero__panel-card">
              <Icon name="training" size={28} />
              <h2>
                <Editable id="services.training.points.0">{training.points[0]}</Editable>
              </h2>
              <p>
                <Editable id="services.training.points.3">{training.points[3]}</Editable>
              </p>
            </div>
          </>
        }
      />

      <PageSections
        page="training"
        sections={[
          [
            'offer',
            'What we offer',
            <section key="offer" className="section">
              <div className="container two-col">
                <div>
                  <p className="eyebrow">
                    <Editable id="training.offer.eyebrow">What we offer</Editable>
                  </p>
                  <h2 className="section__title">
                    <Editable id="services.training.title">{training.title}</Editable>
                  </h2>
                  <p>
                    <Editable id="services.training.summary">{training.summary}</Editable>
                  </p>
                  <EditableList
                    id="services.training.points"
                    defaults={training.points.map((_, i) => String(i))}
                    as="ul"
                    className="ticks"
                    newItem={{ '': 'New point' }}
                    addLabel="Add point"
                    itemLabel="point"
                    renderItem={(itemId, key) => (
                      <li>
                        <Icon name="check" size={18} />
                        <span>
                          <Editable id={key()}>{training.points[Number(itemId)] ?? ''}</Editable>
                        </span>
                      </li>
                    )}
                  />
                  <div className="intro__actions">
                    <ButtonLink id="training.offer.cta" to="/contact" className="btn btn--primary">
                      Request a call back
                    </ButtonLink>
                  </div>
                </div>
                <figure className="photo">
                  <EditableImage
                    id="training.offer.photo"
                    src={trainingPhoto}
                    alt="An Alpha IT trainer leading a classroom session"
                    loading="lazy"
                  />
                </figure>
              </div>
            </section>,
          ],
          [
            'courses',
            'Courses',
            <section key="courses" className="section section--tint">
              <div className="container">
                <header className="section__head">
                  <p className="eyebrow">
                    <Editable id="training.courses.eyebrow">Courses</Editable>
                  </p>
                  <h2 className="section__title">
                    <Editable id="training.courses.title">Choose your track</Editable>
                  </h2>
                  <p className="section__lead">
                    <Editable id="training.courses.lead">
                      New batches start regularly. Ask us about the next start date for your course.
                    </Editable>
                  </p>
                </header>
                <EditableList
                  id="training.courses"
                  defaults={courses.map((_, i) => String(i))}
                  className="grid grid--3"
                  newItem={{
                    title: 'New course',
                    mode: 'Live online',
                    duration: '8 weeks',
                    level: 'Beginner',
                    summary: 'Describe what students will learn.',
                  }}
                  addLabel="Add course"
                  itemLabel="course"
                  renderItem={(itemId, key) => {
                    const course = courses[Number(itemId)]
                    return (
                      <article className="job-card">
                        <span className="tag">
                          <Editable id={key('mode')}>{course?.mode ?? ''}</Editable>
                        </span>
                        <h3>
                          <Editable id={key('title')}>{course?.title ?? ''}</Editable>
                        </h3>
                        <p>
                          <Editable id={key('summary')}>{course?.summary ?? ''}</Editable>
                        </p>
                        <ul className="job-card__meta">
                          <li>
                            <Icon name="clock" size={16} />{' '}
                            <Editable id={key('duration')}>{course?.duration ?? ''}</Editable>
                          </li>
                          <li>
                            <Icon name="users" size={16} />{' '}
                            <Editable id={key('level')}>{course?.level ?? ''}</Editable>
                          </li>
                        </ul>
                        <ButtonLink
                          id={key('cta')}
                          to="/contact"
                          className="link-arrow"
                          icon="arrow"
                          iconSize={16}
                        >
                          Enroll now
                        </ButtonLink>
                      </article>
                    )
                  }}
                />
              </div>
            </section>,
          ],
          [
            'technologies',
            'Technologies',
            <section key="technologies" className="section">
              <div className="container">
                <header className="section__head">
                  <p className="eyebrow">
                    <Editable id="training.technologies.eyebrow">Technologies</Editable>
                  </p>
                  <h2 className="section__title">
                    <Editable id="training.technologies.title">
                      Training across a wide range of software technologies
                    </Editable>
                  </h2>
                </header>
                <EditableList
                  id="technologies"
                  defaults={technologies.map((_, i) => String(i))}
                  as="ul"
                  className="chips"
                  newItem={{ '': 'New technology' }}
                  addLabel="Add technology"
                  itemLabel="technology"
                  renderItem={(itemId, key) => (
                    <li>
                      <Editable id={key()}>{technologies[Number(itemId)] ?? ''}</Editable>
                    </li>
                  )}
                />
              </div>
            </section>,
          ],
          [
            'stat',
            'Trained and placed',
            <section key="stat" className="section section--dark">
              <div className="container">
                <ul className="stats stats--single">
                  <li>
                    <strong>
                      <Editable id={`stats.${trainedIndex}.value`}>{trained.value}</Editable>
                    </strong>
                    <span>
                      <Editable id={`stats.${trainedIndex}.label`}>{trained.label}</Editable>
                    </span>
                  </li>
                </ul>
              </div>
            </section>,
          ],
          [
            'cta',
            'Call to action',
            <section key="cta" className="section">
              <div className="container cta-band">
                <div>
                  <h2>
                    <Editable id="training.cta.title">Ready to start a conversation?</Editable>
                  </h2>
                  <p>
                    <Editable id="training.cta.textBefore">Call</Editable>{' '}
                    <Editable id="company.phone">{company.phone}</Editable>{' '}
                    <Editable id="training.cta.textAfter">or send a note to</Editable>{' '}
                    <a href={company.emailHref}>
                      <Editable id="company.email">{company.email}</Editable>
                    </a>
                    .
                  </p>
                </div>
                <ButtonLink id="training.cta.button" to="/contact" className="btn btn--accent" icon="arrow">
                  Request a call back
                </ButtonLink>
              </div>
            </section>,
          ],
        ]}
      />
    </>
  )
}
