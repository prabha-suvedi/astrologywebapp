import express from "express";
import User from "../models/User.js"; // adjust path if needed

const router = express.Router();

// Horoscope data (including Hindi text)
const horoscopes = {
  aries: `बुध और शुक्र का प्रभाव धीरे-धीरे संतोष लेकर आएगा, और आपको अपने क्षितिज का विस्तार करने के नए अवसर मिल सकते हैं। यदि आप व्यवसाय में हैं, तो अपने संसाधनों का अधिकतम उपयोग करें ताकि अपने प्रोजेक्ट्स में शानदार परिणाम प्राप्त कर सकें।

यह समय आपको अच्छी प्रगति देगा, साथ ही कुछ वित्तीय लाभ मिलने की भी संभावना है। आप आत्मविश्वास से चमकेंगे, और आपकी आभा सही लोगों को आपके सामाजिक दायरे में आकर्षित करेगी।

कोई आकर्षक व्यक्तित्व वाला व्यक्ति आप में रुचि दिखा सकता है। हालांकि, इस महीने की शुरुआत पढ़ाई के मामले में थोड़ी धीमी हो सकती है।

राहु का प्रभाव स्वास्थ्य में अस्थिरता ला सकता है, लेकिन जैसे-जैसे महीना आगे बढ़ेगा, भाग्य आपके पक्ष में आना शुरू करेगा और धीरे-धीरे सब कुछ सकारात्मक दिशा में परिवर्तित होने लगेगा।`,

  taurus: `आप अपनी वित्तीय स्थिति को मजबूत करने और खर्चों में कटौती करने के लिए उत्सुक रहेंगे। लेकिन जैसे-जैसे महीना आगे बढ़ेगा, आपको सतर्क रहने की जरूरत होगी क्योंकि दक्षिण नोड का प्रभाव काफी जटिल हो सकता है।

मंगल आपको कभी-कभी बेचैन और अधीर बना सकता है। महीने का पहला भाग स्पष्टता ला सकता है, जिससे आप अपने रिश्ते के भविष्य को लेकर सहज और आत्मविश्वास महसूस कर सकते हैं।

अध्ययन में आपको कुछ छोटी-मोटी बाधाओं का सामना करना पड़ सकता है। कुछ मामूली स्वास्थ्य समस्याएँ परेशान कर सकती हैं, इसलिए आपको अपने स्वास्थ्य का ध्यान रखना होगा।

चुनौतियाँ छुपे हुए आशीर्वाद की तरह हो सकती हैं और आपको मजबूत और बेहतर बना सकती हैं। बुध के सहयोग से आपको कुछ प्रोत्साहित करने वाले आर्थिक लाभ मिलने की संभावना है, जिससे आपका मनोबल ऊँचा रहेगा।`,

  gemini: `शनि और बुध आपके करियर में प्रगति के लिए अनुकूल रहेंगे, जिससे महीने की शुरुआत में करियर के मोर्चे पर सकारात्मकता बनी रहेगी।  

वित्तीय क्षमता को बढ़ाने में आपको शुक्र का पूरा समर्थन मिल सकता है। यह समय एक गंभीर रिश्ते के लिए भी अनुकूल रहेगा।  

नए रिश्ते बनने की संभावना भी है। नए विचार और नए साथी आपकी पढ़ाई में सफलता की ओर ले जा सकते हैं।  

हालांकि, काम से जुड़ा अधिक तनाव आपके स्वास्थ्य में उतार-चढ़ाव ला सकता है। जैसे-जैसे महीना आगे बढ़ेगा, कुछ लोग या परिस्थितियाँ आपको बार-बार परेशान और विचलित कर सकती हैं, जिसका संकेत दक्षिण नोड दे रहा है।  

अनुशासित रहें और वित्तीय लेन-देन में बुनियादी सिद्धांतों से न भटकें। इस महीने के मध्य में कुछ रोमांचक रोमांटिक अनुभव होने की संभावना है।`,

  cancer: `मंगल इंगित करता है कि इस महीने की शुरुआत व्यस्त रहने वाली है, क्योंकि आपके करियर में कई महत्वपूर्ण घटनाएँ होंगी। शुक्र संकेत देता है कि वित्तीय स्थिति में वृद्धि होगी और आप आराम और विलासिता का आनंद उठाते हुए अच्छा समय बिताएंगे।  

शुक्र रोमांस, आनंद और रचनात्मक अभिव्यक्ति के लिए भी अनुकूल रहेगा। यदि आप अभी किसी रिश्ते में नहीं हैं, तो आपके जीवन में प्रेम और रोमांस आ सकता है।  

ग्रहों की कृपा से आपकी पढ़ाई में सफलता मिलने की प्रबल संभावना है, क्योंकि भाग्य आपका साथ देगा। स्वास्थ्य की दृष्टि से भी यह सप्ताह अच्छा रहेगा, जिससे आप अपने कार्यों में बेहतर प्रदर्शन कर पाएंगे।  

जैसे-जैसे महीना आगे बढ़ेगा, बुध का अनुकूल प्रभाव आपके करियर के लिए लाभकारी सिद्ध हो सकता है। शुक्र यह भी संकेत देता है कि आपको अपने खर्चों पर नियंत्रण रखना चाहिए ताकि किसी भी प्रकार की आर्थिक प्रतिबद्धता का दबाव न बढ़े।`,

  leo: `बृहस्पति इस महीने आपके पेशेवर जीवन में कई सकारात्मक बदलाव ला सकता है। व्यापार से जुड़े लोगों को कुछ बड़े सौदों के अवसर मिल सकते हैं।  

हालांकि, दक्षिण नोड का प्रभाव कुछ कड़े चुनौतियाँ ला सकता है, जिससे आपको अपने निर्णयों में सावधानी बरतनी होगी, क्योंकि जल्दबाजी में लिए गए फैसले परेशानी में डाल सकते हैं। महीने के अंत में बृहस्पति की कृपा से सुधार होगा और आपकी स्थिति मजबूत होगी।  

यह महीना आपकी वित्तीय वृद्धि की ओर ले जाएगा और आप आराम और विलासिता का आनंद उठाएंगे, लेकिन खर्च करने में आक्रामक हो सकते हैं।  

बुध संकेत देता है कि वित्त को लेकर सतर्क रहने की आवश्यकता है। आपकी प्रेम जीवन ताजगी से भरी रहेगी और जीवन के सभी क्षेत्रों में आपको संतुष्टि मिलेगी।`,

  virgo: `इस महीने बुध आपके पेशेवर स्थान को मजबूत करने में सहायता करेगा, जबकि मंगल चिंता और अधीरता ला सकता है। हालांकि, प्रियजनों से बातचीत करने से स्पष्टता मिलेगी। बृहस्पति अकादमिक प्रयासों के लिए अनुकूल रहेगा, जिससे नए कौशल और विषयों को खोजने का आदर्श वातावरण बनेगा।  

शुक्र व्यक्तिगत संबंधों में सकारात्मकता लाएगा, जिससे दोस्तों से बेहतर समझ और समर्थन मिलेगा। जैसे-जैसे महीना आगे बढ़ेगा, बुध और शुक्र मिलकर करियर में प्रगति को मजबूत करेंगे, लेकिन महत्वपूर्ण निर्णय लेते समय सतर्क रहने की आवश्यकता होगी।  

मंगल कार्यस्थल पर भावनात्मक प्रतिक्रियाएँ ला सकता है, लेकिन बृहस्पति सुधार लाएगा। शुक्र वित्त को प्रभावी ढंग से प्रबंधित करने में मदद करेगा, और बुध प्रगति के अवसर लेकर आएगा।  

शनि ध्यान केंद्रित करने की मांग करता है ताकि किसी भी दुविधा से बचा जा सके, और बृहस्पति महीने के उत्तरार्ध में प्रतिस्पर्धी परीक्षाओं के लिए लाभकारी संकेत देता है। महीने के अंत तक, भविष्य की प्रगति के लिए एक स्पष्ट रोडमैप तैयार होगा, साथ ही मजबूत ऊर्जा और अच्छे स्वास्थ्य की उम्मीद की जा सकती है। Virga, be open to new opportunities in your career.`,

  libra: `इस महीने ग्रहों का प्रभाव चुनौतियों और अवसरों का मिश्रण लेकर आएगा। शुक्र और बुध प्रेम, वित्त, करियर, शिक्षा और स्वास्थ्य में वृद्धि और सामंजस्य का वादा करते हैं।  

हालांकि, कुछ उतार-चढ़ाव और प्रलोभन सामने आ सकते हैं, जिनसे निपटने के लिए समझदारी, प्रयास और अनुशासन की आवश्यकता होगी। महीने के पहले सप्ताह में, शुक्र रोमांचक अवसर लाएगा, लेकिन कुछ अस्थिरता प्रेम और वित्त को प्रभावित कर सकती है।  

करियर की संभावनाएँ उज्ज्वल रहेंगी, और शिक्षा के क्षेत्र में बुध भविष्य की योजनाओं को सुदृढ़ करेगा। स्वास्थ्य की दृष्टि से, कार्यों को योजनाबद्ध तरीके से करने और सेहत को प्राथमिकता देने की आवश्यकता होगी।  

महीने के मध्य में, शुक्र और बुध मिलकर वृद्धि और सामंजस्य को बढ़ावा देंगे। प्रेम गहरा होगा, वित्तीय स्थिति मजबूत दिखेगी, और करियर में उन्नति के अवसर प्राप्त होंगे।`,

  scorpio: `महीने की शुरुआत में बृहस्पति और शुक्र प्रेम जीवन और रिश्तों के लिए अनुकूल रहेंगे, जिससे सकारात्मकता और विकास मिलेगा। वित्तीय स्थिति में धीरे-धीरे सुधार होगा और कार्यस्थल का माहौल सहायक रहेगा।  

महीने के मध्य में, प्रियजनों को आकर्षित करने और संबंधों को मजबूत करने के अवसर मिलेंगे। अविवाहितों को अच्छे अवसर मिल सकते हैं, वित्तीय योजना में आशावाद रहेगा, और करियर में प्रगति होगी, लेकिन व्यापारियों और छात्रों को धैर्य रखने की आवश्यकता होगी।  

जैसे-जैसे महीना आगे बढ़ेगा, शनि प्रेम जीवन में धैर्य और जिम्मेदारी से निर्णय लेने की मांग करेगा। वित्तीय मामलों में सतर्कता जरूरी होगी, करियर में धीरे-धीरे सुधार होगा, और व्यापारियों व छात्रों के लिए महत्वपूर्ण निर्णय लेने का समय होगा। ऊर्जा का स्तर भी पुनः ऊर्जावान महसूस होगा।  

महीने के अंत में, बृहस्पति गहरे और सार्थक संवाद के संकेत देगा, वित्तीय स्थिति अनुकूल रहेगी, नए करियर अवसर मिल सकते हैं, और स्वास्थ्य व फिटनेस में सुधार होगा। हालांकि, कार्यस्थल पर कुछ तनाव उत्पन्न हो सकता है, जिससे सतर्कता और तैयारी की आवश्यकता होगी। छात्रों के लिए शुरुआती निराशाएँ ध्यान और रचनात्मकता में बदल सकती हैं। कुल मिलाकर, यह महीना जुड़ाव, विकास और समग्र कल्याण के अवसर प्रदान करेगा, लेकिन चुनौतियों को समझदारी और अंतर्ज्ञान के साथ संभालना जरूरी होगा।`,

  sagittarius: `इस महीने पेशेवर वृद्धि और समस्याओं के समाधान के लिए अनुकूल अवसर मिलेंगे। व्यापारियों को लाभकारी विकल्प मिल सकते हैं, लेकिन दक्षिण नोड के प्रभाव के कारण समझौतों में सतर्कता बरतने की आवश्यकता होगी।  

नौकरी बदलने की योजना बनाने के लिए यह उपयुक्त समय है, क्योंकि ग्रहों का सहयोग समझदारी से निर्णय लेने और वित्तीय स्थिति मजबूत करने में मदद करेगा। हालांकि, भ्रामक प्रलोभनों से बचें और पिछले निवेशों पर ध्यान दें, जो महीने के अंत में अच्छे रिटर्न दे सकते हैं।  

शुक्र वित्तीय मजबूती और सफलता लेकर आएगा। प्रेम जीवन में, शुक्र और मंगल के प्रभाव से आकर्षण, उत्साह और अपने साथी के साथ दिलचस्प चर्चाएँ बढ़ेंगी।  

रोमांस को नया रूप दें और संबंधों में नई ऊर्जा का आनंद लें। ऊर्जा स्तर अच्छे रहेंगे, लेकिन ध्यान केंद्रित रखना आवश्यक होगा ताकि प्रयास व्यर्थ न जाएँ।`,

  capricorn: `इस महीने प्रगति के संकेत मिलेंगे, लेकिन मंगल सहयोगियों के साथ सत्ता संघर्ष का संकेत दे सकता है, जिससे अस्थायी रूप से गति बाधित हो सकती है। हालांकि, आपके आत्मविश्वास और सकारात्मक दृष्टिकोण के कारण व्यावसायिक उपक्रम फलेंगे-फूलेंगे, जिससे महत्वपूर्ण वृद्धि और लाभदायक वित्तीय सौदे करने के अवसर मिलेंगे।  

शुक्र रोमांटिक रिश्तों को आशीर्वाद देगा, जिससे अपने साथी के साथ रोमांचक डेट प्लान करने का सही समय रहेगा, जो भावनात्मक जुड़ाव और अंतरंगता को मजबूत करेगा। शुरुआती दौर में पढ़ाई में कुछ चुनौतियाँ आ सकती हैं, लेकिन बृहस्पति के प्रभाव से कार्यस्थल, विशेष रूप से व्यापार में सफलता और सकारात्मकता मिलेगी।  

आगे बढ़ने के लिए नई रणनीतियों और राजस्व स्रोतों को अपनाएँ। महीने के मध्य में मंगल प्रेम जीवन में कुछ अप्रत्याशित मोड़ ला सकता है, जो आपकी प्रतिबद्धता और संचार कौशल की परीक्षा ले सकता है। Capricorn, your patience will pay off soon.`,

  aquarius: `महीने की शुरुआत में करियर से जुड़ी बाधाएँ महसूस हो सकती हैं, क्योंकि दक्षिण नोड का प्रभाव कुछ सीमाएँ खड़ी कर सकता है, जिससे नौकरी बदलने पर विचार करने की आवश्यकता हो सकती है। व्यापार को सही दिशा में बनाए रखने के लिए अतिरिक्त प्रयास की जरूरत होगी, और रिश्तों में भी गुणवत्ता समय देने की आवश्यकता होगी।  

महीने के मध्य में शुक्र प्रेम जीवन को संवारने वाला रहेगा, जिससे नए आकर्षण विकसित हो सकते हैं और संचार में सुधार होगा। बुध की अनुकूल ऊर्जा पढ़ाई में सहायक होगी, जिससे यह सीखने और विकास के लिए आदर्श समय बन सकता है।  

हालांकि, महीने के उत्तरार्ध में मंगल पेशेवर जीवन को व्यस्त बना सकता है, जिससे कुछ देरी और कठिनाइयाँ आ सकती हैं। व्यापार में धैर्य रखना महत्वपूर्ण होगा, और शुक्र संबंधों को संतुलित रखने में मदद करेगा, लेकिन उत्तर नोड का जटिल प्रभाव सच्चे प्रेम को प्रभावित कर सकता है।  

मंगल अत्यधिक आत्मविश्वास ला सकता है, जिससे अध्ययन के परिणाम प्रभावित हो सकते हैं, और दक्षिण नोड के प्रभाव के कारण दबाव बढ़ सकता है। इन चुनौतियों से निपटने के लिए संगठित और केंद्रित रहें, आत्म-देखभाल को प्राथमिकता दें, और सकारात्मक दृष्टिकोण बनाए रखें।`,

  pisces: `महीने की शुरुआत में बुध करियर में उन्नति के लिए रचनात्मक विचार ला सकता है, जिससे महत्वपूर्ण निर्णय लेने की आवश्यकता होगी। कार्यस्थल पर कुछ चुनौतियाँ आ सकती हैं, जो विशेष रूप से व्यापार में कम उपयोग की गई क्षमताओं को सक्रिय करने की माँग करेंगी।  

महीने के मध्य में, बृहस्पति व्यापार में सुखद आश्चर्य ला सकता है, जबकि मंगल रिश्तों में भावनात्मक तीव्रता बढ़ा सकता है।  

शनि के प्रभाव के कारण शैक्षणिक सफलता कठिन हो सकती है, लेकिन प्रियजनों के साथ बिताया गया समय गहरे संबंध स्थापित करने में मदद करेगा। जैसे-जैसे महीना आगे बढ़ेगा, शुक्र वित्तीय वृद्धि का समर्थन करेगा, खासकर नवीन उपक्रमों के माध्यम से, लेकिन उत्तर नोड प्रेम जीवन में भावनात्मक निराशा ला सकता है।  

हालांकि, यह समय परिवर्तन और नए अनुभवों के लिए अवसर प्रदान करेगा। महीने के अंत तक, मंगल ऊर्जा और आत्मविश्वास बढ़ाएगा, और कोई गंभीर स्वास्थ्य समस्या नहीं दिख रही है। साथ ही, परिवार और मित्र नए वित्तीय प्रोजेक्ट्स के लिए मूल्यवान समर्थन प्रदान कर सकते हैं।`
};

// API Route for daily horoscope
router.get("/daily/:sign", (req, res) => {
  const sign = req.params.sign.toLowerCase();
  if (horoscopes[sign]) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.json({ sign, horoscope: horoscopes[sign] });
  } else {
    res.status(404).json({ error: "Horoscope not found" });
  }
});

// routes/zodiac.js
router.post("/create-user", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error creating user", details: error });
  }
});


export default router;
