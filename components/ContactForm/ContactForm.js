'use client';
import { useState } from 'react';
import styles from './ContactForm.module.scss';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const response = await fetch('/api/contact.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setLoading(false);

    if (response.ok) {
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } else {
      setError(data.error || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.form__columns}>
        <input
          type='text'
          name='name'
          placeholder='Your Name'
          value={formData.name}
          onChange={handleChange}
          required
          className={styles.form__input}
        />
        <input
          type='email'
          name='email'
          placeholder='Your Email'
          value={formData.email}
          onChange={handleChange}
          required
          className={styles.form__input}
        />
      </div>
      <textarea
        name='message'
        placeholder='Your Message...'
        value={formData.message}
        onChange={handleChange}
        required
        className={styles.form__input}
      />
      <button className={styles.form__button} type='submit'>
        {loading ? 'Sending...' : 'SEND EMAIL'}
      </button>
      {success && <p>Message sent successfully!</p>}
      {error && <p>{error}</p>}
    </form>
  );
};

export default ContactForm;
