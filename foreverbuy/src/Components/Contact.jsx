import {assets} from '../assets/frontend_assets/assets'
const ContactComp=()=>{
    return(
        <div>
            <div>
                <div className="mt-10">
                    <h1 className="uppercase text-center text-[34px]">Contact us</h1>
                <div className='flex flex-col sm:flex-row items-center gap-10'>
                        {/* Right side div */}
                        <div>
                            <img src={assets.contact_img} alt="about page" className='w-[450px] h-[500px]' />
                        </div>
                        {/* Left side div */}
                        <div className='flex-1'>
                            <p className='text-start text-[#4b5563] text-[14px]'>Our Store</p>
                            <p className='text-start text-[#4b5563] text-[14px] mt-10'>54709 Willms Station <br/>Suite 350, Washington, USA</p>
                            <h1 className='font-bold text-start mt-10'>Tel: (415) 555-0132 <br/>Email: admin@forever.com</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ContactComp;