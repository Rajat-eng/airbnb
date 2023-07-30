"use client";
import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
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
          Airbnb your home
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
            <Avatar src={null} />
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
            {currentUser ? (
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
                <MenuItem label="Airbnb your home" onClick={() => {}} />
                <hr />
                <MenuItem label="Logout" onClick={() => {}} />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={() => {}} />
                <MenuItem label="Sign up" onClick={() => {}} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;