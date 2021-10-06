var app = ( function () {

    //let api = apimock;
    let api = apiclient;
    let nameAuthor = "";
    let nameBluepoint;
    let listaNombres = [];
    let totalPoints;
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
            console.log(author);
            api.getBlueprintsByAuthor(author, function (error, mockData) {
                console.log(author);
                listaNombres = mockData.map(function (blueprint) {
                    return {
                        name: blueprint.name,
                        points: blueprint.points.length
                    };
                });
                if (listaNombres.length > 1) {
                    totalPoints = listaNombres.reduce(function (anterior, actual) {
                        return anterior.points + actual.points;
                    });
                }else {
                    totalPoints = listaNombres[0].points;
                }
                app.crearTabla();
            });
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
            $("#Current-blueprint").html("Current blueprint: "+name);
        },

        saveBlueprint : function (){
            api.putPointsBlueprints(nameAuthor,nameBluepoint,points);
        }
    };
})();






