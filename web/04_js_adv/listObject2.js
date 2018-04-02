function makeObjectList(configList, config) {

    var objList = [];
    var fullObjList = document.getElementById(configList);
    
    objList.add = function (newProcessor, newColor, newStorage) {

        var obj = {}; 

        obj.processor = newProcessor;
        obj.color = newColor;
        obj.storage  = newStorage;
        
        obj.getColor = function () {
            return obj.color;
        };
        
        obj.getStorage = function () {
            return obj.storage;
        };

        obj.getProcessor = function () {
            return obj.processor;
        };
        
        obj.setColor = function (newColor) {
            obj.color = newColor;
            refresh();
        };
        
        obj.setStorage = function (newStorage) {
            obj.storage = newStorage;
            refresh();
        };

        obj.setProcessor = function (newProcessor) {
            obj.processor = newProcessor;
            refresh();
        };

        obj.show = function () {
            return ("Processor: " + obj.processor + ", Color: " + obj.color + ", Storage Size: " + obj.storage + " GB SSD");
        };
        
        function refresh() {
            objList.showList();
        }

        objList[objList.length] = obj;
        refresh();
    };
    
    objList.delete = function (whichConfig) {
        
        if (objList.length === 0) {
            return "Cannot delete - Configuration list is empty";
        }
        
        if (!whichConfig || isNaN(whichConfig) || (whichConfig < 0) || (whichConfig >= objList.length)) {
            return "cannot delete - config number " + whichConfig + " does not exist";
        }
        
        whichConfig=Number(whichConfig);
        for (var i = whichConfig; i < objList.length-1; i++) {
            console.log("Config "+i+" set to "+objList[i+1]);
            objList[i] = objList[i+1];
        }
        objList.length=objList.length-1;
        console.log("New length of config list is "+objList.length);
        return "Config " + whichConfig + " has been deleted.";
    };
    
    objList.showList = function () {
        
        fullObjList.innerHTML = "";
        
        for (var i = 0; i < objList.length; i++) {
            var newConfig = document.createElement("div");
            fullObjList.appendChild(newConfig);
            var trashCan = document.createElement("div");
            newConfig.appendChild(trashCan);
            var del = document.createElement("img");
            del.src = "../pics/trashIcon.png";
            del.objectIndex = i;
            trashCan.appendChild(del);
            var configInfo = document.createElement("div");
            configInfo.innerHTML = i + ".) " + objList[i].show();
            newConfig.appendChild(configInfo);
            newConfig.className = config;
            del.onclick = function () {
                objList.delete(Number(this.objectIndex));
                objList.showList();
            };
        }
        
    };

    return objList;
}


