import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';



export default function SignIn() {
  const [formData, setFormData] = useState({}); // [object , function]
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => { // this one is going to take one event
    setFormData({ // this one is going to take the previous state and update the new state
        ...formData,  // We want to keep the prev info.//for ex. we had written user name, we want to keep the info and then add the email. So we don't want to lose track of username info.
        [e.target.id]: e.target.value, // Now we add the new changes.
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // yeh page ko refresh nhi hone deta
    try {
      // setLoading(true); // pehle yeh tha
      dispatch(signInStart()); // redux lgane ke baad yeh lgaye
      const res = await fetch('/api/auth/signin',    // Our api route address is localhost:3000/api/auth/signup(insomnia)
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
        // setError(data.message); // pehle yeh tha
        // setLoading(false);// pehle yeh tha
        dispatch(signInFailure(data.message));
        return;
      }
      // setLoading(false); // pehle yeh tha
      // setError(null); // pehle yeh tha
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      // setLoading(false); // pehle yeh tha
      // setError(error.message); // pehle yeh tha
      dispatch(signInFailure(error.message));
    }
    
  };

  console.log(formData);
  return (

    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        <input type="email" placeholder='email' 
        className='border p-3 rounded-lg' id='email' 
        onChange={handleChange} />

        <input type="password" placeholder='password' 
        className='border p-3 rounded-lg' id='password' 
        onChange={handleChange} />

        <button disabled={loading} 
        className='bg-slate-700 text-white p-3
        rounded-lg uppercase hover:opacity-95
        disabled:opacity-80'
        >

        {loading ? 'loading...' : 'Sign In'}
        </button>
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p> {/* no " ' " coz it makes problem in the production */}
        <Link to='/signup'>
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>

      {error && <p className='text-red-500'>{error}</p>}
    </div>
  )
}
