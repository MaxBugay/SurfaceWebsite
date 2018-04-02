function makeObjectList() {

    var objectList = [];

    objectList.add = function (newProcessor, newColor, newStorage) {

        var object = {}; 

        var processor = newProcessor;
        var color = newColor;
        var storage = newStorage;
        
        object.getColor = function () {
            return color;
        }
        
        object.getStorage = function () {
            return storage;
        };

        object.getProcessor = function () {
            return processor;
        };
        
        
        object.setColor = function (newColor) {
            color = newColor;
        }
        
        object.setStorage = function (newStorage) {
            storage = newStorage;
        };

        object.setProcessor = function (newProcessor) {
            processor = newProcessor;
        };

        object.show = function () {
            return ("Processor: " + processor + ", Color: " + color + ", Storage Size: " + storage + " GB SSD");
        };

        objectList[objectList.length] = object;

    }

    objectList.showList = function () {
        var output = "";
        for (var i = 0; i < objectList.length; i++) {
            output += i + ") " + objectList[i].show() + "<br/>";
        }
        return output;
    }

    return objectList;
}


