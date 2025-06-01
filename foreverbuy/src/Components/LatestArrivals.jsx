import { assets } from '../assets/frontend_assets/assets'
const LatestArrivals = () => {
    return (
        <div className="w-full px-4 py-8">
            <div className="flex flex-col lg:flex-row border border-slate-600">
               
                {/* left content */}
                <div className="w-full lg:w-1/2 flex items-center justify-center relative py-8 lg:py-0">
                    <div className="text-center lg:text-left px-4 lg:px-16 max-w-xl">
                        <div className="text-[14px] sm:text-[16px] text-[#414141] flex items-center justify-center lg:justify-start gap-2 mb-2">
                            <hr className="w-14 h-[2px] bg-[#414141]" />
                            <p>OUR BESTSELLERS</p>
                        </div>
                        <p className="text-[28px] sm:text-[36px] lg:text-[48px] font-semibold mb-4">Latest Arrivals</p>
                        <div className="text-[14px] sm:text-[16px] text-[#414141] flex items-center justify-center lg:justify-start gap-2">
                            <p>SHOP NOW</p>
                            <hr className="w-14 h-[2px] bg-[#414141]" />
                        </div>
                    </div>
                </div>

                 {/* right image (shows on top on mobile) */}
                <div className="w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-[500px]">
                    <img src={assets.hero_img} alt="" className="h-full w-full object-cover" />
                </div>

            </div>
        </div>

    )
}
export default LatestArrivals;