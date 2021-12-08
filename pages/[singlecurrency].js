import React from 'react'
import Router from 'next/router'
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

  let goBack = () =>{
    Router.back();
  }

    return (
        <>
         <div className="singleCurrencyCont" style={data.name === 'Solana' ? {paddingBottom: '30px'} : {paddingBottom: '0px'}}>
         <div onClick={goBack} className="goBackBtn" title="Go back"><svg aria-hidden="true" width="16px" focusable="false" data-prefix="fas" data-icon="chevron-left" class="svg-inline--fa fa-chevron-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="white" d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z"></path></svg></div>
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
<a target="_blank" style={data.links.repos_url.github[0] === '' ? {display: 'none' } : { display: 'block' }} href={`${data.links.repos_url.github[0]}`} className="actualLInk linkIcon"><FontAwesomeIcon width="15px" icon={['fab', 'github']} /> Github</a>



</div>



<div className="description" style={data.name === 'Solana' ? {display: 'none'} : {display: 'block'}}>
  <div className="Hdescription">About ({data.name})</div>
  {/* for all coins description */}
  <p style={data.name === 'Bitcoin' || data.name === 'Ethereum' || data.name === 'Binance Coin' ? {display: 'none'} : {display:'block'}}>{data.description.en}</p>

  {/* the reason I am putting like that is, Coingecko API have bugs that is generating "Anchor" tags */}
  
  <p style={data.name === 'Bitcoin' ? {display: 'block'} : {display: 'none'}}>
  Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency. It was created by an anonymous individual/group under the name, Satoshi Nakamoto. The source code is available publicly as an open source project, anybody can look at it and be part of the developmental process. Bitcoin is changing the way we see money as we speak. The idea was to produce a means of exchange, independent of any central authority, that could be transferred electronically in a secure, verifiable and immutable way. It is a decentralized peer-to-peer internet currency making mobile payment easy, very low transaction fees, protects your identity, and it works anywhere all the time with no central authority and banks. Bitcoin is designed to have only 21 million BTC ever created, thus making it a deflationary currency. Bitcoin uses the SHA-256 hashing algorithm with an average transaction confirmation time of 10 minutes. Miners today are mining Bitcoin using ASIC chip dedicated to only mining Bitcoin, and the hash rate has shot up to peta hashes. Being the first successful online cryptography currency, Bitcoin has inspired other alternative currencies such as Litecoin, Peercoin, Primecoin, and so on. The cryptocurrency then took off with the innovation of the turing-complete smart contract by Ethereum which led to the development of other amazing projects such as EOS, Tron, and even crypto-collectibles such as CryptoKitties.
  </p>

  <p style={data.name === 'Ethereum' ? {display: 'block'} : {display: 'none'}}>
  Ethereum is a smart contract platform that enables developers to build tokens and decentralized applications (dapps). ETH is the native currency for the Ethereum platform and also works as the transaction fees to miners on the Ethereum network. Ethereum is the pioneer for blockchain based smart contracts. Smart contract is essentially a computer code that runs exactly as programmed without any possibility of downtime, censorship, fraud or third-party interference. It can facilitate the exchange of money, content, property, shares, or anything of value. When running on the blockchain a smart contract becomes like a self-operating computer program that automatically executes when specific conditions are met. Ethereum allows programmers to run complete-turing smart contracts that is capable of any customizations. Rather than giving a set of limited operations, Ethereum allows developers to have complete control over customization of their smart contract, giving developers the power to build unique and innovative applications. Ethereum being the first blockchain based smart contract platform, they have gained much popularity, resulting in new competitors fighting for market share. The competitors includes: Ethereum Classic which is the oldchain of Ethereum, Qtum, EOS, Neo, Icon, Tron and Cardano. Ethereum wallets are fairly simple to set up with multiple popular choices such as MyEtherWallet, Metamask, and Trezor.
  </p>

  <p style={data.name === 'Binance Coin' ? {display: 'block'} : {display: 'none'}}>
  Binance Coin is the cryptocurrency of the Binance platform. It is a trading platform exclusively for cryptocurrencies. The name "Binance" is a combination of binary and finance. Thus, the startup name shows that only cryptocurrencies can be traded against each other. It is not possible to trade crypto currencies against Fiat. The platform achieved an enormous success within a very short time and is focused on worldwide market with Malta headquarters. The cryptocurrency currently has a daily trading volume of 1.5 billion - 2 billion US dollars and is still increasing. In total, there will only be 200 million BNBs. Binance uses the ERC20 token standard from Ethereum and has distributed it as follow: 50% sold on ICO, 40% to the team and 10% to Angel investors. The coin can be used to pay fees on Binance. These include trading fees, transaction fees, listing fees and others. Binance gives you a huge discount when fees are paid in BNB. The schedule of BNB fees discount is as follow: In the first year, 50% discount on all fees, second year 25% discount, third year 12.5% discount, fourth year 6.75 % discount, and from the fifth year onwards there is no discount. This structure is used to incentivize users to buy BNB and do trades within Binance. Binance announced in a buyback plan that it would buy back up to 100 million BNB in Q1 2018. The coins are then burned. This means that they are devaluated to increase the value of the remaining coins. This benefits investors. In the future, the cryptocurrency will remain an asset on the trading platform and will be used as gas. Other tokens that are issued by exchanges include Bibox Token, OKB, Huobi Token, and more.
  </p>



</div>








         </div>
           
        </>
    )
}

export default SingleCurrency
