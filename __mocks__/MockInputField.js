import React from 'react';

export default function MockInputField(prop) {
  return ( 

      <input placeholder="Search City, Region or Zip Code"
      className="form-control form-control-sm"
      type="text"
      city="Lambeth"
      region="Lambeth, Greater London"
      country="United Kingdom"
      id="user-input-location-search"
      value="Lambeth, Lambeth, Greater London, United Kingdom"
      lon="-0.12"
      lat="51.49"
      onChange={prop.handleOnchange}
      />

  )
}