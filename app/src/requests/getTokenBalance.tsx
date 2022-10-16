


const getTokenBalance = async ():Promise<Number> => {
    return new Promise<Number>((resolve, reject) => {
        setTimeout(() => {
            resolve(10);
          }, 200)
    })
}

export default getTokenBalance