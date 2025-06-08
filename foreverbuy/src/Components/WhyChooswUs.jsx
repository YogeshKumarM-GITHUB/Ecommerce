const WhyChoosUs = () => {
    return (
        <div>
            <div className="mt-10">
                <h1 className="text-start text-[20px] uppercase">why Choose Us</h1>

                <div className="flex flex-col sm:flex-row items-start sm:items-stretch divide-y sm:divide-y-0 sm:divide-x divide-gray-400 border border-gray-400 mt-10">
                    <div className="p-14 flex-1 text-start">
                        <h1 className="font-semibold mb-2">Quality Assurance:</h1>
                        <p className="text-[#4b5563] text-[14px]">We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
                    </div>
                    <div className="p-14 flex-1 text-start">
                        <h1 className="font-semibold mb-2">Convenience:</h1>
                        <p className="text-[#4b5563] text-[14px]">With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
                    </div>
                    <div className="p-14 flex-1 text-start">
                        <h1 className="font-semibold mb-2">Exceptional Customer Service:</h1>
                        <p className="text-[#4b5563] text-[14px]">Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WhyChoosUs;