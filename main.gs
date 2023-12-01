function main() {
  const calendar_data = getCalendardata();

  const locations = calendar_data["locations"];

  const title = calendar_data["title"];
  
  const description =calendar_data["description"];

  let info=[]

  const time_list = [calendar_data["startTimes"],calendar_data["endTimes"]]

  if(locations.includes(null) || locations.includes("") || locations.length==0 || locations.includes("Bad Request")){
    const error_message = "「場所」が不適切な予定があります !"
    return [null,null,error_message];
  }

  let location_weather_list = locations.map((location,index) => {
    return getWeatherInfo(location);
    
  })
  createBody(location_weather_list,time_list,null, title, description);

}