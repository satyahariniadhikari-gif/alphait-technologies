const paths = {
  consulting: (
    <>
      <path d="M3 20.5h18" />
      <path d="M6 20.5V11l6-5 6 5v9.5" />
      <path d="M10 20.5v-5h4v5" />
    </>
  ),
  training: (
    <>
      <path d="M12 4 2.5 8.5 12 13l9.5-4.5L12 4Z" />
      <path d="M6.5 11v5.2c0 .9 2.5 2.3 5.5 2.3s5.5-1.4 5.5-2.3V11" />
      <path d="M21.5 8.5v5" />
    </>
  ),
  development: (
    <>
      <path d="m8.5 9-3.5 3 3.5 3" />
      <path d="m15.5 9 3.5 3-3.5 3" />
      <path d="m13.5 6-3 12" />
    </>
  ),
  phone: (
    <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6L16.5 13l4 1.5v3a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 3.5 5.7a2 2 0 0 1 2-2.2Z" />
  ),
  mail: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21.5s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
      <circle cx="12" cy="10.5" r="2.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  check: <path d="m4.5 12.5 5 5 10-11" />,
  shield: (
    <>
      <path d="M12 3 5 6v6c0 4.2 3 7.6 7 9 4-1.4 7-4.8 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.5" />
      <path d="M2.8 19.5a6.2 6.2 0 0 1 12.4 0" />
      <path d="M16 5.4a3.5 3.5 0 0 1 0 6.2" />
      <path d="M17.5 14.2a6.2 6.2 0 0 1 3.7 5.3" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3v4" />
      <path d="M12 17v4" />
      <path d="M3 12h4" />
      <path d="M17 12h4" />
      <path d="m6 6 2.8 2.8" />
      <path d="m15.2 15.2 2.8 2.8" />
      <path d="m18 6-2.8 2.8" />
      <path d="M8.8 15.2 6 18" />
    </>
  ),
  arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
}

export default function Icon({ name, size = 24, className = '' }) {
  const content = paths[name]
  if (!content) return null

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {content}
    </svg>
  )
}
