import { apiDir } from "../../helpers/api";

export const getMember = async() => {
    const url = `${apiDir}/api/member`;
        const resp = await fetch( url );
        const data = await resp.json();
    
    return data;   
}
