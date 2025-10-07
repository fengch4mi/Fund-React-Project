import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';
import useAuthForm from '../hooks/useAuthForm';

export const Register = () => {
  const { register } = useAuth();
  const { t } = useLocale() || {};
  const auth = useAuth() || {};
  const navigate = useNavigate();

  const form = useAuthForm({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic client-side validation: name is required
    if (!form.values.name || String(form.values.name).trim().length === 0) {
      form.setError(t ? 'Name is required' : 'Nama harus diisi');
      return;
    }
    form.setLoading(true);
    try {
      await register({ name: form.values.name, email: form.values.email, password: form.values.password });
      form.setLoading(false);
      navigate('/');
    } catch (err) {
      form.setLoading(false);
      form.setError(err.message || (t ? 'Register failed' : 'Register failed'));
    }
  };

  return (
    <div className="main-inner">
      <div id="content">
        <article className="portfolio-card">
          <header>
            <h2 className="section-title">{t ? t('register') : 'Daftar'}</h2>
          </header>
          <form onSubmit={handleSubmit}>
            <div>
              <input placeholder="Nama" value={form.values.name} onChange={form.handleChange('name')} required />
            </div>
            <div>
              <input placeholder="Email" value={form.values.email} onChange={form.handleChange('email')} required />
            </div>
            <div>
              <input placeholder="Password" type="password" value={form.values.password} onChange={form.handleChange('password')} required />
            </div>
            {form.error && <p style={{ color: 'red' }}>{form.error}</p>}
            <button type="submit" disabled={form.loading}>{t ? t('register') : 'Daftar'}</button>
          </form>
          <p style={{ marginTop: 12 }}>{t ? 'Already have an account?' : 'Sudah punya akun?'} <Link to="/login">{t ? t('login') : 'Login'}</Link></p>
        </article>
      </div>
      <aside>
        <div className="profile-card">
          <h3>{t ? t('stats') : 'Statistik'}</h3>
        </div>
      </aside>
    </div>
  );
};

export default Register;
