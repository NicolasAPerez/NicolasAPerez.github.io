const Toolkit = {}
Toolkit.camelCaseToName = function (camel){
    let newName = camel;
    newName = newName.charAt(0).toUpperCase() + newName.slice(1);

    let slicedName = newName.charAt(0);

    for (let i = 1; i < newName.length; i++){
        if (newName.charAt(i) === newName.charAt(i).toUpperCase()){
            slicedName += " ";
        }
        slicedName += newName.charAt(i);
    }
    return slicedName;
}
Toolkit.clampNum = function (minimum, base, maximum){
    return Math.min( Math.max(base, minimum), maximum);
}

export default Toolkit;