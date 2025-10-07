import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';
import useAuthForm from '../hooks/useAuthForm';

export const Login = () => {
  const { login } = useAuth();
  const auth = useAuth() || {};
  const { t } = useLocale() || {};
  const navigate = useNavigate();

  const form = useAuthForm({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    form.setLoading(true);
    try {
      await login({ email: form.values.email, password: form.values.password });
      form.setLoading(false);
      navigate('/');
    } catch (err) {
      form.setLoading(false);
      form.setError(err.message || (t ? 'Login failed' : 'Login failed'));
    }
  };

  return (
    <div className="main-inner">
      <div id="content">
        <article className="portfolio-card">
          <header>
            <h2 className="section-title">{t ? t('login') : 'Login'}</h2>
          </header>
          <form onSubmit={handleSubmit}>
            <div>
              <input placeholder="Email" value={form.values.email} onChange={form.handleChange('email')} required />
            </div>
            <div>
              <input placeholder="Password" type="password" value={form.values.password} onChange={form.handleChange('password')} required />
            </div>
            {form.error && <p style={{ color: 'red' }}>{form.error}</p>}
            <button type="submit" disabled={form.loading}>{t ? t('login') : 'Login'}</button>
          </form>
          <p style={{ marginTop: 12 }}>{t ? t('loginPrompt') : 'Belum punya akun?'} <Link to="/register">{t ? t('register') : 'Daftar'}</Link></p>
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

export default Login;
