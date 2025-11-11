import Link from "next/link";

function page() {
  return (
    <>
      <div className='pt-36 bg-orange-50'>
        <div className='flex flex-col-reverse md:flex-row justify-between items-center gap-5 md:gap-10 p-10 md:p-20'>
          <div className='w-full md:w-1/2 text-center'>
            <p className='text-3xl md:text-6xl py-2'>ABOUT US</p>
            <p className='py-2 text-xl'>Sustainability is at the core of our brand, with a strong emphasis on using biodegradable fabrics made from natural raw materials. These bio fabrics significantly reduce environmental impact, as they break down more easily compared to synthetic materials, minimizing waste and pollution. By choosing biodegradable options, we not only lessen our carbon footprint but also contribute to a healthier ecosystem. This commitment to sustainable practices positively impacts society by promoting environmental stewardship and fostering a more sustainable future.</p>
            <p className='py-2 text-xl '>We prioritize an exceptional customer experience by utilizing sustainable fabric and offering couture designs with easy customization options. Our hassle-free customer engagement is rooted in actively listening to customers and addressing them personally. This individualized approach not only resolves issues swiftly but also fosters deeper connections. By maintaining a strong focus on building brand loyalty and trust, we ensure that every interaction reinforces our commitment to quality, sustainability, and customer satisfaction.</p>
            <p className='py-2 text-xl '>Our company prides itself on brand adaptability, committed to continuous improvement and seamlessly adapting to new fashion trends while steadfastly maintaining our brand mission. We not only follow but also create new fashion trends, setting path-breaking standards in the industry. By adhering to global manufacturing and quality standards, we ensure our products meet the highest benchmarks. Our proactive approach in trendsetting showcases our dedication to innovation and excellence in the global fashion arena.</p>
          </div>
          <div className='w-full md:w-1/2 flex justify-center mb-5 md:m-0'>
            <img src="/GGC_About.webp" loading='lazy' alt="about_image" className='w-full md:w-3/4 h-3/6 object-cover' />
          </div>
        </div>
      </div>

    </>
  )
}

export default page;