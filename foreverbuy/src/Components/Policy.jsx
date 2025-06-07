import { assets } from "../assets/frontend_assets/assets";
const Policy = () => {
    return (
        <div className="mt-[100px] ">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-20 sm:gap-40">
                <div className="flex flex-col items-center">
                    <img className="h-12" src={assets.exchange_icon} />
                    <p className="text-[#374151] text-[14px] font-bold mt-4">Easy Exchange Policy</p>
                    <p className="text-[#9CA3AF] text-[16px]">We offer hassle free exchange policy</p>
                </div>
                <div className="flex flex-col items-center">
                    <img className="h-12" src={assets.quality_icon} />
                    <p className="text-[#374151] text-[14px] font-bold mt-4">7 Days Return Policy</p>
                    <p className="text-[#9CA3AF] text-[16px]">We provide 7 days free return policy</p>
                </div>
                <div className="flex flex-col items-center">
                    <img className="h-12" src={assets.support_img} />
                    <p className="text-[#374151] text-[14px] font-bold mt-4">Best customer support</p>
                    <p className="text-[#9CA3AF] text-[16px]">we provide 24/7 customer support</p>
                </div>
            </div>
        </div>
    )
}
export default Policy;