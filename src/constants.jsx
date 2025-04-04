import Notification from './assets/svg/navbar/notification.svg'
import Profile from './assets/svg/navbar/profile.svg'
import Wishlist from './assets/svg/navbar/wishlist.svg'


export const navIcons = [
    {
        name:"notification",
        icon:Notification,
        path:'/'
    },
    {
        name:"profile",
        icon:Profile,
        path:'/'
    },
    {
        name:"wishlist",
        icon:Wishlist,
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


export const productDetails = [
    { label: "Product ID", value: "SKU 1245" },
    { label: "Product Dimensions", value: "20 x 1.6 x 4.6 cm; 56 g" },
    { label: "Item Model Number", value: "GMA-S140M-1ADR(GA106)" },
    { label: "Colour", value: "Brown" },
    { label: "Weight", value: "50 GM" },
    { label: "Display", value: "LED" },
    { label: "Generic Name", value: "Casual Watch" },
    { label: "Type", value: "Analog" },
    { label: "Item Model Number", value: "GMA-S150M-2ADR(GA107)" },
    { label: "Net Qty", value: "1 nos" },
    { label: "Weight", value: "70 GM" }
  ];

  import OurMission from './assets/images/aboutus/ourmission.png'
  import OurVision from './assets/images/aboutus/ourvision.png'
  import OurTeam from './assets/images/aboutus/ourteam.png'

  export const aboutUsData = [

    {
        image:OurMission,
        title:"Our Mission",
        desc:"Al Nibras is a premier watch e-commerce platform, offering a curated selection of luxury timepieces from renowned brands. Our mission is to provide watch enthusiasts with an unparalleled shopping experience, combining authenticity, quality, and style.",
        order1:"order-1",
        order2:"order-2"

        
    },
    {
        image:OurVision,
        title:"Our Vision",
        desc:"At our Al Nibras watch e-commerce store, we envision a world where every individual can express their unique story through the art of timekeeping. We aim to be a leading destination for those who appreciate the beauty and craftsmanship of watches, offering a curated selection that reflects diverse styles and personal journeys. We aspire to inspire our customers to embrace their individuality, celebrating each moment with a watch that resonates with their lifestyle and values. Through innovation and a commitment to sustainability, we strive to redefine the watch industry, making luxury accessible while honoring our planet.",
        order1:"xl:order-2",
        order2:"xl:order-1"
    },
    {
        image:OurTeam,
        title:"The Teams",
        desc:"Once upon a time in a  city, a group of passionate watch enthusiasts to create something extraordinary. They believed that every watch tells a story, capturing the essence of time and the moments that matter most. With a shared vision, they founded a watch e-commerce store, where each timepiece was crafted with love and precision.Among them was Mia, a talented designer who poured her heart into every sketch, ensuring that each watch was not only functional but also a work of art. Then there was Leo, the master craftsman, whose skilled hands transformed raw materials into stunning timepieces, each one a testament to quality and craftsmanship.As they worked tirelessly, their mission became clear: to empower individuals to express their unique stories through their watches. They sourced materials ethically, ensuring that every piece reflected their commitment to sustainability and responsibility.Together, they celebrated milestones, shared laughter, and created a community of watch lovers who cherished the beauty of time. Their journey was not just about selling watches; it was about creating lasting memories and inspiring confidence in every wearer. And so, the team thrived, united by their passion for timepieces and the stories they tell.",
        order1:"order-1",
        order2:"order-2"
    },
  ]
  export const pageLinks =[
    {
        title:"Home",
        path:"/"
    },
    {
        title:"Trending",
        path:"/trending"
    },
    {
        title:"Product",
        path:"/product"
    },
    {
        title:"Checkout",
        path:"/checkout"
    },
    {
        title:"Order History",
        path:"/order-history"
    },
    {
        title:"About Us",
        path:"/aboutus"
    },
    {
        title:"Cart",
        path:"/cart"
    },
  ]