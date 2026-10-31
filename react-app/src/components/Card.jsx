export default function Card({ title, category, children, badge }) {
  return <article className="card">
    <div className="card-top"><span className="badge">{badge || category || 'Project'}</span></div>
    <h3>{title}</h3><div className="card-content">{children}</div>
  </article>;
}
