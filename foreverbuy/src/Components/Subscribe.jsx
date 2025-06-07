const Subscribe = () => {
    return (
        <div className="mt-24">
            <div>
                <p className="text-[24px] text-[#1F2937] font-medium">Subscribe now & get 20% off</p>
                <p className="text-[16px] text-[#9ca3af]">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <div className="mt-4">
                    <form className="flex flex-row items-center justify-center">
                        <input type="email" placeholder="Enter your email" className="border-2 border-[#9ca3af] h-[40px] w-[500px] px-4" required />
                        <button className="bg-[#000000] text-white text-[12px] px-[36px] py-[11px]">Subscribe</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Subscribe;