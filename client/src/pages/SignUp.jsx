import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({}); // [object , function]
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => { // this one is going to take one event
    setFormData({ // this one is going to take the previous state and update the new state
        ...formData,  // We want to keep the prev info.//for ex. we had written user name, we want to keep the info and then add the email. So we don't want to lose track of username info.
        [e.target.id]: e.target.value, // Now we add the new changes.
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // yeh page ko refresh nhi hone deta
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup',    // Our api route address is localhost:3000/api/auth/signup(insomnia)
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();

      if(data.success === false){
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/signin');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
    
  };

  console.log(formData);
  return (

    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>SignUp</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      
        <input type="text" placeholder='username' 
        className='border p-3 rounded-lg' id='username' 
        onChange={handleChange} />

        <input type="email" placeholder='email' 
        className='border p-3 rounded-lg' id='email' 
        onChange={handleChange} />

        <input type="password" placeholder='password' 
        className='border p-3 rounded-lg' id='password' 
        onChange={handleChange} />

        <button disabled={loading} className='bg-slate-700 text-white p-3
        rounded-lg uppercase hover:opacity-95
        disabled:opacity-80'>
          {loading ? 'loading...' : 'Sign Up'}
        </button>
        <OAuth />
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Already have an account?</p> 
        <Link to='/signin'>
          <span className='text-blue-700'>Sign In</span>
        </Link>
      </div>

      {error && <p className='text-red-500'>{error}</p>}
    </div>
  )
}
