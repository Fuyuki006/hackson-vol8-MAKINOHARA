function getWeatherInfo(city) {
const prop = givePropertiesService();
let apiKey = prop.getProperty("apiKey");
let apiUrl = prop.getProperty("apiUrl");

//スプレッドシートに書き込むための配列を初期化する
let weatherInfo = [];

//APIリクエストするURLにAPIキーと取得都市のパラメータをセット
let requestUrl = apiUrl + city + '&appid=' + apiKey + '&lang=ja&units=metric';
//UrlFetchAppでOpen Weather MapのAPIから天気データを取得する
let response = UrlFetchApp.fetch(requestUrl).getContentText();
//取得したデータはJSON形式のため、JSONとして変換する
let json = JSON.parse(response);
//Open Weather Mapから取得した天気情報の中から必要な情報を2次元配列に書き込み
weatherInfo[0] = json['name'];
weatherInfo[1] = json['weather'][0]['id'];
weatherInfo[2] = json['main']['temp_min'];
weatherInfo[3] = json['main']['temp_max'];
weatherInfo[4] = json['main']['humidity'];
weatherInfo[5] = json['main']['pressure'];
 

return weatherInfo;

}