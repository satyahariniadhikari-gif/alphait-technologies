// Continuously scrolling strip of photo cards. The list is repeated so one
// "set" is wider than the screen, then the set is rendered twice and the track
// slides left by exactly one set, which makes the loop seamless.
const REPEAT = 3

export default function CareersCarousel({ photos }) {
  const set = Array.from({ length: REPEAT }, () => photos).flat()

  return (
    <div className="careers-carousel" aria-label="Life at Alpha IT">
      <div className="careers-carousel__track">
        {[...set, ...set].map((photo, i) => (
          <figure
            key={`${photo.src}-${i}`}
            className="careers-carousel__card"
            aria-hidden={i >= photos.length}
          >
            <img src={photo.src} alt={i < photos.length ? photo.alt : ''} loading="lazy" />
            {photo.label && (
              <figcaption className="careers-carousel__label">{photo.label}</figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  )
}
