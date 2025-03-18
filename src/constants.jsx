import Notification from './assets/svg/navbar/notification.svg'
import Profile from './assets/svg/navbar/profile.svg'
import Wishlist from './assets/svg/navbar/wishlist.svg'
import Cart from './assets/svg/navbar/cart.svg'

export const navIcons = [
    {
        icon:Notification,
        path:'/'
    },
    {
        icon:Profile,
        path:'/'
    },
    {
        icon:Wishlist,
        path:'/'
    },
    {
        icon:Cart,
        path:'/'
    },
]

export const navlinks = [
    "Offers","Luxury", "Latest", "Smart Watches", "Sports", "Classic"
]

import Shipping from './assets/svg/home/shipping.svg'
import Payment from './assets/svg/home/payment.svg'
import Support from './assets/svg/home/support.svg'
import Moneyback from './assets/svg/home/moneyback.svg'

export const features = [
    {
        logo:Shipping,
        feature1 :"Free Shipping",
        feature2:"On all order above ₹2000"
    },
    {
        logo:Moneyback,
        feature1 :"Moneyback",
        feature2:"Moneyback guarentee..."
    },
    {
        logo:Support,
        feature1 :"24/7 Support",
        feature2:"Online consultations ..."
    },
    {
        logo:Payment,
        feature1 :"Secure Payment",
        feature2:"Safe Shopping Guarantee ..."
    },
]

import Instagram from './assets/svg/footer/instagram.svg'
import Youtube from './assets/svg/footer/youtube.svg'
import LinkedIn from './assets/svg/footer/linkedin.svg'

export const footerData = [
    {
        title:"Company",
        subtitles :  [
            { name: "Products", link: "/" },
            { name: "About", link: "/" }
        ]
    },
    {
        title:"Legal",
        subtitles :  [
            { name: "Privacy Policy", link: "/" },
            { name: "Terms & Conditions", link: "/" }
        ]
    },
    {
        title:"Link Up with Friends!",
        subtitles :  [
            { name: "Instagram", link: "/", icon: Instagram },
            { name: "Youtube", link: "/", icon: Youtube },
            { name: "LinkedIn", link: "/", icon: LinkedIn },
        ]
    },
]