import Head from 'next/head'
import Link from 'next/link';
import { useState, useEffect } from 'react';
// {`${getCoin.name.toLowerCase().replace(/\s+/g, '-')}`}



export default function Home() {

  const [getdata, setgetdata] = useState([]);



  const fetchData = async () => {
           const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");
           setgetdata(await response.json());

  }


          useEffect(() => {
            fetchData();

            }, []);


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
  
  // formatter.format(1000) // "$1,000.00"
  // formatter.format(10) // "$10.00"
  // formatter.format(123233000) // "$123,233,000.00"
  


  
  return (
    <>
    <Head>
      <title>Cryptocurrency Tracker</title>
      <link rel="icon" href="/logo.png" />
    </Head>



         <div className="main">
           <div className="top">
             <div className="topHeadings">#</div>
             <div className="topHeadings">Coin</div>
             <div className="topHeadings">Price</div>
             <div className="topHeadings">High 24 hours</div>
             <div className="topHeadings">low 24 hours</div>
             <div className="topHeadings">Market cap</div>


             

           </div>
           {
             getdata.map((getCoin) =>{
               return <Link href={getCoin.id} key={getCoin.id}>
               <div className="cont">
                 <div className="numbers rank">{getCoin.market_cap_rank}</div>
                      <div className="gg"><img src={getCoin.image} alt="Coin Logo" className="coinLogo" /> <div>{getCoin.name}</div></div>
                      <div className="numbers">{formatter.format(getCoin.current_price)}</div>
                      <div className="numbers">{formatter.format(getCoin.high_24h)}</div>
                      <div className="numbers">{formatter.format(getCoin.low_24h)}</div>
                      <div className="numbers marketCap">{`$${formatCash(getCoin.market_cap)}`}</div>



               </div>
               </Link>
             })
           }
         </div>



    </>
  )
}
