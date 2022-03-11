import { apiDir } from "../../helpers/api";

export const getMemberStatus = async(status) => {

    
    const url = `${apiDir}/api/member/${status}`;
        const resp = await fetch( url );
        const data = await resp.json();
    
    return data;   
}
