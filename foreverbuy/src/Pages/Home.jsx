import BestSeller from "../Components/BestSeller";
import LatestArrivals from "../Components/LatestArrivals";
import LatestCollection from "../Components/LatestCollections";
import Policy from "../Components/Policy";
import Subscribe from "../Components/Subscribe";

const Home=()=>{
    return(
        <div>
            <LatestArrivals/>
            <LatestCollection/>
            <BestSeller/>
            <Policy/>
            <Subscribe/>
        </div>
    )
}
export default Home;