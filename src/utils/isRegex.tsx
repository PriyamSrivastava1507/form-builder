const isValidRegex = (regex: string) => {
    try{
        new RegExp(regex);
        return true;
    }catch{
        return false;
    }
}

export default isValidRegex;