alert("Hello");

function sleep(delay) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay);
}

var url = "/api/rankings/APRIL16?filterBy=Institution%3DIndian%20Institute%20of%20Information%20Technology%2C%20Allahabad&order=asc&sortBy=rank";
var user = [{}];
var x =0;
$.ajax({
             type: "GET",
             url : url,
             datatype: 'jsonp',
             async : true,
             xhrFields: {
             withCredentials: true
            },
            crossDomain: true,
            success: function(res)
             { 
             var json = $.parseJSON(res);
             if(json.response.status == 'success') 
             {
             var totalUsers = res.selectedItems;
             var totalPages = Math.ceil(totalUsers / 50.0);
              for (var pages = 1; pages<=totalPages; pages++) //Complete pages
              {
                 url = '/api/rankings/APRIL16?filterBy=Institution%3DIndian%20Institute%20of%20Information%20Technology%2C%20Allahabad&order=asc&sortBy=rank&page=' + pages;
                 $.ajax({
                     type: "GET",
                     url : url,
                     datatype: 'jsonp',
                     async : true,
                     xhrFields: {
                     withCredentials: true
                },
                 crossDomain: true,
             success: function(reso)
             { 
                var json2 = $.parseJSON(reso);
                if(json2.response.status == 'success') 
                {
                  for(var i=0;i<reso.list.length;i++)
                    {    
                         obj = []
                         obj.username = reso.list[i].user_handle;
                         obj.score =  reso.list[i].score;
                         obj.rank = reso.list[i].rank;
                         user.push(obj);
                     }
             }
            }
            }).done(function() { //This function keeps getting executed in loop
                console.log("Started");
                sleep(10000);
                console.log("Done!");
    });   
      }}
  }

             }).done(function()
                 {
                console.log("Yolo"); 
                sleep(10000);
                });
