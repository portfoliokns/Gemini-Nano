window.onload = async function() {
  //セッションの生成
  var session1 = await ai.assistant.create();
  const button1 = document.getElementById("button1");
  const textarea1 = document.getElementById("textarea1");
  button1.addEventListener("click", async function(event) {
    event.preventDefault();

    var sentences = textarea1.value;
    try {
      //回答の生成
      const response = await session1.prompt(sentences);
      console.log(response)
      document.getElementById("response1").innerText = response
    } catch(error) {
      console.log("エラーが発生しています",error);
      alert('エラーが発生しました。',error);
    }
  })

  var session2 = await ai.assistant.create();
  const button2 = document.getElementById("button2");
  const textarea2 = document.getElementById("textarea2");
  button2.addEventListener("click", async function(event) {
    event.preventDefault();

    var sentences = textarea2.value;
    try {
      // ストリーミング生成
      const response = await session2.promptStreaming(sentences);
      for await (const chunk of response) {
        console.log(chunk);
        document.getElementById("response2").innerText = chunk
      }
    } catch(error) {
      console.log("エラーが発生しています",error);
      alert('エラーが発生しました。',error);
    }
  })

  var sessionInit = await ai.assistant.create({
    initialPrompts: [
      { role: "system", content: "日本語で出力してください。料理の作り方について出力してください。不要な記号は含めないでください。" },
  ]
  });
  const button3 = document.getElementById("button3");
  const textarea3 = document.getElementById("textarea3");
  button3.addEventListener("click", async function(event) {
    event.preventDefault();

    var sentences = textarea3.value;
    try {
      const response = await sessionInit.prompt(sentences);
      console.log(response)
      document.getElementById("response3").innerText = response
    } catch(error) {
      console.log("エラーが発生しています",error);
      alert('エラーが発生しました。',error);
    }
  })

  const button4 = document.getElementById("button4");
  const textarea4 = document.getElementById("textarea4");
  button4.addEventListener("click", async function(event) {
    event.preventDefault();
    
    const session4 = await ai.assistant.create();
    var sentences = textarea4.value;
    try {
      const response = await session4.prompt(sentences);
      console.log(response)
      document.getElementById("response4").innerText = response
    } catch(error) {
      console.log("エラーが発生しています",error);
      alert('エラーが発生しました。',error);
    }
  })

  //Gemini Nanoの利用状況
  const capabilities = await window.ai.assistant.capabilities();
  if (capabilities.available != "readily") {
    alert('Gemini Nanoがインストールされていません。Chromeにインストールしてください。');
  }
}