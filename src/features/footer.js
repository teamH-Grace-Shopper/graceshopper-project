import React from "react"
import { Link } from "react-router-dom"

const Footer = () => {
return (
    <div id = "footerbox">

        <Link to= "" className = "contact"><a>Contact Us ☏</a></Link>  
        <Link to= "" className = "aboutUs"> <a>( ͡° ͜ʖ ͡° About Us ͡° ͜ʖ ͡°) </a></Link>
        <Link to= "" className = "SYS"> <a>S̷̩͛̚e̵̮̘͐l̸̯̰͑l̴̪̞͐̍ ̵̹̦̃͝Ỹ̷̱̪ó̴͚͋u̷̜̾r̶͕̭̎ ̷͙͆͛S̴͇͋o̶͕̒ǘ̵͚̮̌l̶̝̋̾</a></Link>
        
    </div>
)
}

export default Footer