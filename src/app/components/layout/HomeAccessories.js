import SupplementItem from "../supplements/SupplementItem";
import SectionHeaders from "./SectionHeaders";


const HomeAccessories = () => {
 return (
   <section className="mt-10">
     <div className="text-center mb-4">
       <SectionHeaders
         subHeader={"Check Our"}
         mainHeader={"Accessories"}
       ></SectionHeaders>
     </div>
     <div className="grid grid-cols-4 gap-6">
       <SupplementItem></SupplementItem>
       <SupplementItem></SupplementItem>
       <SupplementItem></SupplementItem>
       <SupplementItem></SupplementItem>
       <SupplementItem></SupplementItem>
       <SupplementItem></SupplementItem>
       <SupplementItem></SupplementItem>
       <SupplementItem></SupplementItem>
     </div>
   </section>
 );
};

export default HomeAccessories;