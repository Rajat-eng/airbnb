'use client';

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";

import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";

const registerFormValidation=z.object({
  name:z.string().min(1,{message:'Name is Reqired field'}),
  email:z.string().min(1,{message:'Email is required'}).email({message:'Emal in invalid'}),
  password:z.string().min(1,{message:'password is required'})
})

type registerFieldValues=z.infer<typeof registerFormValidation>


const RegisterModal= () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const { 
    register, 
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<registerFieldValues >({
    resolver:zodResolver(registerFormValidation)
  });

  const onSubmit: SubmitHandler<registerFieldValues> = (data) => {
    // console.log('register',data)
    setIsLoading(true);
    axios.post('/api/register', data)
    .then(() => {
      toast.success('Registered!');
      registerModal.onClose();
      loginModal.onOpen();
    })
    .catch((error) => {
      toast.error(error);
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal])

  const bodyContent = (
    <form className="flex flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
      <Heading
        title="Welcome to Airbnb"
        subtitle="Create an account!"
      />
      <Input
        name='email'
        type='email'
        label="Email"
        disabled={isLoading}
        register={register}
        errors={!!errors.email?.message}
        errorText={errors.email?.message}
      />
      <Input
        name='name'
        type='name'
        label="Name"
        disabled={isLoading}
        register={register}
        errors={!!errors.name?.message}
        errorText={errors.name?.message}
      />
      <Input
        name='password'
        type='password'
        label="Password"
        disabled={isLoading}
        register={register}
        errors={!!errors.password?.message}
        errorText={errors.password?.message}
      />
    </form>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-1">
      <hr />
      <Button 
        outline 
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')} 
      />
      <Button 
        outline 
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div 
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>Already have an account?
          <span 
            onClick={onToggle} 
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
            > Log in</span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal;
