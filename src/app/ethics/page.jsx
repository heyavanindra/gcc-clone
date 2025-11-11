import React from 'react';
import Link from 'next/link';

function page() {
    return (
        <>
            <div className='pt-36 bg-orange-50'>
                <div className='flex flex-col md:flex-row gap-4 p-10 md:p-20 justify-evenly'>
                    <div className='w-full md:w-1/2 order-2 md:order-1'>
                        <h2 className='text-xl md:text-3xl text-center '>Our Values</h2>
                        <p className='py-2 text-lg'>Our company is dedicated to sustainability, ensuring minimal carbon footprints by using high-quality, biodegradable materials for all our products. Each piece is crafted with responsibility toward environmental stewardship, preserving natural resources, and promoting a healthier ecosystem. We uphold excellence and equity by adhering to global manufacturing and quality standards, with an ethical hand manufacturing process that empowers women through fair wages and safe, inclusive working environments.</p>
                        <p className='py-2 text-lg'>We foster an inclusive fashion community that celebrates body positivity and gender fluidity, ensuring our collections cater to diverse tastes and preferences. Our brand supports activism and advocacy, particularly in women&apos;s rights, environmental conservation, and ethical fashion, partnering with initiatives that align with our values of sustainability, equity, and empowerment. Our customer-centric approach emphasizes personalized, hassle-free shopping experiences, with cutting-edge designs and omnichannel options that prioritize wellness and self-care.</p>
                        <p className='py-2 text-lg'>Continuous improvement and innovation are integral to our operations, allowing us to stay ahead of market trends while maintaining our ethical principles. We focus on transparent communication and ethical practices to build lasting trust with our customers, delivering high-quality, sustainable fashion. Our vision is a future where fashion empowers, sustains, and connects, setting industry benchmarks in both style and corporate responsibility.</p>
                        <div className='flex justify-center mt-8'>
                            <Link href='/blog/66c730e257f696f58422af67' className='bg-black text-white hover:bg-white hover:text-black px-6 py-3 border border-black'>View More</Link>
                        </div>
                    </div>
                    <div className='relative w-full md:w-4/12 order-1 md:order-2'>
                        <img src="./Ethics1.webp" alt='ethic_img'
                            className='w-full h-full object-cover object-left' />
                    </div>
                </div>
            </div>

            <div className='p-10 md:p-16'>
                <div className='md:flex justify-between md:h-[80vh] md:gap-12'>
                    <div className='w-full md:w-1/2 h-full mb-8 md:m-0'>
                        <img src="./CSR Golden Ghaf.webp" alt="ethics_img"
                            className='w-full h-full object-cover object-top' loading='lazy'
                        />
                    </div>
                    <div className='bg-orange-50 p-6 w-full md:w-1/2 h-full flex items-center'>
                        <div>
                            <h2 className='text-center text-xl md:text-3xl'>CSR</h2>
                            <p className='py-2 text-lg'>Our vision to epitomize sustainable and fashionable women&apos;s clothing led us to launch the &quot;Women of Craft&quot; initiative, aimed at empowering underprivileged women by providing them with training and fair wages. Recognizing the economic challenges faced by skilled artisans in marginalized communities, we partnered with local NGOs to offer programs that enhanced their traditional crafts and business skills.</p>
                            <p className='py-2 text-lg'>By establishing ethical production facilities and sourcing sustainable materials locally, we not only promoted environmental stewardship but also supported local economies. Integrating their handcrafted creations into our main fashion collections, we provided these women with a global platform to showcase their talents.</p>
                            <p className='py-2 text-lg'>The impact was profound—hundreds of women now earn fair wages, uplifting their communities and inspiring change. Our continued commitment to empowering women ensures sustainable growth and lasting positive transformation, aligning perfectly with our vision of fashion that empowers, sustains, and connects.</p>
                            <div className='flex justify-center mt-2'>
                            <Link href='/blog/66c7310c57f696f58422af69' className='bg-black text-white hover:bg-white hover:text-black px-6 py-3 border border-black'>View More</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='p-10 md:py-16'>
                <div className='md:flex justify-between md:h-[90vh] md:gap-12'>
                    <div className='bg-orange-50 p-6 w-full md:w-1/2 h-full flex items-center mb-8 md:m-0'>
                        <div>
                            <h2 className='text-center text-xl md:text-3xl'>Our factory</h2>
                            <p className='py-2 text-lg'>At our company, we prioritize the well-being, empowerment, and inclusivity of our factory employees, who are essential to realizing our vision of sustainable, high-quality women&apos;s fashion. We ensure a safe and healthy work environment by adhering to global manufacturing standards and providing fair wages and comprehensive benefits, including health insurance, paid leave, and retirement plans. To support personal and professional growth, we offer regular training, educational programs, and leadership development opportunities, fostering a culture of continuous improvement. Our commitment to gender equality is reflected in our practices, promoting body positivity and gender fluidity within an inclusive workplace.</p>
                            <p className='py-2 text-lg'>We also focus on the holistic well-being of our employees by providing access to wellness centers, healthcare services, and mental health support. Our sustainability efforts engage employees in eco-friendly practices, reinforcing our environmental stewardship. Open communication channels, regular recognition programs, and cultural celebrations ensure a responsive and positive work culture. By integrating these practices, we create a supportive and motivating environment that reflects our core values of excellence, equity, and environmental responsibility. Our factory is more than a workplace; it&apos;s a community where employees feel respected, valued, and empowered.</p>
                            <div className='flex justify-center mt-2'>
                            <Link href='/blog/66c7312157f696f58422af6b' className='bg-black text-white hover:bg-white hover:text-black px-6 py-3 border border-black'>View More</Link>
                            </div>
                        </div>
                    </div>

                    <div className='w-full md:w-1/2 h-full'>
                        <img src="https://sahara-theme.myshopify.com/cdn/shop/files/Untitled_design.jpg" alt="ethics_img"
                            className='w-full h-full object-cover' loading='lazy'
                        />
                    </div>
                </div>
            </div>

            <div className='bg-orange-50'>
                <div className='flex flex-col md:flex-row gap-4 p-10 md:p-20 justify-evenly'>
                    <div className='w-full md:w-1/2 order-2 md:order-1'>
                        <p className='text-xl md:text-3xl'>Office environment</p>
                        <ul className='list-disc'>
                            <li className='py-2'>
                                Our unique approach combines traditional craftsmanship with contemporary innovation. By employing ethical hand manufacturing techniques, we produce clothing that is not only stylish but also reflective of our commitment to fair labor practices. Each garment is made with care by skilled artisans, predominantly women, fostering a community of empowered and creative professionals.
                            </li>
                            <li className='py-2'>
                                We embrace a forward-thinking mindset, continuously seeking ways to improve our products, processes, and practices. Proactive trendsetting and innovation are key to maintaining our position as leaders in fashion. We stay ahead of market trends while adhering to our ethical principles, delivering exclusive and trendsetting designs that set benchmarks in both style and corporate responsibility.
                            </li>
                        </ul>
                        <div className='flex justify-center mt-8'>
                        <Link href='/blog/66c7313757f696f58422af6d' className='bg-black text-white hover:bg-white hover:text-black px-6 py-3 border border-black'>View More</Link>
                        </div>
                    </div>
                    <div className='relative w-full md:w-5/12 order-1 md:order-2'>
                        <img src='https://sahara-theme.myshopify.com/cdn/shop/files/D8308091-F463-4F8B-ACC7-A745F9906B21.jpg' alt='ethic_img'
                            className='w-full object-cover' loading='lazy' />
                    </div>
                </div>
            </div>

            <div className='h-[calc(100vh-8rem)] relative'>
                <img
                    src="https://sahara-theme.myshopify.com/cdn/shop/files/0AE53A26-31CD-48D8-A65E-257BC868C870_1.jpg"
                    loading='lazy'
                    alt="banner"
                    className='w-full h-full object-cover'
                />
                <div className='absolute inset-0 flex flex-col items-center justify-center text-center text-orange-200'>
                    <p className='text-2xl md:text-3xl'>OUR GOAL</p>
                    <p className='text-xl pt-2 w-1/2'>To become a sustainable and fashionable women clothing brand with focus on ethinic and semi modern clothing for women providing wider clothing options at single point.</p>
                </div>
            </div>

        </>
    )
}

export default page;
