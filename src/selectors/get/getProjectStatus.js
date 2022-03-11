import { apiDir } from "../../helpers/api";

export const getProjectStatus = async(status) => {
    
    const url = `${apiDir}/api/project/${status}`;
        const resp = await fetch( url );
        const data = await resp.json();
    
    return data;   
}
