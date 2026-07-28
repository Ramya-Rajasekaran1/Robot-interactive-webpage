import './SelectedWork.css';

export function SelectedWork() {
  return (
    <section id="work" className="selected-work" aria-labelledby="work-heading">
      <div className="selected-work__inner">
        <p className="selected-work__label">Selected Work</p>
        <h2 id="work-heading" className="selected-work__title">
          Spatial interaction systems
        </h2>
        <p className="selected-work__lede">
          Case studies and prototypes will live here. The hero above is the first
          artifact—scroll-driven choreography tied to reference motion.
        </p>
        <a className="selected-work__link" href="#work">
          View project
        </a>
      </div>
    </section>
  );
}
