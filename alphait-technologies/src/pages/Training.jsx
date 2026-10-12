import Editable from '../admin/Editable.jsx'
import EditableIcon from '../admin/EditableIcon.jsx'
import EditableImage from '../admin/EditableImage.jsx'
import EditableList from '../admin/EditableList.jsx'
import ButtonLink from '../admin/ButtonLink.jsx'
import PageSections from '../admin/PageSections.jsx'
import { useCompany } from '../admin/content-context.js'
import PageBanner from '../components/PageBanner.jsx'
import AiProgramPromo from '../components/AiProgramPromo.jsx'
import Icon from '../components/Icon.jsx'
import trainingPhoto from '../assets/training-session.jpg'

const courses = [
  {
    title: 'AI & Machine Learning',
    mode: 'Live online',
    duration: '12 weeks',
    level: 'Beginner to advanced',
    summary:
      'Python, machine learning models, deep learning and generative AI, finished with a live project.',
  },
  {
    title: 'Cloud Computing (AWS & Azure)',
    mode: 'Classroom & online',
    duration: '8 weeks',
    level: 'Intermediate',
    summary:
      'Design, deploy and secure cloud infrastructure, with preparation for associate-level certifications.',
  },
  {
    title: 'Data Science & Analytics',
    mode: 'Live online',
    duration: '10 weeks',
    level: 'Beginner',
    summary:
      'Statistics, SQL, Python and dashboards — turning raw business data into decisions.',
  },
  {
    title: 'Full-Stack Web Development',
    mode: 'Classroom & online',
    duration: '12 weeks',
    level: 'Beginner',
    summary: 'Modern front-end and back-end development, APIs and deployment, built project by project.',
  },
  {
    title: 'QA Automation Testing',
    mode: 'Live online',
    duration: '8 weeks',
    level: 'Beginner to intermediate',
    summary: 'Manual testing foundations, Selenium, API testing and CI pipelines for release quality.',
  },
  {
    title: 'Data Warehousing & BI',
    mode: 'Live online',
    duration: '8 weeks',
    level: 'Intermediate',
    summary: 'ETL, dimensional modelling and reporting on the platforms enterprises run today.',
  },
]

const formats = [
  {
    icon: 'training',
    title: 'Classroom batches',
    text: 'Instructor-led sessions at our Branchburg, NJ office with hands-on lab time.',
  },
  {
    icon: 'spark',
    title: 'Live online',
    text: 'Interactive virtual classes with recordings, so you never fall behind.',
  },
  {
    icon: 'users',
    title: 'Corporate upskilling',
    text: 'Programs tailored to your team’s stack and delivered on your schedule.',
  },
]

const includes = [
  'Hands-on labs on real tools and platforms',
  'Live project experience you can talk about in interviews',
  'Resume building and mock interviews',
  'Placement support with our client network',
  'Certification guidance',
  'Session recordings and course material',
]

export default function Training() {
  const company = useCompany()

  return (
    <>
      <PageBanner
        id="training.banner"
        title="Training"
        subtitle="Instructor-led classroom and online training that makes you job-ready."
      />

      <PageSections
        page="training"
        sections={[
          [
            'intro',
            'Welcome',
            <section key="intro" className="section">
              <div className="container two-col">
                <div>
                  <p className="eyebrow">
                    <Editable id="training.intro.eyebrow">Learn with Alpha IT</Editable>
                  </p>
                  <h2 className="section__title">
                    <Editable id="training.intro.title">
                      Training built around the skills employers hire for
                    </Editable>
                  </h2>
                  <p>
                    <Editable id="training.intro.p1">
                      {`${company.name} offers custom-made, instructor-led classroom and online training for students and businesses across a wide range of software technologies.`}
                    </Editable>
                  </p>
                  <p>
                    <Editable id="training.intro.p2">
                      Every course is taught by working professionals and combines theory with hands-on
                      labs and real project scenarios, followed by interview preparation and placement
                      support.
                    </Editable>
                  </p>
                  <div className="intro__actions">
                    <ButtonLink id="training.intro.cta" to="/contact" className="btn btn--primary">
                      Enquire about a course
                    </ButtonLink>
                  </div>
                </div>
                <figure className="photo">
                  <EditableImage
                    id="training.intro.photo"
                    src={trainingPhoto}
                    alt="An Alpha IT trainer leading a classroom session"
                    loading="lazy"
                  />
                </figure>
              </div>
            </section>,
          ],
          ['aiProgram', 'AI program promo', <AiProgramPromo key="aiProgram" />],
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
            'formats',
            'How you can learn',
            <section key="formats" className="section">
              <div className="container">
                <header className="section__head">
                  <p className="eyebrow">
                    <Editable id="training.formats.eyebrow">How you can learn</Editable>
                  </p>
                  <h2 className="section__title">
                    <Editable id="training.formats.title">Flexible formats for students and teams</Editable>
                  </h2>
                </header>
                <EditableList
                  id="training.formats"
                  defaults={formats.map((_, i) => String(i))}
                  className="grid grid--3"
                  newItem={{ title: 'New format', text: 'Describe this format.' }}
                  addLabel="Add format"
                  itemLabel="format"
                  renderItem={(itemId, key) => {
                    const format = formats[Number(itemId)]
                    return (
                      <article className="service-card">
                        <span className="service-card__icon">
                          <EditableIcon id={key('icon')} fallback={format?.icon ?? 'spark'} size={30} />
                        </span>
                        <h3>
                          <Editable id={key('title')}>{format?.title ?? ''}</Editable>
                        </h3>
                        <p>
                          <Editable id={key('text')}>{format?.text ?? ''}</Editable>
                        </p>
                      </article>
                    )
                  }}
                />
              </div>
            </section>,
          ],
          [
            'includes',
            'What every course includes',
            <section key="includes" className="section section--tint">
              <div className="container">
                <header className="section__head">
                  <p className="eyebrow">
                    <Editable id="training.includes.eyebrow">Beyond the classroom</Editable>
                  </p>
                  <h2 className="section__title">
                    <Editable id="training.includes.title">What every course includes</Editable>
                  </h2>
                </header>
                <EditableList
                  id="training.includes"
                  defaults={includes.map((_, i) => String(i))}
                  as="ul"
                  className="ticks ticks--grid"
                  newItem={{ '': 'New benefit' }}
                  addLabel="Add item"
                  itemLabel="item"
                  renderItem={(itemId, key) => (
                    <li>
                      <Icon name="check" size={18} />
                      <span>
                        <Editable id={key()}>{includes[Number(itemId)] ?? ''}</Editable>
                      </span>
                    </li>
                  )}
                />
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
                    <Editable id="training.cta.title">Not sure which course fits?</Editable>
                  </h2>
                  <p>
                    <Editable id="training.cta.textBefore">Talk to a training advisor on</Editable>{' '}
                    <Editable id="company.phone">{company.phone}</Editable>{' '}
                    <Editable id="training.cta.textAfter">or email</Editable>{' '}
                    <a href={company.emailHref}>
                      <Editable id="company.email">{company.email}</Editable>
                    </a>
                    .
                  </p>
                </div>
                <ButtonLink id="training.cta.button" to="/contact" className="btn btn--accent" icon="arrow">
                  Talk to an advisor
                </ButtonLink>
              </div>
            </section>,
          ],
        ]}
      />
    </>
  )
}
