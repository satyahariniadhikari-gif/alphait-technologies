import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

export default function ServiceCard({ service, detailed = false }) {
  return (
    <article className="service-card">
      <span className="service-card__icon">
        <Icon name={service.icon} size={30} />
      </span>
      <h3>{service.title}</h3>
      <p>{service.summary}</p>

      {detailed ? (
        <ul className="ticks">
          {service.points.map((point) => (
            <li key={point}>
              <Icon name="check" size={16} />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <Link className="link-arrow" to={detailed ? '/contact' : '/services'}>
        {detailed ? 'Discuss your project' : 'Read more'}
        <Icon name="arrow" size={16} />
      </Link>
    </article>
  )
}
