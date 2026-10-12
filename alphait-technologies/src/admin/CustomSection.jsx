import Editable from './Editable.jsx'
import EditableList from './EditableList.jsx'
import EditableImage from './EditableImage.jsx'
import EditableIcon from './EditableIcon.jsx'
import ButtonLink from './ButtonLink.jsx'
import { useText } from './content-context.js'
import officePhoto from '../assets/office-hq.jpg'

const BACKGROUNDS = { tint: ' section--tint', dark: ' section--dark' }

// A section the admin added from the "Add section" menu. Content lives under sections.<id>.*
export default function CustomSection({ id, type }) {
  const k = (field) => `sections.${id}.${field}`
  const background = BACKGROUNDS[useText(k('bg'), '')] ?? ''
  const imageRight = useText(k('side'), 'left') === 'right'

  const head = (
    <header className="section__head">
      <p className="eyebrow">
        <Editable id={k('eyebrow')}>Section eyebrow</Editable>
      </p>
      <h2 className="section__title">
        <Editable id={k('title')}>New section title</Editable>
      </h2>
      <p className="section__lead">
        <Editable id={k('text')}>
          Describe this section. Click any outlined text to change it.
        </Editable>
      </p>
    </header>
  )

  if (type === 'cards') {
    return (
      <section className={`section${background}`}>
        <div className="container">
          {head}
          <EditableList
            id={k('cards')}
            defaults={['1', '2', '3']}
            className="grid grid--3"
            newItem={{ title: 'New card', text: 'Card description.' }}
            addLabel="Add card"
            itemLabel="card"
            renderItem={(itemId, key) => (
              <article className="service-card">
                <span className="service-card__icon">
                  <EditableIcon id={key('icon')} fallback="spark" size={30} />
                </span>
                <h3>
                  <Editable id={key('title')}>{`Card ${itemId}`}</Editable>
                </h3>
                <p>
                  <Editable id={key('text')}>A short description for this card.</Editable>
                </p>
              </article>
            )}
          />
        </div>
      </section>
    )
  }

  if (type === 'imageText') {
    const image = (
      <figure className="photo">
        <EditableImage id={k('image')} src={officePhoto} alt="" loading="lazy" />
      </figure>
    )
    return (
      <section className={`section${background}`}>
        <div className="container two-col">
          {imageRight ? null : image}
          <div>
            <p className="eyebrow">
              <Editable id={k('eyebrow')}>Section eyebrow</Editable>
            </p>
            <h2 className="section__title">
              <Editable id={k('title')}>New section title</Editable>
            </h2>
            <p>
              <Editable id={k('text')}>
                Tell visitors more here. Click the image to upload your own.
              </Editable>
            </p>
            <ButtonLink id={k('button')} to="/contact" className="btn btn--primary">
              Get in touch
            </ButtonLink>
          </div>
          {imageRight ? image : null}
        </div>
      </section>
    )
  }

  if (type === 'cta') {
    return (
      <section className={`section${background}`}>
        <div className="container cta-band">
          <div>
            <h2>
              <Editable id={k('title')}>Ready to start a conversation?</Editable>
            </h2>
            <p>
              <Editable id={k('text')}>Tell us about the outcome you need.</Editable>
            </p>
          </div>
          <ButtonLink id={k('button')} to="/contact" className="btn btn--accent" icon="arrow">
            Contact us
          </ButtonLink>
        </div>
      </section>
    )
  }

  return (
    <section className={`section${background}`}>
      <div className="container">
        {head}
        <ButtonLink id={k('button')} to="/contact" className="btn btn--primary">
          Learn more
        </ButtonLink>
      </div>
    </section>
  )
}
