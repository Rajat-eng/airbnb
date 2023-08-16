'use client'

import React from 'react'
import Select from 'react-select'
import useCountries from '@/app/hooks/useCountries';

export type CountrySelectValue = {
    flag: string;
    label: string;
    latlng: number[],
    region: string;
    value: string
}
  
  interface CountrySelectProps {
    value: CountrySelectValue | null;
    onChange: (value: CountrySelectValue) => void;
  }
const CountrySelect:React.FC<CountrySelectProps> = ({value,onChange}) => {
    const {getAll}=useCountries();

    // console.log("select val",value)
  return (
    <div>
        <Select 
        placeholder="Anywhere"
        isClearable
        isSearchable
        options={getAll()}
        onChange={(option)=>onChange(option as CountrySelectValue)}
        value={value}
        formatOptionLabel={(option: any) => (
            <div className="
            flex flex-row items-center gap-3">
              <div>{option.flag}</div>
              <div>
                {option.label},
                <span className="text-neutral-500 ml-1">
                  {option.region}
                </span>
              </div>
            </div>
          )}
          classNames={{
            control: () => 'p-3 border-2',
            input: () => 'text-lg',
            option: () => 'text-md'
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 6,
            colors: {
              ...theme.colors,
              primary: 'black',
              primary25: '#ffe4e6'
            }
          })}
        />
    </div>
  )
}

export default CountrySelect