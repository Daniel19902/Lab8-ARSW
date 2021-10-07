var app = ( function () {

    //let api = apimock;
    let api = apiclient;
    let nameAuthor = "";
    let nameBluepoint = "";
    let listaNombres = [];
    let totalPoints = 0;
    let x = 0;
    let y = 0;
    let points = [];

    return {
        init: function (){
            let canvas = $("#dibujar")[0];
            if(window.PointerEvent){
                canvas.addEventListener("pointerdown",function (event){
                    let offset = app.getOffset(canvas);
                    x = event.pageX-offset.left;
                    y = event.pageY-offset.top;
                    points.push({
                        x:x,
                        y:y
                    })
                    app.drawPoints(nameBluepoint,nameAuthor);
                    });
                };
            },

        getBlueprintsByNameAndAuthor : function (name,author){
            nameBluepoint = name;
            api.getBlueprintsByNameAndAuthor(name,author, function (error, data){
                points = data.points;
                app.drawPoints();
                $("#Current-blueprint").html("Current blueprint: "+name);
          });
        },

        getOffset: function(obj) {
            let offsetLeft = 0;
            let offsetTop = 0;
            do {
                if (!isNaN(obj.offsetLeft)) {
                    offsetLeft += obj.offsetLeft;
                }
                if (!isNaN(obj.offsetTop)) {
                    offsetTop += obj.offsetTop;
                }
            } while(obj = obj.offsetParent );
            return {left: offsetLeft, top: offsetTop};
        },

        getBlueprints : function (author){
            nameAuthor = author;
            console.log(nameAuthor);
            this.getBlueprintsByAuthor(author);
        },

        crearTabla: function (){
            let html = "";
            listaNombres.map(function (blueprint){
                html += "<tr>";
                html += "<td>" +blueprint.name+ "</td>";
                html += "<td>" +blueprint.points+ "</td>";
                html += "<td> <button type='button' class='btn btn-success' onclick='app.getBlueprintsByNameAndAuthor(\""+blueprint.name+"\",\""+nameAuthor+"\");'>Open</button></td>"
                html += "</tr>"
            });
            $("#table-title").html(nameAuthor+"'s blueprints");
            $("#tbody-table").html(html);
            $("#user-points").html("Total user points: " + totalPoints);
        },

        getBlueprintsByAuthor: function (author){
            api.getBlueprintsByAuthor(author, function (error, mockData){
                app.sumarPoints(mockData);
                listaNombres = mockData.map(function (blueprint) {
                    return {
                        name: blueprint.name,
                        points: blueprint.points.length
                    };
                });
                app.crearTabla();
            });
        },

        sumarPoints : function (mockData){
            totalPoints = 0;
            for(let i = 0 ; i < mockData.length; i++){
                totalPoints += mockData[i].points.length;
            }
            console.log(totalPoints);
        },



        drawPoints: function (){
            let canvas = $("#dibujar")[0];
            let canvas2d = canvas.getContext("2d");
            canvas2d.clearRect(0,0,canvas.width,canvas.height);
            canvas2d.beginPath()
            for(let i = 1; i < points.length; i++){
                canvas2d.moveTo(points[i-1].x,points[i-1].y);
                canvas2d.lineTo(points[i].x,points[i].y);
                canvas2d.stroke();
            }
        },

        saveBlueprint : function (){
            api.putPointsBlueprints(nameAuthor,nameBluepoint,points).then( function (){
                app.getBlueprintsByAuthor(nameAuthor);
            });
        },

        crearBlueprint : function (name){
            this.limpiarCanvas();

            let blueprint = {

                author: nameAuthor,
                name : name,
                points : []

            };

            api.postCrearBlueprint(blueprint).then( function (){
                app.getBlueprintsByAuthor(nameAuthor);
            });
        },

        deleteBlueprint : function (){
            if (nameAuthor != ""){
                api.deleteBlueprint(nameAuthor, nameBluepoint).then(function (){
                    app.limpiarCanvas();
                    app.getBlueprintsByAuthor(nameAuthor);
                });
            }
        },

        limpiarCanvas: function (){
            let canvas = $("#dibujar")[0];
            let canvas2d = canvas.getContext("2d");
            canvas2d.clearRect(0,0,canvas.width,canvas.height);
            canvas2d.beginPath();
        }
    };
})();






