import React from "react"
import { Link } from "react-router-dom"

const Footer = () => {
return (
    <div id='footer'>
    <div id = "footerbox">

        <Link to= "" className = "contact">Contact Us ☏</Link>  
        <Link to= "" className = "aboutUs">( ͡° ͜ʖ ͡° About Us ͡° ͜ʖ ͡°)</Link>
        <Link to= "" className = "SYS">S̷̩͛̚e̵̮̘͐l̸̯̰͑l̴̪̞͐̍ ̵̹̦̃͝Ỹ̷̱̪ó̴͚͋u̷̜̾r̶͕̭̎ ̷͙͆͛S̴͇͋o̶͕̒ǘ̵͚̮̌l̶̝̋̾</Link>
        
    </div>
    </div>
)
}

export default Footer