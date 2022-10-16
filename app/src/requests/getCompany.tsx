



const getAllCompanies = async ():Promise<string[]> => {
    return new Promise<string[]>((resolve, reject) => {
        setTimeout(() => {
            resolve(['Company1', 'Company2', 'Company3']);
          }, 200)
    })
}


const getCompany = async ():Promise<String> => {
    return new Promise<String>((resolve, reject) => {
        setTimeout(() => {
            resolve('Company1');
          }, 200)
    })
}

export {getCompany, getAllCompanies}