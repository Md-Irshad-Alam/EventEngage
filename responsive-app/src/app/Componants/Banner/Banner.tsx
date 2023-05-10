import React from 'react'
import './Banner.css'
function Banner() {
  return (
    <div className='banner-menu  md:w-rs-width h-auto pl-5 pr-5'>
            <div className="header-container md:h-height flex justify-between items-center  ">
                 
                      <h4 className='header-content '>WeWork + Salesforce</h4>
                      <button className='  bg-primary-btn rounded-md text-white w-35 h-10' >Publish/share</button>
                    
             </div>
            <div>
                <div className="main-container md:h-auto md:w-rs-width">
                    <div className="inner-img md:h-auto md:w-rs-width">
                      <div className="overlay-content">
                        <h5>
                          <span>Workplace </span> 
                         <span>Proposal</span>
                        </h5>
                      </div>
                      <div className='logo-png'>
                        <img className=' ' src="./logo.png" alt="" />
                      </div>
                    </div>
                    
                </div>

            </div>
    </div>
  )
}

export default Banner
