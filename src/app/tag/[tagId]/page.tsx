import React from 'react'

type tagParams = {
  tagId: string;
}

function TagPage({params}: {params: tagParams}) {
  return (
    <div>TagPage - {params.tagId}</div>
  )
}

export default TagPage