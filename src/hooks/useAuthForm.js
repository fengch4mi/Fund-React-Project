import { useState } from 'react';

// A small reusable hook to manage auth form state (login/register)
export default function useAuthForm(initial = {}) {
  const [values, setValues] = useState(initial);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setValues(v => ({ ...v, [field]: e.target.value }));
  };

  const setField = (field, value) => {
    setValues(v => ({ ...v, [field]: value }));
  };

  const reset = () => {
    setValues(initial);
    setError(null);
    setLoading(false);
  };

  return {
    values,
    setField,
    handleChange,
    setValues,
    reset,
    error,
    setError,
    loading,
    setLoading,
  };
}
