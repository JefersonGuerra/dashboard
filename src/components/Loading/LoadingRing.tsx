import {HTMLAttributes} from 'react'
export const LoadingRing = ({border, ...props}:Props) => {
  return(
    <div {...props}><div className={border}></div><div className={border}></div><div className={border}></div><div className={border}></div></div>
  )  
}

interface Props extends HTMLAttributes<HTMLElement>{
    border?: string
}