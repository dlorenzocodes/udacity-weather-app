import "regenerator-runtime/runtime";


// post searchQuery
async function postZipcode(entry={}) {
    try{
        const response = await fetch('/postEntry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entry)
        })

        const data = response.text();
        console.log(data)
    }catch(err){
        console.log(err)
    }
}

export { postZipcode };