/* eslint-disable no-undef */
let validEntryId=()=>{return new Promise((resolve,reject)=>{
    try{
        let url=window.location.pathname
        let stackIdArray=url.split('/')
        let stackId=stackIdArray[2];
        let content_type=url.split('/')[4]
        let entryId=url.split('/')[7]
        axios.get(`/v3/content_types/${content_type}/entries`,
                {
                    headers:{
                    "api_key":stackId
                    }
                })
        .then((response)=>{
            response.data.entries.forEach((e)=>{
                if(e.uid===entryId) resolve(true);
            })
            reject(false);
        }).catch((error)=>{
            reject(false);
        })
    }catch{
        reject(false);
    }
})
}
export default validEntryId;