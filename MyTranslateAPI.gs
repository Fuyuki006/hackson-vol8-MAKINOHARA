function translatePlaceName(placeName) {
  var sourceLanguage = 'ja';   // 元の言語（日本語）
  var targetLanguage = 'en';   // 翻訳先の言語（英語）
  const prop = givePropertiesService();
  var translateAPI = prop.getProperty("translateAPI")+ "?"+'text=' + placeName + '&source=' + sourceLanguage + '&target=' + targetLanguage 

  var response = UrlFetchApp.fetch(translateAPI);
  var json = response.getContentText();
  var translatedText = JSON.parse(json).text;

  console.log(translatedText)

  return translatedText;
}