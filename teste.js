async function teste() {
    const resultado = fetch("https://rest-server-one.vercel.app/teste")
    const data = await resultado.json
    console.log(data.message)
}

teste()