function createBody(location_weather_list,time_list,error_message,title, description) {
  let body="";
  
  let titlename = title;
  let descriptionname = description; 

  if (error_message != null) {
    const prop = givePropertiesService();
    const mailTo = prop.getProperty("mailTo");
    const title = "リマインドメール";
    body = error_message;
    GmailApp.sendEmail(mailTo, title, body); 
    return;
  }
  else{
  location_weather_list.forEach((location_weather,index)=> {
    //Logger.log(titlename);
    //Logger.log(descriptionname)
    let place = location_weather[0] // json['name'];
    let id = location_weather[1] // json['weather'][0]['id'];
    let temp_min = location_weather[2] // json['main']['temp_min'];
    let temp_max = location_weather[3] // json['main']['temp_max'];
    let humidity = location_weather[4] // json['main']['humidity'];
    let pressure = location_weather[5] // json['main']['pressure'];
    
    let event = titlename[index];
    let memo = descriptionname[index];
    let startTime = time_list[index][0];
    let endTime = time_list[index][1];

    let weather_message_first;
    let weather_message_second;

    const weather_message_obj = {"cloud": ["明日のご予定がある地域の天気は曇りです。\n","\n折りたたみ傘があると良いかもしれません。\n"],"rain": ["明日のご予定がある地域の天気は雨です。\n","\n傘を持って出かけましょう。\n"],"sun":["明日のご予定がある地域の天気は晴れです。\n",""],"atmosphere":["天気が荒れるので十分ご注意ください。\n",""],"snow":["積雪に注意して下さい。\n",""]}

    
    const weather = "cloudy";
    
    if(parseInt(id)<=500){
      
      weather_message_first = weather_message_obj["rain"][0]
      weather_message_second = weather_message_obj["rain"][1]
    }
    else if(parseInt(id)>600 && parseInt(id)<700){
      weather_message_first = weather_message_obj["snow"][0]
      weather_message_second = weather_message_obj["snow"][1]
      
    }
    else if(parseInt(id)>700 && parseInt(id)<800){
      weather_message_first = weather_message_obj["atmosphere"][0]
      weather_message_first = weather_message_obj["atmosphere"][1]
    }
    else if (parseInt(id)==800){
      weather_message_first = weather_message_obj["sun"][0]
      weather_message_second = weather_message_obj["sun"][1]
    }
    else{
      weather_message_first = weather_message_obj["cloud"][0]
      weather_message_second = weather_message_obj["cloud"][1]
    }

    body= weather_message_first + "\n" + "最高気温: " + temp_max + "℃\n最低気温: " + temp_min + "℃\n湿度: " 
    + humidity + "%\n気圧: " + pressure + "hPa \n"+ weather_message_second + "予定内容は以下の通りです。\n" + "要件: " + event + "\nメモ:" + memo + "\n場所: " + place + "\n時間: "+ startTime+ "~" + endTime + "\n";

    const prop = givePropertiesService();
    const mailTo = prop.getProperty("mailTo");
    const title = "リマインドメール";
    GmailApp.sendEmail(mailTo, title, body); 
  });
  }

}