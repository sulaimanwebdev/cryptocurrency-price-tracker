import React from 'react'

// {`${getCoin.name.replace(/\s+/g, '-')}`}
export async function getStaticPaths() {
    const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    const data = await res.json()
   
    const paths = data.map((currElement) =>{
        return{
            params: {
              singlecurrency: currElement.id,
            }
        }
    })
    return {
     paths,
     fallback: false,
    }
  }

  





  export async function getStaticProps(context) {
      let id = context.params.singlecurrency;
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
    const data = await res.json()
  
    return {
      props: { data }
    }
  }

  


  

const SingleCurrency = ({data}) => {

  const formatCash = n => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
  };

   

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 20,
    minimumFractionDigits: 0,

    
  })

    return (
        <>
         
         <div className="singleCurrencyCont">
         <div className="rankSingleCurrency" >{`Rank #${data.market_cap_rank}`}</div>
         <div className="singleFlex">
        <div> <img src={data.image.large} alt="" /></div>
         <div className="singleName">{data.name} <span className="singleSymbol">({data.symbol})</span></div>
         </div>
         <div className="priceSingle">{formatter.format(data.market_data.current_price.usd)}</div>

         <div className="singleGrid1">
          <div>{data.market_cap}</div>
         </div>

         </div>
           
        </>
    )
}

export default SingleCurrency
