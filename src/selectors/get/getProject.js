import { apiDir } from "../../helpers/api";

export const getProject = async() => {
    
        const url = `${apiDir}/api/project`;
        const resp = await fetch( url );
        const data = await resp.json();
    
    return data;   
}
