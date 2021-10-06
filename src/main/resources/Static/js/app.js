var app = ( function () {

    //let api = apimock;
    let api = apiclient;
    let nameAuthor = "";
    let listaNombres = [];
    let points;
    let totalPoints;


    let getBlueprints = function (author){
        api.getBlueprintsByAuthor(author, function (error, data){
            console.log(data);
        })
    };

    return {

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
                html += "<td> <button type='button' class='btn btn-success' onclick='app.drawPoints(\""+blueprint.name+"\",\""+nameAuthor+"\");'>Open</button></td>"
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

        drawPoints: function (name, author){
            api.getBlueprintsByNameAndAuthor(name, author, function (error, blueprint){
                let canvas = $("#dibujar")[0];
                let canvas2d = canvas.getContext("2d");
                for(let i = 1; i < blueprint.points.length; i++){
                    canvas2d.moveTo(blueprint.points[i-1].x,blueprint.points[i-1].y);
                    canvas2d.lineTo(blueprint.points[i].x,blueprint.points[i].y);
                    canvas2d.stroke();
                }
                $("#Current-blueprint").html("Current blueprint: "+name);
            })
        }
    };
})();






