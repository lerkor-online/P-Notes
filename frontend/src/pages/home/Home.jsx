import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'

const Home = () => {

    const navigate = useNavigate()

    const handleNewNote = () => {
        navigate('/formNote')
    }

  return (
      <div className="h-screen flex justify-center items-center">
          <Navbar/>
          <section className='flex  items-center px-4 gap-3'>
          <div className='flex flex-col gap-6 justify-center items-center lg:mt-6'>
                    <button className='hover:invert hover:text-white rounded-xl'>
                        <a href="https://lerkor-dev.vercel.app/" target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="48" viewBox="0 0 448 512"><path fill="#000000" d="M48 32C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm98.88 133.234c19.636 0 37.082 6.789 49.929 16.971c11.88 9.452 17.444 18.907 22.298 27.393l-33.923 16.949c-2.427-5.565-5.347-11.387-12.846-17.682c-8.248-6.552-16.478-8.484-23.524-8.484c-27.626 0-42.17 25.693-42.17 54.287c0 37.573 19.161 56.22 42.17 56.22c22.3 0 31.278-15.51 37.08-25.435L219.6 302.66c-6.315 9.926-12.374 19.635-25.95 29.069c-7.262 5.09-23.977 15.037-47.736 15.037C100.586 346.766 64 313.81 64 255.87c0-50.636 34.415-90.637 82.88-90.637m75.483 5.328h45.565L303.31 292.24l35.125-121.678H384l-59.379 171.112H281.01z"/></svg>
                        </a>
                    </button>
                    <button className='hover:bg-[#000000af] hover:text-white rounded-xl'>
                        <a href="https://github.com/lerkor-online" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="currentColor" class="bi bi-github drop-shadow-lg" viewBox="0 0 16 16">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                            </svg>
                        </a>
                    </button>
                    <button className='hover:bg-[#000000af] hover:text-white rounded-xl'>
                        <a href="https://www.linkedin.com/in/lerkor-dev/" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
                                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401m-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4" />
                            </svg>
                        </a>
                    </button>
                </div>
              

              <div className='mt-16 relative'>
                <div className='absolute top-20 bg-bred px-12'>

                <h1 className='font-bold text-3xl'>Welcome to the Note App.</h1>
                <br/>
                <p>A simple web application that allows you to take notes, tag, and filter them. </p>
                </div>

                  <img src="https://res.cloudinary.com/dqcn7idzj/image/upload/v1703968281/Projects/Notes/Note_pu9nk9.png" alt="notepad" />
                  <div className='absolute right-8 bottom-8 flex justify-center items-center gap-3'>
                      <h1 className='text-xl font-bold'>New Note</h1>
                      <button onClick={handleNewNote} className='  bg-[#000000af] text-white p-4 rounded-full shadow-black shadow-2xl hover:bg-purple-800'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024"><path fill="currentColor" d="M799.344 960.288h-736v-800h449.6l64.704-62.336l-1.664-1.664H63.344c-35.344 0-64 28.656-64 64v800c0 35.344 28.656 64 64 64h736c35.344 0 64-28.656 64-64V491.632l-64 61.088zM974.224 41.44C945.344 13.76 913.473-.273 879.473-.273c-53.216 0-92.032 34.368-102.592 44.897c-14.976 14.784-439.168 438.353-439.168 438.353c-3.328 3.391-5.76 7.535-7.008 12.143c-11.488 42.448-69.072 230.992-69.648 232.864c-2.976 9.664-.32 20.193 6.8 27.217a26.641 26.641 0 0 0 18.913 7.84c2.752 0 5.52-.4 8.239-1.248c1.952-.656 196.496-63.569 228.512-73.12c4.224-1.248 8.048-3.536 11.216-6.624c20.208-19.936 410.112-403.792 441.664-436.384c32.624-33.664 48.847-68.657 48.223-104.097c-.591-35.008-17.616-68.704-50.4-100.128m-43.791 159.679c-17.808 18.368-157.249 156.16-414.449 409.536l-19.68 19.408c-29.488 9.12-100.097 31.808-153.473 49.024c17.184-56.752 37.808-125.312 47.008-157.743C444.8 466.464 808.223 103.6 822.03 89.968c2.689-2.689 27.217-26.257 57.44-26.257c17.153 0 33.681 7.824 50.465 23.92c20.065 19.248 30.4 37.744 30.689 55.024c.32 17.792-9.84 37.456-30.191 58.464" /></svg>
                      </button>
                  </div>
              </div>          
          </section>
      </div>
  )
}

export default Home