
var apiclient = (function (){

    return {
        getBlueprintsByAuthor: function(author, callback) {
            $.get("/blueprints/"+author, function (data){
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
        }
    }
})();

