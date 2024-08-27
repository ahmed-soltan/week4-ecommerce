"use client"

import { useSearchParams } from "next/navigation"
import CardWrapper from "./card-wrapper"

import {BeatLoader} from 'react-spinners'
import { useCallback, useEffect, useState } from "react"
import { NewVerification } from "@/actions/new-verification"
import FormError from "../form-error"
import FormSuccess from "../form-success"

type StateType = {
  error: string | undefined;
  success: string | undefined;
};

const NewVerificationForm = () => {
  const [state, setState] = useState<StateType>({
    success: "",
    error: "",
  });
  const searchParams = useSearchParams()

  const token = searchParams.get("token")

  const onSubmit = useCallback(async()=>{
    if(!token){
      setState({
        error: "Missing token",
        success: undefined,
      })
      return
    } 
    
    await NewVerification(token).then((data)=>{
      setState({
        success: data.success,
        error: data.error,
      })
    }).catch((error)=>{
      setState({
        error: "something went wrong",
        success: undefined,
      })
      console.error(error)
    })

  },[token])


  useEffect(()=>{
    onSubmit()
  },[onSubmit])

  return (
    <CardWrapper
      headerLabel="Confirm your Verification"
      backButtonLabel="Back to Login"
      backButtonUrl="/auth/login"
    > 
      <div className="flex items-center justify-center w-full">
        {(!state.error && !state.success) && (

          <BeatLoader/>
        )}
        <FormError message={state.error}/>
        <FormSuccess message={state.success}/>
      </div>
    </CardWrapper>
  )
}

export default NewVerificationForm