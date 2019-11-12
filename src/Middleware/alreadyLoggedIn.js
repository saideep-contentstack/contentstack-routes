/* eslint-disable no-undef */
const alreadyLoggedIn =()=>{return new Promise((resolve,reject)=>{
    console.log("from already logged in");
    try{
        axios.get(`/user`)
        .then((response)=>{
            if(response.status===200) resolve(true)
            else reject(false)
        }).catch((error)=>{
            reject(false)
        })
    }
    catch{
        reject(false)
    }
})
}
export default alreadyLoggedIn;