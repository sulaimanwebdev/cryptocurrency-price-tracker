import React from 'react'

// {`${getCoin.name.replace(/\s+/g, '-')}`}
export async function getStaticPaths() {
    const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    const data = await res.json()
   
    const paths = data.map((getData) =>{
        return{
            params: {id: getData.id.toString()}
        }
    })
    return {
     paths,
     fallback: false
    }
  }

  

const SingleCurrency = ({paths}) => {
    return (
        <>
            <div>{paths.id}</div>
        </>
    )
}

export default SingleCurrency
