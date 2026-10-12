import Editable from '../admin/Editable.jsx'
import EditableIcon from '../admin/EditableIcon.jsx'
import EditableList from '../admin/EditableList.jsx'
import ButtonLink from '../admin/ButtonLink.jsx'
import Icon from './Icon.jsx'

export default function ServiceCard({ service, detailed = false }) {
  const id = `services.${service.slug}`
  const points = service.points ?? []

  return (
    <article className="service-card">
      <span className="service-card__icon">
        <EditableIcon id={`${id}.icon`} fallback={service.icon || 'spark'} size={30} />
      </span>
      <h3>
        <Editable id={`${id}.title`}>{service.title}</Editable>
      </h3>
      <p>
        <Editable id={`${id}.summary`}>{service.summary}</Editable>
      </p>

      {detailed ? (
        <EditableList
          id={`${id}.points`}
          defaults={points.map((_, i) => String(i))}
          as="ul"
          className="ticks"
          newItem={{ '': 'New point' }}
          addLabel="Add point"
          itemLabel="point"
          renderItem={(itemId, key) => (
            <li>
              <Icon name="check" size={16} />
              <span>
                <Editable id={key()}>{points[Number(itemId)] ?? ''}</Editable>
              </span>
            </li>
          )}
        />
      ) : null}

      {detailed ? (
        <ButtonLink
          id="services.card.ctaDetailed"
          to="/contact"
          className="link-arrow"
          icon="arrow"
          iconSize={16}
        >
          Discuss your project
        </ButtonLink>
      ) : (
        <ButtonLink id="services.card.cta" to="/services" className="link-arrow" icon="arrow" iconSize={16}>
          Read more
        </ButtonLink>
      )}
    </article>
  )
}
