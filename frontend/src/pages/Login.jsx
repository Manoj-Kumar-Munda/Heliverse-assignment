import React from 'react'
import AuthHeader from '../components/AuthHeader'
import Input from '../components/form/Input'


const Login = () => {

  const submitHandler = async() => {
    
  }
  return (
    <div className="grow basis-1/2 w-full">
        <div className="relative pt-[15vh] md:pt-0 flex flex-col md:justify-center items-center h-full border border-white px-2 ">
          <div className="max-w-lg w-full">
            <AuthHeader type="signin" />
            <form className="my-4 space-y-3" onSubmit={submitHandler}>
              <Input
                label="Email"
                placeholder="Enter your email"
                onChange={(e) =>
                  setSigninData({ ...signinData, email: e.target.value })
                }
              />
              <Input
                label="Password"
                placeholder="Create password"
                type="password"
                onChange={(e) =>
                  setSigninData({ ...signinData, password: e.target.value })
                }
              />

              <button className="bg-blue-500 text-white w-full py-2 rounded-md">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
  )
}

export default Login