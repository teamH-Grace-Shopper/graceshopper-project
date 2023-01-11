import React from "react"
import { Link } from "react-router-dom"

const Footer = () => {
return (
    <div id = "footerbox">

        <Link to= "" className = "contact" href= "">contact ☏</Link>  
        <Link to= "" className = "aboutUs" href = ""> ( ͡° ͜ʖ ͡° About Us ͡° ͜ʖ ͡°) </Link>
        <Link to= "" className = "SYS" href = "">S̷̩͛̚e̵̮̘͐l̸̯̰͑l̴̪̞͐̍ ̵̹̦̃͝Ỹ̷̱̪ó̴͚͋u̷̜̾r̶͕̭̎ ̷͙͆͛S̴͇͋o̶͕̒ǘ̵͚̮̌l̶̝̋̾</Link>
        
    </div>
)
}

export default Footer