import { Link } from 'react-router-dom'
import Editable from './Editable.jsx'
import Icon from '../components/Icon.jsx'
import { useText } from './content-context.js'

/**
 * A button or link whose label and destination the admin can both change.
 *
 *   <ButtonLink id="header.cta" to="/contact" className="btn btn--accent" icon="arrow">
 *     Request a call back
 *   </ButtonLink>
 *
 * Label is stored under `id`, destination under `hrefId` (default `${id}.href`) — give
 * buttons that must always point to the same place the same hrefId. Internal paths render a
 * router <Link>; anything else (https:, mailto:, tel:) renders an <a>.
 */
export default function ButtonLink({
  id,
  hrefId = `${id}.href`,
  to,
  children,
  icon,
  iconSize = 18,
  className,
  onClick,
}) {
  const href = useText(hrefId, to)
  const label = (
    <>
      <Editable id={id} link={{ id: hrefId, fallback: to }}>
        {children}
      </Editable>
      {icon ? <Icon name={icon} size={iconSize} /> : null}
    </>
  )

  if (href.startsWith('/') && !href.startsWith('//')) {
    return (
      <Link to={href} className={className} onClick={onClick}>
        {label}
      </Link>
    )
  }

  const external = /^https?:/.test(href)
  return (
    <a
      href={href}
      className={className}
      onClick={onClick}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {label}
    </a>
  )
}
