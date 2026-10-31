import { useState } from 'react';
import Button from './Button.jsx';

export default function Form() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [feedback, setFeedback] = useState({ text: '', type: '' });
  function update(event) { setForm({ ...form, [event.target.name]: event.target.value }); }
  function submit(event) {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setFeedback({ text: 'Please complete every field.', type: 'error' }); return;
    }
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(form.email)) {
      setFeedback({ text: 'Please enter a valid email address.', type: 'error' }); return;
    }
    setFeedback({ text: `Thanks, ${form.name}! Validation passed.`, type: 'success' });
    setForm({ name: '', email: '', message: '' });
  }
  return <form className="contact-form" onSubmit={submit} noValidate>
    <label>Name<input name="name" value={form.name} onChange={update} placeholder="Your name" /></label>
    <label>Email<input name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" /></label>
    <label>Message<textarea name="message" value={form.message} onChange={update} rows="4" placeholder="Write a message" /></label>
    <Button type="submit">Validate & submit</Button>
    {feedback.text && <p className={`feedback ${feedback.type}`} role="status">{feedback.text}</p>}
  </form>;
}
