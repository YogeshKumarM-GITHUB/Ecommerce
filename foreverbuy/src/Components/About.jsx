import { assets } from '../assets/frontend_assets/assets.js'
const AboutComp = () => {
    return (
        <div>
            <div>
                <div className="mt-10">
                    <h1 className="uppercase text-center text-[34px]">About us</h1>
                    <div className='flex flex-col sm:flex-row items-center gap-10'>
                        {/* Right side div */}
                        <div>
                            <img src={assets.about_img} alt="about page" className='w-[450px] h-[500px]' />
                        </div>
                        {/* Left side div */}
                        <div className='flex-1'>
                            <p className='text-start text-[#4b5563] text-[14px]'>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
                            <p className='text-start text-[#4b5563] text-[14px] mt-10'>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
                            <h1 className='font-bold text-start mt-10'>Our Mission</h1>
                            <p className='text-start text-[#4b5563] text-[14px] mt-10'>Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AboutComp