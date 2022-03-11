import { apiDir } from "../../helpers/api";

const postTech = async(dataTech) => {
    const urlTech =`{$apiDir}/api/tech`;
         const configTech = {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(dataTech)
         }
         const respTech = await fetch( urlTech, configTech );
         const resulTech = await respTech.json();
         console.log(resulTech);
}

export default postTech
