import { apiDir } from "../../helpers/api";

export const getTech = async() => {
    
    const url = `${apiDir}/api/tech`;
    const resp = await fetch( url );
    const data = await resp.json();

return data;   
}
