
var apiclient = (function (){

    return {

        putPointsBlueprints : function (author, name, data){
            return $.ajax({
                url: "/blueprints/" + author + "/" + name,
                type: 'PUT',
                data: JSON.stringify({author:author, name:name, points:data}),
                contentType: "application/json"
          }).fail(function (jqXHR, textStatus) {
                console.log("Error en el PUT: " + jqXHR + " " + textStatus);
            });
        },


        getBlueprintsByAuthor: function(author, callback) {
            return $.get("/blueprints/"+author, function (data){
                console.log(data);
                callback(null,data);
            }).fail(function (){
                alert("error");
            });
        },

        getBlueprintsByNameAndAuthor: function(name, author, callback) {
            $.get("/blueprints/"+author+"/"+name, function (data){
                callback(null, data)
            }).fail(function (){
                alert("error");
            });
        },

        postCrearBlueprint : function (blueprint){

            return $.ajax({
                url: "/blueprints",
                type: 'POST',
                data: JSON.stringify(blueprint),
                contentType: "application/json"
            }).fail(function (jqXHR, textStatus) {
                console.log("Error en el PUT: " + jqXHR + " " + textStatus);
            });
        },

        deleteBlueprint : function (author, name){
            return $.ajax({
                url:"/blueprints/"+author+"/"+name,
                type: 'DELETE'
            }).fail(function (jqXHR, textStatus) {
                console.log("Error en el DELETE: " + jqXHR + " " + textStatus);
            });
        }

    }
})();

