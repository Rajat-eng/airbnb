'use client';

import { BiDollar } from "react-icons/bi";
import {  FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
  name:string
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  errors: boolean,
  errorText:string | null |undefined
  register:any
}

const Input = (props:InputProps) => {
  const {name,label,type="text",disabled,formatPrice,errors,errorText,register}=props
  return (
    <div className="w-full relative">
      {/* {formatPrice && (
        <BiDollar
          size={24}  
          className="
            text-neutral-700
            absolute
            top-5
            left-2
          "
        />
      )} */}
      <input
        {...register(name as keyof FieldValues)}
        disabled={disabled}
        placeholder=" "
        type={type}
        className={`
          peer
          w-full
          pt-6
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors ? 'border-rose-500' : 'border-neutral-300'}
          ${errors ? 'focus:border-rose-500' : 'focus:border-black'}
        `}
      />
      <label 
        className={`
          absolute 
          text-sm
          duration-150 
          transform 
          -translate-y-3 
          top-5 
          z-10 
          origin-[0] 
          ${formatPrice ? 'left-9' : 'left-4'}
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors ? 'text-rose-500' : 'text-zinc-400'}
        `}
      >
        {label}
      </label>
      {/* {errorText && <p className="text-sm italic text-red-600"> {errorText}</p>} */}
    </div>
   );
}
 
export default Input;