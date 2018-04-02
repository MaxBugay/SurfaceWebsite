/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function sortByKey (array, get) {
    
    return array.sort(function (x, y) {   

        var compare1 = eval("x."+ get);
        var compare2 = eval("y."+ get);

        if (typeof compare1 === "string") {
            compare1 = compare1.toLowerCase();
        }
        if (typeof compare2 === "string") {
            compare2 = compare2.toLowerCase();
        }

        if (!isNaN(compare1)) {
            compare1 = Number(compare1);
        }
        if (!isNaN(compare2)) {
            compare2 = Number(compare2);
        }

        var compareResult=0;
        if (compare1 < compare2) {
            compareResult = -1;
        } else if (compare1 > compare2) {
            compareResult = 1;
        } 
        
        return compareResult;
    });
}

