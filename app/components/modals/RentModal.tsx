"use client";
import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CategoryInput from "../inputs/CategoryInput";
import Counter from "../inputs/Counter";
import Input from "../inputs/Input";
import CountrySelect from "../inputs/CountrySelect";
import { CountrySelectValue } from "../inputs/CountrySelect";



const rentFormValidation = z.object({
  category: z.string(),
  location: z.object({}).nullable(),
  title: z.string(),
  description: z.string(),
  imageSrc: z.string(),
  guestCount: z.number(),
  roomCount: z.number().min(1),
  bathroomCount: z.number().min(1),
  price: z.coerce.number().min(0),
});

type rentFieldValues = z.infer<typeof rentFormValidation>;

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();

  const {
    reset,
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<rentFieldValues>({
    resolver: zodResolver(rentFormValidation),
    defaultValues:{
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    }
  });

  const location = watch("location");
  const category = watch("category");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");
  const price=watch("price")
  // console.log("watch",watch());
  // console.log("errors",errors);
 
  const setCustomValue = (id: string, value: any) => {
    setValue(id as keyof rentFieldValues, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const Map = useMemo(() => dynamic(() => import('../Map'), { 
    ssr: false 
  }), [location]);

  
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      // last step
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      // first step
      return undefined;
    }

    return "Back";
  }, [step]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    console.log(data)
    // setIsLoading(true);

    // axios.post('/api/listings', data)
    // .then(() => {
    //   toast.success('Listing created!');
    //   router.refresh();
    //   reset();
    //   setStep(STEPS.CATEGORY)
    //   rentModal.onClose();
    // })
    // .catch(() => {
    //   toast.error('Something went wrong.');
    // })
    // .finally(() => {
    //   setIsLoading(false);
    // })
  };
  let bodyContent: React.ReactElement = <></>;

  if (step === STEPS.CATEGORY) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Which of these best describes your place?"
          subtitle="Pick a category"
        />
        <div
          className="
            grid 
            grid-cols-1 
            md:grid-cols-2 
            gap-3
            max-h-[50vh]
            overflow-y-auto
            "
        >
          {categories.map((item) => {
            return (
              <div key={item.label} className="col-span-1">
                <CategoryInput
                  onClick={()=>setCustomValue('category',item.label)}
                  selected={category===item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  } else if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />

        <CountrySelect
          value={location as CountrySelectValue} 
          onChange={(value:CountrySelectValue)=>setCustomValue('location',value)} 
        />

        <Map center={location?.latlng}/>
        
      </div>
    );
  } else if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenitis do you have?"
        />
        <Counter 
          onChange={(value:number)=>setCustomValue('guestCount',value)}
          value={guestCount}
          title="Guests" 
          subtitle="How many guests do you allow?"
        />
        <hr />
        <Counter 
          onChange={(value:number)=>setCustomValue('roomCount',value)}
          value={roomCount }
          title="Rooms" 
          subtitle="How many rooms do you have?"
        />
        <hr />
        <Counter 
          onChange={(value:number)=>setCustomValue('bathroomCount',value)}
          value={bathroomCount}
          title="Bathrooms" 
          subtitle="How many bathrooms do you have?"
        />
      </div>
    );
  } else if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <div
          className="
             grid 
             grid-cols-1 
             md:grid-cols-2 
             gap-3
             max-h-[50vh]
             overflow-y-auto
             "
        ></div>
      </div>
    );
  } else if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />

        <Input 
        name="title"
        label="Title"
        type="text"
        disabled={isLoading}
        register={register}
        errors={!!errors.title}
        errorText={errors.title?.message}
        />

        <Input 
        name="description"
        label="Description"
        type="text"
        disabled={isLoading}
        register={register}
        errors={!!errors.description}
        errorText={errors.description?.message}
        />
        
      </div>
    );
  } else if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input 
        name="price"
        label="Price"
        type="number"
        formatPrice={true}
        disabled={isLoading}
        register={register}
        errors={!!errors.price}
        errorText={errors.price?.message}
        />
      </div>
    );
  }
  return (
    <Modal
      isOpen={rentModal.isOpen}
      disabled={isLoading}
      title="Airbnb your home!"
      onClose={rentModal.onClose}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default RentModal;
