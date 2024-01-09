import React from 'react'

export default function ErrorPage() {
  return (
    <div className='container text-center' style={{ marginTop: "4rem" }}>
    <h1>Oops!</h1>
    <p>Sorry, but I'm currently utilizing the NewsAPI's developer API that only allows 100 requests per day, and the limit has been exceeded for today.</p>
  </div>
  )
}
