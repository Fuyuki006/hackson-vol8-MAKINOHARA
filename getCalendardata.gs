function getCalendardata() {
  // 明日の日付を取得
  let today = new Date(); //今日の日付を取得
  let tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  // 明日の開始と終了の日時をセット
  let startOfDay = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 0, 0, 0);
  let endOfDay = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 23, 59, 59);

  // ユーザーのカレンダーから明日のイベントを取得
  let events = CalendarApp.getDefaultCalendar().getEvents(startOfDay, endOfDay);

  let locations=[];
  let startTimes=[];
  let endTimes=[];
  let title=[];
  let description=[];

  // イベントの詳細と場所を取得
  events.forEach ((event,index)=> {
    startTimes.push(event.getStartTime());

    //Logger.log(typeof event.getEndTime())
    endTimes.push(event.getEndTime());

    title.push(event.getTitle());
    description.push(event.getDescription());

    const regular_location= regularExpression(event.getLocation());
    const translated_regular_location = translatePlaceName(regular_location);
    locations.push(translated_regular_location);

  });

  return {"locations":locations,"startTimes":startTimes,"endTimes":endTimes,"title":title,"description":description };


}