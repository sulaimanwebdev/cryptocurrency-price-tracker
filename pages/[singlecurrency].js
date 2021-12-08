import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

          <div className="firstGridFlex">
          <div>Market Cap</div>
          <div>{formatter.format(data.market_data.market_cap.usd)}</div>
          </div>


          <div className="firstGridFlex">
          <div>Circulating Supply</div>
          <div>{data.market_data.circulating_supply.toLocaleString()}</div>
          </div>

      

          <div className="firstGridFlex">
          <div style={JSON.stringify(data.market_data.fully_diluted_valuation) === '{}' ? {transform: 'translateY(-3px)' } : { transform: 'translateY(0)' }}>Fully Diluted Valuation</div>
          <div>{JSON.stringify(data.market_data.fully_diluted_valuation) === '{}' ? <span className="infityLogo">-</span> : formatter.format(data.market_data.fully_diluted_valuation.usd)}</div>
          </div>


          <div className="firstGridFlex">
          <div style={data.market_data.total_supply == null ? {transform: 'translateY(-3px)' } : { transform: 'translateY(0)' }}>Total Supply</div>
          <div>{data.market_data.total_supply == null ? <span className="infityLogo">∞</span> : data.market_data.total_supply.toLocaleString()}</div>
          </div>

          
          <div className="firstGridFlex">
          <div style={data.market_data.max_supply == null ? {transform: 'translateY(-3px)' } : { transform: 'translateY(0)' }} >Max Supply</div>
          <div>{data.market_data.max_supply == null ? <span className="infityLogo">∞</span> : data.market_data.max_supply.toLocaleString()} </div>
          </div>


          <div className="hours24firstflex" style={data.market_data.price_change_percentage_24h_in_currency.usd > 0 ? { backgroundColor: 'rgb(5, 212, 5)'} : { backgroundColor: 'rgb(252, 93, 93)' }}>
          <div>24 Hours Price Change</div>
          <div><div className="signs">{data.market_data.price_change_percentage_24h_in_currency.usd > 0 ? "+" : "-"}</div> {Math.abs(data.market_data.price_change_percentage_24h_in_currency.usd).toFixed(1)} %</div>
          </div>


         </div>



         {/* style={data.market_data.price_change_percentage_1h_in_currency.usd > 0 ? { color: 'rgb(5, 212, 5)'} : { color: 'rgb(252, 93, 93)' }} */}
<div className="priceChangeGrid">
  <div className="topBarPriceChange topBarPriceChangeA">1H</div>
  <div className="topBarPriceChange">24H</div> 
  <div className="topBarPriceChange">7D</div> 
  <div className="topBarPriceChange">1M</div> 
  <div className="topBarPriceChange">6M</div> 
  <div className="topBarPriceChange topBarPriceChangeL">1Y</div> 
   
  <div className="bottomPriceChange bottomPriceChangeA" style={data.market_data.price_change_percentage_1h_in_currency.usd > 0 ? { color: 'rgb(5, 212, 5)'} : { color: 'rgb(252, 93, 93)' }} ><div className="signs">{data.market_data.price_change_percentage_1h_in_currency.usd > 0 ? "+" : "-"}</div> {Math.abs(data.market_data.price_change_percentage_1h_in_currency.usd).toFixed(1)} %</div>
  <div className="bottomPriceChange"  style={data.market_data.price_change_percentage_24h_in_currency.usd > 0 ? { color: 'rgb(5, 212, 5)'} : { color: 'rgb(252, 93, 93)' }} ><div className="signs">{data.market_data.price_change_percentage_24h_in_currency.usd > 0 ? "+" : "-"}</div> {Math.abs(data.market_data.price_change_percentage_24h_in_currency.usd).toFixed(1)} %</div>
  <div className="bottomPriceChange"  style={data.market_data.price_change_percentage_7d_in_currency.usd > 0 ? { color: 'rgb(5, 212, 5)'} : { color: 'rgb(252, 93, 93)' }}><div className="signs">{data.market_data.price_change_percentage_7d_in_currency.usd > 0 ? "+" : "-"}</div> {Math.abs(data.market_data.price_change_percentage_7d_in_currency.usd).toFixed(1)} %</div>
  <div className="bottomPriceChange" style={data.market_data.price_change_percentage_30d_in_currency.usd > 0 ? { color: 'rgb(5, 212, 5)'} : { color: 'rgb(252, 93, 93)' }}><div className="signs">{data.market_data.price_change_percentage_30d_in_currency.usd > 0 ? "+" : "-"}</div> {Math.abs(data.market_data.price_change_percentage_30d_in_currency.usd).toFixed(1)} %</div>
  <div className="bottomPriceChange" style={data.market_data.price_change_percentage_200d_in_currency.usd > 0 ? { color: 'rgb(5, 212, 5)'} : { color: 'rgb(252, 93, 93)' }}><div className="signs">{data.market_data.price_change_percentage_200d_in_currency.usd > 0 ? "+" : "-"}</div> {Math.abs(data.market_data.price_change_percentage_200d_in_currency.usd).toFixed(1)} %</div>
  <div className="bottomPriceChange bottomPriceChangeL" style={data.market_data.price_change_percentage_1y_in_currency.usd > 0 ? { color: 'rgb(5, 212, 5)'} : { color: 'rgb(252, 93, 93)' }}><div className="signs">{data.market_data.price_change_percentage_1y_in_currency.usd > 0 ? "+" : "-"}</div> {Math.abs(data.market_data.price_change_percentage_1y_in_currency.usd).toFixed(1)} %</div>


</div>




 <div className="secondHeading">Useful Links</div>

<div className="linksCont" style={{marginBottom: '-9px'}}>
  <div className="offilinkCont">Official Website <a target="_blank" style={data.links.homepage[0] === '' ? {display: 'none' } : { display: 'block' }} href={data.links.homepage[0]} className="actualLInk">{data.links.homepage[0].replace(/^https?:\/\//, '')}</a></div>
</div>


<div className="linksCont">

<a target="_blank" style={data.links.blockchain_site[0] === '' ? {display: 'none' } : { display: 'block' }} href={data.links.blockchain_site[0]} className="actualLInk">{data.links.blockchain_site[0].replace(/^https?:\/\//, '')}</a>
<a target="_blank" style={data.links.blockchain_site[1] === '' ? {display: 'none' } : { display: 'block' }} href={data.links.blockchain_site[1]} className="actualLInk">{data.links.blockchain_site[1].replace(/^https?:\/\//, '')}</a>
<a style={data.links.official_forum_url[0] === '' ? {display: 'none' } : { display: 'block' }} target="_blank" href={data.links.official_forum_url[0]} className="actualLInk">{data.links.official_forum_url[0].replace(/^https?:\/\//, '')}</a>
<a target="_blank" style={data.links.twitter_screen_name === '' ? {display: 'none' } : { display: 'block' }} href={`https://twitter.com/${data.links.twitter_screen_name}`} className="actualLInk linkIcon"><FontAwesomeIcon width="15px" icon={['fab', 'twitter']} /> Twitter</a>
<a target="_blank" style={data.links.repos_url.github[0] === '' ? {display: 'none' } : { display: 'block' }} href={`https://github.com/${data.links.repos_url.github[0]}`} className="actualLInk linkIcon"><FontAwesomeIcon width="15px" icon={['fab', 'github']} /> Github</a>



</div>



<div className="description">
  <div className="Hdescription">About ({data.name})</div>
  <p>{data.description.en}</p>
</div>









         </div>
           
        </>
    )
}

export default SingleCurrency
