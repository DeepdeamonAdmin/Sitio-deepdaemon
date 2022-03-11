import { apiDir } from "../../helpers/api";

const postMember = async(dataMember) => {
    const urlMember=`${apiDir}/api/member`;
        const configMember = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataMember)
        };
        const repMember = await fetch( urlMember, configMember );
        const resulMember = await repMember.json();
        console.log(resulMember);
}

export default postMember;