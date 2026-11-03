export default function Hero() {
  const lines = ['We design', 'products people', 'enjoy using']
  return (
    <section className="hero">
      <h1 aria-label="We design products people enjoy using">
        {lines.map((t) => (
          <span className="line" key={t} aria-hidden="true">
            <span>{t}</span>
          </span>
        ))}
      </h1>
      <div className="hero-meta">
        <p>A product design studio for web and mobile apps. Research, UX, UI and design systems.</p>
        <p>Scroll to see recent work</p>
      </div>
    </section>
  )
}
