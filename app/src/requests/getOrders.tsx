

const getOrders = async ():Promise<[Number, Number]> => {
    return new Promise<[Number, Number]>((resolve, reject) => {
         setTimeout(() => {
            resolve([10, 10]);
          }, 200)
    })
}

export default getOrders