"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { useRouter } from "next/navigation";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import { signOut, useSession } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";
import { log } from "console";


const UserMenu= () => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal=useLoginModal();
  const rentModal=useRentModal();
  const router = useRouter();
  const {data:session}=useSession();

  useEffect(()=>{
    return ()=>{
      setIsOpen(false)
    }
  },[])

  const onRent=useCallback(()=>{
    if (!session) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  },[loginModal,rentModal,session])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={()=>onRent()}
          className="hidden 
            md:block 
            text-sm
            font-semibold 
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition 
            cursor-pointer"
        >
          {session? `Hello ${session?.user?.name}` :` Airbnb your home`}
        </div>
        <div
          onClick={()=>setIsOpen(!isOpen)}
          className="
            p-4
            md:py-1
            md:px-2
            border-[1px]
            border-neutral-100
            flex
            flex-row
            items-center
            rounded-full 
            cursor-pointer 
            hover:shadow-md 
            transition
            gap-3"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={session?.user?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm"
        >
          <div
            className="
                flex
                flex-col
                cursor-pointer
                "
          >
            {session ? (
              <>
                <MenuItem
                  label="My trips"
                  onClick={() => router.push("/trips")}
                />
                <MenuItem
                  label="My favorites"
                  onClick={() => router.push("/favorites")}
                />
                <MenuItem
                  label="My reservations"
                  onClick={() => router.push("/reservations")}
                />
                <MenuItem
                  label="My properties"
                  onClick={() => router.push("/properties")}
                />
                <MenuItem label="Airbnb your home" onClick={() => {rentModal.onOpen()}} />
                <hr />
                <MenuItem label="Logout" onClick={() => {signOut()}} />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={() => {loginModal.onOpen()}} />
                <MenuItem label="Sign up" onClick={()=>registerModal.onOpen()} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
