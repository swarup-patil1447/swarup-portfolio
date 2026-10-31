export default function Button({ children, onClick, type = 'button', variant = 'primary' }) {
  return <button className={`button ${variant}`} type={type} onClick={onClick}>{children}</button>;
}
