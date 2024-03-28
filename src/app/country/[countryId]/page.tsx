import React from 'react'

type CountryParams = {
  countryId: string;
} 

function CountryPage({params} : {params: CountryParams}) {
  return (
    <div>CountryPage - {params.countryId}</div>
  )
}

export default CountryPage