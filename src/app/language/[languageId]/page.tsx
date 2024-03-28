import React from 'react'

type LanguageParams = {
  languageId: string;
}

function LanguagePage({params}: {params: LanguageParams}) {
  return (
    <div>LanguagePage = {params.languageId}</div>
  )
}

export default LanguagePage