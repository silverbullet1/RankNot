		
	var str,str2;
	chrome.alarms.onAlarm.addListener(function(alarm) {
		user =[];
		j=0;
		go();
	});

	$.ajaxSetup({
		timeout: 3000, 
		retryAfter:3000
	});

	function go()
	{  
		var url = "https://www.codechef.com/api/rankings/" + localStorage.getItem(0).trim() + "?filterBy=Institution%3D" + encodeURIComponent(localStorage.getItem(1).trim()) + "&order=asc&sortBy=rank";
		var notification;
		$.ajax({
				 type: "GET",
				 url : url,
				 datatype: 'jsonp',
				 async : false,
				 xhrFields: {
				 withCredentials: true
				},
				crossDomain: true,
				success: function(res)
				{ 
					user = []; //Clear user after iterating through all the pages.	
					if(res.contest_info.time.start==false && res.contest_info.time.end==false)
					{
						alert('Please enter a valid Contest Code');
						chrome.alarms.clear("myAlarm");
						localStorage.clear();
					}
					else if(res.contest_info.time.current>res.contest_info.time.end)
					{
						alert('Contest has ended!');
						chrome.alarms.clear("myAlarm");
						localStorage.clear();
					}
					else
					{
					 var totalUsers = res.selectedItems;
					 var totalPages = Math.ceil(totalUsers / 50.0);
					 if(localStorage.getItem("User")==null) //This loop is executing the first time
					 {
						for (var pages = 1; pages<=totalPages; pages++)
						{ //Add all users from all pages (Initial Synchronization)
							var pageurl = url + "&page=" + pages;		
							$.ajax({
									 type: "GET",
									 url : pageurl,
									 datatype: 'jsonp',
									 async : false,
									 xhrFields: {
									 withCredentials: true
									},
									 crossDomain: true,
								success: function(reso)
								{
								for(var i = 0; i<reso.list.length; i++)     		
								{
									obj = {};
									obj.username = reso.list[i].user_handle;
									obj.score = reso.list[i].score;
									obj.rank = reso.list[i].rank;
									user.push(obj);
								}}}).error(function() {
									setTimeout ( function(){ func( param ) }, $.ajaxSetup().retryAfter );
									});
						}
					 }
					 else
					 {
						 user =localStorage.getItem("User");
						 user = JSON.parse(user);
						 //console.log(JSON.stringify(user)); for debugging purposes
						 for (var pages = 1; pages<=totalPages; pages++) //Complete pages
						 {
							var pageurl = url + "&page=" + pages;		
							$.ajax({
										 type: "GET",
										 url : pageurl,
										 datatype: 'jsonp',
										 async : false,
										 xhrFields: {
										 withCredentials: true
									},
									 crossDomain: true,
						 success: function(reso)
						 {
								for(var i = 0; i<reso.list.length; i++)  
								{
									for(j = 0; j<user.length; j++)
									{
										if(reso.list[i].user_handle==user[j].username)
											break;
									}
									if(j == user.length) //Didn't find this new username in the previously Saved Array.
									{
										obj = {};
										obj.username = reso.list[i].user_handle;
										obj.score = reso.list[i].score;
										obj.rank = reso.list[i].rank;
										user.push(obj);
										var notification = new Notification(obj.username + "joined the leaderboard with " + obj.score+ "\n" + "Current Rank is " + obj.rank, { icon : "R.png" });
							 
									}
									else if(j<user.length && user[j].score!=reso.list[i].score)
									{
										user[j].score = reso.list[i].score;
										user[j].rank = reso.list[i].rank;
										var notification = new Notification(user[j].username + " moved to "+user[j].score+ "\n" + "Current Rank is " + user[j].rank, { icon : "R.png" });
									}
								}
						  } //Current page done.
						  }).error(function() {
						   setTimeout ( function(){ func( param ) }, $.ajaxSetup().retryAfter );
						   });//All pages done.
						 }
					  }
						localStorage.setItem("User",JSON.stringify(user)); //Save changes.
				   }
				}
			})
	}